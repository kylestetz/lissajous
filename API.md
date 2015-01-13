## Lissajous: a sequence-based performance API

[**Clock**](https://github.com/kylestetz/lissajous/blob/master/API.md#clocktempo)

[**Track API**](https://github.com/kylestetz/lissajous/blob/master/API.md#track-api)
- [`track.beat(steps)`](https://github.com/kylestetz/lissajous/blob/master/API.md#trackbeatsteps-sequencer)
- [`track.beat32(steps)`](https://github.com/kylestetz/lissajous/blob/master/API.md#trackbeat32steps-sequencer)
- [`track.vol(amounts)`](https://github.com/kylestetz/lissajous/blob/master/API.md#trackvolamounts-sequencer)
- [`track.notes(notes)`](https://github.com/kylestetz/lissajous/blob/master/API.md#tracknotesnotes-sequencer)
- [`track.nl(steps)`](https://github.com/kylestetz/lissajous/blob/master/API.md#tracknlsteps-sequencer)
- [`track.nl32(steps)`](https://github.com/kylestetz/lissajous/blob/master/API.md#tracknl32steps-sequencer)
- [`track.trans(amount)`](https://github.com/kylestetz/lissajous/blob/master/API.md#tracktransamount)
- [`track.shift(steps)`](https://github.com/kylestetz/lissajous/blob/master/API.md#trackshiftsteps)
- [ `track.pan(amounts)`](https://github.com/kylestetz/lissajous/blob/master/API.md#trackpanamounts-sequencer)
- [`track.sine()`](https://github.com/kylestetz/lissajous/blob/master/API.md#tracksine)
- [`track.square()`](https://github.com/kylestetz/lissajous/blob/master/API.md#tracksquare)
- [`track.saw()`](https://github.com/kylestetz/lissajous/blob/master/API.md#tracksaw)
- [`track.tri()`](https://github.com/kylestetz/lissajous/blob/master/API.md#tracktri)
- [`track.type(types)`](https://github.com/kylestetz/lissajous/blob/master/API.md#tracktypetypes-sequencer)
- [`track.adsr(attack, decay, sustain, release)`](https://github.com/kylestetz/lissajous/blob/master/API.md#trackadsrattack-decay-sustain-release-sequencer)
- [`track.adsr32(attack, decay, sustain, release)`](https://github.com/kylestetz/lissajous/blob/master/API.md#trackadsr32attack-decay-sustain-release-sequencer)
- [`track.sync(tracks)`](https://github.com/kylestetz/lissajous/blob/master/API.md#tracksynctracks)
- [`track.merge(tracks)`](https://github.com/kylestetz/lissajous/blob/master/API.md#trackmergetracks)
- [`track.destroy()`](https://github.com/kylestetz/lissajous/blob/master/API.md#trackdestroy)

Samples
- [`track.sample(samples)`](https://github.com/kylestetz/lissajous/blob/master/API.md#tracksamplesamples)
- [`track.play(overflow)`](https://github.com/kylestetz/lissajous/blob/master/API.md#trackplayoverflow)
- [`track.addsamples(samples)`](https://github.com/kylestetz/lissajous/blob/master/API.md#trackaddsamplessamples)
- [`track.select(index)`](https://github.com/kylestetz/lissajous/blob/master/API.md#trackselectindex)
- [`track.sseq(indices)`](https://github.com/kylestetz/lissajous/blob/master/API.md#tracksseqindices-sequencer)
- [`track.clamp([begin,] end)`](https://github.com/kylestetz/lissajous/blob/master/API.md#trackclampbegin-end)
- [`track.clshift(amounts)` -> `track.cs(amounts)`](https://github.com/kylestetz/lissajous/blob/master/API.md#trackclshiftamounts-sequencer)
- [`track.loop(boolean)`](https://github.com/kylestetz/lissajous/blob/master/API.md#trackloopboolean)
- [`track.stretch(amounts)`](https://github.com/kylestetz/lissajous/blob/master/API.md#trackstretchamounts-sequencer)
- [`track.speed(amount)`](https://github.com/kylestetz/lissajous/blob/master/API.md#trackspeedamount)
- [`track.reverse()`](https://github.com/kylestetz/lissajous/blob/master/API.md#trackreverse)
- [`track.root(note)`](https://github.com/kylestetz/lissajous/blob/master/API.md#trackrootnote)
- [`track.render(length)`](https://github.com/kylestetz/lissajous/blob/master/API.md#trackrenderlength-experimental)
- [`track.render32(length)`](https://github.com/kylestetz/lissajous/blob/master/API.md#trackrender32length)
- [`track.eval(strings)`](https://github.com/kylestetz/lissajous/blob/master/API.md#trackevalstrings-sequencer)

[Deferred calls with `in`](https://github.com/kylestetz/lissajous/blob/master/API.md#trackintime)

Filter/Filter Envelope
- [`track.lp(freq, res, amt)`](https://github.com/kylestetz/lissajous/blob/master/API.md#tracklpfreq-res-amt)
- [`track.hp(freq, res, amt)`](https://github.com/kylestetz/lissajous/blob/master/API.md#trackhpfreq-res-amt)
- [`track.bp(freq, res, amt)`](https://github.com/kylestetz/lissajous/blob/master/API.md#trackbpfreq-res-amt)
- [`track.notch(freq, res, amt)`](https://github.com/kylestetz/lissajous/blob/master/API.md#tracknotchfreq-res-amt)
- [`track.ffreq(frequencies)`](https://github.com/kylestetz/lissajous/blob/master/API.md#trackffreqfrequencies-sequencer)
- [`track.fres(resonances)`](https://github.com/kylestetz/lissajous/blob/master/API.md#trackfresresonances-sequencer)
- [`track.famt(amounts)`](https://github.com/kylestetz/lissajous/blob/master/API.md#trackfamtamounts-sequencer)
- [`track.fenv(attack, decay, sustain, release)`](https://github.com/kylestetz/lissajous/blob/master/API.md#trackfenvattack-decay-sustain-release-sequencer)

Effects
- [`track.delay(time [, feedback, level])`](https://github.com/kylestetz/lissajous/blob/master/API.md#trackdelaytime--feedback-level)
- [`track.dtime(steps)`](https://github.com/kylestetz/lissajous/blob/master/API.md#trackdtimesteps-sequencer)
- [`track.dfb(amounts)`](https://github.com/kylestetz/lissajous/blob/master/API.md#trackdfbamounts-sequencer)
- [`track.dlevel(amount)`](https://github.com/kylestetz/lissajous/blob/master/API.md#trackdlevelamount-sequencer)
- [`track.chorus(rate [, feedback, delay])`](https://github.com/kylestetz/lissajous/blob/master/API.md#trackchorusrate--feedback-delay)
- [`track.tremolo(rate [, intensity, stereoPhase])`](https://github.com/kylestetz/lissajous/blob/master/API.md#tracktremolorate--intensity-stereophase)

[**Groups API**](https://github.com/kylestetz/lissajous/blob/master/API.md#groups-api)
- [`group.add`](https://github.com/kylestetz/lissajous/blob/master/API.md#groupaddtracks)
- [`group.remove`](https://github.com/kylestetz/lissajous/blob/master/API.md#groupremovetracks)
- [`group.sync()`](https://github.com/kylestetz/lissajous/blob/master/API.md#groupsync)

[Generators](https://github.com/kylestetz/lissajous/blob/master/API.md#generators)
- [`ri(min, max)`](https://github.com/kylestetz/lissajous/blob/master/API.md#rimin-max)
- [`rf(min, max)`](https://github.com/kylestetz/lissajous/blob/master/API.md#rfmin-max)
- [`step(start, end, iterations [, repeat])`](https://github.com/kylestetz/lissajous/blob/master/API.md#stepstart-end-iterations--repeat)
- [`bounce(start, end, iterations)`](https://github.com/kylestetz/lissajous/blob/master/API.md#bouncestart-end-iterations)
- [`walk.<chord>(rootNote [, numberOfOctaves])`](https://github.com/kylestetz/lissajous/blob/master/API.md#walkchordrootnote--numberofoctaves)

### What is a sequence?

Many of the parameters of a track can be sequenced. A sequence is just a list of values- for example, if we wanted to make a sequence of notes, we would say `track.notes(64, 60, 62, 72)`... At every beat of the track the parameter would adopt the next value in the array, looping back around to 0 when it reaches the end.

Functions with the `(sequencer)` tag accept any number of arguments. They also accept any number of arrays as arguments, which will be flattened automatically into one long array. Cool!

To remove a sequence simply call the function with no arguments. For example, calling `track.notes()` will remove the sequence of notes.

### `clock.tempo`
The clock object is what makes the world of lissajous tick. Simply change clock.tempo and the clock will update to the new tempo immediately. Defaults to 120.

```javascript
clock.tempo = 120
clock.tempo = 90
```

## Track API

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
- `notes`: 0 - 127 (MIDI numbers)
A sequence of notes to play. The notes are expressed in MIDI number, where 64 is middle C. When playing samples, the root note of the sample determines how the note numbers are interpreted. The root number for a sample can be changed using `track.root(number)`. The default root note for a sample is 69 (A above middle C).

When working with samples, `notes` will override `stretch` and `speed` values.

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
- `amount`: steps
Translate the sequence of notes by a given amount expressed in MIDI numbers. `trans` will also translate the output of generator functions!

A track with no note sequence will default to MIDI note `64` (Middle C). If `trans` is called on a track in this state, the note sequence will be set explicitly to `64` and then translated normally.

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

###  `track.pan(amounts)` `(sequencer)`
Stereo pan. Amounts are specified from -1 to 1, where -1 is left, 0 is center, and 1 is right.

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

### `track.adsr(attack, decay, sustain, release)` `(sequencer)`
ADSR envelope for each note. Attack, decay, and release are specified in 16th note steps. Sustain is a value from 0 - 1. Unlike with `track.beat`, `track.adsr` can accept fractions of a step- for example `0.1` will represent a tenth of a  1/16th note.

This function also accepts multiple envelopes as arrays, as in the example below.

```javascript
var t = new track()
t.beat(4).nl(4)
t.adsr(1, 1, 0.5, 1) // 16th note of attack,
                     // then 16th note of decay down to 0.5 volume,
                     // then 16th note of release after note off

t.adsr([0,0,1,0], [1,1,0.5,0.1]) // alternate between two envelopes
```

### `track.adsr32(attack, decay, sustain, release)` `(sequencer)`
Same as `track.adsr`, but `attack`, `decay`, and `sustain` are specified in 1/32nd notes.

### `track.sync(tracks)`
When two or more tracks aren't quite syncing up, it can be tedious (bordering on impossible) to `track.shift` them just right. `sync` accepts one or more other tracks and sets them all to the beginning of their respective beat patterns. They will all start over immediately, so there may still be a bit of timing involved if there are other things going on.

Note that this only modifies the current location of the `beat` pattern, so any other sequences that were previously synced up the `beat` may be out of phase after `sync`.

It does not matter which of the tracks you use to call the `sync` function.

```javascript
t1 = new track()
t1.beat(9).notes(69).pan(-1)
t2 = new track()
t2.beat(7).notes(64).pan(1)
// some time later...
t1.sync(t2)
// could also be run as `t2.sync(t1)`
```

### `track.merge(tracks)`
Merge the state of one (or more!) tracks. Note that this will not sync the tracks.

```javascript
t1 = new track()
t1.beat(5).notes(67).vol(0.5)
t2 = new track()
t2.beat(2).notes(44).pan(-1)
t2.merge(t1)
// t2 now has beat(5), notes(67), vol(0.5), but retains pan(-1)
```

Note that this can be used make an exact copy of a track if the caller is new (has no non-default properties).

```javascript
t1 = new track()
t1.beat(5).notes(67).vol(0.5)
t2 = new track()
t2.merge(t1) // t2 is now identical to t1

t3 = new track()
t3.beat(6).vol(0.25).adsr(0,1,0,0)
// in order to make t3 an exact copy of t1, we'll need to reset it first
t3.destroy(), t3 = new track(), t3.copy(t1)
```

### `track.destroy()`
Removes the track from the clock, effectively shutting it off and allowing it to be safely deleted. This method also removes the track from any `group` objects that were referencing it.

```javascript
var t = new track()
t.beat(4)
// ...
t.destroy()
delete t
```

It's worth noting that if `destroy` is called on a track but the track is never deleted, it can be added back to the clock by calling `clock.addTrack(track)`.

## Working with Samples

Tracks can use any number of samples as a sound source. Since tracks are (basically) monophonic, only one sample can play on a given beat. Every beat can trigger a different sample, allowing for playback of samples sequencially (this is great for chopped-up parts or percussion).

Each sample has its own set of properties including loop points, speed, and notes (based on a root note). To keep the API concise you can only edit one sample at a time on a track; `track.select` allows you to switch the current sample for editing.

### `track.sample(samples)`
Load samples into a track. Accepts standard `AudioBuffer` objects.

Calling this with arguments will remove any samples associated with the track and create a new list. Calling it with no arguments will unset any existing samples on the track.

### `track.play(overflow)`
Play a sample at its normal rate, setting the beat and note length automatically. This is the simplest way to make noise with a sample— if you are just getting started, use this!

`play` uses the duration of the sample to set the `beat` length. If the duration isn't perfectly divisible by the tempo, there will be a remainder left. The `overflow` argument determines whether to cut off the remainder or keep it and quantize to the next beat. By default it keeps the remainder and quantizes further out; to cut the remainder, pass `0` or `false` into `play`.

```javascript
var t = new track(mySample)
t.play()
// play the sample but cut off any remainder left after quantizing the beat
t.play(0)
```

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
### `track.cs(amounts)` `(sequencer)`
Stands for Clamp Shift. Shifts the clamp points by a given amount every beat. Accepts any number of arguments, allowing you to shift by a different amount each beat.

`track.clshift` and `track.cs` refer to the same function.

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

If a track has `notes` on it, they will override `stretch`. `stretch`, in turn, overrides any `speed` given to the track.

```javascript
t = new track()
t.sample(mySample)
t.beat(12).nl(12)
t.stretch(12)
```

### `track.speed(amount)` `(sequencer)`
Sets the speed of the active sample. The amount is specified as a decimal where 1 is the original speed of the sample.

Note that speed and pitch are tied together, so a slower sample will also be pitched lower.

`speed` can be sequenced, however if the track has `notes` or `stretch` applied they will override `speed`.

```javascript
var t = new track()
t.sample(mySample)
t.beat(4).nl(4)
t.speed(0.5)
```

### `track.reverse()`
Reverses the active sample.

```javascript
var t = new track()
t.sample(mySample)
t.beat(4).nl(4)
t.reverse()
```

### `track.root(note)`
Sets the root note for the active sample using MIDI numbers (where 64 is middle C). This allows you to use `track.notes` to modulate the pitch (and speed) of the sample.

```javascript
var t = new track()
t.sample(mySample)
t.beat(4).nl(4)
t.root(64).notes(64, 60, 76)
```

### `track.render(length)` `experimental`
Renders whatever's going on in your track to a sample, then resets the track to the length of the sample as seamlessly as it can. There is usually a small delay after recording, so timing is not perfect for this yet.

Calling this function with no arguments will render audio for the length of the beat pattern; for example, if your beat is `track.beat(4, 2, 2)`, calling `track.render()` will render 4+2+2=8 1/16th notes of audio.

Calling this function with a `length` argument specifies how many 1/16th note steps you should record for.

Note that effects do not shut off automatically when the track resets, although this will be coming soon.

```javascript
var t = new track()
t.sample(mySample)
t.beat(4, 2, 4, 2, 2, 2)
t.render()
```

```javascript
var t = new track()
t.sample(mySample)
t.beat(4)
t.render(16) // render 16 beats (one measure in 4/4)
```

### `track.render32(length)`
Same as `track.render`, but it accepts a length in 1/32nd note steps.

### `track.eval(strings)` `(sequencer)`
A sequener for evaluating functions of the track. `strings` can be any number of strings- it works by evaluating the string `eval('this.' + string)`, so any function of the track is fair game. You can also chain functions the same way you would normally.

Note that this is a thin wrapper for `eval`, which means you're perfectly capable of breaking things and causing errors. But that's what makes it fun.

```javascript
var t = new track()
t.beat(4).nl(3)
t.eval('delay(1)', 'delay()') // toggles the delay on and off each beat
t.eval('delay(1).chorus()', 'delay().chorus(0.5,0.9,0)')
```

### `track.in(time)...`

The `in` feature allows API calls to be made at a point in the future specified in 16th notes. Any API calls after `in` are deferred by the amount given:

```javascript
var t = new track()
t.beat(4).notes(64)
t.in(16).notes(67) // in 16 beats call `notes(67)`
```

Consecutive calls to `in` are _additive_, allowing you to chain long timelines together:

```javascript
var t = new track()
t.beat(4).notes(64)
// in 16 switch the note to 66. In another
// 16 after that, switch the note to 68.
t.in(16).notes(66).in(16).notes(68)
```

A special `_` property is available after a call to `in` which allows you to break out of the current timeline and back to immediate calls. Here's an example using `track.log`, which just console logs the input.

```javascript
var t = new track()
t.log('called now').in(16).log('16 beats later')._.log('also called now')
// logs:
// "called now"
// "also called now"
// ...
// "16 beats later"
```

## Polyphonic Filter Envelope
Each track comes with a note-triggered filter envelope. While the track is technically monophonic (in that only one note can be played at a given moment using `track.beat`), the notes can overlap and each note gets its own instance of the filter envelope.

Filters accept frequency from `0 - 127`, res from `0.1 - 1000` (take it easy with numbers over 100!), and an optional amount from `0 - 127` to shift the frequency as the envelope opens.

To turn off a filter, call it with no arguments. To switch filter types without changing the parameters, call a *different* filter with no arguments.

### `track.lp(freq, res, amt)`

### `track.hp(freq, res, amt)`

### `track.bp(freq, res, amt)`

### `track.notch(freq, res, amt)`

### `track.ffreq(frequencies)` `(sequencer)`
A sequencer for filter frequencies.

### `track.fres(resonances)` `(sequencer)`
A sequencer for filter resonance.

### `track.famt(amounts)` `(sequencer)`
A sequencer for filter amounts.

### `track.fenv(attack, decay, sustain, release)` `(sequencer)`
The filter envelope. Works the same way `track.adsr()` does, where `attack`, `decay`, and `release` are specified in 1/16th notes and `sustain` is a value from `0 - 1`.

This function also accepts a sequence of envelopes as arrays.

```javascript
t = new track()
t.beat(4).nl(4).notes(64, 60, 72)
t.lp(64,10,30)
t.fenv(1,1,0.5,0)

t.fenv([0,1,0,0], [1,0,1,0]) // multiple alternating envelopes
```

## There are some effects
Effects are a proof of concept right now with more on the way. Call them with some parameters to turn them on, call them with no arguments to turn them off.

Effects are chained in the order you bring them to life. Turning an effect off that was further up in the chain and turning it back on will put it at the end.

### `track.delay(time [, feedback, level])`
- `time`: 1/16th note steps
- `feedback`: 0 - 1
- `level`: 0 - 1 (and beyond)

```javascript
var t = new track()
t.beat(4)
t.delay(2, 0.5, 0.5)
```

#### `track.dtime(steps)` `(sequencer)`
A sequencer for delay time.

```javascript
var t = new track()
t.beat(4)
t.delay(2, 0.5, 0.5)
t.dtime(2, 1, 3)
```

#### `track.dfb(amounts)` `(sequencer)`
A sequencer for delay feedback.

```javascript
var t = new track()
t.beat(4)
t.delay(2, 0.5, 0.5)
t.dfb(2, 1, 3)
```

#### `track.dlevel(amount)` `(sequencer)`
A sequencer for the delay level.

```javascript
var t = new track()
t.beat(4)
t.delay(2, 0.5, 0.5)
t.dlevel(0.5, 0.4, 0.3, 0.2)
```

### `track.chorus(rate [, feedback, delay])`
The chorus effect from [Tuna.js](https://github.com/Dinahmoe/tuna).

- `rate`: multiple of 1/16th notes (same as `beat`)
- `feedback`: 0 - 1
- `delay`: 1/16th note steps

### `track.tremolo(rate [, intensity, stereoPhase])`
The tremolo effect from [Tuna.js](https://github.com/Dinahmoe/tuna).

- `rate`: multiple of 1/16th notes (same as `beat`)
- `intensity`: 0 - 1
- `stereoPhase`: 0 - 180

## Groups API

Tracks can be grouped together. Groups have an API identical to tracks, but the function will be called once for each track in the group.

### `group(tracks)`

```javascript
var t1 = new track()
var t2 = new track()
var g = new group(t1, t2)

g.beat(2) // calls beat(2) on both tracks
```

### `group.add(tracks)`

Add one or more tracks to an existing group. Provide each track as an argument to `add`.

### `group.remove(tracks)`

Remove one or more tracks to an existing group. Provide each track as an argument to `remove`.

### `group.sync()`, `group.sync(tracks)`

Runs `track.sync` on all tracks in the group, immediately starting them all from the beginning of their `beat` patterns.

If other tracks are passed in, they will be synced in addition to all of the group's tracks.

## Generators

Generators are helper functions that make it easier to randomize and interpolate between values dynamically. On a technically level they implement the factory pattern— calling a generator function returns a new function that uses the parameters provided.

All track functions with the `(sequencer)` tag can accept generator functions as arguments.

_Note: Though conceptually similar, generators in Lissajous are not implemented using Javascript ES6 generators._

### `ri(min, max)`

**Random Integer**. Min and max are _inclusive_ (meaning that `ri(0,2)` could result in `0`, `1`, or `2`). If only one argument is provided it will be used as the `max` and `min` will be set to 0.

```javascript
var t = new track()
// play a random note between 64 and 72
t.beat(4).notes( ri(64, 72) )
```

### `rf(min, max)`

**Random Float**. Min and max are _inclusive_. If only one argument is provided it will be used as the `max` and `min` will be set to 0.

```javascript
var t = new track()
// make the volume random on each note
t.beat(4).vol( rf(0, 1) )
```

### `step(start, end, iterations [, repeat])`

Interpolate between start and end values over a specific number of iterations. If the `repeat` flag is set (using either `true` or `1`) the sequence will start over again when it finishes. `repeat` is off by default.

```javascript
var t = new track()
t.beat(1)
// use step to fade the volume out over 32 notes
t.vol( step(1,0,32) )
// use step to pan left to right (repeating)
t.pan( step(-1, 1, 16, true) )
```

### `bounce(start, end, iterations)`

Interpolate between start and end values over a specified number of iterations, switching directions at each end. Creates a "ping pong" effect.

```javascript
var t = new track()
t.beat(1)
// bounce the pan back and forth between left and right sides
t.pan( step(-1, 1, 16) )
```

### `walk.<chord>(rootNote [, numberOfOctaves])`

Generate random notes within a scale starting at a root note, optionally covering multiple octaves.

Autocomplete in the Chrome and Firefox consoles comes in handy when messing around with `walk`!

The `walk` object contains 86 different functions representing scales: `aeolian`, `algerian`, `algerian1`, `algerian2`, `altered`, `arabian`, `augmented`, `balinese`, `bebopdominant`, `bebopdominantflatnine`, `bebopmajor`, `bebopminor`, `beboptonicminor`, `blues`, `byzantine`, `chahargah`, `chinese`, `chinese1`, `chinese2`, `chromatic`, `diminished`, `dorian`, `doubleharmonic`, `egyptian`, `enigmatic`, `ethiopian`, `flamenco`, `gypsy`, `harmonicmajor`, `harmonicminor`, `hindu`, `hirajoshi`, `hungariangypsy`, `hungarianmajor`, `hungarianminor`, `indian`, `inverteddiminished`, `ionian`, `iwato`, `japanese`, `javanese`, `jewish`, `kumoi`, `leadingwholetone`, `locrian`, `locrianmajor`, `locriannatural`, `locriansuper`, `locrianultra`, `lydian`, `lydianaugmented`, `lydiandominant`, `lydianminor`, `major`, `marva`, `melodicminor`, `minor`, `mixolydian`, `mixolydianaugmented`, `mohammedan`, `mongolian`, `naturalmajor`, `naturalminor`, `neapolitanmajor`, `neapolitanminor`, `oriental`, `overtone`, `pa`, `pb`, `pd`, `pe`, `pelog`, `pentatonic`, `pentatonic`, `persian`, `pfcg`, `phrygian`, `phrygianmajor`, `romanian`, `semitone3`, `semitone4`, `spanish`, `spanish8tone`, `symmetrical`, `todi`, and `wholetone`.

```javascript
var t = new track()
// random notes along the major scale in Middle C
t.beat(4).notes( walk.major(64) )
// random notes along the minor scale across 3 octaves starting at Middle A
t.notes( walk.minor(69, 3) )
```

### `choice([])`

Choose a random item from a list. Accepts lists of values or arrays (or both) as arguments.

```javascript
var t = new track()
var scale = [64, 65, 69, 71];
t.beat(2).notes( choice(scale) );
```