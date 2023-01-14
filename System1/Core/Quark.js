

export class Quark {

  lv = 0;
  
  gl;
  
  x;
  y;
  z;
  width;
  height;
  color = {x:1.0, y:1.0, z:1.0, w:1.0};
  
  name = "";
  
  playCode = `return {
    x: this.x,
    y: this.y,
    width: this.width,
    height: this.height
  }`;
  playCodeDecompressed = null;

  constructor(gl, x, y, height, width, color = {x:1.0, y:1.0, z:1.0, w:1.0}) {
    this.gl = gl;
    this.height = height;
    this.width = width;
    this.x = x;
    this.y = y;
    this.color = color;
  }

}
