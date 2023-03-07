


// This file is getting toooo large
// gonna split out the drawing routine into a file
// and assign in constructor
// https://stackoverflow.com/a/42219636/1149855


// Update things

//.rebuildDimensions()


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

import { lerp } from "../Modules/mathness.js";
import { Matrix4 } from "../Modules/GL-Matrix.js";
import { Box3 } from "../Modules/Box3.js";

import { Quark } from "../Primitives/Quark.js";
import { Rectangle } from "./Rectangle.js";
import { Vector3 } from "../Modules/Vector3.js";
import { Color } from "../Modules/Color.js";

import { isPowerOf2 } from "../Modules/mathness.js";



// import { BehavioursController, Behaviour } from '../Behaviours/Behaviour.js';


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
      edges : []
    }
    
    
    
    // cant use VisualPlane() cause it extends it
    // so have to just make an internal version
    // setToVisualPlane(){
    mockVisualPlane(){
      var item = new Plane("c", 0, 0, 0, 10, 10, {r:1,g:1,b:1,a:1}, this.system);
      item.canCollide = false;
      item.subType = "visualPlane";
      return item;
      // return new VisualPlane("cc", 0, 0, 0, 10, 10, {r:1,g:1,b:1,a:1}, this.system);
    }
    
  
  
    // local space
    // cachePositions = [];
    // counter clockwise
    // +0   +3
    // +1   +2
    // the points of the geometry not the buffer positions
    // buffer has 6 points has 4
    points = [new Vector3(),new Vector3(),new Vector3(),new Vector3()];
    // two of each pointing to points array
    // sides = {
    //   left : [this.points[0], this.points[1]],
    //   bottom : [this.points[1], this.points[2]],
    //   right : [this.points[2], this.points[3]],
    //   top : [this.points[3], this.points[0]]
    // }
    // points are in local space
    // Scope is an annoyance here
    //sides = { left{prop...}}
    

    
    
    // https://stackoverflow.com/a/36956815/1149855
    // scope this class into this dictionary
    sidePoints = {  
      // parent : null,
      _this : this,
      
      get left(){
        return [this._this.points[0], this._this.points[1]];
      },
      get bottom(){
        return [this._this.points[1], this._this.points[2]];
      },
      get right(){
        return [this._this.points[2], this._this.points[3]];
      },
      get top(){
        return [this._this.points[3], this._this.points[0]];
      },
      // init(parent){
      //   this.parent = parent;
      //   return this;
      // }
      
    }//.init(this);
    

    // this returns the center of the side in local or worldSpace
    edges = {
      _this : this,
      workVector : new Vector3(),
      
      process(_points, worldSpace){
        this.workVector.lerpVectors(_points[0],_points[1],0.5);
        if(worldSpace){
          this.workVector.applyMatrix4(this._this.worldMatrix);
        }
        return this.workVector;
      },
      
      left(worldSpace){
        return this.process(this._this.sidePoints.left, worldSpace);
      },
      
      bottom(worldSpace){
        return this.process(this._this.sidePoints.bottom, worldSpace);
      },
      right(worldSpace){
        return this.process(this._this.sidePoints.right, worldSpace);
      },
      top(worldSpace){
        return this.process(this._this.sidePoints.top, worldSpace);
      }
    
    }
    // 
    // sides = {
    //   left : {
    //     points: [this.points[0], this.points[1]],
    // 
    //     get center(){
    //       debugger
    //       return this.computeCenterLocal(this.points);
    //     },
    //     get centerWorld(){
    //       return this.computeCenterWorld(this.points);
    //     }
    //   },
    //   bottom : { 
    //     points: [this.points[1], this.points[2]],
    //     get center(){
    //       return lerp(this.points[0], this.points[0], 0.5);
    //     }
    //   },
    //   right : {
    //     points: [this.points[2], this.points[3]],
    //     get center(){
    //       return lerp(this.points[0], this.points[0], 0.5);
    //     }
    //   },
    //   top : {
    //     points: [this.points[3], this.points[0]],
    //     get center(){
    //       return lerp(this.points[0], this.points[0], 0.5);
    //     }
    //   },
    // 
    // }
    // 

    workVectorSides = new Vector3();
    
    sideCenterWorld(_points){
      return workVector.lerpVectors(_points[0], _points[1], 0.5).applyMatrix4(this.worldMatrix);
    }
    sideCenterLocal(_points){
      return workVector.lerpVectors(_points[0], _points[1], 0.5);
    }
    
    
    recomputeSides(){
      
      // this.sides.left.points = [this.points[0], this.points[1]];
      // this.sides.bottom.points = [this.points[1], this.points[2]];
      // this.sides.right.points = [this.points[2], this.points[3]];
      // this.sides.top.points = [this.points[3], this.points[0]];
      // 
      
      // this.sidePoints.bind(this)
      
      // debugger
      // this.sides = {
      //   left : [this.points[0], this.points[1]],
      //   bottom : [this.points[1], this.points[2]],
      //   right : [this.points[2], this.points[3]],
      //   top : [this.points[3], this.points[0]]
      // }
    }
    
    
    
    
  
    
    // are thse caches??? 
    // u_matrix = new Matrix4().setTranslation(0,0,0);
    // ? not sure yet
    // mvpMatrix
    // translationMatrix = new Matrix4().setTranslation(0,0,0);
    
    // this should be the world coords acording to AABB
    // and since evertything effectly moves this has to be calculated always
    // so at a cost we need to compute!!
    // removing for now as internals are sooooo not solid for this much helper class
    // get min(){
    //   return this.boundingBox.min;
    // }
    // get max(){
    //   return this.boundingBox.max;
    // }
    
    wwBox1 = new Box3();
    wwMat1 = new Matrix4();
    wwBox2 = new Box3();
    wwMat2 = new Matrix4();
    intersects3D(plane){
      return this.boundingBox.AABBTest3D(plane);
    }
    intersectsScreenSpace(plane){
      return this.boundingBox.AABBTestScreenSpace(plane);
    }
    intersectsScreenSpaceWithPadding(plane){
      // we need to mutate World space the box before sending to the test function
      // inverting the worldMatrix should be enough as each is in the same space
      // not pointer space
      
      // wwBox1.copy(this.boundingBoxPadding).applyMatrix4( this.worldMatrix );
      // wwBox2.copy(plane.boundingBoxPadding).applyMatrix4( plane.worldMatrix );
      // wwBox1.AABBTestScreenSpace(wwBox2);
      
      
      this.wwBox1.copy(this.boundingBoxPadding).applyMatrix4( this.worldMatrix );
      this.wwBox2.copy(plane.boundingBoxPadding).applyMatrix4( plane.worldMatrix );
      return this.wwBox1.AABBTestScreenSpace(this.wwBox2);
      
      
      
      // debugger
      
      // return this.boundingBoxWorld.AABBTestScreenSpace(plane.boundingBoxWorld);
      
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
      this.computeBoundingBoxes();
      // this.computeBoundingBoxPadding();
      
      // this.startTexture();
      
      // this.initGLStuff();
      
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
      // this.width = this.sides.right.points[0].x - this.sides.left.points[0].x;
      // this.height = this.sides.top.points[0].y - this.sides.bottom.points[0].y;
      // 
      
      this.width = this.sidePoints.right[0].x - this.sidePoints.left[0].x;
      this.height = this.sidePoints.top[0].y - this.sidePoints.bottom[0].y;
      
      this.computeBoundingBoxes();
      // this.computeBoundingBoxPadding();
      
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
    
    
    // mode here is a string of "edges" or "corners"
    buildVisualCornersOrEdges(mode,worldAxis = false){
      
      if(this.visualPoints[mode].length === 0){
        for (var i = 0; i < 4; i++) {
          var box = this.mockVisualPlane();
          this.system.add(box);
          // FOR SOME reason this has to happen AFTER system.add
          box.parent = this;
          this.visualPoints[mode][i] = box;
        }
      }
      
      var _edges = ["left", "bottom", "right", "top"];
      
      for (var i = 0; i < 4; i++) {
        var item = this.visualPoints[mode][i];
        if(mode === "corners"){
          item.position.copy(this.points[i]);
        }
        else if(mode === "edges"){
          // Urgggg this lookup
          item.position.copy(this.edges[_edges[i]]() );
        }
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
        this.buildVisualCornersOrEdges("corners");
      }
      for (var i = 0; i < this.visualPoints.corners[i].length; i++) {
        var item = this.visualPoints.corners[i];
        item.visible = toggle;
      }
    }
    
    showEdges(toggle){
      if(this.visualPoints.edges.length === 0){
        this.buildVisualCornersOrEdges("edges");
      }
      for (var i = 0; i < this.visualPoints.edges[i].length; i++) {
        var item = this.visualPoints.edges[i];
        item.visible = toggle;
      }
    }
    
    
    // vvv23423 = new Vector3();
    computeBoundingBoxes(){
      
      // why does this not have points sometimes??!?!?!
      if(this.points){
        // console.log("has points!");
        // this is a shortcut to performing the .expandByPoint() thats not in yet
        // var vv = this.points[1].clone();//.applyMatrix4(this.worldMatrix);
        this.boundingBox.min.copy(this.points[1]);
      
        // var vv = this.points[3].clone();//.applyMatrix4(this.worldMatrix);
        this.boundingBox.max.copy(this.points[3]);
        
        // debugger
        this.boundingBoxWorld.copy(this.boundingBox).applyMatrix4(this.worldMatrix);
        
        this.computeBoundingBoxPadding();
        
      }
      // otherwise just use the default width height
      else {
        super.computeBoundingBoxes();
      }
      
    }






// 
// 
// #drawing routines
// 
// 
// 
// 
    
    programInfo = null;
    loadedTexture = false;
    // hasInitGL = false;
    hasSetupdataBuffer = false;
    positionsBufferLocal = null;
    textureCoordBuffer = null;
    cachedImageURL = null;
    
    hasLoadedImage = false;
    hasStartedLoadingImage = false;
    image = null;
    shouldLoadImage = false;
    
    hasGLInit = false;
    
    glInit(){
      if(this.hasGLInit){
        return;
      }
      this.hasGLInit = true;
      
      this.buildProgramInfo();
      
      //
      // building position buffers
      //
      console.log("initGLStuff 222");
      
      this.positionsBufferLocal = this.gl.createBuffer();
      
      // this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.system.POSITIONS_BUFFER);
      this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.positionsBufferLocal);

      const numComponents = 3; // pull out 3 values per iteration for xyz
      const type = this.gl.FLOAT; // the data in the buffer is 32bit floats
      const normalize = false; // don't normalize
      const stride = 0; // how many bytes to get from one set of values to the next
      // 0 = use type and numComponents above
      const offset = 0; // how many bytes inside the buffer to start from
      this.gl.vertexAttribPointer(
        this.programInfo.attribLocations.vertex,
        numComponents,
        type,
        normalize,
        stride,
        offset
      );
      // this brewaks if commented out
      this.gl.enableVertexAttribArray(this.programInfo.attribLocations.vertex);
      
      // this should only be applied once since its reading
      // UNLESS you change the vertices
      this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(this.positions), this.gl.STATIC_DRAW);



      //
      // building initial texture
      //
      
      // Fill the texture with a 1x1 blue pixel.
      this.texture = this.gl.createTexture();
      
      this.textureCoordBuffer = this.gl.createBuffer();
      
      this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.textureCoordBuffer);
      const textureCoordinates = [ 0, 1, 0, 0, 1, 0, 1, 0, 1, 1, 0, 1 ];
      
      this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(textureCoordinates), this.gl.STATIC_DRAW );


      this.gl.bindTexture(this.gl.TEXTURE_2D, this.texture);
      
      this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.gl.RGBA, 1, 1, 0, this.gl.RGBA, this.gl.UNSIGNED_BYTE,
        new Uint8Array([this.color.r*255, this.color.g*255, this.color.b*255, 255]));
        



    }
    
    
    
    buildProgramInfo(){
      
      var gl = this.gl;
      var shaderProgram = this.system.shaderProgram;
      
      this.programInfo = {
        program: shaderProgram,
        attribLocations: {
          vertexPosition: gl.getAttribLocation(shaderProgram, "aVertexPosition"),
          // vertex: gl.getAttribLocation(shaderProgram, "aVertexPosition"),
          // textureLocation : gl.getAttribLocation(shaderProgram, "a_texCoord")
          textureCoord : gl.getAttribLocation(shaderProgram, "a_texCoord")
        },
        uniformLocations: {
          projectionMatrix: gl.getUniformLocation(shaderProgram, "uProjectionMatrix"),
          modelViewMatrix: gl.getUniformLocation(shaderProgram, "uModelViewMatrix"),
          // colorUniformLocation : gl.getUniformLocation(shaderProgram, "u_color"),
          color : gl.getUniformLocation(shaderProgram, "u_color"),
          // 
          // var matrixUniformLocation = gl.getUniformLocation(programInfo.program, "u_matrix");
          // matrixUniformLocation : gl.getUniformLocation(shaderProgram, "u_matrix")
          modelMatrix : gl.getUniformLocation(shaderProgram, "u_matrix"),
          // uSampler: gl.getUniformLocation(shaderProgram, "uSampler")
          uTexture: gl.getUniformLocation(shaderProgram, "uTexture")
          
        },
      };

      if(this.system.screenSpaceMode === this.system.screenModes.screen){
        this.programInfo.uniformLocations.resolution = gl.getUniformLocation(shaderProgram, "u_resolution");
      }

      // Pass in the canvas resolution so we can convert from
      // pixels to clipspace in the shader
      if(this.programInfo.uniformLocations.resolution){
        //console.log("resolution", programInfo.uniformLocations.resolution);
        // this shoudl be gameHeight gameWidth
        // gl.uniform2f(programInfo.uniformLocations.resolution, gl.canvas.width, gl.canvas.height);
        gl.uniform2f(this.programInfo.uniformLocations.resolution, gl.canvas.width, gl.canvas.height);
      }

    }

    // 
    // waitForGLForImage(){
    // 
    // }
    // 
    
    loadImage(url){
      if(url){
        this.shouldLoadImage = true;
      }
      if(this.gl === undefined){
        this.cachedImageURL = url;
        console.log("waiting for gl");
        return;
      }
    }
    
    _loadImage(url){
      
      if(url === null){
        console.log("url is null");
        return;
      }
      
      
      // when loading at start of game gl is not ready yet
      // so we will keep looping until then
      if(this.gl === undefined){
        this.cachedImageURL = url;
        console.log("waiting for gl");
        return;
      }
      
      this.hasStartedLoadingImage = true;
      
      
      // this.image = image;
      // already have texture created
      // this.texture = gl.createTexture();
      this.gl.bindTexture(this.gl.TEXTURE_2D, this.texture);

      // Because images have to be downloaded over the internet
      // they might take a moment until they are ready.
      // Until then put a single pixel in the texture so we can
      // use it immediately. When the image has finished downloading
      // we'll update the texture with the contents of the image.
      const level = 0;
      const internalFormat = this.gl.RGBA;
      const width = 1;
      const height = 1;
      const border = 0;
      const srcFormat = this.gl.RGBA;
      const srcType = this.gl.UNSIGNED_BYTE;
      const pixel = new Uint8Array([0, 255, 0, 255]); // opaque blue
      this.gl.texImage2D(
        this.gl.TEXTURE_2D,
        level,
        internalFormat,
        width,
        height,
        border,
        srcFormat,
        srcType,
        pixel
      );

      const image = new Image();
      image.onload = () => {
        // Flip image pixels into the bottom-to-top order that WebGL expects.
        this.gl.pixelStorei(this.gl.UNPACK_FLIP_Y_WEBGL, true);
        this.gl.bindTexture(this.gl.TEXTURE_2D, this.texture);
        this.gl.texImage2D(
          this.gl.TEXTURE_2D,
          level,
          internalFormat,
          srcFormat,
          srcType,
          image
        );
        this.image = image;
        
        

        // WebGL1 has different requirements for power of 2 images
        // vs non power of 2 images so check if the image is a
        // power of 2 in both dimensions.
        if (isPowerOf2(image.width) && isPowerOf2(image.height)) {
          // Yes, it's a power of 2. Generate mips.
          this.gl.generateMipmap(this.gl.TEXTURE_2D);
        } else {
          // No, it's not a power of 2. Turn off mips and set
          // wrapping to clamp to edge
          this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_S, this.gl.CLAMP_TO_EDGE);
          this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_T, this.gl.CLAMP_TO_EDGE);
          this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MIN_FILTER, this.gl.LINEAR);
        }
      };
      image.src = url;
 
    }
    


    // 
    // Draw
    // 
    // draw(color, matrixLocation, textureLocation){
    draw(){
      
      if(this.hasGLInit === false){
        this.glInit();
      }
      
      
      
      //
      // setup vertex pos
      // 

      {
      const numComponents = 3;
      const type = this.gl.FLOAT; // the data in the buffer is 32bit floats
      const normalize = false; // don't normalize
      const stride = 0; // how many bytes to get from one set of values to the next
      // 0 = use type and numComponents above
      const offset = 0; // how many bytes inside the buffer to start from
      this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.positionBuffer);
      this.gl.vertexAttribPointer(
        this.programInfo.attribLocations.vertexPosition,
        numComponents,
        type,
        normalize,
        stride,
        offset
      );
      this.gl.enableVertexAttribArray(this.programInfo.attribLocations.vertexPosition);
      }

      
      // Set the shader uniforms
      this.gl.uniform4f(this.programInfo.uniformLocations.color, this.color.r, this.color.g, this.color.b, 1);

      this.gl.uniformMatrix4fv(this.programInfo.uniformLocations.modelMatrix, false, this.workMatrix.multiplyMatrices( this.system.projectionMatrix, this.worldMatrix).elements);
            
      
      this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.positionsBufferLocal);
      
      {
        const numComponents = 3; // pull out 3 values per iteration for xyz
        const type = this.gl.FLOAT; // the data in the buffer is 32bit floats
        const normalize = false; // don't normalize
        const stride = 0; // how many bytes to get from one set of values to the next
        // 0 = use type and numComponents above
        const offset = 0; // how many bytes inside the buffer to start from
        this.gl.vertexAttribPointer(
          this.programInfo.attribLocations.vertex,
          numComponents,
          type,
          normalize,
          stride,
          offset
        );
        // this brewaks if commented out
        this.gl.enableVertexAttribArray(this.programInfo.attribLocations.vertex);
      }

      // this should only be applied once since its reading
      // UNLESS you change the vertices
      // the order is weird here for now
      if(this.hasSetupdataBuffer === false){
        this.hasSetupdataBuffer = true;
        this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(this.positions), this.gl.STATIC_DRAW);
        //this.hasSetupdataBuffer++;
        
      }
      
      
      
      if(this.shouldLoadImage === true && this.hasStartedLoadingImage === false){
        console.log("hasStartedLoadingImage 2222");
        this._loadImage(this.cachedImageURL);
      }
      
      
      //
      // set up texcoords
      //
      {
        const num = 2; // every coordinate composed of 2 values
        const type = this.gl.FLOAT; // the data in the buffer is 32-bit float
        const normalize = false; // don't normalize
        const stride = 0; // how many bytes to get from one set to the next
        const offset = 0; // how many bytes inside the buffer to start from
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.textureCoordBuffer);
        this.gl.vertexAttribPointer(
          this.programInfo.attribLocations.textureCoord,
          num,
          type,
          normalize,
          stride,
          offset
        );
        this.gl.enableVertexAttribArray(this.programInfo.attribLocations.textureCoord);
      }
      
      
      // sdkjnfgldfg
      this.gl.uniform4f(this.programInfo.uniformLocations.color, this.color.r, this.color.g, this.color.b, 1);
      
      // MAYBE handle the projection here
      // its building but not moving
      
      this.gl.uniformMatrix4fv(this.programInfo.uniformLocations.modelMatrix, false, this.workMatrix.multiplyMatrices( this.system.projectionMatrix, this.worldMatrix).elements);

      
      
      

            // Tell WebGL we want to affect texture unit 0
            this.gl.activeTexture(this.gl.TEXTURE0);
          
            // Bind the texture to texture unit 0
            this.gl.bindTexture(this.gl.TEXTURE_2D, this.texture);
          
            // Tell the shader we bound the texture to texture unit 0
            this.gl.uniform1i(this.programInfo.uniformLocations.uTexture, 0);
          

            // this should only be applied once since its reading
            // UNLESS you change the vertices
            // the order is weird here for now
            if(this.hasSetupdataBuffer === false){
              this.hasSetupdataBuffer = true;
              this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(this.positions), this.gl.STATIC_DRAW);
              //this.hasSetupdataBuffer++;
              
            }
            // console.log("hasSetupdataBuffer", this.hasSetupdataBuffer);
            // this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(this.positions), this.gl.STATIC_DRAW);

      
          
      
      
      
      
      
      return
      
      
      
      
      // 
      // if(this.programInfo === null){
      //   // this.programInfo = this.system.programInfo;
      // 
      // }
      // 
      // 
      // if(this.hasInitGL === false){
      //   this.hasInitGL = true;
      //   // debugger
      //   this.initGLStuff();
      // }
      // // debugger
      // 
      
      // we have .gl at this point
      if(this.texture === null){
        // debugger
        this.startTexture();
        console.log("startTexture");
      }
      
      // // bind image or so
      if(this.image && this.texture && this.hasLoadedImage === false){
        this.hasLoadedImage = true;
        
        {
          const level = 0;
          const internalFormat = this.gl.RGBA;
          const width = 1;
          const height = 1;
          const border = 0;
          const srcFormat = this.gl.RGBA;
          const srcType = this.gl.UNSIGNED_BYTE;
          const pixel = new Uint8Array([0, 255, 0, 255]); // opaque blue
          
          this.gl.bindTexture(this.gl.TEXTURE_2D, this.texture);
          this.gl.texImage2D( this.gl.TEXTURE_2D, level, internalFormat, srcFormat, srcType, this.image );

        }

        // WebGL1 has different requirements for power of 2 images
        // vs non power of 2 images so check if the image is a
        // power of 2 in both dimensions.
        if (isPowerOf2(this.image.width) && isPowerOf2(this.image.height)) {
          // Yes, it's a power of 2. Generate mips.
          // debugger
          this.gl.generateMipmap(this.gl.TEXTURE_2D);
        } else {
          // No, it's not a power of 2. Turn off mips and set
          // wrapping to clamp to edge
          this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_S, this.gl.CLAMP_TO_EDGE);
          this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_T, this.gl.CLAMP_TO_EDGE);
          this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MIN_FILTER, this.gl.LINEAR);
        }
        
      }
      

