
/*

var grid = new Grid(40, 40 ,20,40, this.system);
grid.snap(_this.system.pointer.client.x, _this.system.pointer.client.y).screenTo3D();

box2.x = grid.position3D.x;
box2.y = grid.position3D.y;

*/


import {Vector3} from '../Modules/Vector3.js';
import {VisualPlane} from '../Primitives/VisualPlane.js';
import {Quark} from '../Primitives/Quark.js';

// this produces a numeric grid
// not a physical object based grid
// idea is that there will be many different sizes of grids
// so make many and feed it snap(xy) and reference .position
// from there you could make a visual layer with div or canvas

// Use:
// feed ClientXY coords to .snap()
// you can obmit arguments if it has .system assigned

// once snapped you can access its properties for various .positions
// as setting a vector and such was exer expanding data out

// The initial .position is in ClientXY mouse space
// .screenTo3D() uses the same gameHeight - y technique
// to give a bottom y up .position3D and .position3DCenter


// if the parent or world is offset
// you need to do various offset matrix or position transforms
// ex:
// .position3D.applyMatrix4(worldMatrix)
// or .position3D.add(v)

// Related to Pointer() just dont know how to merge yet

// the .position is flush top left
// otherwise ask for .positionCenter

export class Grid{
  // size = 40;
  rows = 20;
  columns = 40;
  width = 40;
  height = 40;
  
  origin = new Vector3();
  
  system;
  
  position = new Vector3();
  positionCenter = new Vector3();
  
  position3D = new Vector3();
  position3DCenter = new Vector3();
  
  
  
  // row is x col is y
  indexRow = 0;
  indexCol = 0;
  
  debuggerGroup = null;
  
  
  constructor(width = 40, height = 40, rows = 20, columns = 20, system){
  // constructor(size = 40, rows = 20, columns = 20, system){
    // this.size = size;
    this.width = width;
    this.height = height;
    
    // this.sizeX = size + 20; // this is doable but for now keep it square
    // this.sizeY = size;
    this.rows = rows;
    this.columns = columns;
    this.system = system;
  }
  
  // builds two snap points, top left and center
  
  // x y could be optional
  // in that its implied its client
  // to save from this
  // grid.snap(_this.system.pointer.client.x, _this.system.pointer.client.y).screenTo3D();
  snap(_x,_y){
    
    if(!_x && !_y && this.system){
      _x = this.system.pointer.client.x;
      _y = this.system.pointer.client.y;
    }
    
    // find snap
    // find the index of the mouse * space
    // can do this differently, as it snaps hard to the left top most
    // instead of compariing the half
    // var gx = Math.floor(_this.system.pointer.x / grid.size) * grid.size;
    // var gy = Math.floor(_this.system.pointer.y / grid.size) * grid.size;
    
    
    // more work but it snaps at the half with this stack
    
    var ix = Math.floor( _x / this.width);
    var iy = Math.floor( _y / this.height);
    // var ix = Math.floor( _x / this.size);
    // var iy = Math.floor( _y / this.size);
    
    this.indexRow = ix;
    this.indexCol = iy;
    
    // var minX = ix * this.size;
    // var maxX = (ix+1) * this.size;
    var minX = ix * this.width;
    var maxX = (ix+1) * this.width;
    
    // var minY = iy * this.size;
    // var maxY = (iy+1) * this.size;
    var minY = iy * this.height;
    var maxY = (iy+1) * this.height;
    
    // this snaps to the next as the mouse reaches over the middle point
    var xx = minX;
    // if ( _x > minX + (this.size/2) ) { xx = maxX };
    if ( _x > minX + (this.width/2) ) { xx = maxX };
    var yy = minY;
    // if ( _y > minY + (this.size/2) ) { yy = maxY };
    if ( _y > minY + (this.height/2) ) { yy = maxY };
    
    this.position.x = xx;
    this.position.y = yy;
    this.position.z = 0;
    
    
    // NEW!
    // this.position.add(this.origin);
    
    
    // this one waits till mouse enters next tile
    // snapping to center
    
    // var minX = (ix+1) * this.size;    
    // var minY = (iy+1) * this.size;
    var minX = (ix+1) * this.width;    
    var minY = (iy+1) * this.height;
    
    var xx = minX;
    var yy = minY;
    
    // this.positionCenter.x = xx - this.size / 2;
    // this.positionCenter.y = yy - this.size / 2;
    this.positionCenter.x = xx - this.width / 2;
    this.positionCenter.y = yy - this.height / 2;
    
    // NEW!!!
    // this.positionCenter.add(this.origin);
    
    
    // simpler left top hard snap
    // var gx = Math.floor(_this.system.pointer.x / this.size) * this.size;
    // var gy = Math.floor(_this.system.pointer.y / this.size) * this.size;
    // 
    
    // var fx = (-(radiusLike+scalar)/2) + (_this.system.pointer.x);
    // var fy = (-(radiusLike+scalar)/2) + (_this.system.pointer.y);
    
    // place and offset for the divs center
    // var fx = (-(radiusLike+scalar)/2) + (gx);
    // var fy = (-(radiusLike+scalar)/2) + (gy);
    
    // 
    // focusItem.style.left = `${fx}px`;
    // focusItem.style.top = `${fy}px`;
    // 
    // box1.x = fx;
    // box1.y = fy;
    
    // not right, the 
    // box2.x = gx;
    // box2.y = gy;
    
    if(this.system){
      
      this.screenTo3D();
    }
    
    return this;
  }
  
  
  
