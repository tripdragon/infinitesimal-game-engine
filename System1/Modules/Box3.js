

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


// most of this will be copied from THREE.js
import { Vector3 } from "../Modules/Vector3.js";
import { AABBTestScreenSpace, AABBTest3D, AABBTestScreenSpace222BackToTopYYY } from "./Colliders/collisions.js";

export class Box3{
  
  // ??Infinity
  min = new Vector3(- Infinity, - Infinity, - Infinity);
  max = new Vector3(Infinity, Infinity, Infinity);
  
  
  AABBTestScreenSpace(object){
    // return AABBTestScreenSpace(this,object);
    // y starts at bottom as it should!
    return AABBTestScreenSpace222BackToTopYYY(this,object);
  }
  
  AABBTest3D(object){
    return AABBTest3D(this,object);
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
  
  print(){
    console.log(this.min.x, this.max.y, "____", this.max.x, this.max.y);
    console.log(this.min.x, this.min.y, "____", this.max.x, this.min.y);
  }
  


  applyMatrix4( matrix ) {

		// transform of empty box is an empty box.
		// if ( this.isEmpty() ) return this;
    
    this.min.applyMatrix4(matrix);
    this.max.applyMatrix4(matrix);
    

		return this;

	}
  
}
