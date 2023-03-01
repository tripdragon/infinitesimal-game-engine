

// Update things when transforming positions scla rotation etc

/*



refreshMatrixes()
  : updateWorldMatrix()



updateBoundingBox()
  : computeBoundingBoxes()
    : computeBoundingBoxPadding()
    
Plane has 
.rebuildDimensions()
    
*/



// import {Layers} from './Layers.js';
import {Vector3} from '../Modules/Vector3.js';
import {Position as _Position} from '../Modules/Position.js';
import {Box3} from '../Modules/Box3.js';
import {Color} from '../Modules/Color.js';
import {Matrix4} from '../Modules/GL-Matrix.js';



// need to import some threejs functions
// like Vector

/*
class MM {}
class Quark {}
class TT extends Quark {}
class PP extends TT {}
bb = new TT()
rr = new PP()
rr instanceof Quark
  */
  
  // note when subclasses this you need to implement clone() and copy()
  /*
  // example
  clone(){
    return = new this.constructor().copy(this);
  }
  
  copy(thing){
    super.copy(thing);
    this.subType = thing.subType;
    this._mode = thing._mode;
    return this;
  }
  */
export class Quark {

  system;
  
  name = "";
  
  lv = 0;
  
  visible = true;
  
  static = false;
  
  
  // max = new Vector3();
  
  // see
  // const mypoint = new Point()
  // Check `mypoint` is an `instanceof` `Point`
  // console.assert(mypoint instanceof Point)
  isType = "Quark";
  subType = "anything";
  
  // GL stuff
  gl;
  program;
  

  localMatrix = new Matrix4();
  worldMatrix = new Matrix4();
  
  // localMatrix_changed = false; // dirty flag ?
  worldMatrix_changed = false; // dirty flag ?
  workMatrix = new Matrix4();
  
  // short hand easy to recall for AABB but we update the local and world bounding boxes
  // and the other types like padding
  // call this after mutating any transform like .position .rotation .scale .quat .mat
  // aba() aabb()
  // bbb(){
  //   this.computeBoundingBoxes();
  // }
  // set it in the constructor
  bbb(){}

  
  // APPPP.world.updateWorldMatrix()
  // if you call it with a matrix then it will change its world position
  // otherwise will stay the same
  // it then does the same for all down chain
  updateWorldMatrix(parentWorldMatrix){
    
    if(parentWorldMatrix){
      this.worldMatrix.multiplyMatrices(parentWorldMatrix, this.localMatrix);
    }
    else if(this.parent){
      this.worldMatrix.multiplyMatrices(this.parent.worldMatrix, this.localMatrix);
    }
    else {
      this.worldMatrix.copy(this.localMatrix);
    }
    
    // recussion updates chain
    // now process all the friends
    
    var worldMatrix = this.worldMatrix;
    
    if(this.friends.length > 0){
      this.friends.forEach(function(item) {
        item.updateWorldMatrix(worldMatrix);
      });
    }
  }
  
  // draws to the buffer
  draw(colorUniformLocation, matrixLocation){
    
    // mesh objects have color
    // this.gl.uniform4f(colorUniformLocation, this.color.r, this.color.g, this.color.b, 1);      
    
    // if(colorUniformLocation)
    
    this.gl.uniformMatrix4fv(matrixLocation, false, this.worldMatrix.elements);
    
    
  }
  
  
  refreshMatrixes(){
    
    // return;
    
    if(!this.mPosition.equals(this.position)){
        this.mPosition.copy(this.position);
        // console.log("refreshMatrixes");
        
        // for later 		this.matrix.compose( this.position, this.quaternion, this.scale );
        this.localMatrix.setTranslation(this.position.x,this.position.y,this.position.z);
        this.updateWorldMatrix();
        
        
        // if(this.parent){
        //   this.worldMatrix.multiplyMatrices(this.parent.worldMatrix, this.localMatrix);
        // }
        // else {
        //   this.worldMatrix.copy(this.localMatrix);
        // }
    }
    
    
    // does not work to cache a matrix update yet
    // if(!this.mPosition.equals(this.position)){
    // 
    //   this.mPosition.copy(this.position);
    //   console.log("refreshMatrixes");
    // 
    //   // this.localMatrix.setTranslation(this.position.x,this.position.y,this.position.z);
    //   // 
    //   //         // debugger
    //   //         // this.localMatrix.translate(this.position.x,this.position.y,this.position.z);
    //   // 
    //   // 
    //   // this.updateWorldMatrix();
    //   // 
    // }
    
    
    // this performs the matrix updates for now
    // this one applys the position translation
    // this.u_matrix.setTranslation(0,0,0);
    
    // this is most likely not the right way to do this, but its working for now
    // this.u_matrix.identity().multiply(this.system.projectionMatrix);
    // this.localMatrix.identity().multiply(this.system.projectionMatrix);
    // this.localMatrix.setTranslation(this.position.x,this.position.y,this.position.z);

        // 
        // this.localMatrix.copy(this.system.projectionMatrix);
        // this.localMatrix.translate(this.position.x,this.position.y,this.position.z);

        // debugger
    // 
    // this.localMatrix.setTranslation(this.position.x,this.position.y,this.position.z);
    // 
    //         // debugger
    //         // this.localMatrix.translate(this.position.x,this.position.y,this.position.z);
    // 
    // 
    // // this.updateWorldMatrix();
    // 
    // if(this.parent){
    //   this.worldMatrix.multiplyMatrices(this.parent.worldMatrix, this.localMatrix);
    // }
    // else {
    //   this.worldMatrix.copy(this.localMatrix);
    // }
    
    // 
  }
  
  
  
  
  
  
  
  
  