  // this will at some ponti need a matirx instead
  screenTo3D(){
    // 
    // this.position3D.x = this.position.x - this.system.world.position.x;
    // this.position3D.y = this.system.gameHeight - this.position.y - this.system.world.position.x;
    // 
    // this.position3DCenter.x = this.positionCenter.x - this.system.world.position.x;
    // this.position3DCenter.y = this.system.gameHeight - this.positionCenter.y - this.system.world.position.x;
    // 
    
    
    // 
    // 
    // this.position3D.x = this.position.x;
    // this.position3D.y = this.system.gameHeight - this.position.y;
    // 
    // this.position3DCenter.x = this.positionCenter.x;
    // this.position3DCenter.y = this.system.gameHeight - this.positionCenter.y;
    // 
    
    // change to matrix later
    this.position3D.x = this.position.x + -this.system.world.position.x;
    this.position3D.y = this.system.gameHeight - this.position.y + -this.system.world.position.y;
    
    this.position3DCenter.x = this.positionCenter.x + -this.system.world.position.x;
    this.position3DCenter.y = this.system.gameHeight - this.positionCenter.y + -this.system.world.position.y;
    
    
    
    
    return this;
  }
  

  
  computeRowsColumns(width, height){
    // this.rows = Math.floor(width/ this.size);
    // this.columns = Math.floor(height/ this.size);
    this.rows = Math.floor(width/ this.height);
    this.columns = Math.floor(height/ this.width);
    return this;
  }
  
  
  snapAtRowCol(row,col){
    // this.snap(row*this.size, col*this.size);
    this.snap(row*this.width, col*this.height);
    return this;
  }
  
  // 
  // buildDebugger(){
  //   if(this.debuggerGroup === null){
  //     this.debuggerGroup = new Quark();
  //     this.system.add(this.debuggerGroup);
  //     this.debuggerGroup.position.copy(this.origin);
  //   }
  //   for (var ii = 0; ii < this.columns; ii++) {
  //     for (var mm = 0; mm < this.rows; mm++) {
  // 
  //       this.snapAtRowCol(this.rows * mm, this.columns * ii);
  //       var gg = new VisualPlane("gridpoint", this.position3DCenter.x, this.position3DCenter.y, 0, 10, 10, {r:1,g:0.5,b:1,a:1});
  //       this.debuggerGroup.add(gg);
  //     }
  //   }
  // }
  
  
}
