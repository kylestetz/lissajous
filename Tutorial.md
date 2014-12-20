# Lissajous Tutorial

This document will take you through the complexities of Lissajous one step at a time. We'll start with basic built-in oscillators and look at how notes, rhythms, and sounds can be created. We'll move into samples and sampling techniques, and finally we'll look at effects chains and how they can be automated in interesting ways.

Functional programming is a big part of Lissajous so we'll be trying out Lissajous' generator functions at every step. If you've never encountered functional programming in Javascript [this chapter of Eloquent Javascript](http://eloquentjavascript.net/1st_edition/chapter6.html) is a great place to start.

_If you are a veteran of Javascript, note that the term *generator* does not refer to ES6 generator functions. Same concept, different implementation._

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