  // is position world? or local?
  // lets go with local for now and use "get world()"
  // if you set attributes of this, they wont update the boundingBox
  // since they dont have setters
  
  // need a setter function instead so we know to update the bounding box automaticly
  // to do that we would need to redo all of the mutating functions of vector3
  // add sub etc...
  // OR remove the auto stuff and remember to ALWAYS call updateBoundingBox()
  // cuase in update its not so great either, can be overwritten
  // or its running constatly
  // get position(){
  //   return this._position;
  // }
  
  
  
  // NOTE if you mutate this vector directly you must call updateBoundingBox()
  // and maybe update local matrix as well
  // need a wrapper function
  // position = new Vector3();
  position = new _Position(this);
  
  mPosition = new Vector3(Infinity, Infinity, Infinity); // not sure of this yet
  // _position = new Vector3();

  // get x(){
  //   return this.position.x;
  // }
  // get y(){
  //   return this.position.y;
  // }
  // get z(){
  //   return this.position.z;
  // }
  
  set x(v){
    console.warn("use .position for now");
    return;
    
    this.position.x = v;
    // this.updateBoundingBox();
    this.computeBoundingBoxes();
  }
  set y(v){
    console.warn("use .position for now");
    return;
    this.position.y = v;
    // this.updateBoundingBox();
    this.computeBoundingBoxes();
  }
  set z(v){
    console.warn("use .position for now");
    return;
    this.position.z = v;
    // this.updateBoundingBox();
    this.computeBoundingBoxes();
  }
  
  updateBoundingBox(){
    this.computeBoundingBoxes();
    //this.computeBoundingBoxesPadding();
  }
  


  
  // these need to get BOX3 min max etc
  width = 0;
  height = 0;
  depth = 0;
  mHeight;
  mWidth;
  mDepth;
  // set width(v){
  //   if (this.)
  // }
  
  scale = new Vector3();
  
  color = new Color();
  mColor = new Color();
  
  // for color and such
  selectState(){
    this.mColor.copy(this.color);
  }
  deselectState(){
    this.color.copy(this.mColor);
  }
  
  
  // this is NOT the position, dont have rules for this yet
  origin = new Vector3();
  
  // this belongs on the object as a method
  // this is just a centroid
  originCompute(width, height, depth = 0){
    this.origin.x = width/2;
    this.origin.y = height/2;
    this.origin.z = depth/2;
  }
  
  pointsCount = 0;
  
  canUpdate = true;
  useInEditMode = true;
  
  tacos = "foof";
  
  
  // when updating
  // need to update matrix stuff
  _parent = null;
  
  // Not sure of this get set yet
  get parent(){
    return this._parent;
  }
  set parent(friend){
    if(friend instanceof Quark){
      friend.add(this);
    }
    else if(this.friend === null){
      friend.remove(this);
    }
  }
  
  //friends = new Set();
  friends = [];
  
