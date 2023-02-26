

// we need a cheap way to auto update any changes
// and thus update bounding boxes and world matrixes
// without having to recall .updateYADA()...

// This is kinda a lazy task, but otherwise if its left to a dirty flag
// or hoisiting the collisions to a different step
// we could have frame skipping

// this does introduce one extra function call for EVERYTHING....

// in repect to trying to recall names
// could just use a simple to remember function name like
//
// .bbb() short for AABB
//



import { Vector3 } from "./Vector3.js";

export class Position extends Vector3 {
  
  owner = null;
  
  constructor(owner,x=0,y=0,z=0){
    // debugger
    super(x,y,z);
    this.owner = owner;
  }
  
  set x(val){
    this.x = val;
    if(this.owner) this.owner.bbb();
  }
  set y(val){
    this.y = val;
    if(this.owner) this.owner.bbb();
  }
  set z(val){
    this.z = val;
    if(this.owner) this.owner.bbb();
  }
  
  
    
  set(x,y,z){
    super.set(x,y,z);
    if(this.owner) this.owner.bbb();
    return this;
  }
  
  clear(){
    super.clear();
    if(this.owner) this.owner.bbb();
    return this;
  }
  
  add(v){
    super.add(v);
    if(this.owner) this.owner.bbb();
    return this;
  }
  
  sub(v){
    super.sub(v);
    if(this.owner) this.owner.bbb();
    return this;
  }
  
  addScalar(val){
    super.addScalar(val);
    if(this.owner) this.owner.bbb();
    return this;
  }
  
  multiplyScalar(val){
    super.multiplyScalar(val);
    if(this.owner) this.owner.bbb();
    return this;
  }
  
  divideScalar(val){
    super.divideScalar(val);
    if(this.owner) this.owner.bbb();
    return this;
  }
  
  // equals( v ) {
  //   return super.equals(v);
	// }
  
  
	// lengthSq() {
  //   return this.magnitudeSq();
  // }
  
	// magnitudeSq() {
  // 
	// 	return this.x * this.x + this.y * this.y + this.z * this.z;
  // 
	// }

	// length() {
  //   return this.magnitude();
  // }
  // 
	// magnitude() {
  // 
	// 	return Math.sqrt( this.x * this.x + this.y * this.y + this.z * this.z );
  // 
	// }
  
  // normalize() {
  // 
  //   return this.divideScalar( this.magnitude() || 1 );
  // 
  // }
  // 
  // equals( v ) {
  // 
  //   return ( ( v.x === this.x ) && ( v.y === this.y ) && ( v.z === this.z ) );
  // 
  // }
  
  
	lerp( v, alpha ) {

		super.lerp(v, alpha);
    if(this.owner) this.owner.bbb();
		return this;

	}

	lerpVectors( v1, v2, alpha ) {

    super.lerpVectors(v1,v2,alpha);
    if(this.owner) this.owner.bbb();
		return this;

	}
  
  copy(v, should){
    super.copy(v);
    if(should && this.owner){
      this.owner = v.owner;
      this.owner.bbb();
    } 
    return this;
  }
  
  // here we MUST set the @newOwner or the .bbb() will not update onto the correct object
  clone(newOwner){
    // return new Vector3().copy(this);
    return new this.constructor(newOwner,this.x, this.y, this.z);
  }
  // 
  
  
  applyMatrix4( m, should ) {
    
    super.applyMatrix4(m);
    if(should && this.owner) this.owner.bbb();
		return this;

	}
  
  // 
	// toArray( array = [], offset = 0 ) {
  // 
	// 	array[ offset ] = this.x;
	// 	array[ offset + 1 ] = this.y;
	// 	array[ offset + 2 ] = this.z;
  // 
	// 	return array;
  // 
	// }
  // 
}
