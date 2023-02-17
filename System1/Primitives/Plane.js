


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

import { Matrix4 } from "../Modules/GL-Matrix.js";

import { Quark } from "../Primitives/Quark.js";
import { Rectangle } from "./Rectangle.js";
import { Vector3 } from "../Modules/Vector3.js";
import { Color } from "../Modules/Color.js";


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
// This should extend polygon instead
// export class Plane extends Rectangle {
export class Plane extends Quark {
  // 
  // setScaletemp(val){
  //   this.scalar = val;
  //   this.width = this.mWidth * this.scalar;
  //   this.height = this.scalar * this.mHeight;
  // }
  
    // hasSetPlane = false;
    
    positions = [];
  
    // cachePositions = [];
    // counter clockwise
    // +0   +3
    // +1   +2
    // the points of the geometry not the buffer positions
    // buffer has 6 points has 4
    points = [new Vector3(),new Vector3(),new Vector3(),new Vector3()];
    
    u_matrix = new Matrix4().setTranslation(0,0,0);
    // ? not sure yet
    // mvpMatrix
    translationMatrix = new Matrix4().setTranslation(0,0,0);
    
    // this should be the world coords acording to AABB
    // and since evertything effectly moves this has to be calculated always
    // so at a cost we need to compute!!
    get min(){
      return this.boundingBox.min;
    }
    get max(){
      return this.boundingBox.max;
    }
    
    intersects3D(plane){
      return this.boundingBox.AABBTest3D(plane);
    }
    intersectsScreenSpace(plane){
      return this.boundingBox.AABBTestScreenSpace(plane);
    }
    intersectsScreenSpaceWithPadding(plane){
      return this.boundingBoxPadding.AABBTestScreenSpace(plane);
    }

    // this could use some of that fancy {deconstructor} or ... new stuff
    // Missing Z
    // gonna have to fix for ALL
    // Derp
    constructor(name, x, y, z, width, height, color, system) {
      super(name, x, y, z, width, height, 0, color, system);

      
      this.system = system;
      // debugger
      this.pointsCount = 6;
      this.mHeight = height;
      this.mWidth = width;
      
      // plane has no origin persay
      // its geometry is offset to handle this by default
      // thus we have to calculate and prebake positions
      this.centerPositions();
      this.computeBoundingBox();
      this.computeBoundingBoxPadding();
      
      // this.setRectangle(this.gl, this.x, this.y, this.width, this.height);

    }
    
    // 
    // setRectangle(gl, x, y, width, height) {
    //   var x1 = x;
    //   var x2 = x + width;
    //   var y1 = y;
    //   var y2 = y + height;
    // 
    //   // NOTE: gl.bufferData(gl.ARRAY_BUFFER, ...) will affect
    //   // whatever buffer is bound to the `ARRAY_BUFFER` bind point
    //   // but so far we only have one buffer. If we had more than one
    //   // buffer we'd want to bind that buffer to `ARRAY_BUFFER` first.
    // 
    //   var positions = [
    //     x1, y1,
    //     x1, y2,
    //     x2, y2,
    //     x2, y1,
    //     // other tri
    //     x1, y1,
    //     x2, y2
    //   ];
    // 
    //   gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);
    // }

    
    
    centerPositions(){
      
      // positions count will be 6 as its two tris
      // but should use a wounding polygon calculation
      // but this is easy to do here fro 4 points
      // this could just be dont with a vector half offset calc
      
      // counter clockwise
      // top left
      
      
      // this should just be a transform and apply
      var points = this.points;
      
      points[0].x = -this.width / 2;
      points[0].y = -this.height / 2;
      
      points[1].x = -this.width / 2;
      points[1].y = this.height / 2;
      
      
      points[2].x = this.width / 2;
      points[2].y = this.height / 2;
      
      
      points[3].x = this.width / 2;
      points[3].y = -this.height / 2;
      
      
      // var positions = this.cachePositions;
      var positions = this.positions;
      
      // gurgle
      // positions[0] = points[0].x; positions[1] = points[0].y;
      // positions[2] = points[1].x; positions[3] = points[1].y;
      // positions[4] = points[2].x; positions[5] = points[2].y;
      // // tri 2
      // positions[6] = points[2].x; positions[7] = points[2].y;
      // positions[8] = points[3].x; positions[9] = points[3].y;
      // positions[10] = points[0].x; positions[11] = points[0].y;
      // 
      // need Z now
      positions[0] = points[0].x; positions[1] = points[0].y; positions[2] = 0;
      positions[3] = points[1].x; positions[4] = points[1].y; positions[5] = 0;
      positions[6] = points[2].x; positions[7] = points[2].y; positions[8] = 0;
      // tri 2
      positions[9] = points[2].x; positions[10] = points[2].y; positions[11] = 0;
      positions[12] = points[3].x; positions[13] = points[3].y; positions[14] = 0;
      positions[15] = points[0].x; positions[16] = points[0].y; positions[17] = 0;
      
      
    }



    
    clone(){

      var rr = new this.constructor().copy(this);
      
      return rr;
    }
    
    copy(thing){
      super.copy(thing);
      
      // this.cachePositions = thing.cachePositions.slice();
      this.positions = thing.positions.slice();
      
      
      return this;
    }
    


