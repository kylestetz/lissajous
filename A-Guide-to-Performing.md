# A Guide to Performing

## Numbers

Lissajous is all about numbers. There are only a few number ranges you need to commit to memory.

- *Timing*: things involving time are expressed in 1/16th notes (or 1/32nd notes if you choose).

```javascript
var t = new track()
t.beat(1)       // play a note every 1/16th note
t.beat32(1)     // play a note every 1/32nd note
t.nl(2)         // set the note length to 2/16ths
t.adsr(1,0,1,1) // attack decay and release are 1/16th notes
```

- *Notes*: the `notes` function and related tools (`trans` as well as `root` for samples) are expressed in MIDI notes from 0 - 127 where `21` is `A0` and `108` is `C8`. "Middle C" (`C4`) is `60` and `A4`– the default note for new tracks and the default root note for sample modulation– is `69`.

```javascript
var t = new track()
t.beat(2).notes(60)              // play Middle C every 1/8th note
t.notes(60,62,64,65,67,69,71,72) // Major scale from C4 to C5
```

- *Sample Clamping*: