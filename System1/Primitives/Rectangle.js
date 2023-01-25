


/*
var border1 = new Rectangle("wall", 400, 400, 200, 50, {x:0,y:0.5,z:0,w:0});
this.system.sceneGrapth.add(border1);
border1.onCollide = function(){
  console.log("wap!", border1.name);
  // soundboard1.play();
  var ss = new Audio("./Discs/Soundeffects/bleep-audiomass-output.wav");
  ss.play();
}

*/


import { Quark } from "../Primitives/Quark.js";



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
  
  
  var box = new Rectangle("box", 500, 140, 20, 20, {r:0,g:0.1,b:0.7,a:1});
  this.system.sceneGrapth.add(box);
  window.box = box;

}

// its 2D!!!! NOT 3D!!!
// But it is 3D!!!
// well that a plane then
export class Rectangle extends Quark {


  scalar = 1;
  // mHeight;
  // mWidth;
  
  setScaletemp(val){
    this.scalar = val;
    this.width = this.mWidth * this.scalar;
    this.height = this.scalar * this.mHeight;
  }
  
  onCollide(){
    // console.log("wap!", this.name);
  }

  // this could use some of that fancy {deconstructor} or ... new stuff
  constructor(name, x, y, width, height, color = {r:1.0, g:1.0, b:1.0, a:1.0}) {
    // console.log("color", color);
    super(name, x, y, width, height, 0, color);
    
    // we know this as two tris
    this.pointsCount = 6;
    this.mHeight = height;
    this.mWidth = width;
    
    // originCompute() is called in Quark
    // but we need the origin in the center thinking in 3d form
    // but if its 0,0,0 then whats it for???
    // thus its position
    // // this just puts the origin at the center but does not move the geometry
    // // which means the origin is at top left
    // // hrrrmmmmm
    // // for a box in 3D its expected at center for transforms
    // // and maybe bottom for a character
    // // but a charecter its more likely a parent peeps sit
    // // you can draw its offset in GL
    // // but what is position then????
    // this.originCompute(this.width, this.height, 0);
    // var center = {
    //   x:this.width/2,
    //   y: this.width/2,
    //   z: this.depth/2
    // }
    
  }


  // draws to the buffer
  draw(colorUniformLocation){
    // debugger
    // gl.uniform4f(colorUniformLocation, Math.random(), Math.random(), Math.random(), 1);
    this.gl.uniform4f(colorUniformLocation, this.color.r, this.color.g, this.color.b, 1);
    setRectangle(this.gl, this.x, this.y, this.width, this.height);
  }

  play(colorUniformLocation){

    if(this.playCodeDecompressed === null){

      this.playCodeDecompressed = new Function(this.playCode);
      
    }
    
    if( this.playCodeDecompressed().hasOwnProperty("do") ){
      // 2nd arg is helper {} , temp solution to get mth functions into sandbox
      this.playCodeDecompressed().do(this, this.playHelpers);
      // this.playCodeDecompressed().do(this, {randomBetween : randomBetween});
    }
    // var gg = this.playCodeDecompressed;
    //setSquareLike(this.gl, gg.x, gg.y, gg.width, gg.height);
    this.draw(colorUniformLocation);
  }
  
  // quark already has it
  // originCompute(){
  //   this.origin.x = this.width/2;
  //   this.origin.y = this.height/2;
  //   this.origin.z = this.depth/2;
  // }
  
  clone(){

    var rr = new Rectangle(this.name, this.x, this.y, this.width, this.height, this.color);
    // these belong in a super() but how?
    // this.tacos = "narfs";
    // super.clone();
    this.copyTo(rr);
    rr.scalar = this.scalar;
    rr.mHeight = this.mHeight;
    rr.mWidth = this.mWidth;
  

    console.log("clone needs more for Rectangle");
    return rr;
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