    // 
    // // draws to the buffer
    // draw(colorUniformLocation, matrixLocation){
    // 
    //   // update()
    //   // checks to todate the matrix
    //   // but it might belong here
    // 
    // 
    // 
    //   // this performs the matrix updates for now
    //   // this one applys the position translation
    //   // this.u_matrix.setTranslation(0,0,0);
    // 
    //   // this is most likely not the right way to do this, but its working for now
    //   // this.u_matrix.identity().multiply(this.system.projectionMatrix);
    // 
    //             // // this.u_matrix.copy(this.system.projectionMatrix);
    //             // this.localMatrix.copy(this.system.projectionMatrix);
    //             // // 
    //             // 
    //             // this.localMatrix.translate(this.position.x,this.position.y,this.position.z);
    //             // 
    //             // // this.u_matrix.setTranslation(this.position.x,this.position.y,this.position.z);
    //             // // this.translationMatrix.setTranslation(this.position.x,this.position.y,this.position.z);
    //             // // this.u_matrix.multiply(this.translationMatrix);
    //             // 
    // 
    //   this.gl.uniform4f(colorUniformLocation, this.color.r, this.color.g, this.color.b, 1);      
    //   // this.gl.uniformMatrix4fv(matrixLocation, false, this.u_matrix.elements);
    //   // this.gl.uniformMatrix4fv(matrixLocation, false, this.localMatrix.elements);
    // 
    // 
    // 
    // 
    //   // this.gl.uniformMatrix4fv(matrixLocation, false, this.worldMatrix.elements);
    // 
    // 
    //   // this.gl.uniformMatrix4fv(matrixLocation, false, this.workMartix.multiplyMatrices(this.system.projectionMatrix, this.worldMatrix).elements);
    // 
    //   this.gl.uniformMatrix4fv(matrixLocation, false, this.worldMatrix.elements);
    // 
    //   // this.gl.uniformMatrix4fv(matrixLocation, false, this.worldMatrix.multiply(this.system.projectionMatrix).elements);
    // 
    //   // this.gl.uniformMatrix4fv(matrixLocation, false, this.translationMatrix.elements);
    // 
    // 
    // 
    // 
    // 
    //   // this.u_matrix.setTranslation(this.position.x,this.position.y,this.position.z);
    //   // this.u_matrix.setTranslation(0,0,0);
    //   // this needs to be converted to matrixes
    //   // this.setPlane();
    //   // this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(this.positions), this.gl.STATIC_DRAW);
    // 
    //   // if( !this.hasSetPlane ){
    //   //   // this.setPlane();
    //   //   this.hasSetPlane = true;
    //   // }
    //   // else {
    //   // }
    // 
    // 
    //   this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(this.positions), this.gl.STATIC_DRAW);
    // 
    // }
    
    // workMatrix = new Matrix4();
    // 
    // updateWorldMatrix(parentWorldMatrix){
    //   if(parentWorldMatrix){
    //     // force updates the world Matrix
    // 
    //     console.log("parentWorldMatrix",parentWorldMatrix.getPosition());
    //     // debugger
    //     console.log("name", this.name);
    //     this.worldMatrix.narf = "narf111";
    //     this.worldMatrix.multiplyMatrices(parentWorldMatrix, this.localMatrix);
    //     // debugger
    //     console.log("this.worldMatrix", this.worldMatrix.getPosition());
    // 
    //     // this.worldMatrix.multiplyMatrices(this.localMatrix, parentWorldMatrix);
    //     // console.log(this.localMatrix.elements, parentWorldMatrix.elements);
    //     // this.worldMatrix.multiplyMatrices( parentWorldMatrix, this.localMatrix);
    //   }
    //   else {
    //     // debugger
    //     this.worldMatrix.copy(this.localMatrix);
    //   }
    // 
    //   // recussion updates chain
    //   // now process all the children
    // 
    //   var worldMatrix = this.worldMatrix;
    //   if(this.friends.length > 0){
    //     this.friends.forEach(function(item) {
    //       item.updateWorldMatrix(worldMatrix);
    //     });
    //   }
    //   if(this.name !== "world"){
    //     // debugger
    //   }
    // }
    // 
    
    // updateWorldMatrix(){
    //   super.updateWorldMatrix();
    //   console.log("updateWorldMatrix 2222", this.worldMatrix.getPosition());
    // }
    draw(colorUniformLocation, matrixLocation){
      // debugger
      // super.draw(colorUniformLocation, matrixLocation);
      this.gl.uniform4f(colorUniformLocation, this.color.r, this.color.g, this.color.b, 1);
      
      // this.gl.uniformMatrix4fv(matrixLocation, false, this.worldMatrix.elements);
      
      // this.localMatrix.setTranslation(this.position.x,this.position.y,this.position.z);


      // MAYBE handle the projection here
      // its building but not moving
      // debugger
      // console.log("draw world", this.worldMatrix.getPosition());
      // console.log("draw local", this.localMatrix.getPosition());
      // console.log("draw name", this.name);
      // debugger
      this.gl.uniformMatrix4fv(matrixLocation, false, this.workMatrix.multiplyMatrices( this.system.projectionMatrix, this.worldMatrix).elements);
      // this.gl.uniformMatrix4fv(matrixLocation, false, this.workMatrix.multiplyMatrices( this.worldMatrix, this.system.projectionMatrix).elements);
      
      // debugger
      // this.gl.uniformMatrix4fv(matrixLocation, false,  this.worldMatrix.elements);
      // this.gl.uniformMatrix4fv(matrixLocation, false,  this.worldMatrix.elements);
      // this.gl.uniformMatrix4fv(matrixLocation, false,  this.localMatrix.elements);

      this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(this.positions), this.gl.STATIC_DRAW);
    }
    
    
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
      
      // this.positions = [];
      // 
      // for (var i = 0; i < this.cachePositions.length; i++) {
      // 
      //   // this does not work for z
      //   // if od its y, otherwise x
      //   if(i % 2){
      //     this.positions[i] = this.cachePositions[i] + this.y;
      //   }
      //   else {
      //     this.positions[i] = this.cachePositions[i] + this.x;
      //   }
      // }
      
      

      // this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(this.positions), this.gl.STATIC_DRAW);
    }

  }