// //
// // setup vertex pos
// // 
// 
// {
// const numComponents = 3;
// const type = this.gl.FLOAT; // the data in the buffer is 32bit floats
// const normalize = false; // don't normalize
// const stride = 0; // how many bytes to get from one set of values to the next
// // 0 = use type and numComponents above
// const offset = 0; // how many bytes inside the buffer to start from
// this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.positionBuffer);
// this.gl.vertexAttribPointer(
//   this.programInfo.attribLocations.vertexPosition,
//   numComponents,
//   type,
//   normalize,
//   stride,
//   offset
// );
// this.gl.enableVertexAttribArray(this.programInfo.attribLocations.vertexPosition);
// }
// 

if(this.image && this.texture && this.hasLoadedImage){
  // console.log("¿¿¿¿?");
        
  // // Tell WebGL we want to affect texture unit 0
  // this.gl.activeTexture(this.gl.TEXTURE0);
  // 
  // // Bind the texture to texture unit 0
  // this.gl.bindTexture(this.gl.TEXTURE_2D, this.texture);
  // 
  // // Tell the shader we bound the texture to texture unit 0
  // this.gl.uniform1i(this.programInfo.uniformLocations.uTexture, 0);

{
  const num = 2; // every coordinate composed of 2 values
  const type = this.gl.FLOAT; // the data in the buffer is 32-bit float
  const normalize = false; // don't normalize
  const stride = 0; // how many bytes to get from one set to the next
  const offset = 0; // how many bytes inside the buffer to start from
  this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.textureCoordBuffer);
  this.gl.vertexAttribPointer(
    this.programInfo.attribLocations.textureCoord,
    num,
    type,
    normalize,
    stride,
    offset
  );
  this.gl.enableVertexAttribArray(this.programInfo.attribLocations.textureCoord);
  // debugger
  
  
  
  
  
  // // this.textureCoordBuffer = this.gl.createBuffer();
  // this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.textureCoordBuffer);
  // const textureCoordinates = [
  //   0.0, 0.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0,
  // ];
  // 
  // 
  // 
  // // this.texture = this.gl.createTexture();
  // 
  // this.gl.bindTexture(this.gl.TEXTURE_2D, this.texture);
  // 
  // this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.gl.RGBA, 1, 1, 0, this.gl.RGBA, this.gl.UNSIGNED_BYTE,
  //               new Uint8Array([0, 255, 255, 255]));
  // 
  //               this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(this.textureCoordinates), this.gl.STATIC_DRAW );
  // 
                
}

}



