function _RT() {
  var self = this;

  self.socket = null;

  var _publicApi = [];
  for(var field in track.prototype) {
    if(field.substr(0,1) !== '_') {
      _publicApi.push(field);
    }
  }

  self.slave = function(address) {
    self.socket = io.connect(address);

    // repurpose the track as a relay by announcing
    // what we would have done locally to the server
    _publicApi.forEach( function(field) {
      track.prototype[field] = function() {
        self.socket.emit('fn_call', { fn: field, args: arguments, track: this._name });
        return this;
      };
    });

    self.socket.on('fn_call', function(data) {
      var _args = [];
      for(var arg in data.args) {
        _args.push(data.args[arg]);
      }
      console.log(data.track + '.' + data.fn + '(' + _args.toString() + ')');
    });

    self.socket.on('eval', function(data) {
      console.log(data.eval);
    });

    self.addAnnounce();
    self.addRun();

    return this;
  };

  self.master = function(address) {
    self.socket = io.connect(address);

    // bootstrap the public api so that it also announces
    // its behavior to the server for anyone else
    // following along.
    _publicApi.forEach( function(field) {
      var superFn = track.prototype[field];
      track.prototype[field] = function() {
        var calledFromRemote = false;
        if(arguments.length === 2 && arguments[1] === 'LJ_REMOTE_FN_CALL') {
          arguments = arguments[0];
          calledFromRemote = true;
        }
        superFn.apply(this, arguments);

        if(!calledFromRemote) {
          self.socket.emit('fn_call', { fn: field, args: arguments, track: this._name });
        }
        return this;
      };
    });

    // run the functions we get from the server!
    self.socket.on('fn_call', function(data) {
      var _args = [];
      for(var arg in data.args) {
        _args.push(data.args[arg]);
      }
      console.log(data.track + '.' + data.fn + '(' + _args.toString() + ')');
      window[data.track][data.fn].apply(window[data.track], [_args, 'LJ_REMOTE_FN_CALL']);
    });

    // the global "run" command runs `eval` in the local window scope
    // on the other machine.
    self.socket.on('eval', function(data) {
      // heh
      console.log(data.eval);
      eval(data.eval);
    });

    self.addAnnounce();
  };

  self.addAnnounce = function() {
    track.prototype._announce = function(name) {
      self.socket.emit('new_var', { name: name });
    };

    self.socket.on('new_var', function(data) {
      window[data.name] = new track({ calledFromRemote: true });
      console.log('var ' + data.name + ' = new track()');
    });
  };

  self.addRun = function() {
    window.run = function(command) {
      self.socket.emit('eval', { eval: command });
      console.log(command);
    };
  };
}

var RT = new _RT();