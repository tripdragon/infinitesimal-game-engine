
import { initShaderProgram, vsSource, fsSource} from './shaders.js';
import { initBuffers } from './init-buffers.js';
import { drawScene } from "./draw-scene.js";

import { loadSquares } from "../Demos/loadSquares.js";
import { SceneGrapth } from "../Modules/SceneGrapth.js";

export class Basestation {
  
  canvas = null;
  
  time = {
    sinceStarted : 0,
    sincePaused : 0,
    constantRuntime : 0,
    delta : 0
  };
  // time since game start, this is paused when game is paused
  gameTime = 0;
  
  // need a default far z
  pointer = { x: 0, y: 0, z:-76.0};
  pointerXYScalar = 12;
  
  sceneGrapth = new SceneGrapth();
  
  // need enum
  runtimeState = "play"; // play pause step?
  // APPPP.runtimeState = "pause"
  // then step
  //APPPP.animate()
  
  
  fauxPointer = {};
  
  programInfo;
  gl;
  
  
  constructor(canvasId) {
    this.bootUp_CM(canvasId);
  }
  
  
  
  onPointerMove( event ) {
    this.pointer.x = ( event.clientX / window.innerWidth ) * 2 - 1;
    this.pointer.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
  }
  
  
  bootUp_CM(canvasId){
    this.canvas = document.getElementById(canvasId);
        
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
          
          
    // Initialize the GL context
    // const gl = this.canvas.getContext("webgl");
    const gl = this.canvas.getContext("webgl");
    this.gl = gl;
    
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
    
    
    
    // Initialize a shader program; this is where all the lighting
    // for the vertices and so forth is established.
    const shaderProgram = initShaderProgram(gl, vsSource, fsSource);

    // Collect all the info needed to use the shader program.
    // Look up which attribute our shader program is using
    // for aVertexPosition and look up uniform locations.
    const programInfo = {
      program: shaderProgram,
      attribLocations: {
        vertexPosition: gl.getAttribLocation(shaderProgram, "aVertexPosition"),
      },
      uniformLocations: {
        projectionMatrix: gl.getUniformLocation(shaderProgram, "uProjectionMatrix"),
        modelViewMatrix: gl.getUniformLocation(shaderProgram, "uModelViewMatrix"),
      },
    };
    this.programInfo = programInfo;
    
    // Here's where we call the routine that builds all the
    // objects we'll be drawing.
    // const buffers = initBuffers(gl, shaderProgram);


    // Draw the scene
    //drawScene(gl, programInfo, buffers);
    drawScene(this, gl, programInfo);

    

    // window.addEventListener( 'resize', onWindowResize );
    document.addEventListener( 'pointermove', this.onPointerMove.bind(this) );
    
    // 
    // loop loop loop loop loop loop loop
    // 
    
    var that = this;
    
    // var fauxPointer = {};
    
		// function animate() {
    //   if(that.runtimeState === "play"){
    //     requestAnimationFrame( animate );
    //   }
    //   // console.log("popcorn");
		// 	// cube.rotation.x += 0.01;
		// 	// cube.rotation.y += 0.01;
    // 
		// 	// renderer.render( scene, camera );
    //   // console.log(that.pointer);
    //   //console.log("moof");
    // 
    //   // we need a larger mouse mover
    //   fauxPointer.x = that.pointer.x * that.pointerXYScalar;
    //   fauxPointer.y = that.pointer.y * that.pointerXYScalar;
    //   //fauxPointer.z = that.pointer.z;
    //   fauxPointer.z = -100.0;
    // 
    //   //drawScene(gl, programInfo, buffers, fauxPointer);
    //   // drawScene(gl, programInfo);
    //   drawScene(that, gl, programInfo, fauxPointer);
    // 
		// };
    // function animate() {
    //   //requestAnimationFrame( animate.bind(this) );
    //   //requestAnimationFrame( animate.bind(this) );
    //   requestAnimationFrame( animate.bind(this) );
    // 
    //   if(this.runtimeState === "play"){
    //   }
    //   // console.log("popcorn");
    //   // cube.rotation.x += 0.01;
    //   // cube.rotation.y += 0.01;
    // 
    //   // renderer.render( scene, camera );
    //   // console.log(this.pointer);
    //   //console.log("moof");
    // 
    //   // we need a larger mouse mover
    //   fauxPointer.x = this.pointer.x * this.pointerXYScalar;
    //   fauxPointer.y = this.pointer.y * this.pointerXYScalar;
    //   //fauxPointer.z = this.pointer.z;
    //   fauxPointer.z = -100.0;
    // 
    //   //drawScene(gl, programInfo, buffers, fauxPointer);
    //   // drawScene(gl, programInfo);
    //   drawScene(this, gl, programInfo, fauxPointer);
    // 
    // };

		// animate.bind(this);
    // animate(this);
    // animate().bind(this);
    this.animate.call(this);


  }
  
  animate() {
    //requestAnimationFrame( animate.bind(this) );
    //requestAnimationFrame( animate.bind(this) );
    if(this.runtimeState === "play"){
      requestAnimationFrame( this.animate.bind(this) );
    }
    // console.log("popcorn");
    // cube.rotation.x += 0.01;
    // cube.rotation.y += 0.01;

    // renderer.render( scene, camera );
    // console.log(this.pointer);
    //console.log("moof");
    
    // we need a larger mouse mover
    this.fauxPointer.x = this.pointer.x * this.pointerXYScalar;
    this.fauxPointer.y = this.pointer.y * this.pointerXYScalar;
    //this.fauxPointer.z = this.pointer.z;
    this.fauxPointer.z = -100.0;
    
    //drawScene(gl, programInfo, buffers, fauxPointer);
    // drawScene(gl, programInfo);
    drawScene(this, this.gl, this.programInfo, this.fauxPointer);
    
  };
  

}
