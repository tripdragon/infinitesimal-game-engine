





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




export function generateToneFromNote(note, octave, type, stop = 0.2, start = 0){
  var bb = SemitoneDistances[note];
  if(bb){
    generateTone(calcFrequency(note, octave), type, stop, start);
  }
}

export function generateTone(frequency, type, stop = 0, start = 0 ){
  window.AudioContext = window.AudioContext || window.webkitAudioContext;
  var ctx = new AudioContext();
  var oo = ctx.createOscillator();
  // values are "sine", "square", "sawtooth", "triangle" and "custom". The default is "sine".
  oo.type = type;
  // var octaveScalar = 1;
  // oo.frequency.value = _frequency + octaveScalar;
  // oo.frequency.value = frequency + scalarFrequency;
  
  oo.frequency.value = frequency;
  
  // var now = ctx.currentTime;
  // oo.frequency.setValueAtTime(frequency + scalarFrequency, now+0.5);
  // oo.frequency.setValueAtTime(frequency + 1000, now+0.5);
  
  // console.log("oo.frequency.value", oo.frequency.value);
  //console.log("octaveScalar", octaveScalar);
      oo.start(start);
      oo.connect(ctx.destination);
      
      oo.stop(stop+start);
  
      //         const real = new Float32Array(2);
      // const imag = new Float32Array(2);
      // // const ac = new AudioContext();
      // // const osc = ac.createOscillator();
      // 
      // real[0] = 2;
      // imag[0] = 0;
      // real[1] = 1;
      // imag[1] = 4;
      // real[2] = 2;
      // imag[2] = 8;
      // real[3] = 1;
      // imag[3] = 2;
      // 
      // const wave = ctx.createPeriodicWave(real, imag, { disableNormalization: true });
      // 
      // oo.setPeriodicWave(wave);

      // oo.start(0);
      // oo.connect(ctx.destination);
        
      // var now = ctx.currentTime;
      // // Frequency in Hz.
      // // Set initial value. (you can use .value=freq if you want)
      // oo.frequency.setValueAtTime(frequency, now);
      // // set a "checkpoint" in 3 seconds - that will be the starting point of the ramp.
      // oo.frequency.setValueAtTime(frequency + scalarFrequency, now+3);
      // // set a ramp to freq+100Hz over the next 4 seconds.
      // oo.frequency.linearRampToValueAtTime(frequency+100 + scalarFrequency,now+7)
      // oo.connect(ctx.destination); 
      // oo.start(now);
      // var duration = 2;
      // oo.stop(now + duration);
      // 
  return oo;
}
