track.prototype.lp = function(freq, res) {
  var self = this;

  if(arguments.length == 0) {
    if(self._filterEffectIndex !== null) {
      self._filterEffectIndex = self._removeFromChain(self._filterEffectIndex);
    }
  } else {
    if(self._filterEffectIndex == null) {
      // create the filter
      self._bqFilter = context.createBiquadFilter();
      self._bqFilter.type = "lowpass";
      self._bqFilter.frequency.value = _convertToFreq(freq);
      self._bqFilter.Q.value = res || 1;

      // make some sequencers & an envelope
    }
  }
  return self;
}

// lowpass & hipass: filter.frequency.value, filter.Q.value (res!)