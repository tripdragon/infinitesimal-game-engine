
import { Quark } from "../Core/Quark.js";



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
      new Rectangle(gl, 4, 4, 12, 8),
      new Rectangle(gl, 12, -12, 12, 8)
  ];

}

export class Rectangle extends Quark {


  scalar = 1;
  mHeight;
  mWidth;
  setScaletemp(val){
    this.scalar = val;
    this.width = this.mWidth * this.scalar;
    this.height = this.scalar * this.mHeight;
    
  }

  // this could use some of that fancy {deconstructor} or ... new stuff
  constructor(name, x, y, width, height, color = {x:1.0, y:1.0, z:1.0, w:1.0}) {
    // console.log("color", color);
    super(name, x, y, width, height, 0, color);
    
    // we know this as two tris
    this.pointsCount = 6;
    this.mHeight = height;
    this.mWidth = width;
  }

  // draws to the buffer
  draw(colorUniformLocation){
    // gl.uniform4f(colorUniformLocation, Math.random(), Math.random(), Math.random(), 1);
    this.gl.uniform4f(colorUniformLocation, this.color.x, this.color.y, this.color.z, 1);
    setRectangle(this.gl, this.x, this.y, this.width, this.height);
  }

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

export function setRectangle(gl, x, y, width, height) {
  var x1 = x;
  var x2 = x + width;
  var y1 = y;
  var y2 = y + height;

  // NOTE: gl.bufferData(gl.ARRAY_BUFFER, ...) will affect
  // whatever buffer is bound to the `ARRAY_BUFFER` bind point
  // but so far we only have one buffer. If we had more than one
  // buffer we'd want to bind that buffer to `ARRAY_BUFFER` first.

  var positions = [
    x1, y1,
    x1, y2,
    x2, y2,
    x2, y1,
    // other tri
    x1, y1,
    x2, y2
  ];

  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);
}