  add(friend){
      // if typeOf is needed
      if(friend instanceof Quark){
        var index = this.friends.indexOf(friend);
        if(index > -1){
          console.log("already have friend");
        }
        else {
          if(friend._parent !== null){
            friend._parent.remove(friend);
          }
          this.friends.push(friend);
          friend._parent = this;
          // debugger
        }
      }
      else {
        console.warn("not instanceof Quark");
      }
  }
  remove(friend, shouldDelete){
    // console.warn("need to check if this REEAAAALLLY clears the buffers and such");
    if(friend instanceof Quark){
      var index = this.friends.indexOf(friend);
      if(index > -1){
        this.friends.splice(index,1);
        friend._parent = null;
        
        if(shouldDelete){
          this.delete();
        }
      }
    }
    else {
      console.warn("not instanceof Quark");
    }
  }
  delete(){
    if(this.parent){
      this.parent.remove(this);
    }
    
    this.system.sceneGrapth.remove(this);
    
    console.warn("need to check if this REEAAAALLLY clears the buffers and such");
  }
  
  
  // NOT USEd d yet, see source
  // this MUST be an enum
  // layer = [Layers.Main];
  // need set layer()
  // so we can remove it from the list as well
  
  // instead well just do a bool check
  // keeping in mind "art" texture things should not collide
  canCollide = true;
  // canTrigger = true;
  

  // maybe rename to script
  // main part 
  // var helper = {randomBetween : randomBetween}
  // this.playCodeDecompressed().do(this, helper);

  playCode = `return {
    x: this.x,
    y: this.y,
    width: this.width,
    height: this.height
  }`;
  playCodeDecompressed = null;
  playHelpers = {};
  
  play(){}
  start(){}
  
  
  
  /*
  
  // sq1.playCode = `return { do : function(obj, helpers){
  //   obj.x = helpers.randomBetween(${-xx},${xy});
  //   obj.color.x = Math.random();
  //   obj.color.y = Math.random();
  //   obj.color.z = Math.random();
  // }}`;
  
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
      // internals runs this, so it does not belong here at ALL
      // this.draw(colorUniformLocation);
    }
    */
  
  
  // in pixel space
  boxPadding = 0;
  
  boundingBox = new Box3();
  boundingBoxWorld = new Box3(); // this one is baked world AABB axis 
  // invisible extra AABB testing space for various needs
  // like testing if an actor is standing near enough to a platform
  boundingBoxPadding = new Box3();
  boundingBoxPaddingWorld = new Box3();
  workBox = new Box3(); // copy into
  
  // Hmmmmmmm this helps and is also deceptive
  // get min(){
  //   return this.boundingBox.min;
  // }
  // get max(){
  //   return this.boundingBox.max;
  // }
  
  // change per subclass
  // HRmmmmm max y is wrong for screenspace
  // NOTE: DONT know why this works worldMatrix offset, but it seems to ?!?!?!
  // THIS FAILS if the position is not in the center of the geometry
  // Its wrong anyway, AABB is still a local space coords thing
  // you move it via a matrix when nessesary as expected
  // computeBoundingBoxes(){
  //   this.boundingBox.min.x = (-this.width / 2) + this.x;
  //   // y starts at bottom as it should!
  //   // this.boundingBox.min.y = (this.height / 2) + this.y;
  //   this.boundingBox.min.y = (-this.height / 2) + this.y; // this should be the correct one
  //   this.boundingBox.min.z = (-this.depth / 2) + this.z;
  // 
  //   this.boundingBox.max.x = (this.width / 2) + this.x;
  //   // y starts at bottom as it should!
  //   // this.boundingBox.max.y = (-this.height / 2) + this.y;
  //   this.boundingBox.max.y = (this.height / 2) + this.y; // this should be the correct one
  //   this.boundingBox.max.z = (this.depth / 2) + this.z;
  // }
  computeBoundingBoxes(){
    if(this.width === 0 || this.height === 0){
      console.log("flat dimensions");
      return
    }
    
    this.boundingBox.min.x = (-this.width / 2);
    // y starts at bottom as it should!
    // this.boundingBox.min.y = (this.height / 2) + this.y;
    this.boundingBox.min.y = (-this.height / 2); // this should be the correct one
    this.boundingBox.min.z = (-this.depth / 2);
    
    this.boundingBox.max.x = (this.width / 2);
    // y starts at bottom as it should!
    // this.boundingBox.max.y = (-this.height / 2) + this.y;
    this.boundingBox.max.y = (this.height / 2); // this should be the correct one
    this.boundingBox.max.z = (this.depth / 2);

    
    this.boundingBoxWorld.copy(this.boundingBox).applyMatrix4(this.worldMatrix);
    
    this.computeBoundingBoxPadding();

  }
  
  computeBoundingBoxPadding(){
    this.boundingBoxPadding.copy(this.boundingBox);
    this.boundingBoxPadding.addPaddingScreenSpace(this.boxPadding);
    
    this.boundingBoxPaddingWorld.copy(this.boundingBoxWorld);
    this.boundingBoxPaddingWorld.addPaddingScreenSpace(this.boxPadding);
  }
  
  
  // each class would have its own
  raycastCheck(){}
  
