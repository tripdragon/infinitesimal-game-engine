
import {Vector3} from '../Modules/Vector3.js';

// this produces a numeric grid
// not a physical object based grid
// idea is that there will be many different sizes of grids
// so make many and feed it snap(xy) and reference .position
// from there you could make a visual layer with div or canvas
export class Grid{
  size = 40;
  rows = 20;
  columns = 40;
  
  position = new Vector3();
  
  constructor(size = 40, rows = 20, columns = 20){
    this.size = size;
    this.rows = rows;
    this.columns = columns;
  }
  
  snap(_x,_y, vectorIn){
    
    
    // find snap
    // find the index of the mouse * space
    // can do this differently, as it snaps hard to the left top most
    // instead of compariing the half
    // var gx = Math.floor(_this.system.pointer.x / grid.size) * grid.size;
    // var gy = Math.floor(_this.system.pointer.y / grid.size) * grid.size;
    
    
    // more work but it snaps at the half with this stack
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
      return vectorIn;
    }
    else {
      this.position.x = xx;
      this.position.y = yy;
      this.position.z = 0;
      return this.position;
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
  }
  
  
}
