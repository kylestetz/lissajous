# Lissajous Tutorial

This document will take you through the complexities of Lissajous one step at a time using a simple song as an example. We'll start with basic built-in oscillators and look at how notes and rhythms can be created. We'll move into samples and sampling techniques, and finally we'll look at effects chains and how they can be automated in interesting ways.

Functional programming is a big part of Lissajous so we'll be trying out Lissajous' generator functions at every step. If you've never encountered functional programming in Javascript [this chapter of Eloquent Javascript](http://eloquentjavascript.net/1st_edition/chapter6.html) is a great place to start.

_If you are a veteran of Javascript, note that the term *generator* does not refer to ES6 generator functions. Same concept, different implementation._

## Rhythm with Oscillators

#### What is a beat?

Let's hit the ground running. Here's the simplest bit of code you can write to generate a sound:

```
// make a new track called `t`
var t = new track()
// give it a beat
t.beat(4)
```

`beat` is a repeating step sequencer that accepts multiples of 1/16th notes. That is, `beat(1)` will trigger the note to play every 1/16th. `beat(4)` triggers the note to play every 4th 1/16th note, equivalent to a quarter note.

`beat(4)` visualized as a traditional sequencer grid:

```
[x][ ][ ][ ]
```

We can pass as many arguments as we want to `beat`. Let's try a more complicated rhythm:

```
var t = new track()
t.beat(4,1,2,3,2,1,3)
```

The numbers add up to 16, which means that our rhythm creates one measure in 4/4. Here's what that looks like in the step sequencer view:

```
[x][ ][ ][ ][x][x][ ][x][ ][ ][x][ ][x][x][ ][ ]
```

Of course things don't have to add up to 16 or any other pretty number— you can create intricate rhythms by staggering the total beat length on different tracks.

Beats can also be expressed in 32nd notes using the `beat32` function. Same rules apply, except that the numbers you pass in are equal to intervals of 1/32nd notes instead of 1/16th notes.

#### How can I randomize a beat?

You might have tried to do something along the lines of:

```
var t = new track()
t.beat( Math.ceil( Math.random() * 3 ) )
```

That'll give you a random number, but only _one_ random number. If the random number evaluates to 3, for example, 3 is what gets passed into the beat and now it'll be 3 forever.

Generators are functions that return other functions, and they are specifically tailored to randomizing things. `beat` and most other functions in the track API accept callbacks in addition to numbers. These callbacks will get called every time a note is triggered.

The function `ri(min, max)`, which stands for **r**andom **i**integer, takes a minimum & maximum and returns a function that will generate random numbers within these boundaries. Here's how you use it:

```
var t = new track()
t.beat( ri(1,4) )
```

Each time a note triggers it will make a decision about how long to wait until the next note. Since `beat` accepts multiple arguments, we can use `ri` more than once to set some ongoing guidelines:

```
var t = new track()
t.beat( ri(1,2), ri(3,4), ri(5,6) )
```

The step sequencer will still alternate between the three callbacks, but their values will be random each time!


## Playing Notes with Oscillators

