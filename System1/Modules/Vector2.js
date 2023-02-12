

export class Vector2{
  
  x = 0; y = 0;
  
  constructor(x = 0, y = 0){
    this.x = x; this.y = y;
  }
  // 
  // copy(vector){
  // 
  // }
  
  set(x,y){
    this.x = x; this.y = y;
  }
  
  add(v){
    this.x += v.x;
    this.y += v.y;
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
  
  divideScalar(val){
    this.x /= val;
    this.y /= val;
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
  
}
