
/*

var grid = new Grid(40,20,40, this.system);
grid.snap(_this.system.pointer.client.x, _this.system.pointer.client.y).screenTo3D();

box2.x = grid.position3D.x;
box2.y = grid.position3D.y;

*/


import {Vector3} from '../Modules/Vector3.js';

// this produces a numeric grid
// not a physical object based grid
// idea is that there will be many different sizes of grids
// so make many and feed it snap(xy) and reference .position
// from there you could make a visual layer with div or canvas

// Related to Pointer() just dont know how to merge yet

// the .position is flush top left
// otherwise ask for .positionCenter

export class Grid{
  size = 40;
  rows = 20;
  columns = 40;
  
  system;
  
  position = new Vector3();
  positionCenter = new Vector3();
  
  position3D = new Vector3();
  position3DCenter = new Vector3();
  
  
  
  // row is x col is y
  indexRow = 0;
  indexCol = 0;
  
  
  
  constructor(size = 40, rows = 20, columns = 20, system){
    this.size = size;
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
  snap(_x,_y, vectorIn){
    
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
    
    var ix = Math.floor( _x / this.size);
    var iy = Math.floor( _y / this.size);
    
    this.indexRow = ix;
    this.indexCol = iy;
    
    var minX = ix * this.size;
    var maxX = (ix+1) * this.size;
    
    var minY = iy * this.size;
    var maxY = (iy+1) * this.size;
    
    // this snaps to the next as the mouse reaches over the middle point
    var xx = minX;
    if ( _x > minX + (this.size/2) ) { xx = maxX };
    var yy = minY;
    if ( _y > minY + (this.size/2) ) { yy = maxY };
    
    this.position.x = xx;
    this.position.y = yy;
    this.position.z = 0;
    
    if(vectorIn){
      vectorIn.x = xx;
      vectorIn.y = yy;
      // return vectorIn;
    }
    
    // this one waits till mouse enters next tile
    // snapping to center
    
    var minX = (ix+1) * this.size;    
    var minY = (iy+1) * this.size;
    
    var xx = minX;
    var yy = minY;
    
    this.positionCenter.x = xx - this.size / 2;
    this.positionCenter.y = yy - this.size / 2;
    
    
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
    
    return this;
  }
  
  
  
  // this will at some ponti need a matirx instead
  screenTo3D(vectorIn){
    this.position3D.x = this.position.x - this.system.world.position.x;
    this.position3D.y = this.system.gameHeight - this.position.y - this.system.world.position.x;
    
    this.position3DCenter.x = this.positionCenter.x - this.system.world.position.x;
    this.position3DCenter.y = this.system.gameHeight - this.positionCenter.y - this.system.world.position.x;
    
    // if(vectorIn){
    //   vectorIn.copy(this.position3D);
    // }
    return this;
  }
  

  
  computeRowsColumns(width, height){
    this.rows = Math.floor(width/ this.size);
    this.columns = Math.floor(height/ this.size);
    return this;
  }
  
  
  snapAtRowCol(row,col){
    this.snap(row*this.size, col*this.size);
    return this;
  }
  
  
  
}
