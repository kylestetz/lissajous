# Lissajous Tutorial

This document will take you through the complexities of Lissajous one step at a time. We'll start with basic built-in oscillators and look at how notes, rhythms, and sounds can be created. We'll move into samples and sampling techniques, and finally we'll look at effects chains and how they can be automated in interesting ways.

Functional programming is a big part of Lissajous so we'll be trying out Lissajous' generator functions at every step. If you've never encountered functional programming in Javascript [this chapter of Eloquent Javascript](http://eloquentjavascript.net/1st_edition/chapter6.html) is a great place to start.

If you have comments or suggestions about this tutorial, please open [issues](https://github.com/kylestetz/lissajous/issues)!

The [API Documentation](https://github.com/kylestetz/lissajous/blob/master/API.md) serves as a great companion to this tutorial.

_If you are a veteran of Javascript, note that the term *generator* does not refer to ES6 generator functions. Same concept, different implementation._

**Part 1: The Basics**

[**Rhythm with Oscillators**](https://github.com/kylestetz/lissajous/blob/master/Tutorial.md#rhythm-with-oscillators)
- [What is a beat?](https://github.com/kylestetz/lissajous/blob/master/Tutorial.md#what-is-a-beat)
- [How can I randomize a beat?](https://github.com/kylestetz/lissajous/blob/master/Tutorial.md#how-can-i-randomize-a-beat)

[**Playing Notes with Oscillators**](https://github.com/kylestetz/lissajous/blob/master/Tutorial.md#playing-notes-with-oscillators)
- [How do I play a melody?](https://github.com/kylestetz/lissajous/blob/master/Tutorial.md#how-do-i-play-a-melody)
- [What tools are available to work with notes?](https://github.com/kylestetz/lissajous/blob/master/Tutorial.md#what-tools-are-available-to-work-with-notes)
- [How do I randomize notes in a scale?](https://github.com/kylestetz/lissajous/blob/master/Tutorial.md#how-do-i-randomize-notes-in-a-scale)

[**Controlling the Oscillator**](https://github.com/kylestetz/lissajous/blob/master/Tutorial.md#controlling-the-oscillator)
- [What oscillator types are available?](https://github.com/kylestetz/lissajous/blob/master/Tutorial.md#what-oscillator-types-are-available)
- [How do I change the note length and amp envelope?](https://github.com/kylestetz/lissajous/blob/master/Tutorial.md#how-do-i-change-the-note-length-and-amp-envelope)
- [How do I pan left and right?](https://github.com/kylestetz/lissajous/blob/master/Tutorial.md#how-do-i-pan-left-and-right)

**Part 2: Generators**

[**More Magic with Generators**](https://github.com/kylestetz/lissajous/blob/master/Tutorial.md#more-magic-with-generators)
- [Really Random Numbers](https://github.com/kylestetz/lissajous/blob/master/Tutorial.md#really-random-numbers)
- [Random Numbers with Some Constraints](https://github.com/kylestetz/lissajous/blob/master/Tutorial.md#random-numbers-with-some-constraints)
- [Controlled Movement](https://github.com/kylestetz/lissajous/blob/master/Tutorial.md#controlled-movement)

**Part 3: Working with Samples**

[**Samples 101**](https://github.com/kylestetz/lissajous/blob/master/Tutorial.md#samples-101)
- [How do I load and play a sample?](https://github.com/kylestetz/lissajous/blob/master/Tutorial.md#how-do-i-load-and-play-a-sample)
- [What is the relationship between notes and samples?](https://github.com/kylestetz/lissajous/blob/master/Tutorial.md#what-is-the-relationship-between-notes-and-samples)

[**Modulating Samples**](https://github.com/kylestetz/lissajous/blob/master/Tutorial.md#modulating-samples)
- [How do I change the playback speed of a sample?](https://github.com/kylestetz/lissajous/blob/master/Tutorial.md#how-do-i-change-the-playback-speed-of-a-sample)
- [How do I play a sample using a sequence of MIDI notes?](https://github.com/kylestetz/lissajous/blob/master/Tutorial.md#how-do-i-play-a-sample-using-a-sequence-of-midi-notes)

[**Slicing and Dicing Samples**](https://github.com/kylestetz/lissajous/blob/master/Tutorial.md#slicing-and-dicing-samples)
- [How do I change the sample starting and ending points?](https://github.com/kylestetz/lissajous/blob/master/Tutorial.md#how-do-i-change-the-sample-starting-and-ending-points)
- [Can I use granular synthesis techniques?](https://github.com/kylestetz/lissajous/blob/master/Tutorial.md#can-i-use-granular-synthesis-techniques)

[**Resampling with `render`**](https://github.com/kylestetz/lissajous/blob/master/Tutorial.md#resampling-with-render)
- [How do I resample audio from a track?](https://github.com/kylestetz/lissajous/blob/master/Tutorial.md#how-do-i-resample-audio-from-a-track)

**Part 4: Scheduling and Grouping and Group Scheduling**

[**Scheduling with `in`**](https://github.com/kylestetz/lissajous/blob/master/Tutorial.md#scheduling-with-in)
- [Can I schedule functions to be called later?](https://github.com/kylestetz/lissajous/blob/master/Tutorial.md#can-i-schedule-functions-to-be-called-later)
- [Can I schedule multiple concurrent timelines?](https://github.com/kylestetz/lissajous/blob/master/Tutorial.md#can-i-schedule-multiple-concurrent-timelines)
- [Are there any caveats to be aware of when using `in`?](https://github.com/kylestetz/lissajous/blob/master/Tutorial.md#are-there-any-caveats-to-be-aware-of-when-using-in)

[**Groups**](https://github.com/kylestetz/lissajous/blob/master/Tutorial.md#groups)
- [Can I call the same function on more than one track at once?](https://github.com/kylestetz/lissajous/blob/master/Tutorial.md#can-i-call-the-same-function-on-more-than-one-track-at-once)
- [How do I add or remove tracks from an existing group?](https://github.com/kylestetz/lissajous/blob/master/Tutorial.md#how-do-i-add-or-remove-tracks-from-an-existing-group)
- [Can I use `in` on groups?](https://github.com/kylestetz/lissajous/blob/master/Tutorial.md#how-do-i-add-or-remove-tracks-from-an-existing-group)

## Rhythm with Oscillators

### What is a beat?

Let's hit the ground running. Here's the simplest bit of code you can write to generate a sound:

```javascript
// make a new track called `t`
var t = new track()
// give it a beat
t.beat(4)
```

`beat` is a repeating step sequencer that accepts multiples of 1/16th notes. That is, `beat(1)` will trigger the note to play every 1/16th. `beat(4)` triggers the note to play every 4th 1/16th note, equivalent to a quarter note.

`beat(4)` visualized as a traditional sequencer grid:

```
 1  2  3  4
[x][ ][ ][ ]
```

We can pass as many arguments as we want to `beat`. Let's try a more complicated rhythm:

```javascript
var t = new track()
t.beat(4,1,2,3,2,1,3)
```

The numbers add up to 16, which means that our rhythm creates one measure in 4/4. Here's what that looks like in the step sequencer view:

```
 1  2  3  4  5  6  7  8  9  10 11 12 13 14 15 16
[x][ ][ ][ ][x][x][ ][x][ ][ ][x][ ][x][x][ ][ ]
```

Of course things don't have to add up to 16 or any other pretty number— you can create intricate rhythms by staggering the total beat length on different tracks.

If you're partial to classic on-or-off step sequencers, you can also pass 0s into `beat` to create 1/16th note rests:

```javascript
t = new track()
//    [x][ ][ ][ ][x][x][ ][x][ ][ ][x][ ][x][x][ ][ ]
t.beat(1, 0, 0, 0, 1, 1, 0, 1, 0, 0, 1, 0, 1, 1, 0, 0)
```

Beats can also be expressed in 32nd notes using the `beat32` function. Same rules apply, except that the numbers you pass in are equal to intervals of 1/32nd notes instead of 1/16th notes.

```javascript
t = new track()
t.beat32(1,2,3)
```

If you are managing multiple tracks and you started one slightly off-time, the `shift` function is a handy way to shift the phase of the beat pattern. Calling `track.shift(1)` will delay the beat pattern by 1/16th note.

### How can I randomize a beat?

You might have tried to do something along the lines of:

```javascript
var t = new track()
t.beat( Math.ceil( Math.random() * 4 ) )
```

That'll give you a random number, but only _one_ random number. If the random number evaluates to 3, for example, 3 is what gets passed into the beat and now it'll be 3 forever.

To open up more possibility, most fuctions in the track API accept callbacks. Here's an example that returns a random integer between 1 and 4:

```javascript
t = new track()
t.beat( function() {
  return Math.ceil( Math.random() * 4 )
})
```

Unfortunately that is hideous and error-prone if we are in the middle of a performance. Enter generators!

Lissajous generators are functions that return other functions. They are specifically tailored for randomizing things.

The function `ri(min, max)`, which stands for **R**andom **I**nteger, takes a minimum & maximum and returns a function that will generate random numbers within these boundaries. Here's the exact same example as above, rewritten using `ri`:

```javascript
var t = new track()
t.beat( ri(1,4) )
```

Each time a note triggers it will make a decision about how long to wait until the next note. Since `beat` accepts multiple arguments, we can use `ri` more than once to set some ongoing guidelines:

```javascript
var t = new track()
t.beat( ri(1,2), ri(3,4), ri(5,6) )
```

The step sequencer will still alternate between the three callbacks, but their values will be random each time!


## Playing Notes with Oscillators

### How do I play a melody?

Here's one octave starting at Middle C:

```javascript
var t = new track()
t.notes(64, 66, 68, 69, 71, 73, 75, 76)
```

Notes are expressed in [**MIDI notation**](http://www.electronics.dit.ie/staff/tscarff/Music_technology/midi/midi_note_numbers_for_octaves.htm) where the numbers 0 - 127 represent eleven octaves. A [traditional piano](http://newt.phys.unsw.edu.au/jw/notes.html) only has 88 notes, so the range of notes is quite large. For reference, the first note on a piano is usually A0 and it maps to MIDI note `21`. The highest note on a piano, C8, is `108`. Middle C is `64` and Middle A is `69`.

If a track hasn't been given any notes it will play `64` (Middle C).

_**Pro tip:** in the Chrome and Firefox consoles you can hit the Up Arrow to move through the history of commands you've run. If you are creating a melody but one of your notes is wrong use this feature to pull it up and modify it so you don't have to rewrite the whole line!_

### What tools are available to work with notes?

Thinking in MIDI numbers is tricky at first, but there are a number of tools and tricks that make it more pleasant.

The notes API— along with any other [sequencer-based](https://github.com/kylestetz/lissajous/blob/master/API.md#what-is-a-sequence) track function— accepts arrays. This allows you to reuse variables representing notes.

```javascript
var t = new track()

var melody = [64, 66, 68, 69, 71, 73, 75, 76]
t.beat(4).notes(melody)
```

Call `trans` with an integer value to transpose the entire array of notes. The value can be positive or negative.

```javascript
var t = new track()

var melody = [64, 66, 68, 69, 71, 73, 75, 76]
t.beat(4).notes(melody)

// transpose an octave up -> [76, 78, 80, 81, 83, 85, 87, 88]
t.trans(12)
```

This makes it easy to create multiple tracks that follow similar melodies related by thirds, fifths, sevenths, octaves, etc.

```javascript
var t = new track()
var t_fifths = new track()

var melody = [64, 66, 68, 69, 71, 73, 75, 76]

t.beat(4).notes(melody)
t_fifths.beat(4).notes(melody).trans(5)
```

You can pass in multiple arrays as arguments, allowing you to write your melodies as related components and mix and match:

```javascript
var t1 = new track()
var t2 = new track()

var m1 = [64, 66, 68]
var m2 = [72, 70, 69]

t1.beat(2).notes(m1, m2)
t2.beat(2).notes(m2, m2, m1, m1)
```

### How do I randomize notes in a scale?

If you tried this...

```javascript
var t = new track()
t.beat(2).notes( ri(64, 72) )
```

...you'll know that is an uncontrollable mess if you want to stay in a key! What we need are random numbers constrained to a scale.

A generator called `walk` is available. In this object is a plethora of functions representing different scales, from `major` and `minor` to `gypsy` and `spanish8tone`. The syntax looks like this:

`walk.scaleType(rootNote [, octaves])`

The optional `octaves` parameter tells the generator how many octaves worth of notes it has to choose from.

```javascript
var t = new track()
t.beat(4).notes( walk.major(64) )
```

`walk` can be used as one argument in a sequence to allow randomness only at particular points in a melody.

```javascript
var t = new track()
t.beat(4).notes(64, 69, 71, walk.minor(64), 60)
```

## Controlling the Oscillator

### What oscillator types are available?

The Web Audio API has four built-in oscillator types, all of which are available in Lissajous: sine (0), triangle (1), square (2), and saw (3). There are four functions representing these to change between types.

```javascript
var t = new track()
// built in oscillator types
t.sine()
t.tri()
t.square()
t.saw()
```

The function `type` allows you to use the numbers 0 - 3 to represent these four types. This is a sequencer function, meaning you can do this:

```javascript
var t = new track()
t.beat(4).type(0,1,2,3)
```

### How do I change the note length and amp envelope?

Aside from their monophonic `beat` API, tracks are polyphonic and their notes can overlap with each other. Note length is set using the `nl` function, which accepts 1/16th note multiples, or the `nl32` function, which accepts 32nd note multiples. Note length is 1/16th note by default.

```javascript
var t = new track()
t.beat(4).nl(2)
// note length can be sequenced
t.nl(3,2,1)
```

Each note gets its own amplitude envelope. The function `adsr` represents Attack Decay Sustain and Release. Attack, decay, and release take multiples of 1/16th note, while sustain is an amount from 0 - 1.

```javascript
var t = new track()
t.beat(4).nl(2).adsr(1,0,1,1)
// very small numbers can be used for precise timing
t.adsr(0.01, 0, 1, 0.1)
```

Amp envelopes can be sequenced by passing in multiple arrays of length 4.

```javascript
var t = new track()
t.beat(4).adsr([0,1,0,0], [0.01,0,1,1])
// you can also save envelopes as variables
var e1 = [0.5,0.5,0,0];
var e2 = [0,0,1,1];
t.adsr(e1, e2);
```

`adsr32` works exactly the same but accepts 1/32nd note multiples for attack, decay, and release.

### How do I pan left and right?

The `pan` function accepts a number from -1 to 1 where -1 is full left, 1 is full right, and 0 is center. `pan` accepts sequences.

```javascript
var t = new track()
t.beat(4)
// full left
t.pan(-1)
// full right
t.pan(1)
// center (default)
t.pan(0)

// sequences
t.pan(-1, -.5, 0, .5, 1)
```

----------

## More Magic with Generators

Before we jump into sample manipulation let's look at the range of generators available to us. They are also documented in the [API Docs](https://github.com/kylestetz/lissajous/blob/master/API.md#generators).

### Really Random Numbers

##### `ri(min, max)`
##### `rf(min, max)`

Generate random integers or random floats between a min and a max. These are great if you don't care so much about the output and are just looking to make things sound more dynamic. Using `rf` on the volume, for example:

```javascript
var t = new track()
t.beat(2).adsr(0,1,0,0).vol( rf(0.5, 1) )
```

You can also use them multiple times as arguments to set up a loose pattern with some randomness built in:

```javascript
var t = new track()
t.beat(2).adsr(0,1,0,0).vol( rf(0,.1), rf(.4,.6), rf(.8,1) )
```

Functions that work well with `ri`: `beat` and `beat32`, `notes`, `type`, and for working with samples and effects (documented below) `sseq`, `stretch`, `ffreq`, `famt`, and `dtime`.

Functions that work well with `rf`: `vol`, `nl` and `nl32`, `pan`, `adsr` and `adsr32`, and for working with samples and effects (documented below) `clamp`, `cs` (which is aliased as `clshift`), `fres`, `famt`, `dtime`, `dfb`, and `dlevel`.

### Random Numbers With Some Constraints

##### `walk.<scale>(rootNote [, numOfOctaves])`

`walk` is an object containing 86 different functions representing scales. Check out the [API Docs](https://github.com/kylestetz/lissajous/blob/master/API.md#walkchordrootnote--numberofoctaves) for a complete list of available scales.

`walk`, as you might expect, is tailored to the `notes` function and doesn't have much use elsewhere. 

```javascript
var t = new track()
// random notes along the major scale in Middle C
t.beat(4).notes( walk.major(64) )
// random notes along the minor scale across 3 octaves starting at Middle A
t.notes( walk.minor(69, 3) )
```

##### `choice([])`  




### Controlled Movement

These are perhaps the most powerful generators. If you're confused about the lack of proper LFOs in Lissajous, fear not: `step` and `bounce` are Lissajous' version of oscillator-based control!

##### `step(start, end, iterations [, repeat])`

`step` is for interpolating between two values over a specific number of calls. Think of it as a saw-shaped LFO that only changes its value when a note is hit. 

For example, if we want to shift between 1 and 2 over the course of 5 steps, and then hang out at 2 forever:

```
// step(1,2,5)
1 -> 1.25 -> 1.5 -> 1.75 -> 2 -> 2 -> 2 -> 2 ...
```

Pass `true` or `1` for the `repeat` flag and it will repeat these steps endlessly:

```
// step(1,2,5,true)
1 -> 1.25 -> 1.5 -> 1.75 -> 2 -> 1 -> 1.25 -> 1.5 ...
```

Some great practical applications of `step` _without_ `repeat` include panning from left to right and fading the volume out. Stepping with `repeat` is great for shuffling through oscillator types using `type` or through samples using `sseq` (documented below).

##### `bounce(start, end, iterations)`

`bounce` interpolates between values just like step does but reverses direction when it reaches the end, "bouncing" endlessly between the `start` and `end` values. Think of it as a triangle-shaped LFO that only changes its value when a note is hit.

```
// bounce(1,2,5)
1 -> 1.25 -> 1.5 -> 1.75 -> 2 -> 1.75 -> 1.5 -> 1.25 -> 1 ...
```

`bounce` works well with anything that takes a floating point number: `vol`, `nl`, `nl32`, `pan`, `adsr`, `adsr32`, `clamp`, `cs`, `speed`, `fres`, `famt`, `dtime`, `dfb`, and `dlevel`.

----------

## Samples 101

In this section we'll look at working with samples— playing them front to back, slicing them, modulating them, and resampling them. Since many of these concepts rely on an understanding of basic tools (`beat`, `nl`, `notes`, etc) it is assumed that you have read the tutorial up to this point! If you're skipping the beginning, have your [API Docs](https://github.com/kylestetz/lissajous/blob/master/API.md) handy and you should be fine.

As you'll soon discover, samples can be used in a number of ways. The two most basic "modes" you'll find yourself in are using samples as loops & texture, or using samples as root notes to be played at different pitches.

### How do I load and play a sample?

**Loading, the hard way**: You can load an array of samples programmatically by using the `loadSamples` function provided by Lissajous, which takes an array of filepaths and a callback providing an array of sample buffers. This is good if you're preparing a performance. See `environment/extras.js` for sample code.

**Loading, the easy way**: Drag a .wav file from your hard drive onto the Lissajous page (the screen will darken) and Lissajous will turn it into a variable containing a sample buffer. The variable name will be based on the filename. It will `console.log` when the variable is ready to use.

In this section we'll assume you have a sample `mySample` available to you. Add it to a track:

```javascript
// create a track that holds a sample
var t = new track(mySample)

// or give the sample to an existing track
var t2 = new track()
t2.sample(mySample)

// or, if the track already contains some samples
// and you don't want to overwrite them
t2.addsample(mySample)
```

Now that the track contains a sample its oscillators are turned off and the sample will be used to generate sound. Get up and running quickly by calling `play`:

```javascript
var t = new track(mySample)
t.play()
```

`play` will look at the length of the sample and set both `beat` and `nl` to the nearest 32nd note. By default it will quantize to the nearest 32nd note _after_ the sample end. If you want to quantize to the note _before_ the end of the sample, pass `0` into `play`.

### What is the relationship between notes and samples?

Tracks using samples can still take advantage of `beat`, `nl`, and `adsr` independent of what's going on with the sample. By default every note will trigger using the beginning of the sample, but we have control over the sample position using `clamp` and `cs`.

Sample speed can be controlled directly using `speed`, or indirectly using `stretch` or a `notes` sequence.

When a track is given `notes` it will modulate the pitch of the sample based on the _root note_, which by default is `69` (Middle A).

We'll cover all of this in more detail in the next few sections!

## Modulating Samples

### How do I change the playback speed of a sample?

We can change the playback rate using `speed`, which takes a number where 1 is "normal speed," `0.5` is "half speed", etc.

```javascript
var t = new track(mySample)
// play at half speed
t.beat(4).nl(4).speed(0.5)
```

Alternatively we can use `stretch`, which changes the playback rate so that it fits across the specified number of 1/16th notes.

```javascript
var t = new track(mySample)
// stretch the sample to play across sixteen 1/16th notes
t.beat(16).nl(16).stretch(16)
```

Due to the lack of a time-independent pitch shifting algorithm in the Web Audio API it is currently not possible to do pitch shifting that doesn't also change the playback time. There are pitch-shifting implementations out there, but no experiments have been done with them as of the time of this writing. [Pull requests](https://github.com/kylestetz/lissajous/pulls) are always welcome!

### How do I play a sample using a sequence of MIDI notes?

`notes` will shift the playback rate of the active sample based on its root note. The root note is `69` by default and can be changed using `root`.

```javascript
// using a sample recorded at Middle A (69)
var t = new track(mySample)
t.beat(4).nl(4).notes(64,66,68,69)

// using a sample recorded at Middle C (64)
var t2 = new track(mySample2)
t2.beat(4).nl(4).root(64).notes(64,66,68,69)
```

When a track has notes it will ignore both the `speed` and `stretch` settings. To remove an active notes sequence you can call `notes()` with no arguments.

## Slicing and Dicing Samples

### How do I change the sample starting and ending points?

Samples can be `clamp`ed to specific points. In popular audio software you'll often see clamps expressed in _samples_, where the beginning might be 11025 and the end 22050. This is confusing, so the `clamp` API instead accepts numbers from 0 to 1 representing a position within the sample. 0 = the beginning, 1 = the end.

Here we load our sample and play the portion of it from 25% to 50%:

```javascript
var t = new track(mySample)
t.beat(2).nl(2).clamp(0.25, 0.5)
```

Notice that `beat` and `nl` were set independent of the `clamp`. This means that the portion of the sample from 0.25 to 0.5 might be _shorter_ or _longer_ than two 1/16th notes— it's up to you to keep track of this.

So what happens if that portion of the sample is shorter than two 1/16th notes? It will stop playing the sample when it reaches the end unless it is set to loop. By calling `loop(1)` we can tell this small piece of the sample to loop endlessly _for the duration of the note_.

```javascript
var t = new track(mySample)
t.beat(2).nl(2).clamp(0.25, 0.5).loop(1)
```

When calling `clamp` with a single argument, e.g. `clamp(0.25)`, it sets the start to `0` and uses the number provided as the end point.

Now we have clamp points, but what if we want to shift the clamp points over time?

`cs`, also aliased as `clshift`, allows us to add or subtract from the clamp start and end positions each time a note is triggered. The principal is simple: the number passed into `cs` will be added to the clamp positions each note.

```javascript
var t = new track(mySample)
t.beat(2).nl(2).clamp(0,.125).cs(.125)

// (start, end): (0, .125) -> (.125, .25) -> (.25, .375) ...
```

**Clamp shifting can be used as an alternative method of playing a long sample from start to finish.** One of the drawbacks of using `play` / setting a long `beat` and `nl` is that your parameter changes won't update until the next time a note is triggered. If instead the `beat` and `nl` are kept short and corresponding `clamp` and `cs` values match up so that it sounds like the sample is playing from start to finish, you have more opportunities to modulate parameters (using generators, perhaps).

_**Pro tip:** since `clamp` and `cs` accept fractions, we can use division operations instead of decimal points. For example, calling `clamp(1/16).cs(1/16)` sets the clamp to the first 1/16th of the sample and shifts it that amount every note. This is easier to grasp conceptually, especially in the middle of a performance!_

### Can I use granular synthesis techniques?

The clamp shifting technique lends itself well to granular synthesis concepts. We could, for example, play each 1/16th of a sample in _backwards order_ by passing a negative value into `cs`:

```javascript
var t = new track(mySample)
t.beat(1).clamp(1/16).cs(-1/16)
```

Setting a tiny `clamp` and a tinier `cs` for a long sample in conjunction with `beat32(1)` gets us quick-and-dirty pitch shifting. Setting `loop(1)` ensures that we won't have gaps of silence, but it can potentially cause a lot of clipping noise.

```javascript
var t = new track(mySample)
t.beat32(1).nl32(1).clamp(1/128).cs(1/256).loop(1)
```

Using generators like `rf` or `bounce` we can create a more chaotic shifting rule that results in slightly unpredictable behavior:

```javascript
var t = new track(mySample)
t.beat32(1).nl32(1).clamp(1/32).cs( rf(-1/32, 1/32) )
```

## Using multiple samples in the same track

Tracks can hold multiple samples. Only one can be triggered for any given note.

```javascript
var t = new track(mySample1, mySample2, mySample3)
// or
var t = new track()
t.sample(mySample1, mySample2, mySample3)
// or
var t = new track(mySample1)
t.addsamples(mySample2, mySample3)
```

Some practical applications for using multiple samples include: using different drum sounds comprising a drum kit, using multiple sounds to represent notes, and playing back small parts of a larger sample in a different order.

### How do I determine which sample should play for a given note?

Much like the `type` function, `sseq` (which stands for "sample sequence") controls which sample to trigger for a given note. `sseq` takes integers from `0` to `# of samples - 1` representing the indices of the samples in the order you added them.

```javascript
var t = new track(mySample1, mySample2, mySample3)
t.beat(4).nl(4).sseq(0,1,2)
```

### How does the sample API work if I have more than one on a track?

Only one sample can be edited at a time— we call this the _active_ sample.

`select` takes an integer representing the index of the sample you wish to edit. When multiple samples are present you'll have to `select` a different one if you wish to use `clamp`, `cs`, `loop`, `play`, etc. with it.

`select` can be chained so that multiple samples can be manipulated in a single line of code.

```javascript
var t = new track(mySample1, mySample2, mySample3)
t.beat(2).nl(2).sseq(0,1,2)
  .select(0).clamp(1/4).cs(1/4)
  .select(1).clamp(1/8).cs(1/8)
  .select(2).clamp(1/16).cs(1/16)
```

The selection will stay where it was last put (or, if it hasn't been called at all, sample `0` will be the active sample) so it is only necessary to call it when switching the active sample.

## Resampling with `render`

A note before we start down this road: `render` is very finnicky! It works 90% of the time, but expect that once in a while it never stops recording. It's a gamble, but one you should be willing to take once you realize the potential of the tool. Also expect imperfect timing of recordings, big clipping sounds, and general weirdness.

### How do I resample audio from a track?

The `render` and `render32` functions record the audio output from the track for a length of time and, once the recording is finished, add the recorded sound as a sample to the track and change the `beat` and `nl` so that they are the length of the sample. Any `clamp` or `cs` values will be reset.

The `render` function accepts a length of time to record for. If no argument is present it will record for the duration of the `beat` pattern (e.g. if the `beat` is `(4,2,2)` it will record for 4+2+2=8 1/16th notes).

```javascript
var t = new track()
t.beat(2).nl(2).notes( walk.major(52))
t.render(16)
// console.log: 'started'.
// console.log: 'stopped'.
```

All effects will be turned off when the recording is finished.

Note that if you run render on a track with multiple samples **they will be removed** and only the new sample will be present on the track.

## Scheduling with `in`

At this point we've covered most of the capabilities of a track. Putting this all into practice in a performance, however, there may come a point where you are juggling too many tracks at the same time. Staging compositional changes in your song can involve a lot of code firing simultaneously. Luckily we've got a few tools at our disposal...

### Can I schedule functions to be called later?

Yes! Tracks have a special function `in` that allows them to defer calls until a point in the future. `in` takes a multiple of 1/16th notes after which point you can call the track's API normally. Any calls after `in` will be deferred until it is done waiting.

```javascript
var t = new track()
// play a beat with Middle C now.
// in 8/16ths play Middle A.
t.beat(2).notes(64).in(8).notes(69)
```

Calls to `in` are _cumulative_. Think of it as a timeline: `in(8)` will wait 8/16ths, but another call to `in(8)` in the same chain of functions will wait another 8/16ths _after that_. In this way you can build long timelines (entire songs even!) with a single chain.

In the following example we establish a track with a beat and modify it over the course of 72 1/16th notes.

```javascript
var t = new track()
t.beat(2).notes(walk.major(64)).adsr(0,2,0,0)
  .in(16).beat(4).adsr(0,4,0,0)
  .in(16).beat(2).adsr(0,2,0,0)
  .in(16).beat(1).adsr(0,1,0,0).vol(0.5)
  .in(8).vol(0.25)
  .in(8).vol(0.1)
  .in(8).beat()
```

### Can I schedule multiple concurrent timelines?

Here's an example of scheduling a slew of function calls to run in the future:

```javascript
var t = new track()
t.in(8).beat(2)
t.in(16).nl(3)
t.in(16).notes(64)
t.in(32).vol(0.5)
```

Calls to `in` have one special convenience built into them: if you are building a long cumulative timeline and you want to _break out of it_ within a single function chain, you can use the `_` property.

The easiest way to visualize this is using the `track.log` function, which `console.log`s whatever is passed into it.

```javascript
var t = new track()
t.log('I am running now.')
  .in(8).log('I am running in the future.')._.log('I am also running now.')
  
// output:
// > 'I am running now.'
// > 'I am also running now.'
// (in 8/16ths...)
// > 'I am running in the future.'
```

### Are there any caveats to be aware of when using `in`?

The premise of `in` is that it takes all the functions you want to call, waits for the right time, and then tries to call them all. If in the meantime you've changed some important parameters of the track, there's a potential for some of the function calls to fail or behave unexpectedly.

You cannot cancel deferred calls once they have been scheduled.

## Groups

### Can I call the same function on more than one track at once?

Yes! Apart from `track` there is another object at your disposal: `group`.

```javascript
var t1 = new track()
var t2 = new track()
t1.beat(2).nl(2).notes(walk.major(52)).pan(-1)
t2.beat(4).nl(4).notes(walk.major(64)).pan(1)

// create a group with t1 and t2
var g = new group(t1, t2)
g.adsr(1,0,1,1).vol(0.5)
```

`group` takes a list of tracks and exposes the entire track API to us— all of the same functions are available and they are called on all tracks within the group at the same time.

In the example above we have access to the group `g` as well as `t1` and `t2` separately.

### How do I add or remove tracks from an existing group?

`group.add` and `group.remove` accept one or more tracks.

_**Pro tip:** These can be used within a chain of functions to temporarily modify the number of tracks you are operating on!_

Continuing the example above:

```javascript
// ^^ continued from example above ^^

var t3 = new track()
// add `t3` to the group `g`
g.add(t3)

// run a chain of commands, temporarily removing t3 and then adding it back
g.beat(2).nl(2).notes(walk.major(64)).remove(t3).adsr(0,2,0,0).add(t3).vol(1)
```

### Can I use `in` on groups?

`in` is available for groups and works the same way it does for tracks!

```javascript
var t1 = new track()
var t2 = new track()
var g = new group(t1,t2)

t1.pan(-1), t2.pan(1)
g.beat(2).notes(walk.major(64)).in(32).notes(walk.major(52))
```