track.prototype.reverb = function(sec, decay, wet, dry) {
  var self = this;
  if(arguments.length == 0) {
    if(self._reverbEffectIndex !== null) {
      // TODO: Do we need to delete our impulse buffer, will it create a memory leak?

      // remove any events associated with this instance of the effect
      self._off('reset', self._reverbEffectIndex);
      // remove the effect from the chain
      self._reverbEffectIndex = self._removeFromChain(self._reverbEffectIndex);
      // detach all sequencers
      // self._detachSequencers( self._delayDtimeSequencer, self._delayFbSequencer, self._delayLevelSequencer );
    }
  } else {
    if(self._reverbEffectIndex == null) {
      self._reverb = new ReverbEffect(sec, decay, wet, dry);

      /* TODO: Add sequencers for wet/dry, and possibly time/decay if it doesn't tax the CPU 
       * too much to regenerate the impulse. Similar to how delay effect does */
       
      // // make a sequencer for changing the delay time
      // self._delayDtimeSequencer = new Sequencer( function(value) {
      //   self._delay.delay.delayTime.value = value * (clock.bpmResolution / 16) * clock.noteLength();
      // });

      // // make a sequencer for changing the feedback time
      // self._delayFbSequencer = new Sequencer( function(value) {
      //   self._delay.feedback.gain.value = value;
      // });

      // // make a sequencer for changing the wet level
      // self._delayLevelSequencer = new Sequencer( function(value) {
      //   self._delay.wetLevel.gain.value = value;
      // });

      // self._attachSequencers( self._delayDtimeSequencer, self._delayFbSequencer, self._delayLevelSequencer );

      self._reverbEffectIndex = self._addToChain(self._reverb.input, self._reverb.output);

      // attach a `reset` handler that turns off the effect
      self._once('reset', self._reverbEffectIndex, function() {
        self.reverb();
      });
    } else {
      self._reverb.reverb.buffer = _buildImpulse(sec, decay);
      self._reverb.wetLevel.gain.value = wet;
      self._reverb.dryLevel.gain.value = dry;
      // self._delayDtimeSequencer.set(dtime);
      // self._delayFbSequencer.set(fb || 0.25);
      // self._delayLevelSequencer.set(level || 0.5);
    }
  }
  return self;
}



function ReverbEffect(sec, decay, wet, dry) {
  // taken from http://www.html5rocks.com/en/tutorials/casestudies/jamwithchrome-audio/ ... thanks!
  this.input = context.createGain();
  this.output = context.createGain();
  this.reverb = context.createConvolver();

  this.wetLevel = context.createGain();
  this.dryLevel = context.createGain();

  //set some decent values
  this.reverb.buffer = _buildImpulse(sec, decay);
  this.wetLevel.gain.value = wet || 0.75;
  this.dryLevel.gain.value = dry || 0.5;

  //set up the routing
  this.input.connect(this.reverb);
  this.reverb.connect(this.wetLevel);
  this.wetLevel.connect(this.output);

  this.input.connect(this.dryLevel);
  this.dryLevel.connect(this.output);

  this.connect = function(target){
     this.output.connect(target);
  };
}

// Special thanks to Jordan Santell for his function that builds impulse buffers on the fly
// Taken from https://github.com/web-audio-components/simple-reverb
function _buildImpulse(seconds, decay) {
  var rate = context.sampleRate
    , length = rate * (seconds || 3)
    , decay = (decay || 2)
    , impulse = context.createBuffer(2, length, rate)
    , impulseL = impulse.getChannelData(0)
    , impulseR = impulse.getChannelData(1)
    , n, i;

  for (i = 0; i < length; i++) {
    n = i; //reverse ? length - i : i;
    impulseL[i] = (Math.random() * 2 - 1) * Math.pow(1 - n / length, decay);
    impulseR[i] = (Math.random() * 2 - 1) * Math.pow(1 - n / length, decay);
  }

  return impulse;
}