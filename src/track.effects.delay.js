track.prototype.delay = function(dtime, fb, level) {
  var self = this;
  if(arguments.length == 0) {
    if(self._delayEffectIndex !== null) {
      // remove the effect from the chain
      self._delayEffectIndex = self._removeFromChain(self._delayEffectIndex);
      // detach all sequencers
      self._detachSequencers( self._delayDtimeSequencer, self._delayFbSequencer );
    }
  } else {
    if(self._delayEffectIndex == null) {
      self._delay = new DelayEffect(dtime, fb, level);

      // make a sequencer for changing the delay time
      self._delayDtimeSequencer = new Sequencer( function(value) {
        self._delay.delay.delayTime.value = value * (clock.bpmResolution / 16) * clock.noteLength();
      });

      // make a sequencer for changing the feedback time
      self._delayFbSequencer = new Sequencer( function(value) {
        self._delay.feedback.gain.value = value;
      });

      // make a wet level sequencer?

      self._attachSequencers( self._delayDtimeSequencer, self._delayFbSequencer );

      self._delayEffectIndex = self._addToChain(self._delay.input, self._delay.output);
    } else {
      self._delayDtimeSequencer.set(dtime);
      self._delayFbSequencer.set(fb);
      self._delay.wetLevel.gain.value = level;
    }
  }
  return self;
}

track.prototype.dtime = function() {
  var self = this;
  arguments = _parseArguments(arguments);
  if(self._delay) {
    if(arguments.length == 0) {
      self._delayDtimeSequencer.set(clock.noteLength() * (clock.bpmResolution / 16));
    } else {
      self._delayDtimeSequencer.set(arguments);
    }
  }
  return self;
}

track.prototype.dfb = function() {
  var self = this;
  arguments = _parseArguments(arguments);
  if(self._delay) {
    if(arguments.length == 0) {
      self._delayFbSequencer.set(0.25);
    } else {
      self._delayFbSequencer.set(arguments);
    }
  }
  return self;
}

track.prototype.dlevel = function(level) {
  var self = this;
  if(self._delay) {
    if(level) {
      self._delay.wetLevel.gain.value = level;
    } else {
      self._delay.wetLevel.gain.value = 0.5;
    }
  }
  return self;
}

function DelayEffect(dtime, fb, level) {
  // taken from http://www.html5rocks.com/en/tutorials/casestudies/jamwithchrome-audio/ ... thanks!
  this.input = context.createGain();
  this.output = context.createGain();
  this.delay = context.createDelay();

  this.feedback = context.createGain();
  this.wetLevel = context.createGain();

  //set some decent values
  this.delay.delayTime.value = ((dtime || 0) * clock.noteLength()) || clock.noteLength();
  this.feedback.gain.value = fb || 0.25;
  this.wetLevel.gain.value = level || 0.5;

  //set up the routing
  this.input.connect(this.delay);
  this.input.connect(this.output);
  this.delay.connect(this.feedback);
  this.delay.connect(this.wetLevel);
  this.feedback.connect(this.delay);
  this.wetLevel.connect(this.output);

  this.connect = function(target){
     this.output.connect(target);
  };
}