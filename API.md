## A sequence-based API
Many of the parameters of a track can be sequenced. A sequence is just a list of values- for example, if we wanted to make a sequence of notes, we would say `track.notes(64, 60, 62, 72)`... At every beat of the track the parameter would adopt the next value in the array, looping back around to 0 when it reaches the end.

Functions with the `(sequencer)` tag accept any number of arguments. They also accept any number of arrays as arguments, which will be flattened automatically into one long array. Cool!

To remove a sequence simply call the function with no arguments. For example, calling `track.notes()` will remove the sequence of notes.

### `track.beat(steps)` `(sequencer)`
Tracks need a beat to generate sound. A beat is a step sequencer pattern expressed in 16th notes. It loops through its pattern indefinitely.

Calling beat with no arguments will remove the track's sequence and stop it from playing.

```javascript
var t = new track()
t.beat(2) // a note plays every two 1/16th notes (one 1/8th note)
t.beat(2,3) // a note plays, two 1/16th notes pass, another note plays, and three 1/16th notes pass
```

### `track.beat32(steps)` `(sequencer)`
Same as `track.beat`, but expressed in 1/32nd note steps.

### `track.vol(amounts)` `(sequencer)`
Sets the master volume of the track (applied after all effects). Accepts numbers in the range 0 - 1, though there is no upper limit (other than your speakers/ears/ability to hear/etc.).

```javascript
var t = new track()
t.beat(4)
t.vol(0.5, 0.6, 0.7, 0.8, 0.9, 1)
```

### `track.notes(notes)` `(sequencer)`
`notes`: 0 - 127 (MIDI numbers)
A sequence of notes to play. The notes are expressed in MIDI number, where 64 is middle C. When playing samples, the root note of the sample determines how the note numbers are interpreted. The root number for a sample can be changed using `track.root(number)`. The default root note for a sample is 69 (A above middle C).

```javascript
var t = new track()
t.beat(2) // play eighth notes
t.notes(64, 66, 68, 76)
```

### `track.nl(steps)` `(sequencer)`
Note Length, expressed in 1/16th note steps. This is independent from the beat pattern, allowing notes to overlap with each other.

```javascript
var t = new track()
t.beat(2).notes(64, 68, 71, 76) // play a sequence of eighth notes
t.nl(4) // let the notes overlap by extending their length to 1/4 notes
```

### `track.nl32(steps)` `(sequencer)`
Same as `track.nl`, but expressed in 1/32nd note steps.

### `track.trans(amount)`
`amount`: steps
Translate the sequence of notes by a given amount expressed in MIDI numbers.

```javascript
var t = new track()
t.beat(2).notes(64, 68)
t.trans(-12) // the notes are now one octave lower at `(52, 56)`
```

### `track.shift(steps)`
Shift a sequence by adding or subtracting 16th notes from it immediately. This is a very useful tool for getting several active tracks in phase with each other.

When specifying a negative amount you are restricted to subtracting the amount left before a note plays. For example if there should be 6 more 1/16ths left before a note triggers and you call `track.shift(-8)`, the next note will be played immediately (and not skipped over).

```javascript
var t = new track()
t.beat(8).notes(64) // play note#64 every half measure
t.shift(4) // pause for an additional quarter note before the next note is triggered
```

### `track.sine()`
Set the oscillator type to a sine wave. Will not work if there are active samples (remove them first by calling `track.sample()`).

### `track.square()`
Set the oscillator type to a square wave. Will not work if there are active samples (remove them first by calling `track.sample()`).

### `track.saw()`
Set the oscillator type to a sawtooth wave. Will not work if there are active samples (remove them first by calling `track.sample()`).

### `track.tri()`
Set the oscillator type to a triangle wave. Will not work if there are active samples (remove them first by calling `track.sample()`).

### `track.type(types)` `(sequencer)`
A sequencer for changing the oscillator type on a given note. Current types are: SINE = 0, SQUARE = 1, SAW = 2, TRI = 3.

```javascript
var t = new track()
t.beat(4)
t.type(0,1,2,3) // plays a sine, square, saw, and tri note in sequence
```