// Set the shader uniforms
      this.gl.uniform4f(this.programInfo.uniformLocations.color, this.color.r, this.color.g, this.color.b, 1);
      
      // MAYBE handle the projection here
      // its building but not moving
      
      // console.log("draw world", this.worldMatrix.getPosition());
      // console.log("draw local", this.localMatrix.getPosition());
      // console.log("draw name", this.name);
      
      
      
      
      this.gl.uniformMatrix4fv(this.programInfo.uniformLocations.modelMatrix, false, this.workMatrix.multiplyMatrices( this.system.projectionMatrix, this.worldMatrix).elements);
      // this.gl.uniformMatrix4fv(matrixLocation, false, this.workMatrix.multiplyMatrices( this.worldMatrix, this.system.projectionMatrix).elements);
      
      

      // 
      // 
      if(this.image && this.texture && this.hasLoadedImage){
      //   // console.log("¿¿¿¿?");
      
        // // Tell WebGL we want to affect texture unit 0
        // this.gl.activeTexture(this.gl.TEXTURE0);
        // 
        // // Bind the texture to texture unit 0
        // this.gl.bindTexture(this.gl.TEXTURE_2D, this.texture);
        // 
        // // Tell the shader we bound the texture to texture unit 0
        // this.gl.uniform1i(this.programInfo.uniformLocations.uTexture, 0);
        // 
      // 
      //   const num = 2; // every coordinate composed of 2 values
      //   const type = this.gl.FLOAT; // the data in the buffer is 32-bit float
      //   const normalize = false; // don't normalize
      //   const stride = 0; // how many bytes to get from one set to the next
      //   const offset = 0; // how many bytes inside the buffer to start from
      //   this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.textureCoordBuffer);
      //   this.gl.vertexAttribPointer(
      //     this.programInfo.attribLocations.textureCoord,
      //     num,
      //     type,
      //     normalize,
      //     stride,
      //     offset
      //   );
      //   this.gl.enableVertexAttribArray(this.programInfo.attribLocations.textureCoord);
      }
      // 
    
      
      
      
                                // var programInfo = this.system.programInfo;  
                                // 
                                // // Tell WebGL we want to affect texture unit 0
                                // this.gl.activeTexture(this.gl.TEXTURE0);
                                // 
                                // // Bind the texture to texture unit 0
                                // this.gl.bindTexture(this.gl.TEXTURE_2D, this.texture);
                                // 
                                // var textureLocationImage = this.gl.getUniformLocation(this.system.shaderProgram, "u_texture");
                                // // Tell the shader we bound the texture to texture unit 0
                                // // this.gl.uniform1i(programInfo.uniformLocations.uSampler, 0);
                                // this.gl.uniform1i(textureLocationImage, 0);
                                // 


      // debugger
      // this.gl.uniformMatrix4fv(matrixLocation, false,  this.worldMatrix.elements);
      // this.gl.uniformMatrix4fv(matrixLocation, false,  this.worldMatrix.elements);
      // this.gl.uniformMatrix4fv(matrixLocation, false,  this.localMatrix.elements);


      // if(textureLocation){
        // provide texture coordinates for the rectangle.
        // var texcoordBuffer = this.gl.createBuffer();
        // this.gl.bindBuffer(this.gl.ARRAY_BUFFER, texcoordBuffer);
        // Upload the image into the texture.
        
        // if(this.image){
        // 
        //   this.gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, this.image);
        //   // lookup uniforms
        // 
        // 
        //   // var resolutionLocation = gl.getUniformLocation(program, "u_resolution");
        //   this.gl.uniform2f(textureLocation, 512, 512);
        // 
        // }

      // }
      // else {
      // 
      // }


      // at this point WHAT is binded here????
      // guess we can just bind again since its normal in all the readings
      // this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.system.POSITIONS_BUFFER);
      
      this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.positionsBufferLocal);
      
      
      // const numComponents = 3; // pull out 3 values per iteration for xyz
      // const type = this.gl.FLOAT; // the data in the buffer is 32bit floats
      // const normalize = false; // don't normalize
      // const stride = 0; // how many bytes to get from one set of values to the next
      // // 0 = use type and numComponents above
      // const offset = 0; // how many bytes inside the buffer to start from
      // this.gl.vertexAttribPointer(
      //   this.programInfo.attribLocations.vertex,
      //   numComponents,
      //   type,
      //   normalize,
      //   stride,
      //   offset
      // );
      // // this brewaks if commented out
      // this.gl.enableVertexAttribArray(this.programInfo.attribLocations.vertex);
      // 




      // Tell WebGL we want to affect texture unit 0
      this.gl.activeTexture(this.gl.TEXTURE0);
    
      // Bind the texture to texture unit 0
      this.gl.bindTexture(this.gl.TEXTURE_2D, this.texture);
    
      // Tell the shader we bound the texture to texture unit 0
      this.gl.uniform1i(this.programInfo.uniformLocations.uTexture, 0);
    

      // this should only be applied once since its reading
      // UNLESS you change the vertices
      // the order is weird here for now
      if(this.hasSetupdataBuffer === false){
        this.hasSetupdataBuffer = true;
        this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(this.positions), this.gl.STATIC_DRAW);
        //this.hasSetupdataBuffer++;
        
      }
      // console.log("hasSetupdataBuffer", this.hasSetupdataBuffer);
      // this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(this.positions), this.gl.STATIC_DRAW);

    }
    
    // 
    // startTexture(){
    // 
    // 
    //     // 
    //     // this.gl.bufferData( this.gl.ARRAY_BUFFER, new Float32Array([
    //     //       // left column front
    //     //       0, 0,
    //     //       0, 1,
    //     //       1, 0,
    //     //       0, 1,
    //     //       1, 1,
    //     //       1, 0]),
    //     //     this.gl.STATIC_DRAW);
    //     // 
    //   // }
    // 
    // }
    
    

    // // sent when the image has loaded
    // // should not be in a loop
    // loadTexture(image){
    //   // debugger
    // 
    // 
    // 
    // 
    // 
    //   // // // Now that the image has loaded make copy it to the texture.
    //   // this.gl.bindTexture(this.gl.TEXTURE_2D, this.texture);
    //   // this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.gl.RGBA, this.gl.RGBA,this.gl.UNSIGNED_BYTE, this.image);
    //   // this.gl.generateMipmap(this.gl.TEXTURE_2D); // this is expenssive in a loop!!
    //   // 
    //   // if (isPowerOf2(this.image.width) && isPowerOf2(this.image.height)) {
    //   //   // Yes, it's a power of 2. Generate mips.
    //   //   this.gl.generateMipmap(this.gl.TEXTURE_2D);
    //   // } else {
    //   //   // No, it's not a power of 2. Turn off mips and set
    //   //   // wrapping to clamp to edge
    //   //   this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_S, this.gl.CLAMP_TO_EDGE);
    //   //   this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_T, this.gl.CLAMP_TO_EDGE);
    //   //   this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MIN_FILTER, this.gl.LINEAR);
    //   // }
    // 
    // 
    //   // 
    // }
    

    

  }
