
import { Quark } from "../Core/Quark.js";

import { randomBetween } from "../Modules/mathness.js";
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


function sdkjfgndf(){

  var ff = [
      new SquareLike(gl, 4, 4, 12, 8),
      new SquareLike(gl, 12, -12, 12, 8)
  ];

}

export class SquareLike extends Quark {

  // this could use some of that fancy {deconstructor} or ... new stuff
  constructor(name, x, y, width, height, color = {r:1.0, g:1.0, b:1.0, a:1.0}) {
    super(name, x, y, width, height, 0, color = {r:1.0, g:1.0, b:1.0, a:1.0});
    
    // we know this as two tris
    this.pointsCount = 6;
    
  }

  // draws to the buffer
  draw(colorUniformLocation){
    // gl.uniform4f(colorUniformLocation, Math.random(), Math.random(), Math.random(), 1);
    this.gl.uniform4f(colorUniformLocation, this.color.r, this.color.g, this.color.b, 1);
    setSquareLike(this.gl, this.x, this.y, this.width, this.height);
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

      // this.playCode = `return {
      //   x: randomBetween(-4,4),
      //   y: this.y,
      //   width: this.width,
      //   height: this.height
      // }`;
      // this.playCode = `return { do : function(obj, helpers){
      // 
      //   obj.x = helpers.randomBetween(-4,4);
      //   obj.color.x = Math.random();
      //   obj.color.y = Math.random();
      //   obj.color.z = Math.random();
      // 
      // }}`;
// debugger
      this.playCodeDecompressed = new Function(this.playCode);
      // debugger
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

export function setSquareLike(gl, x, y, width, height) {
  var x1 = x;
  var x2 = x + width;
  var y1 = y;
  var y2 = y + height;

  // NOTE: gl.bufferData(gl.ARRAY_BUFFER, ...) will affect
  // whatever buffer is bound to the `ARRAY_BUFFER` bind point
  // but so far we only have one buffer. If we had more than one
  // buffer we'd want to bind that buffer to `ARRAY_BUFFER` first.

  var positions = [
    x1 + 2, y1,
    x1, y2 + 2,
    x2 + 4, y2,
    x2 + 2, y1,
    // other tri
    x1 + 2, y1,
    x2 + 4, y2
  ];

  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);
}
