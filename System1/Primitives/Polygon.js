



/*

var points = [
  new Vector3(-1,1,0), new Vector3(-1,-1,0), new Vector3(1,-1,0) ,
  // new Vector3(-1,1,0), new Vector3(-1,-1,0),
];
var plaoototty = new Polygon("plwoeir", points, 400,200,0,  112, {r:0.0,g:0.9,b:0.2,a:1}, this.system);
this.system.add(plaoototty);
window.plaoototty = plaoototty;

*/

import { Quark } from "../Primitives/Quark.js";
import { Vector3 } from "../Modules/Vector3.js";
import { Matrix4 } from "../Modules/GL-Matrix.js";

export class Polygon extends Quark {
  
  
  scalar;// this matters ¿ yes it does , no its doesnt
  points = []; // wuts the diff???
  positions = [];
  
  subType = "wirefornow";
  
  
  indices = [ 0, 1, 2 ];

  constructor(name, points = [new Vector3(-1,1,0), new Vector3(-1,-1,0), new Vector3(1,-1,0)], x, y, z, scalar, color = {r:1.0, g:1.0, b:1.0, a:1.0}, system) {
    
    // need to compute width and height, zero depth not true! a point in z space is possible now
    var hh = 0;
    var ww = 0;
    var depth = 0;
    super(name, x, y, z, ww, hh, depth, color = {r:1.0, g:1.0, b:1.0, a:1.0}, system);
    
    this.points = points;
    this.scalar = scalar;
    
    // we know this as two tris
    // DONT KNOW count yet
    // this.pointsCount = 6;
    this.pointsCount = points.length;
    
    // save this for when need to generate normals
    // this.setPoints();
    
    this.updatePositions();
    
    this.setGeometryScale(scalar);
    
  }

  // draws to the buffer
  draw(colorUniformLocation, matrixLocation){
  
    this.gl.uniform4f(colorUniformLocation, this.color.r, this.color.g, this.color.b, 1);

    this.gl.uniformMatrix4fv(matrixLocation, false, this.workMatrix.multiplyMatrices( this.system.projectionMatrix, this.worldMatrix).elements);

    this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(this.positions), this.gl.STATIC_DRAW);
    
  }
  
  updatePositions(){
    var positions = this.positions;
    var points = this.points;
    
    // gurgle less!! auto findy 222
    for (var i = 0; i < points.length; i++) {
      positions[3*i] = points[i].x;
      positions[3*i+1] = points[i].y;
      positions[3*i+2] = points[i].z;
    }
  }
  
  setGeometryScale(val){
    this.scalar = val;
    for (var i = 0; i < this.points.length; i++) {
      this.points[i].multiplyScalar(val);
    }
    this.updatePositions();
  }

}