  // each class would have its own
  pointCollideCheck(point){}
  
  
  
  

  localToWorld( vector ) {
    // not using this yet
    //this.updateWorldMatrix( true, false );

    return vector.applyMatrix4( this.worldMatrix );

  }

  
  worldToLocal( vector ) {
    
    // not using this yet
    //this.updateWorldMatrix( true, false );

    return vector.applyMatrix4( this.workMatrix.copy( this.worldMatrix ).invert() );

  }

  // this moves the local point like the bounding box point
  // to world, which then needs the offset of the .world object
  // localToWorldAndWorldToLocal
  localToEntireWorld(vector){
    
    vector
    .applyMatrix4( this.worldMatrix )
    .applyMatrix4( this.workMatrix.copy( this.system.world.worldMatrix ).invert() );
    
  }
  
  
  
  
  
  

  clone(){
    // constructor(name, x, y, z, width, height, depth, color = {r:1.0, g:1.0, b:1.0, a:1.0}, system)
    return this.constructor(this.name, this.x, this.y, this.z, this.width, this.height, this.depth, this.color.clone(), this.system).copy(this);
  }
  
  copy(thing){
    this.system = thing.system;
    this.visible = thing.visible;
    this.gl = thing.gl;
    // this.x = thing.x;
    // this.y = thing.y;
    // this.z = thing.z;
    this.position = thing.position.clone(this);
    this.mPosition.set(Infinity, Infinity, Infinity);
    this.width = thing.width;
    this.height = thing.height;
    this.isType = thing.isType;
    this.subType = thing.subType;
    this.boxPadding = thing.boxPadding;

    this.boundingBox = thing.boundingBox.clone();
    this.boundingBoxPadding = thing.boundingBoxPadding.clone();
    this.boundingBoxWorld = thing.boundingBoxWorld.clone();
    this.boundingBoxPaddingWorld = thing.boundingBoxPaddingWorld.clone();
    
    // this.color = thing.color;
    this.color = thing.color.clone();
    this.origin = thing.origin.clone();
    this.pointsCount = thing.pointsCount;
    this.canUpdate = thing.canUpdate;
    this.useInEditMode = thing.useInEditMode;
    this.canCollide = thing.canCollide;
    this.name = thing.name;
    // not sure about these yet
    this.playCode = thing.playCode;
    this.playCodeDecompressed = thing.playCodeDecompressed;
    this.playHelpers = thing.playHelpers;
    this.update = thing.update;
    this.play = thing.play;
    
    this.parent = thing.parent;
    // console.warn("localMatrix and worldMAtrix clone not yet implemented!!!");
    this.localMatrix.copy(thing.localMatrix);
    this.worldMatrix.copy(thing.worldMatrix);
  }

  // not sure yet this placement
  update(){

  }
  

  



  // we never have the gl available yet on start of game....
  // maaaaybe we should, but for now just make it name
  // also arguments shoudl become an object
  //constructor(gl, x, y, width, height, depth, color = {x:1.0, y:1.0, z:1.0, w:1.0}) {
  // constructor(name, x, y, width, height, depth, color = {r:1.0, g:1.0, b:1.0, a:1.0}, system) {
  constructor(name, x, y, z, width, height, depth, color = {r:1.0, g:1.0, b:1.0, a:1.0}, system) {
    // this.gl = gl;
    this.name = name;
    this.height = height;
    this.width = width;
    // this.x = x;
    // this.y = y;
    this.position.set(x,y,z);
    this.color.copy(color);
    this.mColor.copy(color);
    this.system = system;
    // // this just puts the origin at the center but does not move the geometry
    // // which means the origin is at top left
    // // hrrrmmmmm
    // // for a box in 3D its expected at center for transforms
    // // and maybe bottom for a character
    // // but a charecter its more likely a parent friends sit
    // // you can draw its offset in GL
    // // but what is position then????
    this.originCompute(this.width, this.height, 0);
    // var center = {
    //   x:this.width/2,
    //   y: this.width/2,
    //   z: this.depth/2
    // }
    
    
    // this goes back into an update functiomn
    console.log("// this goes back into an update function");
    this.localMatrix.setTranslation(this.position.x,this.position.y,this.position.z);
    if(this.parent){
      this.worldMatrix.multiplyMatrices(this.parent.worldMatrix, this.localMatrix);
    }
    else {
      this.worldMatrix.copy(this.localMatrix);
    }

    // see notes
    this.bbb = this.computeBoundingBoxes;

    
  }
  
  
}
