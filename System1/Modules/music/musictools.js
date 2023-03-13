





// https://codepen.io/sophiekoonin/pen/JjEJowB
export const SemitoneDistances = {
  C: -9,
  "C#": -8, "D♭": -8,
  D: -7,
  "D#": -6, "E♭": -6,
  E: -5,
  F: -4,
  "F#": -3, "G♭": -3,
  G: -2,
  "G#": -1, "A♭": -1,
  A: 0,
  "A#": 1, "B♭": 1,
  B: 2
};

// copy from above in order
export const SemitoneDistancesArray = [
  // -9,
  // -8, //"D♭": -8,
  // -7,
  // -6, //"E♭": -6,
  // -5,
  // -4,
  // -3, //"G♭": -3,
  // -2,
  // -1, //"A♭": -1,
  // 0,
  // 1, //"B♭": 1,
  // 2
  "C",
  "C#",
  "D",
  "D#",
  "E",
  "F",
  "F#",
  "G",
  "G#",
  "A",
  "A#",
  "B"
];


// The equation to calculate frequency is 𝑓 = 440Hz × 2𝑛/12, 
// where 𝑛 is the number of semitones between A4 and the input note.
// https://codepen.io/sophiekoonin/pen/JjEJowB
export function calcFrequency(note, octave) {
  const distanceFromA = SemitoneDistances[note];
  // Get the number of steps between the notes
  const steps = (octave - 4) * 12 + distanceFromA;

  const powResult = Math.pow(2, steps / 12);

  // f = 440Hz * 2^n/12.2
  const freq = 440 * powResult;

  // round to 1 d.p.
  return Math.round(freq * 10) / 10;
}
