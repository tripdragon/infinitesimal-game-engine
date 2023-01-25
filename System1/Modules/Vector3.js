

export class Vector3{
  
  x = 0; y = 0; z = 0;
  
  constructor(x = 0, y = 0, z = 0){
    this.x = x; this.y = y; this.z = z;
  }
  // 
  // copy(vector){
  // 
  // }
  
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
  
  equals( v ) {

		return ( ( v.x === this.x ) && ( v.y === this.y ) && ( v.z === this.z ) );

	}
  
  copy(v){
    this.x = v.x;
    this.y = v.y;
    this.z = v.z;
    return this;
  }
  
}
