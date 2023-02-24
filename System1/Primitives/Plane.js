


/*
var box = new Plane("boxlike", 400, 400, 0, 10, 10, {r:0,g:0.5,b:1,a:1}, this.system);
this.system.add(box);

box.onCollide = function(){
  console.log("wap!", box.name);
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

// cant use this in this class cause it extends it
// import { VisualPlane } from "./VisualPlane.js";



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
    
    visualPoints = {
      // top left count clockwise
      // cant use visual plane cause it extends it
      // new VisualPlane("c", 0, 0, 0, 10, 10, {r:1,g:1,b:1,a:1}),
      corners : [],
      // left counter clockwise
      sides : []
    }
    
    // cant use visual plane cause it extends it
    // so have to just make an internal version
    mockVisualPlane(){
      var item = new Plane("c", 0, 0, 0, 10, 10, {r:1,g:1,b:1,a:1}, this.system);
      item.canCollide = false;
      item.subType = "visualPlane";
      return item;
    }
  
    // cachePositions = [];
    // counter clockwise
    // +0   +3
    // +1   +2
    // the points of the geometry not the buffer positions
    // buffer has 6 points has 4
    points = [new Vector3(),new Vector3(),new Vector3(),new Vector3()];
    // two of each pointing to points array
    sides = {
      left : [this.points[0], this.points[1]],
      bottom : [this.points[1], this.points[2]],
      right : [this.points[2], this.points[3]],
      top : [this.points[3], this.points[0]]
    }
    
    recomputeSides(){
      this.sides = {
        left : [this.points[0], this.points[1]],
        bottom : [this.points[1], this.points[2]],
        right : [this.points[2], this.points[3]],
        top : [this.points[3], this.points[0]]
      }
    }
    
    // are thse caches??? 
    // u_matrix = new Matrix4().setTranslation(0,0,0);
    // ? not sure yet
    // mvpMatrix
    // translationMatrix = new Matrix4().setTranslation(0,0,0);
    
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

      this.pointsCount = 6;
      this.mHeight = height;
      this.mWidth = width;
      
      this.recomputeSides();
      
      // plane has no origin persay
      // its geometry is offset to handle this by default
      // thus we have to calculate and prebake positions
      this.centerPositions();
      this.computeBoundingBox();
      this.computeBoundingBoxPadding();

    }
    

    
    centerPositions(){
      
      // positions count will be 6 as its two tris
      // but should use a wounding polygon calculation
      // but this is easy to do here fro 4 points
      // this could just be dont with a vector half offset calc
      
      // counter clockwise
      // starts at top left
      
      
      // this should just be a transform and apply
      // in local space
      var points = this.points;
      
      // points[0].x = -this.width / 2;
      // points[0].y = -this.height / 2;
      // 
      // points[1].x = -this.width / 2;
      // points[1].y = this.height / 2;
      // 
      // 
      // points[2].x = this.width / 2;
      // points[2].y = this.height / 2;
      // 
      // 
      // points[3].x = this.width / 2;
      // points[3].y = -this.height / 2;
      
      /*
      test pointerMovingrecent.points[0].y += 20
      recent.points[0].x += 20
      recent.rebuildDimensions()

      recent.points[1].y += 20
      recent.points[1].x += 20
      recent.rebuildDimensions() 

      recent.points[2].y += 20
      recent.points[2].x += 20
      recent.rebuildDimensions() 

      recent.points[3].y += 20
      recent.points[3].x += 20
      recent.rebuildDimensions() 
      */
      
      points[0].x = -this.width / 2;
      points[0].y = this.height / 2;
      
      points[1].x = -this.width / 2;
      points[1].y = -this.height / 2;
      
      
      points[2].x = this.width / 2;
      points[2].y = -this.height / 2;
      
      
      points[3].x = this.width / 2;
      points[3].y = this.height / 2;
      
      // debugger
      this.updatePositions();

      
    }


    updatePositions(){
      var positions = this.positions;
      var points = this.points;
      // gurgle
      
      positions[0] = points[0].x; positions[1] = points[0].y; positions[2] = 0;
      positions[3] = points[1].x; positions[4] = points[1].y; positions[5] = 0;
      positions[6] = points[2].x; positions[7] = points[2].y; positions[8] = 0;
      // tri 2
      positions[9] = points[2].x; positions[10] = points[2].y; positions[11] = 0;
      positions[12] = points[3].x; positions[13] = points[3].y; positions[14] = 0;
      positions[15] = points[0].x; positions[16] = points[0].y; positions[17] = 0;
      
    }


    // we need to change some vertices er the width height
    // either some kinda grid or multiple
    // in reguards to the position, if its already dropped on a snap
    // we dont want the position to change
    // so now we wonder if it shoudl have an origin
    // sa~~~
    
    addSideScalar(scalar, side){
      // debugger
      if(side === "left"){
        this.sides.left[0].x += -scalar;
        this.sides.left[1].x += -scalar;
      }
      else if(side === "bottom"){
        this.sides.bottom[0].y += -scalar;
        this.sides.bottom[1].y += -scalar;
      }
      else if(side === "right"){
        this.sides.right[0].x += scalar;
        this.sides.right[1].x += scalar;
      }
      else if(side === "top"){
        this.sides.top[0].y += scalar;
        this.sides.top[1].y += scalar;
      }
      
      this.rebuildDimensions();
      
    }
    
    
    rebuildDimensions(){
      this.width = this.sides.right[0].x - this.sides.left[0].x;
      this.height = this.sides.top[0].y - this.sides.bottom[0].y;
      
      this.computeBoundingBox();
      this.computeBoundingBoxPadding();
      
      this.updatePositions();
    }
    
    

    
    clone(){
      // constructor(name, x, y, z, width, height, color, system)
      var rr = new this.constructor(this.name, this.x, this.y, this.z, this.width, this.height, this.color.clone(), this.system).copy(this);
      
      return rr;
    }
    
    copy(thing){
      super.copy(thing);

      this.positions = thing.positions.slice();
      this.points = [];
      for (var i = 0; i < thing.points.length; i++) {
        this.points[i] = thing.points[i].clone();
      }
      this.recomputeSides();
      
      
      return this;
    }

    draw(colorUniformLocation, matrixLocation){
      
      this.gl.uniform4f(colorUniformLocation, this.color.r, this.color.g, this.color.b, 1);
      
      // this.gl.uniformMatrix4fv(matrixLocation, false, this.worldMatrix.elements);
      
      // this.localMatrix.setTranslation(this.position.x,this.position.y,this.position.z);


      // MAYBE handle the projection here
      // its building but not moving
      
      // console.log("draw world", this.worldMatrix.getPosition());
      // console.log("draw local", this.localMatrix.getPosition());
      // console.log("draw name", this.name);
      
      this.gl.uniformMatrix4fv(matrixLocation, false, this.workMatrix.multiplyMatrices( this.system.projectionMatrix, this.worldMatrix).elements);
      // this.gl.uniformMatrix4fv(matrixLocation, false, this.workMatrix.multiplyMatrices( this.worldMatrix, this.system.projectionMatrix).elements);
      
      // debugger
      // this.gl.uniformMatrix4fv(matrixLocation, false,  this.worldMatrix.elements);
      // this.gl.uniformMatrix4fv(matrixLocation, false,  this.worldMatrix.elements);
      // this.gl.uniformMatrix4fv(matrixLocation, false,  this.localMatrix.elements);

      this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(this.positions), this.gl.STATIC_DRAW);
    }
    
    
    // setPlane() {
    //   // var x1 = x;
    //   // var x2 = x + width;
    //   // var y1 = y;
    //   // var y2 = y + height;
    //   // 
    //   // // NOTE: gl.bufferData(gl.ARRAY_BUFFER, ...) will affect
    //   // // whatever buffer is bound to the `ARRAY_BUFFER` bind point
    //   // // but so far we only have one buffer. If we had more than one
    //   // // buffer we'd want to bind that buffer to `ARRAY_BUFFER` first.
    //   // 
    //   // // counter clockwise
    //   // var p0;
    //   // var p1;
    //   // var p2;
    //   // var p3;
    //   // 
    //   // var positions = [
    //   //   x1, y1,
    //   //   x1, y2,
    //   //   x2, y2,
    //   //   x2, y1,
    //   //   // other tri
    //   //   x1, y1,
    //   //   x2, y2
    //   // ];
    // 
    //   // this.positions = [];
    //   // 
    //   // for (var i = 0; i < this.cachePositions.length; i++) {
    //   // 
    //   //   // this does not work for z
    //   //   // if od its y, otherwise x
    //   //   if(i % 2){
    //   //     this.positions[i] = this.cachePositions[i] + this.y;
    //   //   }
    //   //   else {
    //   //     this.positions[i] = this.cachePositions[i] + this.x;
    //   //   }
    //   // }
    // 
    // 
    // 
    //   // this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(this.positions), this.gl.STATIC_DRAW);
    // }
    // 
    
    
    // we dont have a full fledged Ray and Raycaster yet
    raycastCheck(){
      
    }
    
    
    // we dont have a full fledged Ray and Raycaster yet
    // point should be in world space
    collideVMin = new Vector3();
    collideVMax = new Vector3();
    pointCollideCheck(point, usePadding){
      if(!this.boundingBox){
        console.log("missing a boundingbox");
        return false;
      }
      // move box to world space
      // debugger
      
      
      // this.workBox.copy(this.boundingBox).applyMatrix4(this.worldMatrix);
      this.workBox.copy(this.boundingBox);
      this.localToEntireWorld( this.workBox.min );
      this.localToEntireWorld( this.workBox.max );
      
      // this.workBox.min.x += -this.system.world.position.x;
      // this.workBox.min.y += -this.system.world.position.y;
      // // 
      // this.workBox.max.x += this.system.world.position.x;
      // this.workBox.max.y += this.system.world.position.y;
      
      return this.workBox.containsPoint(point);
    }
    
    
    
    buildCorners(worldAxis = false){

      if(this.visualPoints.corners.length === 0){
        for (var i = 0; i < 4; i++) {
          var box = this.mockVisualPlane();
          this.system.add(box);
          // FOR SOME reason this has to happen AFTER system.add
          box.parent = this;
          this.visualPoints.corners[i] = box;
        }
      }

      for (var i = 0; i < this.points.length; i++) {
        var item = this.visualPoints.corners[i];
        item.position.copy(this.points[i]);
        item.refreshMatrixes();
        if(worldAxis === true){
          item.parent = null;
          item.position.applyMatrix4(this.worldMatrix);
          item.refreshMatrixes();
        }
        item.rebuildDimensions();
        // item.updateWorldMatrix(this.matrixWorld);
        
        item.visible = true;
        
      }
      
    }
    
    showCorners(toggle){
      if(this.visualPoints.corners.length === 0){
        this.buildCorners();
      }
      for (var i = 0; i < this.visualPoints.corners[i].length; i++) {
        var item = this.visualPoints.corners[i];
        item.visible = toggle;
      }
      
    }
    
    
    // vvv23423 = new Vector3();
    computeBoundingBox(){
      
      // why does this not have points sometimes??!?!?!
      if(this.points){
        // console.log("has points!");
        // this is a shortcut to performing the .expandByPoint() thats not in yet
        // var vv = this.points[1].clone();//.applyMatrix4(this.worldMatrix);
        this.boundingBox.min.copy(this.points[1]);
      
        // var vv = this.points[3].clone();//.applyMatrix4(this.worldMatrix);
        this.boundingBox.max.copy(this.points[3]);
        
      }
      // otherwise just use the default width height
      else {
        super.computeBoundingBox();
      }
      
    }

    

  }
