

function clamp(val, min, max) {
  return Math.max(min, Math.min(val, max));
}

export class Vector2{
  
  x = 0; y = 0;
  
  constructor(x = 0, y = 0){
    this.x = x; this.y = y;
  }
  // 
  // copy(vector){
  // 
  // }
  
  dot( v ) {

		return this.x * v.x + this.y * v.y;

	}

  // this was in Vector3
  angleTo( v ) {

		const denominator = Math.sqrt( this.lengthSq() * v.lengthSq() );

		if ( denominator === 0 ) return Math.PI / 2;

		const theta = this.dot( v ) / denominator;

		// clamp, to handle numerical problems

		return Math.acos( clamp( theta, - 1, 1 ) );

	}

  
  set(x,y){
    this.x = x; this.y = y;
    return this;
  }
  
  add(v){
    this.x += v.x;
    this.y += v.y;
    return this;
  }
  
  sub(v){
    this.x -= v.x;
    this.y -= v.y;
    return this;
  }
  
  copy(v){
    this.x = v.x;
    this.y = v.y;
    return this;
  }
  
  multiplyScalar(val){
    this.x *= val;
    this.y *= val;
    return this;
  }
  
  rotateAround( center, angle ) {

		const c = Math.cos( angle ), s = Math.sin( angle );

		const x = this.x - center.x;
		const y = this.y - center.y;

		this.x = x * c - y * s + center.x;
		this.y = x * s + y * c + center.y; // they dont -s here gonna add it in cause thats stupid

		return this;

	}
  
  
  addScalar(val){
    this.x += val;
    this.y += val;
    return this;
  }
  
  divideScalar(val){
    this.x /= val;
    this.y /= val;
    return this;
  }
  
  
	lerp( v, alpha ) {

		this.x += ( v.x - this.x ) * alpha;
		this.y += ( v.y - this.y ) * alpha;

		return this;

	}

	lerpVectors( v1, v2, alpha ) {

		this.x = v1.x + ( v2.x - v1.x ) * alpha;
		this.y = v1.y + ( v2.y - v1.y ) * alpha;

		return this;

	}
  
  clone(){
    return new Vector2().copy(this);
  }
  
  addVectors(){
    
  }
  
  equals( v ) {

		return ( ( v.x === this.x ) && ( v.y === this.y )  );

	}
  
  clampLength( min, max ) {

		const length = this.length();

		return this.divideScalar( length || 1 ).multiplyScalar( Math.max( min, Math.min( max, length ) ) );

	}
  
  divideScalar( scalar ) {

		return this.multiplyScalar( 1 / scalar );

	}
  
  negate() {

		this.x = - this.x;
		this.y = - this.y;

		return this;

	}
  
  multiplyScalar( scalar ) {

		this.x *= scalar;
		this.y *= scalar;

		return this;

	}
  
  lengthSq() {

		return this.x * this.x + this.y * this.y;

	}

	length() {

		return Math.sqrt( this.x * this.x + this.y * this.y );

	}
  
  normalize() {

		return this.divideScalar( this.length() || 1 );

	}
  
}
