track.prototype.tremolo = function(intensity, rate, stphase) {
  var self = this;

  if(arguments.length == 0) {
    // remove any events associated with this instance of the effect
    self._off('reset', self._tremoloEffectIndex);
    self._tremoloEffectIndex = self._removeFromChain(self._tremoloEffectIndex);
  } else {
    if(self._tremoloEffectIndex == null) {

      self._tremolo = new tuna.Tremolo({
        intensity: intensity,    //0 to 1
        rate: rate || 1,         //0.001 to 8
        stereoPhase: stphase || 0,    //0 to 180
        bypass: 0
      });

      self._tremoloEffectIndex = self._addToChain(self._tremolo.input, self._tremolo);

      // attach a `reset` handler that turns off the effect
      self._once('reset', self._tremoloEffectIndex, function() {
        self.tremolo();
      });
    } else {
      self._tremolo.intensity = intensity;
      self._tremolo.rate = rate || 1;
      self._tremolo.stereoPhase = stphase || 0;
    }
  }

  return self;
}