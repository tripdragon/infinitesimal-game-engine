


// mostly from THREE.js Color

export class Color{
  r = 1;
  g = 1;
  b = 1;
  a = 1;
  
  constructor(color = {r:1.0, g:1.0, b:1.0, a:1.0}){
    this.copy(color);
  }
  
  copy(color){
    this.r = color.r;
    this.g = color.g;
    this.b = color.b;
    this.a = color.a;
    return this;
  }
  clone(){
    return new Color().copy(this);
  }
  
  random(){
    this.r = Math.random();
    this.g = Math.random();
    this.b = Math.random();
    return this;
  }
  
  // 0x00ff37 insteaf of "#00ff37"
  // setHex( hex, colorSpace = SRGBColorSpace ) {
  setHex( hex ) {

		hex = Math.floor( hex );

		this.r = ( hex >> 16 & 255 ) / 255;
		this.g = ( hex >> 8 & 255 ) / 255;
		this.b = ( hex & 255 ) / 255;

    // not using this yet
		//ColorManagement.toWorkingColorSpace( this, colorSpace );

		return this;

	}
  

  
}
