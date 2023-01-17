
import { Quark } from "../Core/Quark.js";

// import { randomBetween } from "../Modules/mathness.js";
// import { setRectangle } from "../Modules/setRectangle.js";


// Fill the buffer with the values that define a rectangle.
// export function setRectangle(gl, x, y, width, height) {
//   var x1 = x;
//   var x2 = x + width;
//   var y1 = y;
//   var y2 = y + height;
//   gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
//      x1, y1,
//      x2, y1,
//      x1, y2,
//      x1, y2,
//      x2, y1,
//      x2, y2,
//   ]), gl.STATIC_DRAW);
// }


// function sdkjfgndf(){
// 
//   var ff = [
//       new SquareLike(gl, 4, 4, 12, 8),
//       new SquareLike(gl, 12, -12, 12, 8)
//   ];
// 
// }

export class Polygon extends Quark {

  scalar;
  points = [];

  // this could use some of that fancy {deconstructor} or ... new stuff
  //constructor(gl, points = [], x, y, scalar, color = {x:1.0, y:1.0, z:1.0, w:1.0}) {
  constructor(name, points = [], x, y, scalar, color = {x:1.0, y:1.0, z:1.0, w:1.0}) {
    
    // need to compute width and height
    var hh = 0;
    var ww = 0;
    super(name, x, y, ww, hh, color = {x:1.0, y:1.0, z:1.0, w:1.0});
    
    this.points = points;
    this.scalar = scalar;
    
    // we know this as two tris
    // DONT KNOW count yet
    // this.pointsCount = 6;
    
  }

  // draws to the buffer
  draw(colorUniformLocation){
    // gl.uniform4f(colorUniformLocation, Math.random(), Math.random(), Math.random(), 1);
    this.gl.uniform4f(colorUniformLocation, this.color.x, this.color.y, this.color.z, 1);
    // setSquareLike(this.gl, this.x, this.y, this.width, this.height);
    // console.log(this.x);
    setPolygon(this.gl, this.x, this.y, this.scalar, this.points);
  }

  /*
  https://stackoverflow.com/questions/939326/execute-javascript-code-stored-as-a-string
  aa = `return {rr : 4}`;
  var gg = new Function(aa);
  ww = gg()
  ww.rr => 4


  // this works but its noisy
  a = { rr: 4 }

  mm = `return { ff : (obj) => {
console.log("foof");
console.log(obj);
obj.rr = 45436;
}}`;

gg = new Function(mm);
gg().ff(a)

  */
  play(colorUniformLocation){

    if(this.playCodeDecompressed === null){

      this.playCodeDecompressed = new Function(this.playCode);

    }
    
    if( this.playCodeDecompressed().hasOwnProperty("do") ){
      // 2nd arg is helper {} , temp solution to get mth functions into sandbox
      this.playCodeDecompressed().do(this, {randomBetween : randomBetween});
    }
    // var gg = this.playCodeDecompressed;
    //setSquareLike(this.gl, gg.x, gg.y, gg.width, gg.height);
    this.draw(colorUniformLocation);
  }
}

// function demo(gl){
//   setRectangle(gl, randomBetween(-4,4), 8, 12, 8)
//   foooof = [
//     new SquareLike(gl, )
//   ];
// }

var positions = [];

function setPolygon(gl, x, y, scalar, points) {
  // console.log("x", x);
  // var x1 = x;
  // var x2 = x + width;
  // var y1 = y;
  // var y2 = y + height;
  
  // this does not account for the center yet
  // every other od even x y
  // num % 2; 
  // need some matrix magic here for scaling
  positions = [];
  // for now its scaling the points from the center????
  // would want to move that to the matrix and origin
  for (var i = 0; i < points.length; i++) {
    var og = points[i] * scalar;
    // var og = points[i];
    if (i % 2) {
      og += y;
    }
    else {
      // console.log(x);
      og += x;
      // console.log("og", og);
    }
    // og *= scalar;
    positions.push(og);
  }

  // NOTE: gl.bufferData(gl.ARRAY_BUFFER, ...) will affect
  // whatever buffer is bound to the `ARRAY_BUFFER` bind point
  // but so far we only have one buffer. If we had more than one
  // buffer we'd want to bind that buffer to `ARRAY_BUFFER` first.


  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);
}
