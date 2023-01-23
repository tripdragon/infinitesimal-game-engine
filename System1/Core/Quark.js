

import {Layers} from './Layers.js';

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
export class Quark {

  
  name = "";
  
  lv = 0;
  
  // see
  // const mypoint = new Point()
  // Check `mypoint` is an `instanceof` `Point`
  // console.assert(mypoint instanceof Point)
  isType = "Quark";
  subType = "anything";
  
  gl;
  
  x;
  y;
  z;
  width;
  height;
  //color = {x:1.0, y:1.0, z:1.0, w:1.0};
  color = {r:1.0, g:1.0, b:1.0, a:1.0};
  origin = {x:0,y:0,z:0};
  
  pointsCount = 0;
  
  canUpdate = true;
  useInEditMode = true;
  
  tacos = "foof";
  
  // NOT USEd d yet, see source
  // this MUST be an enum
  // layer = [Layers.Main];
  // need set layer()
  // so we can remove it from the list as well
  
  // instead well just do a bool check
  // keeping in mind "art" texture things should not collide
  canCollide = true;
  // canTrigger = true;
  
  // clone(){
  // // debugger
  // // this.tacos = "derps";
  // this.gl = 
  // }
  copyTo(thing){
    thing.gl = this.gl;
    thing.x = this.x;
    thing.y = this.y;
    thing.z = this.z;
    thing.width = this.width;
    thing.height = this.height;
    thing.isType = this.isType;
    thing.subType = this.subType;
    thing.color = this.color;
    thing.origin = this.origin;
    thing.pointsCount = this.pointsCount;
    thing.canUpdate = this.canUpdate;
    thing.useInEditMode = this.useInEditMode;
    thing.canCollide = this.canCollide;
    thing.name = this.name;
    thing.playCode = this.playCode;
    thing.playCodeDecompressed = this.playCodeDecompressed;
    
  }
  
  update(){
    
  }
  

  
  
  
  // when updating
  // need to update matrix stuff
  peeps = new Set();
  add(thingy){
      // if typeOf is needed
      this.peeps.add(thingy);
  }
  
  // this belongs on the object as a method
  originCompute(width, height, depth = 0){
    this.origin.x = width/2;
    this.origin.y = height/2;
    this.origin.z = depth/2;
  }

  // maybe rename to script
  playCode = `return {
    x: this.x,
    y: this.y,
    width: this.width,
    height: this.height
  }`;
  playCodeDecompressed = null;
  
  // we never have the gl available yet on start of game....
  // maaaaybe we should, but for now just make it name
  // also arguments shoudl become an object
  //constructor(gl, x, y, width, height, depth, color = {x:1.0, y:1.0, z:1.0, w:1.0}) {
  constructor(name, x, y, width, height, depth, color = {r:1.0, g:1.0, b:1.0, a:1.0}) {
    // this.gl = gl;
    this.name = name;
    this.height = height;
    this.width = width;
    this.x = x;
    this.y = y;
    this.color = color;
    this.originCompute(this.width, this.height, 0);
  }

}