### `track.adsr(attack, decay, sustain, release)`
ADSR envelope for each note. Attack, decay, and release are specified in 16th note steps. Sustain is a value from 0 - 1. Unlike with `track.beat`, `track.adsr` can accept fractions of a step- for example `0.1` will represent a tenth of a  1/16th note.

```javascript
var t = new track()
t.beat(4).nl(4)
t.adsr(1, 1, 0.5, 1) // 16th note of attack,
                     // then 16th note of decay down to 0.5 volume,
                     // then 16th note of release after note off
```

### `track.adsr32(attack, decay, sustain, release)`
Same as `track.adsr`, but `attack`, `decay`, and `sustain` are specified in 1/32nd notes.

## Working with Samples

Tracks can use any number of samples as a sound source. Since tracks are (basically) monophonic, only one sample can play on a given beat. Every beat can trigger a different sample, allowing for playback of samples sequencially (this is great for chopped-up parts or percussion).

Each sample has its own set of properties including loop points, speed, and notes (based on a root note). To keep the API concise you can only edit one sample at a time on a track; `track.select` allows you to switch the current sample for editing.

### `track.sample(samples)`
Load samples into a track. Accepts standard `AudioBuffer` objects.

Calling this with arguments will remove any samples associated with the track and create a new list. Calling it with no arguments will unset any existing samples on the track.

### `track.addsamples(samples)`
Adds additional samples to a track (versus calling `track.sample(samples)`, which removes all existing samples first). Accepts standard `AudioBuffer` objects.

### `track.select(index)`
Despite loading multiple samples, the API restricts you to editing one at a time. Use this to change the active sample by referencing its index in the list of samples.

```javascript
var t = new track()
t.sample(mySample1, mySample2)
t.select(0) // now editing mySample1
t.root(64) // set the root note to 64 (middle C)
t.select(1) // now editing mySample2
t.clamp(0, 0.5) // clamp to the first half of mySample2
```

### `track.sseq(indices)` `(sequencer)`
Stands for Sample Sequence. Takes a list of indices and plays the corresponding sample at each beat.

```javascript
var t = new track()
t.sample(kick, snare, hihat)
t.beat(4)
t.sseq(0,1,2,1) // plays the pattern kick, snare, hihat, snare
```

### `track.clamp([begin,] end)`
Clamp to a portion of a sample. `begin` and `end` are specified as a number from 0 - 1, corresponding to a point in the sample where 0 is the start and 1 is the end. This makes it possible to use division notation, which is a nice technique to use when performing:

```javascript
var t = new track()
t.sample(drumBeat)
t.beat(4).nl(4)
t.clamp(0.5, 1) // clamp to the second half of the sample
t.clamp(0, 1/16) // clamp to the first sixteenth of the sample
t.clamp(1/4) // clamp to the first quarter of the sample

```

### `track.clshift(amounts)` `(sequencer)`
Stands for Clamp Shift. Shifts the clamp points by a given amount every beat. Accepts any number of arguments, allowing you to shift by a different amount each beat.

### `track.loop(boolean)`
Determines whether a sample loops if the note is longer than the sample length. Loop also works with clamp points, allowing you to loop only a portion of the sample.

Accepts any truthy value to turn on looping, and any falsey value- or no arguments- to turn it off.

```javascript
var t = new track()
t.sample(pianoSample)
t.beat(4).nl(4)
t.clamp(1/32)
t.loop(1)
```

### `track.stretch(amounts)` `(sequencer)`
Stretches the active sample across the specified number of 1/16th notes. For example, calling `track.stretch(16)` will stretch the track to be 16 1/16th notes long, regardless of the original length of the sample.

This will change the pitch of the sample, so it's best used with percussive sounds.

```javascript
t = new track()
t.sample(mySample)
t.beat(12).nl(12)
t.stretch(12)
```

### `track.speed(amount)`
Sets the speed of the active sample. The amount is specified as a decimal where 1 is the original speed of the sample.

Note that speed and pitch are tied together, so a slower sample will also be pitched lower.

### `track.reverse()`
Reverses the active sample.

### `track.root(note)`
Sets the root note for the active sample using MIDI numbers (where 64 is middle C). This allows you to use `track.notes` to modulate the pitch (and speed) of the sample.

### `track.render(length)` `experimental`
Renders

track.render32