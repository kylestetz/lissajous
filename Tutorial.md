# Lissajous Tutorial

This document will take you through the complexities of Lissajous one step at a time. We'll start with basic built-in oscillators and look at how notes, rhythms, and sounds can be created. We'll move into samples and sampling techniques, and finally we'll look at effects chains and how they can be automated in interesting ways.

Functional programming is a big part of Lissajous so we'll be trying out Lissajous' generator functions at every step. If you've never encountered functional programming in Javascript [this chapter of Eloquent Javascript](http://eloquentjavascript.net/1st_edition/chapter6.html) is a great place to start.

If you have comments or suggestions about this tutorial, please open [issues](https://github.com/kylestetz/lissajous/issues)!

The [API Documentation](https://github.com/kylestetz/lissajous/blob/master/API.md) serves as a great companion to this tutorial.

_If you are a veteran of Javascript, note that the term *generator* does not refer to ES6 generator functions. Same concept, different implementation._

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

_Pro tip: in the Chrome and Firefox consoles you can hit the Up Arrow to move through the history of commands you've run. If you are creating a melody but one of your notes is wrong use this feature to pull it up and modify it so you don't have to rewrite the whole line!_

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

##### `choice([])`
##### `walk.<scale>(rootNote [, numOfOctaves])`

### Controlled Movement

##### `step(start, end, iterations [, repeat])`
##### `bounce(start, end, iterations)`

----------