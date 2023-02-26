

export class Vector3{
  
  x = 0; y = 0; z = 0;
  
  constructor(x = 0, y = 0, z = 0){
    this.x = x; this.y = y; this.z = z;
  }
  // 
  // copy(vector){
  // 
  // }
  
  print(){
    console.log("v", this.x, this.y, this.z);
  }
  
  toString(){
    return `x: ${this.x}, y: ${this.y}, z: ${this.z}`;
  }
  
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
  
  sub(v){
    this.x -= v.x;
    this.y -= v.y;
    this.z -= v.z;
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
  
  equals( v ) {

    return ( ( v.x === this.x ) && ( v.y === this.y ) && ( v.z === this.z ) );

  }
  
  
	lerp( v, alpha ) {

		this.x += ( v.x - this.x ) * alpha;
		this.y += ( v.y - this.y ) * alpha;
		this.z += ( v.z - this.z ) * alpha;

		return this;

	}

	lerpVectors( v1, v2, alpha ) {

		this.x = v1.x + ( v2.x - v1.x ) * alpha;
		this.y = v1.y + ( v2.y - v1.y ) * alpha;
		this.z = v1.z + ( v2.z - v1.z ) * alpha;

		return this;

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
  
  
  
  applyMatrix4( m ) {

		const x = this.x, y = this.y, z = this.z;
		const e = m.elements;

		const w = 1 / ( e[ 3 ] * x + e[ 7 ] * y + e[ 11 ] * z + e[ 15 ] );

		this.x = ( e[ 0 ] * x + e[ 4 ] * y + e[ 8 ] * z + e[ 12 ] ) * w;
		this.y = ( e[ 1 ] * x + e[ 5 ] * y + e[ 9 ] * z + e[ 13 ] ) * w;
		this.z = ( e[ 2 ] * x + e[ 6 ] * y + e[ 10 ] * z + e[ 14 ] ) * w;

		return this;

	}
  
  
	toArray( array = [], offset = 0 ) {

		array[ offset ] = this.x;
		array[ offset + 1 ] = this.y;
		array[ offset + 2 ] = this.z;

		return array;

	}
  
}
