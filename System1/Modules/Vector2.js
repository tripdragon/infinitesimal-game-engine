

export class Vector2{
  
  x = 0; y = 0;
  
  constructor(x = 0, y = 0){
    this.x = x; this.y = y;
  }
  // 
  // copy(vector){
  // 
  // }
  
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
  
  addVectors(){
    
  }
  
  equals( v ) {

		return ( ( v.x === this.x ) && ( v.y === this.y )  );

	}
  
}
