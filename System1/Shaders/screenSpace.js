


// this ones flipped -y, y 0 starts at top
// its annoying

export const vScreen = `
    
    attribute vec4 aVertexPosition;
    
    // not yet
    //uniform mat4 uModelViewMatrix;
    
    // not yet
    uniform mat4 uProjectionMatrix;
    
    uniform vec2 u_resolution;
    
    uniform mat4 u_matrix;
    
    
    attribute vec2 a_texCoord;

    varying vec2 v_texCoord;
    
    
    
    void main() {
      
      // convert the position from pixels to 0.0 to 1.0
      
      
      // old
      // vec2 zeroToOne = aVertexPosition.xy / u_resolution;
      
      vec2 zeroToOne = (u_matrix * aVertexPosition).xy / u_resolution;
        // convert from 0->1 to 0->2
      vec2 zeroToTwo = zeroToOne * 2.0;
        // convert from 0->2 to -1->+1 (clip space)
      vec2 clipSpace = zeroToTwo - 1.0;
      
      // not yet
      // gl_Position = uProjectionMatrix * uModelViewMatrix * aVertexPosition;

        // need to flip y to up      
      // gl_Position = vec4(clipSpace * vec2(1, -1), 0, 1); // upside down world!!!
      
        // original
      gl_Position = vec4(clipSpace * vec2(1, 1), 0, 1);
      
      // no
      // gl_Position = u_matrix * aVertexPosition;
      
      // Pass the texcoord to the fragment shader.
      
      gl_Position = u_matrix * aVertexPosition;
      v_texCoord = a_texCoord;
      
    }
  `;
  
// frag
export const fScreen = `
    precision mediump float;
    uniform vec4 u_color;
    
    // Passed in from the vertex shader.
    varying vec2 v_texCoord;
     
    // The texture.
    uniform sampler2D u_texture;

    void main() {
      // gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);
      // gl_FragColor = u_color;
      gl_FragColor = texture2D(u_texture, v_texCoord);
    }
  `;
