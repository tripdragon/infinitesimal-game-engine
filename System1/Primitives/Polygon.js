
import { Quark } from "../Primitives/Quark.js";

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
  constructor(name, points = [], x, y, scalar, color = {r:1.0, g:1.0, b:1.0, a:1.0}) {
    
    // need to compute width and height
    var hh = 0;
    var ww = 0;
    super(name, x, y, ww, hh, color = {r:1.0, g:1.0, b:1.0, a:1.0});
    
    this.points = points;
    this.scalar = scalar;
    
    // we know this as two tris
    // DONT KNOW count yet
    // this.pointsCount = 6;
    
  }

  // draws to the buffer
  draw(colorUniformLocation){
    // gl.uniform4f(colorUniformLocation, Math.random(), Math.random(), Math.random(), 1);
    this.gl.uniform4f(colorUniformLocation, this.color.r, this.color.g, this.color.b, 1);
    // setSquareLike(this.gl, this.x, this.y, this.width, this.height);
    // console.log(this.x);
    // setPolygon(this.gl, this.x, this.y, this.scalar, this.points);
    this.setPolygon();
    
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
  
  
  
  
  positions = [];

  setPolygon() {
    var points = this.points;
    
    // console.log("x", x);
    // var x1 = x;
    // var x2 = x + width;
    // var y1 = y;
    // var y2 = y + height;
    
    // this does not account for the center yet
    // every other od even x y
    // num % 2; 
    // need some matrix magic here for scaling
    this.positions = [];
    // for now its scaling the points from the center????
    // would want to move that to the matrix and origin
    for (var i = 0; i < this.points.length; i++) {
      var og = this.points[i] * this.scalar;
      // var og = points[i];
      if (i % 2) {
        og += this.y;
      }
      else {
        // console.log(x);
        og += this.x;
        // console.log("og", og);
      }
      // og *= scalar;
      this.positions.push(og);
    }
    
    // estimated guess!!!!!
    // need an actual box3 function
    // console.log("this.positions[0]", this.positions[0], this.x);
    // console.log("this.positions[4]", this.positions[4], this.x);
    // this.width = (this.positions[0] - this.x) + (this.positions[4] - this.x);
    // this.height = (this.positions[1] - this.y) + (this.positions[5] - this.y);
    
    

    // NOTE: gl.bufferData(gl.ARRAY_BUFFER, ...) will affect
    // whatever buffer is bound to the `ARRAY_BUFFER` bind point
    // but so far we only have one buffer. If we had more than one
    // buffer we'd want to bind that buffer to `ARRAY_BUFFER` first.


    this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(this.positions), this.gl.STATIC_DRAW);
  }
  
}

// function demo(gl){
//   setRectangle(gl, randomBetween(-4,4), 8, 12, 8)
//   foooof = [
//     new SquareLike(gl, )
//   ];
// }
