

export function randomBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}


// Returns a random integer from 0 to range - 1.
export function randomInt(range) {
  return Math.floor(Math.random() * range);
}


export function isOdd(num) { return num % 2; }
