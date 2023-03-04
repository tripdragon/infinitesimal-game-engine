

// https://github.com/mrdoob/three.js/blob/master/src/math/MathUtils.js
// https://en.wikipedia.org/wiki/Linear_interpolation
export function lerp( x, y, t ) {

	return ( 1 - t ) * x + t * y;

}

export function clamp(val, min, max) {
  return Math.max(min, Math.min(val, max));
}

export function randomBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export function random1orNeg(){
  return Math.random() < 0.5 ? -1 : 1;
}

// var PI = Math.PI;
// https://stackoverflow.com/questions/8798771/perlin-noise-for-1d
// not simplex nor perlin
export function simpleNoise(x){
  return Math.sin (2 * x) + Math.sin(Math.PI * x);
}


// Returns a random integer from 0 to range - 1.
export function randomInt(range) {
  return Math.floor(Math.random() * range);
}


export function isOdd(num) { return num % 2; }

export function remapRange(from0, to0, from1, to1, value) {
    return from1 + (to1 - from1) * (value - from0) / (to0 - from0);
}

export function remapNormal(from0, to0, value) {
    return remapRange(from0, to0, 0, 1, value);
}

export function remapNegPositiveOne(from0, to0, value) {
    return remapRange(from0, to0, -1, 1, value);
}


export function isPowerOf2(value) {
  return (value & (value - 1)) === 0;
}
