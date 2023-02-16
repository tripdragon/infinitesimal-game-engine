

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
    this.min.z += val; // dont know z yet
    
    this.max.x += val;
    this.max.y += -val;
    this.max.z += -val; // dont know z yet
    return this;
  }
  
}
