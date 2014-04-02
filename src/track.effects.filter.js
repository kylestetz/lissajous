// we can use this for any type of filter
track.prototype._applyFilter = function(freq, res, amt, type) {
  var self = this;
  if(!freq && !res && !amt) {
    // if the filter is on but another kind was called,
    // switch it. Is this the right behavior? dunno.
    if(self._filterIsActive && self._filterType !== type) {
      self._filterType = type;
      return;
    } else {
      self._filterIsActive = false;
    }
    return;
  }
  else if(!self._filterIsActive || self._filterType !== type) {
    self._filterIsActive = true;
    self._filterType = type;
  }
  self._filterFrequencySequencer.set([freq]);
  self._filterResSequencer.set([res]);
  self._filterEnvAmtSequencer.set([amt]);
}

// =============================================================
//                         LOWPASS
// =============================================================

track.prototype.lp = function(freq, res, amt) {
  var self = this;
  self._applyFilter(freq, res, amt, 'lowpass');
  return self;
}

// =============================================================
//                        HIGHPASS
// =============================================================

track.prototype.hp = function(freq, res, amt) {
  var self = this;
  self._applyFilter(freq, res, amt, 'highpass');
  return self;
}

// =============================================================
//                        BANDPASS
// =============================================================

track.prototype.bp = function(freq, res, amt) {
  var self = this;
  self._applyFilter(freq, res, amt, 'bandpass');
  return self;
}

// =============================================================
//                         NOTCH
// =============================================================

track.prototype.notch = function(freq, res, amt) {
  var self = this;
  self._applyFilter(freq, res, amt, 'notch');
  return self;
}

// API for sequencers

track.prototype.ffreq = function() {
  var self = this;
  arguments = _parseArguments(arguments);
  self._filterFrequencySequencer.set(arguments);
  if(arguments.length == 0) {
    self._filterFrequency = 64;
  }
  return self;
}

track.prototype.fres = function() {
  var self = this;
  arguments = _parseArguments(arguments);
  self._filterResSequencer.set(arguments);
  if(arguments.length == 0) {
    self._filterRes = 1;
  }
  return self;
}

track.prototype.fenv = function() {
  var self = this;
  args = Array.prototype.slice.call(arguments);
  if(args.length > 0 && Array.isArray(args[0])) {
    self._filterEnvelopeSequencer.set(args);
  }
  else if(args.length == 4) {
    self._filterEnvelopeSequencer.set([args]);
  } else {
    self._filterEnvAttack = 0;
    self._filterEnvDecay = 0;
    self._filterEnvSustain = 1;
    self._filterEnvRelease = 0;
  }
  return self;
}

track.prototype.famt = function() {
  var self = this;
  arguments = _parseArguments(arguments);
  self._filterEnvAmtSequencer.set(arguments);
  if(arguments.length == 0) {
    self._filterEnvAmt = 0;
  }
  return self;
}