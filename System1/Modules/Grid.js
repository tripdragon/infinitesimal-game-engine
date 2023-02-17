
/*

var grid = new Grid(40,20,40, this.system);
grid.snap(_this.system.pointer.x, _this.system.pointer.y).screenTo3D();
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

export class Grid{
  size = 40;
  rows = 20;
  columns = 40;
  
  system;
  
  position = new Vector3();
  
  position3D = new Vector3();
  
  constructor(size = 40, rows = 20, columns = 20, system){
    this.size = size;
    this.rows = rows;
    this.columns = columns;
    this.system = system;
  }
  
  snap(_x,_y, vectorIn){
    
    
    // find snap
    // find the index of the mouse * space
    // can do this differently, as it snaps hard to the left top most
    // instead of compariing the half
    // var gx = Math.floor(_this.system.pointer.x / grid.size) * grid.size;
    // var gy = Math.floor(_this.system.pointer.y / grid.size) * grid.size;
    
    
    // more work but it snaps at the half with this stack
    // should this y be ceil??? since 3d y is UP
    // No that looks wrong in testing
    var ix = Math.floor( _x / this.size);
    var iy = Math.floor( _y / this.size);
    
    var minX = ix * this.size;
    var maxX = (ix+1) * this.size;
    
    var minY = iy * this.size;
    var maxY = (iy+1) * this.size;
    
    var xx = minX;
    if ( _x > minX + (this.size/2) ) { xx = maxX };
    var yy = minY;
    if ( _y > minY + (this.size/2) ) { yy = maxY };
    // 
    // var gx = xx;
    // var gy = yy;
    // 
    
    if(vectorIn){
      vectorIn.x = xx;
      vectorIn.y = yy;
      // return vectorIn;
    }
    else {
      this.position.x = xx;
      this.position.y = yy;
      this.position.z = 0;
      // return this.position;
    }
    
    
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
    if(vectorIn){
      vectorIn.copy(this.position3D);
    }
    return this;
  }
  
  
}
