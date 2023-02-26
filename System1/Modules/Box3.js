

/*

debug within


plat = box4;
plat.boundingBox.print()

point = {x:0,y:0}
point.x = plat.boundingBox.min.x;
point.y = plat.boundingBox.max.y;

if(box){
box.delete()
box = null;
}
var box = new Plane("boxlike", point.x, point.y, 0, 10, 10, new Color().random());
APPPP.add(box);

pointInBoundingBoxScreenSpace(point, plat)

*/


// this is a merger of Box2 and Box3
// as the start of all things is 2dish but would just like to have z in already


// most of this will be copied from THREE.js
import { Vector3 } from "../Modules/Vector3.js";
import { AABBTestScreenSpace, AABBTest3D, AABBTestScreenSpace222BackToTopYYY } from "./Colliders/collisions.js";

export class Box3{
  
  // ??Infinity
  min = new Vector3(- Infinity, - Infinity, - Infinity);
  max = new Vector3(Infinity, Infinity, Infinity);
  
  
  AABBTestScreenSpace(box){
    // return AABBTestScreenSpace(this,box);
    // y starts at bottom as it should!
    
    return AABBTestScreenSpace222BackToTopYYY(this,box);
  }
  
  // also just
  // intersectsBox( box ) {
  // 
	// 	// using 4 splitting planes to rule out intersections
  // 
	// 	return box.max.x < this.min.x || box.min.x > this.max.x ||
	// 		box.max.y < this.min.y || box.min.y > this.max.y ? false : true;
  // 
	// }
  // and
  // containsBox( box ) {
  // 
	// 	return this.min.x <= box.min.x && box.max.x <= this.max.x &&
	// 		this.min.y <= box.min.y && box.max.y <= this.max.y;
  // 
	// }
  
  
  
  AABBTest3D(object){
    return AABBTest3D(this,object);
  }
  
  clear(){
    this.min.clear();
    this.max.clear();
    return this;
  }
  
  containsPoint( point ) {

		return point.x < this.min.x || point.x > this.max.x ||
			point.y < this.min.y || point.y > this.max.y ? false : true;

	}
  
  copy(box){
    this.min.copy(box.min);
    this.max.copy(box.max);
    return this;
  }
  
  clone(){
    return new Box3().copy(this);
  }
  
  // this is a SPECIAL case for screenSpace
  addPaddingScreenSpace(val){
    this.min.x += -val;
    this.min.y += val;
    // this.min.y += -val;
    this.min.z += val; // dont know z yet
    
    this.max.x += val;
    this.max.y += -val;
    // this.max.y += val;
    this.max.z += -val; // dont know z yet
    return this;
  }
  
  
  
  


  applyMatrix4( matrix ) {

		// transform of empty box is an empty box.
		// if ( this.isEmpty() ) return this;
    
    this.min.applyMatrix4(matrix);
    this.max.applyMatrix4(matrix);
    

		return this;

	}
  
  print(){
    
    // debugger
    console.log("min",this.min.toString());
    console.log("max",this.max.toString());
    
  }
  
  // this was to print points in counter clockwise
  // print(){
  //   console.log(this.min.x, this.max.y, "____", this.max.x, this.max.y);
  //   console.log(this.min.x, this.min.y, "____", this.max.x, this.min.y);
  // }
  
}
