
// see #GLRWORK

// this is run in a loop for the entire apps contents
// it handles all objects for now

// import {mat4} from 'https://cdn.skypack.dev/gl-matrix';

export function drawSceneScreenspace(app, gl, programInfo ) {
// export function drawSceneScreenspace(app, gl, programInfo, positionCheap = {x:0, y:0, z:-76.0} ) {
  
  
  // webglUtils.resizeCanvasToDisplaySize(gl.canvas);

  var color = app.backgroundColor;
  
  // var color = {r:0.0, g:0.0, b:0.7, a:1};
  // console.log("color",color);
  
  gl.clearColor(color.r, color.g, color.b, color.a); // Clear to black, fully opaque
  // gl.clearColor(0, 0, 1, 1); // Clear to black, fully opaque
  
  gl.clearDepth(1.0); // Clear everything
  gl.enable(gl.DEPTH_TEST); // Enable depth testing
  gl.depthFunc(gl.LEQUAL); // Near things obscure far things
  

  // Clear the canvas before we start drawing on it.
  // Tell WebGL how to convert from clip space to pixels
  
  
  // FOR NOW, this is a simple camera for offset entire scene
  // gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
  // gl.viewport(app.cameraDefault.x, app.cameraDefault.y, gl.canvas.width*app.cameraZoom, gl.canvas.height*app.cameraZoom);
  gl.viewport(app.cameraDefault.x, app.cameraDefault.y, gl.canvas.width, gl.canvas.height);
  // gl.viewport(0, 0, window.innerWidth, window.innerHeight);
  
  
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

  // Create a perspective matrix, a special matrix that is
  // used to simulate the distortion of perspective in a camera.
  // Our field of view is 45 degrees, with a width/height
  // ratio that matches the display size of the canvas
  // and we only want to see objects between 0.1 units
  // and 100 units away from the camera.

  // const fieldOfView = (45 * Math.PI) / 180; // in radians
  // const aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;
  // const zNear = 0.1;
  // const zFar = 400.0;
  // const projectionMatrix = mat4.create();

  // note: glmatrix.js always has the first argument
  // as the destination to receive the result.
  // mat4.perspective(projectionMatrix, fieldOfView, aspect, zNear, zFar);

  // Set the drawing position to the "identity" point, which is
  // the center of the scene.
  // const modelViewMatrix = mat4.create();
  // 
  // // Now move the drawing position a bit to where we want to
  // // start drawing the square.
  // mat4.translate(
  //   modelViewMatrix, // destination matrix
  //   modelViewMatrix, // matrix to translate
  //   //[-20.0, 20.0, -76.0]
  //   // [positionCheap.x, positionCheap.y, positionCheap.z]
  //   [0,0,positionCheap.z]
  //   // [0,0,0]
  // ); // amount to translate
  // 
  // 
  // // Set the shader uniforms
  // gl.uniformMatrix4fv(
  //   programInfo.uniformLocations.projectionMatrix,
  //   false,
  //   projectionMatrix
  // );
  // gl.uniformMatrix4fv(
  //   programInfo.uniformLocations.modelViewMatrix,
  //   false,
  //   modelViewMatrix
  // );
  
      // moving as much out of the loop as can
      // maybe need to recompute camera in loop
      // Compute the projection matrix
// var aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;
// var projectionMatrix =
//     m4.perspective(fieldOfViewRadians, aspect, 1, 2000);
                  // 
                  // 
                  //   // Tell WebGL to use our program when drawing
                  //   gl.useProgram(programInfo.program);
                  // 
                  //   // #GLRWORK does this belong here????
                  //   const positionBuffer = gl.createBuffer();
                  // 
                  //   // #GLRWORK
                  //   // does this belong here????
                  //   var colorUniformLocation = gl.getUniformLocation(programInfo.program, "u_color");
                  // // 
                  //   var matrixUniformLocation = gl.getUniformLocation(programInfo.program, "u_matrix");
                  // 
                  // 
                  // // debugger
                  // 
                  // // var mm = new mat4.create()
                  // 
                  // 
                  //   //gl.bindBuffer(gl.ARRAY_BUFFER, buffers.position);
                  //   gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
                  // 
                  // 
                  //   // Tell WebGL how to pull out the positions from the position
                  //   // buffer into the vertexPosition attribute.
                  //   // setPositionAttribute(gl, buffers, programInfo);
                  //   // const numComponents = 2; // pull out 2 values per iteration
                  //   const numComponents = 3; // pull out 3 values per iteration for xyz
                  //   const type = gl.FLOAT; // the data in the buffer is 32bit floats
                  //   const normalize = false; // don't normalize
                  //   const stride = 0; // how many bytes to get from one set of values to the next
                  //   // 0 = use type and numComponents above
                  //   const offset = 0; // how many bytes inside the buffer to start from
                  //   gl.vertexAttribPointer(
                  //     programInfo.attribLocations.vertexPosition,
                  //     numComponents,
                  //     type,
                  //     normalize,
                  //     stride,
                  //     offset
                  //   );
                  // 
                  // 
                  // 
                  //   gl.enableVertexAttribArray(programInfo.attribLocations.vertexPosition);
                  // 
                  //   // Pass in the canvas resolution so we can convert from
                  //   // pixels to clipspace in the shader
                  //   if(programInfo.uniformLocations.resolution){
                  //     //console.log("resolution", programInfo.uniformLocations.resolution);
                  //     gl.uniform2f(programInfo.uniformLocations.resolution, gl.canvas.width, gl.canvas.height);
                  //   }


  // NOW the objects are from the scene grapth!!!
  // tyme for plus button!!!
  const offset2 = 0;
  // const vertexCount = 6;// 3 for tri, 6 for 2 tris making a square
  
  var primitiveType = gl.TRIANGLES;
  
  for (var i = 0; i < app.sceneGrapth.objects.length; i++) {
    var ff = app.sceneGrapth.objects[i];
    ff.gl = gl;
    // 
    if(ff.subType === "worldsdfsdg"){
      // debugger
      
      // if (ff.x > 400) {
      //   ff.x -= 20;
      // }
      // else {
      // 
      // }
      if (ff.diiir === undefined) {
        ff.diiir = "r";
      }
      if(ff.x <= -400){
        ff.diiir = "r";
      }
      else if(ff.x >= 400){
        ff.diiir = "l";
      }
      
      var val = 4;
      if(ff.diiir === "r"){
          ff.x += val;
      }
      else if(ff.diiir === "l"){
          ff.x -= val;
      }
      
      
      
      // ff.x += Math.cos(this.time.delta) * 10 ;
      
    }
    
    if(ff.name !== "world"){
      // debugger
    }
    // new!
    ff.refreshMatrixes();
    
    // Update and play need to be merged
    
    // does logic stuff, then draws
    // Hrrrmmmmm, yes its needed
    ff.update();
    
    // This too has logics for animations
    // THIS for now is how its computing transforms
    // Say in Quark.js or Polygon
    ff.play();
    
    // debugger
    // this handles any transforms in geometry
    // or matrixes
    // not sure if these should be in the objects class instead
    ff.draw(this.colorUniformLocation, this.matrixUniformLocation);
    
    var vertexCount = ff.pointsCount;
    gl.drawArrays(primitiveType, offset2, vertexCount);
  }
}

  // {

    // gl.drawArrays(primitiveType, offset2, vertexCount);

  // }
  
  // {
  //   const offset = 0;
  //   const vertexCount = 6;// 3 for tri, 6 for 2 tris making a square
  //   var primitiveType = gl.TRIANGLES;
  //   // var primitiveType = gl.TRIANGLE_STRIP;
  //   gl.drawArrays(primitiveType, offset, vertexCount);
  // }
  
// } ????
