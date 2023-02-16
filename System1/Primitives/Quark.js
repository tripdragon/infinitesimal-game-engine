

// import {Layers} from './Layers.js';
import {Vector3} from '../Modules/Vector3.js';
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
  
  // workMatrix = new Matrix();
  localMatrix = new Matrix4();
  worldMatrix = new Matrix4();
  
  // localMatrix_changed = false; // dirty flag ?
  worldMatrix_changed = false; // dirty flag ?
  workMatrix = new Matrix4();
  
  // APPPP.world.updateWorldMatrix()
  // if you call it with a matrix then it will change its world position
  // otherwise will stay the same
  // it then does the same for all down chain
  updateWorldMatrix(parentWorldMatrix){
    // debugger
    if(this.name !== "world"){
      // debugger
    }
    if(parentWorldMatrix){
      // force updates the world Matrix
      
      // console.log("parentWorldMatrix",parentWorldMatrix.getPosition());
      // debugger
      // console.log("name", this.name);
      this.worldMatrix.narf = "narf111";
      this.worldMatrix.multiplyMatrices(parentWorldMatrix, this.localMatrix);
      // debugger
      // console.log("this.worldMatrix", this.worldMatrix.getPosition());
      
      // this.worldMatrix.multiplyMatrices(this.localMatrix, parentWorldMatrix);
      // console.log(this.localMatrix.elements, parentWorldMatrix.elements);
      // this.worldMatrix.multiplyMatrices( parentWorldMatrix, this.localMatrix);
    }
    else {
      // debugger
      // make sure its local!
      if(this.parent === null){
        this.worldMatrix.copy(this.localMatrix);
      }
    }
    
    // recussion updates chain
    // now process all the children
    
    var worldMatrix = this.worldMatrix;
    if(this.peeps.length > 0){
      this.peeps.forEach(function(item) {
        item.updateWorldMatrix(worldMatrix);
      });
    }
  }
  
  // draws to the buffer
  draw(colorUniformLocation, matrixLocation){
    
    // this.gl.uniform4f(colorUniformLocation, this.color.r, this.color.g, this.color.b, 1);      
    
    // if(colorUniformLocation)
    
    // debugger
    this.gl.uniformMatrix4fv(matrixLocation, false, this.worldMatrix.elements);
    
    
  }
  
  
  refreshMatrixes(){
    if(!this.mPosition.equals(this.position)){

      this.mPosition.copy(this.position);
    }
    
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
            this.localMatrix.setTranslation(this.position.x,this.position.y,this.position.z);
            // debugger
            // this.localMatrix.translate(this.position.x,this.position.y,this.position.z);


    this.updateWorldMatrix();
    
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
  position = new Vector3();
  mPosition = new Vector3(); // not sure of this yet
  // _position = new Vector3();

  get x(){
    return this.position.x;
  }
  get y(){
    return this.position.y;
  }
  get z(){
    return this.position.z;
  }
  
  set x(v){
    this.position.x = v;
    this.updateBoundingBox();
  }
  set y(v){
    this.position.y = v;
    this.updateBoundingBox();
  }
  set z(v){
    this.position.z = v;
    this.updateBoundingBox();
  }
  
  updateBoundingBox(){
    this.computeBoundingBox();
    this.computeBoundingBoxPadding();
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
  
  origin = new Vector3();
  
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
  set parent(peep){
    if(peep instanceof Quark){
      peep.add(this);
    }
    else if(peep === null){
      peep.remove(this);
    }
  }
  
  //peeps = new Set();
  peeps = [];
  
  add(peep){
      // if typeOf is needed
      if(peep instanceof Quark){
        var index = this.peeps.indexOf(peep);
        if(index > -1){
          console.log("already have peep");
        }
        else {
          if(peep._parent !== null){
            peep._parent.remove(peep);
          }
          this.peeps.push(peep);
          peep._parent = this;
          // debugger
        }
      }
      else {
        console.warn("not instanceof Quark");
      }
  }
  remove(peep){
    if(peep instanceof Quark){
      var index = this.peeps.indexOf(peep);
      if(index > -1){
        this.peeps.splice(index,1);
        peep._parent = null;
      }
    }
    else {
      console.warn("not instanceof Quark");
    }
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
  // invisible extra AABB testing space for various needs
  // like testing if an actor is standing near enough to a platform
  boundingBoxPadding = new Box3();
  
  get min(){
    return this.boundingBox.min;
  }
  get max(){
    return this.boundingBox.max;
  }
  
  // change per subclass
  // HRmmmmm max y is wrong for screenspace
  // NOTE: DONT know why this works worldMatrix offset, but it seems to ?!?!?!
  computeBoundingBox(){
    this.boundingBox.min.x = (-this.width / 2) + this.x;
    // y starts at bottom as it should!
    // this.boundingBox.min.y = (this.height / 2) + this.y;
    this.boundingBox.min.y = (-this.height / 2) + this.y; // this should be the correct one
    this.boundingBox.min.z = (-this.depth / 2) + this.z;
    
    this.boundingBox.max.x = (this.width / 2) + this.x;
    // y starts at bottom as it should!
    // this.boundingBox.max.y = (-this.height / 2) + this.y;
    this.boundingBox.max.y = (this.height / 2) + this.y; // this should be the correct one
    this.boundingBox.max.z = (this.depth / 2) + this.z;
  }
  
  computeBoundingBoxPadding(){
    this.boundingBoxPadding.copy(this.boundingBox);
    this.boundingBoxPadding.addPaddingScreenSpace(this.boxPadding);
  }
  
  

  // // 
  // worldPosition(){
  // 
  // }


  // clone(){
  // // debugger
  // // this.tacos = "derps";
  // this.gl = 
  // }
  // copyTo(thing){
  //   thing.system = this.system;
  //   thing.gl = this.gl;
  //   thing.x = this.x;
  //   thing.y = this.y;
  //   thing.z = this.z;
  //   thing.position = this.position.clone();
  //   thing.width = this.width;
  //   thing.height = this.height;
  //   thing.isType = this.isType;
  //   thing.subType = this.subType;
  //   thing.boxPadding = this.boxPadding;
  // 
  //   thing.boundingBox = this.boundingBox.clone();
  //   thing.boundingBoxPadding = this.boundingBoxPadding.clone();
  // 
  //   // thing.color = this.color;
  //   thing.color = this.color.clone();
  //   // thing.origin = this.origin;
  //   thing.origin = this.origin.clone();
  //   thing.pointsCount = this.pointsCount;
  //   thing.canUpdate = this.canUpdate;
  //   thing.useInEditMode = this.useInEditMode;
  //   thing.canCollide = this.canCollide;
  //   thing.name = this.name;
  //   // not sure about these yet
  //   thing.playCode = this.playCode;
  //   thing.playCodeDecompressed = this.playCodeDecompressed;
  //   thing.playHelpers = this.playHelpers;
  //   thing.update = this.update;
  //   thing.play = this.play;
  // }
  
  clone(){
    return this.constructor().copy(this);
  }
  
  copy(thing){
    this.system = thing.system;
    this.gl = thing.gl;
    this.x = thing.x;
    this.y = thing.y;
    this.z = thing.z;
    this.position = thing.position.clone();
    this.width = thing.width;
    this.height = thing.height;
    this.isType = thing.isType;
    this.subType = thing.subType;
    this.boxPadding = thing.boxPadding;

    this.boundingBox = thing.boundingBox.clone();
    this.boundingBoxPadding = thing.boundingBoxPadding.clone();
    
    // this.color = thing.color;
    this.color = thing.color.clone();
    // this.origin = thing.origin;
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
  

  
  

  
  // this belongs on the object as a method
  originCompute(width, height, depth = 0){
    this.origin.x = width/2;
    this.origin.y = height/2;
    this.origin.z = depth/2;
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
    this.x = x;
    this.y = y;
    this.color.copy(color);
    this.mColor.copy(color);
    this.system = system;
    // // this just puts the origin at the center but does not move the geometry
    // // which means the origin is at top left
    // // hrrrmmmmm
    // // for a box in 3D its expected at center for transforms
    // // and maybe bottom for a character
    // // but a charecter its more likely a parent peeps sit
    // // you can draw its offset in GL
    // // but what is position then????
    this.originCompute(this.width, this.height, 0);
    // var center = {
    //   x:this.width/2,
    //   y: this.width/2,
    //   z: this.depth/2
    // }
    
  }

}
