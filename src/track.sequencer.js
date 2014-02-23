function Sequencer(callback) {
  var self = this;
  self.pattern = [];
  self.currentStep = 0;
  self.callback = callback;
}

Sequencer.prototype.set = function(arguments) {
  var self = this;
  self.pattern = arguments;
  // this could change but for now let's reset the step when the pattern changes
  self.currentStep = 0;
}

Sequencer.prototype.next = function() {
  var self = this;
  if(self.pattern.length) {
    self.callback(self.pattern[self.currentStep]);
    self.currentStep = ++self.currentStep % self.pattern.length;
  }
}