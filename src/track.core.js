function track() {
  // add self to the scheduler, don't do anything else.
  var self = this;
  clock.addTrack(self);

  // our destination will be the last thing the audio goes through,
  // and it will always be connected to the master node.
  self._destination = context.createGain();
  self._destination.connect(master.destination);

  // _schedulers is a convenience array that holds a reference to all of the
  // schedulers we feel like making. We're only going to have 1 default scheduler
  // for now, but this way you can push a new scheduler into _schedulers and
  // the clock will be able to tick it.
  self._schedulers = [];

  // _sequencers is a convenience array that holds a ref to all sequencers that
  // are triggered by the default beatPattern scheduler. If you're making a sequencer
  // and you want it to react to notes triggered by the beat pattern, just push it here.
  self._sequencers = [];

  // the beat pattern scheduler, more or less the backbone of the track.
  self._beatPattern = new Scheduler( function(nextTick) {
    // hit next on all of the track's sequencers
    for(var i = 0; i < self._sequencers.length; i++) {
      self._sequencers[i].next();
    }
    // if the track has samples loaded, hit their sequencers too
    if(self._currentSample) {
      for(var i = 0; i < self._currentSample.sequencers.length; i++) {
        self._currentSample.sequencers[i].next();
      }
    }
    // now do the sound stuff.
    self._makeNote(nextTick);
  });
  self._attachSequencers(self._beatPattern);


  // here's some neatly packaged default functionality.
  // this would be a good example for third-party extensions.

  // ---------------------------------------------------
  // keep track of the osc type and... sequence it???
  self._oscType = 0;
  self._oscTypeSequencer = new Sequencer( function(value) {
    self._oscType = value;
  });
  self._attachSequencers(self._oscTypeSequencer);
  // ---------------------------------------------------


  // ---------------------------------------------------
  // let's make notes
  self._currentNote = 64;
  self._notesSequencer = new Sequencer( function(value) {
    self._currentNote = value;
  });
  self._attachSequencers(self._notesSequencer);
  // ---------------------------------------------------


  // ---------------------------------------------------
  // let's modulate the note length
  self._currentNoteLength = 2;
  self._noteLengthSequencer = new Sequencer( function(value) {
    self._currentNoteLength = value;
  });
  self._attachSequencers(self._noteLengthSequencer);
  // ---------------------------------------------------


  // ---------------------------------------------------
  // volume
  self._volume = 1;
  self._volumeSequencer = new Sequencer( function(value) {
    self._volume = value;
  });
  self._attachSequencers(self._volumeSequencer);
  // ---------------------------------------------------


  // ---------------------------------------------------
  // adsr envelope
  self._attack = 0.01;
  self._decay = 0;
  self._sustain = 1;
  self._release = 0.01;

  self._adsrSequencer = new Sequencer( function(value) {
    self._attack = value[0];
    self._decay = value[1];
    self._sustain = value[2];
    self._release = value[3];
  });
  self._attachSequencers(self._adsrSequencer);
  // ---------------------------------------------------


  // ---------------------------------------------------              - SAMPLES -
  // ---------------------------------------------------              -----------

  self._samples = [];
  self._currentSample = null;
  self._editingSample = null;

  // make a sequencer for the current sample.
  self._currentSampleSequencer = new Sequencer( function(value) {
    self._currentSample = self._samples[value];
  });
  self._attachSequencers(self._currentSampleSequencer);

  // ---------------------------------------------------            - SOUND CHAIN -
  // ---------------------------------------------------            ---------------

  self._chain = [];

  return self;
}

// sticking with the `arguments` theme, let's allow
// multiple sequencers to be added at once.
track.prototype._attachSequencers = function() {
  for(var i = 0; i < arguments.length; i++) {
    this._sequencers.push(arguments[i]);
  }
}

// likewise, allow multiple sequencers to be
// detached in one call. this will be nice for
// effects that have to dump their sequencers
// when they are turned off.
track.prototype._detachSequencers = function() {
  for(var i = 0; i < arguments.length; i++) {
    var index = this._sequencers.indexOf(arguments[i]);
    if(index > -1) {
      this._sequencers.splice(index, 1);
    }
  }
}

track.prototype._addScheduler = function(newScheduler) {
  this._schedulers.push(newScheduler);
}

track.prototype._addSequencer = function(newSequencer) {
  this._beatPatternSequencers.push(newSequencer);
}

track.prototype._makeNote = function(nextTick) {
  var self = this;

  // cool thing about this makeNote function: since we set up sequencers for everything,
  // all of the parameters we're going to use have already been modulated.
  // that means we can just call them here and know that their values have been set
  // according to whatever is currently on the playing field.

  var noteStart = nextTick;
  var noteEnd = nextTick + (self._currentNoteLength * clock.noteLength());

  if(self._samples.length) {
    // _makeSampler is implemented in track.sampler.js
    self._makeSampler(noteStart, noteEnd);
  } else {
    // _makeOscillator is implemented in track.oscillator.js
    self._makeOscillator(noteStart, noteEnd);
  }
}

track.prototype._connectToChain = function(sound) {
  var self = this;
  if(self._chain.length) {
    sound.connect(self._chain[0].input);
  } else {
    sound.connect(self._destination);
  }
}

// the chain only manages connections- not the effects themselves.

track.prototype._addToChain = function(input, output) {
  var self = this;
  self._chain.push( new trackEffect(input, output) );
  // connect the second-to-last effect to the new one
  if(self._chain.length > 1) {
    var penUltimate = self._chain.length - 2;
    var ultimate = self._chain.length - 1;
    self._chain[ penUltimate ].output.disconnect();
    self._chain[ penUltimate ].output.connect( self._chain[ ultimate ].input );
    self._chain[ ultimate ].output.connect( self._destination );
  } else {
    self._chain[0].output.connect( self._destination );
  }
  // return an index so we can call _removeFromChain later if we want
  return self._chain.length - 1;
}

track.prototype._removeFromChain = function(index) {
  var self = this;

  // disconnect the effect at index-1 if it exists,
  // slice out the effect at index,
  // reroute index-1 to the effect now at index (if one exists; else self._destination)
  if(index > 0) {
    self._chain[index - 1].output.disconnect();
  }

  self._chain.splice(index, 1);

  // if the thing we just removed had a left and right sibling, connect them
  if(index > 0 && index < self._chain.length) {
    self._chain[index - 1].output.connect(self._chain[index].input);
  }
  // or, if the thing we removed was the last in line, connect the left sibling to self.destination
  else if(index > 0 && index == self._chain.length) {
    self._chain[index - 1].output.connect( self._destination );
  }

  // otherwise, the chain is empty and no action is necessary.

  return null;
}

function trackEffect(input, output) {
  var self = this;
  self.input = input;
  self.output = output;
}