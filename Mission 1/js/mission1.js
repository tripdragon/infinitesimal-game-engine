

export class Basestation{
  
  canvas = null;
  
  constructor(canvasId) {
    this.bootUp_CM(canvasId);
  }
  
  bootUp_CM(canvasId){
    this.canvas = document.getElementById(canvasId);
        
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
          
          
    // Initialize the GL context
    const gl = this.canvas.getContext("webgl");

    // Only continue if WebGL is available and working
    if (gl === null) {
      alert(
        "Unable to initialize WebGL. Your browser or machine may not support it."
      );
      return;
    }

    // Set clear color to black, fully opaque
    gl.clearColor(0.0, 0.4, 0.7, 1.0);
    // Clear the color buffer with specified clear color
    gl.clear(gl.COLOR_BUFFER_BIT);
  }
  
}
