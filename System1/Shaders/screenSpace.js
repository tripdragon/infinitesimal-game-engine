




export const vScreen = `
    
    attribute vec4 aVertexPosition;
    // attribute vec2 aVertexPosition;
    
    uniform mat4 uModelViewMatrix;
    
    uniform mat4 uProjectionMatrix;
    
    uniform vec2 u_resolution;
    
    
    
    void main() {
      
      // convert the position from pixels to 0.0 to 1.0
      vec2 zeroToOne = aVertexPosition.xy / u_resolution;
      
      // convert from 0->1 to 0->2
      vec2 zeroToTwo = zeroToOne * 2.0;
      
      // convert from 0->2 to -1->+1 (clip space)
      vec2 clipSpace = zeroToTwo - 1.0;

      // gl_Position = uProjectionMatrix * uModelViewMatrix * aVertexPosition;
      
      // need to flip y to up
      gl_Position = vec4(clipSpace * vec2(1, -1), 0, 1);
    }
  `;
  
// frag
export const fScreen = `
    precision mediump float;
    uniform vec4 u_color;
    void main() {
      // gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);
      gl_FragColor = u_color;
    }
  `;
