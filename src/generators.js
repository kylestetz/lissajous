function rf(min, max) {
  if(!max && !min) {
    min = 0;
    max = 1;
  } else if(!max) {
    max = min;
    min = 0;
  }
  return function() {
    return Math.random() * (max - min) + min;
  };
}

function ri(min, max) {
  if(!max) {
    max = min;
    min = 0;
  }
  return function() {
    return Math.floor( Math.random() * ((max+1) - min) + min );
  };
}

function step(start, end, iterations) {
  var current = start;
  var _step = (end - start) / iterations;
  var begin = true;
  return function() {
    if(current === end) {
      return end;
    }
    if(begin) {
      begin = false;
      return start;
    }
    return current += _step;
  };
}

function walk(type, note, octaves) {

  var scales = {
    'major': [0,2,4,5,7,9,11,12],
    'minor': [0,2,3,5,7,8,10,12],
    'nminor': [0,1,3,5,7,8,11,12],
    'ionian': [0,2,4,5,7,9,11,12]
  };

  var notesToPlay = scales[type];
  notesToPlay = notesToPlay.map( function(item) {
    return item + note;
  });
  if(octaves && octaves > 1) {
    for(var i = 2; i <= octaves; i++) {
      notesToPlay = notesToPlay.concat(
        notesToPlay.map( function(item) {
          return item + 12;
        })
      );
    }
  }

  function choose(list) {
    return list[ Math.floor( Math.random() * list.length ) ];
  }

  return function() {
    return choose(notesToPlay);
  };
}
