


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


import { Quark } from "../Core/Quark.js";
import { Rectangle } from "./Rectangle.js";



// 
// function sdkjfgndf(){
// 
//   var ff = [
//       new Rectangle(gl, 4, 4, 12, 8),
//       new Rectangle(gl, 12, -12, 12, 8)
//   ];
// 
// 
//   var box = new Rectangle("box", 500, 140, 20, 20, {r:0,g:0.1,b:0.7,a:1});
//   this.system.sceneGrapth.add(box);
//   window.box = box;
// 
// }

// its 2D!!!! NOT 3D!!!
// But it is 3D!!!
// well that a plane then
// export class Plane extends Quark {
export class Plane extends Rectangle {
  
    cachePositions = [];
    
    

    // this could use some of that fancy {deconstructor} or ... new stuff
    constructor(name, x, y, width, height, color = {r:1.0, g:1.0, b:1.0, a:1.0}) {
      super(name, x, y, width, height, color);
      
      // plane has no origin persay
      // its geometry is offset to handle this by default
      // thus we have to calculate and prebake positions
      this.centerPositions();
    }
    
    centerPositions(){
      
      // counter clockwise
      // top left
      var p0 = {x:0,y:0};
      var p1 = {x:0,y:0};;
      var p2 = {x:0,y:0};;
      var p3 = {x:0,y:0};;
      
      // positions count will be 6 as its two tris
      // but should use a wounding polygon calculation
      // but this is easy to do here fro 4 points
      // this could just be dont with a vector half offset calc
      p0.x = this.x - (this.width / 2);
      p0.y = this.y - (this.height / 2);
      // p0.y += 10;
      
      p1.x = this.x - (this.width / 2);
      p1.y = this.y + (this.height / 2);
      // p1.y += 10;
      
      
      p2.x = this.x + (this.width / 2);
      p2.y = this.y + (this.height / 2);
      
      
      p3.x = this.x + (this.width / 2);
      p3.y = this.y - (this.height / 2);
      
      var positions = this.cachePositions;
      // gurgle
      positions[0] = p0.x; positions[1] = p0.y;
      positions[2] = p1.x; positions[3] = p1.y;
      positions[4] = p2.x; positions[5] = p2.y;
      // tri 2
      positions[6] = p2.x; positions[7] = p2.y;
      positions[8] = p3.x; positions[9] = p3.y;
      positions[10] = p0.x; positions[11] = p0.y;
      
      // positions[6] = p0.x; positions[7] = p0.y;
      // positions[8] = p1.x; positions[9] = p1.y;
      // positions[10] = p2.x; positions[11] = p2.y;
      
    }


    // draws to the buffer
    draw(colorUniformLocation){
      this.gl.uniform4f(colorUniformLocation, this.color.r, this.color.g, this.color.b, 1);
      this.setPlane();
      // this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(this.positions), this.gl.STATIC_DRAW);

    }
    
    positions = [];
    setPlane() {
      // var x1 = x;
      // var x2 = x + width;
      // var y1 = y;
      // var y2 = y + height;
      // 
      // // NOTE: gl.bufferData(gl.ARRAY_BUFFER, ...) will affect
      // // whatever buffer is bound to the `ARRAY_BUFFER` bind point
      // // but so far we only have one buffer. If we had more than one
      // // buffer we'd want to bind that buffer to `ARRAY_BUFFER` first.
      // 
      // // counter clockwise
      // var p0;
      // var p1;
      // var p2;
      // var p3;
      // 
      // var positions = [
      //   x1, y1,
      //   x1, y2,
      //   x2, y2,
      //   x2, y1,
      //   // other tri
      //   x1, y1,
      //   x2, y2
      // ];
      
      this.positions = [];
      
      for (var i = 0; i < this.cachePositions.length; i++) {
        
        // if od its y, otherwise x
        if(i % 2){
          this.positions[i] = this.cachePositions[i] + this.y;
        }
        else {
          this.positions[i] = this.cachePositions[i] + this.x;
        }
      }

      this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(this.positions), this.gl.STATIC_DRAW);
    }

  }
