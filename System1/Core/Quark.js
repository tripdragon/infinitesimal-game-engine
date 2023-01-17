
// need to import some threejs functions

export class Quark {

  lv = 0;
  
  isType = "Quark";
  
  gl;
  
  x;
  y;
  z;
  width;
  height;
  color = {x:1.0, y:1.0, z:1.0, w:1.0};
  origin = {x:0,y:0,z:0};
  
  pointsCount = 0;
  
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
  
  name = "";
  
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
  constructor(name, x, y, width, height, depth, color = {x:1.0, y:1.0, z:1.0, w:1.0}) {
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
