

export class Vector3{
  
  x = 0; y = 0; z = 0;
  
  constructor(x = 0, y = 0, z = 0){
    this.x = x; this.y = y; this.z = z;
  }
  // 
  // copy(vector){
  // 
  // }
  
  set(x,y,z){
    this.x = x; this.y = y; this.z = z;
  }
  
  clear(){
    this.x = 0; this.y = 0; this.z = 0;
  }
  
  add(v){
    this.x += v.x;
    this.y += v.y;
    this.z += v.z;
    return this;
  }
  
  addScalar(val){
    this.x += val;
    this.y += val;
    this.z += val;
    return this;
  }
  
  multiplyScalar(val){
    this.x *= val;
    this.y *= val;
    this.z *= val;
    return this;
  }
  
  divideScalar(val){
    this.x /= val;
    this.y /= val;
    this.z /= val;
    return this;
  }
  
  equals( v ) {

		return ( ( v.x === this.x ) && ( v.y === this.y ) && ( v.z === this.z ) );

	}
  
  
	lengthSq() {
    return this.magnitudeSq();
  }
  
	magnitudeSq() {

		return this.x * this.x + this.y * this.y + this.z * this.z;

	}

	length() {
    return this.magnitude();
  }
  
	magnitude() {

		return Math.sqrt( this.x * this.x + this.y * this.y + this.z * this.z );

	}
  
  normalize() {

    return this.divideScalar( this.magnitude() || 1 );

  }
  
  copy(v){
    this.x = v.x;
    this.y = v.y;
    this.z = v.z;
    return this;
  }
  
  clone(){
    return new Vector3().copy(this);
  }
  
}
