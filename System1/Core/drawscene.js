


// OBSOLETE for now
// it is used at start but it gets swapped later
// so we just put in a return for now

// Main GL render system


// needs concept of camera next


// import { randomBetween } from "../Modules/mathness.js";
// import { loadSquares } from "../Demos/loadSquares.js";
// import { SquareLike } from "../Primitives/squareLike.js";
// import { randomBetween } from "../Modules/mathness.js";

console.warn("This is rendering once and giving errors before the game is ready!!!!¿¿¿");
//export function drawScene(gl, programInfo, buffers, positionCheap = {x:0, y:0, z:-76.0} ) {
export function drawScene(app, gl, programInfo, positionCheap = {x:0, y:0, z:-76.0} ) {
  
  // debugger
  return;
  
  
  // gl.clearColor(0.0, 0.0, 0.0, 1.0); // Clear to black, fully opaque
  var color = app.backgroundColor;
  gl.clearColor(color.r, color.g, color.b, color.a); // Clear to black, fully opaque
  gl.clearDepth(1.0); // Clear everything
  gl.enable(gl.DEPTH_TEST); // Enable depth testing
  gl.depthFunc(gl.LEQUAL); // Near things obscure far things

  // Clear the canvas before we start drawing on it.

  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

  // Create a perspective matrix, a special matrix that is
  // used to simulate the distortion of perspective in a camera.
  // Our field of view is 45 degrees, with a width/height
  // ratio that matches the display size of the canvas
  // and we only want to see objects between 0.1 units
  // and 100 units away from the camera.

  const fieldOfView = (45 * Math.PI) / 180; // in radians
  const aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;
  const zNear = 0.1;
  const zFar = 400.0;
  const projectionMatrix = mat4.create();

  // note: glmatrix.js always has the first argument
  // as the destination to receive the result.
  mat4.perspective(projectionMatrix, fieldOfView, aspect, zNear, zFar);

  // Set the drawing position to the "identity" point, which is
  // the center of the scene.
  const modelViewMatrix = mat4.create();

  // Now move the drawing position a bit to where we want to
  // start drawing the square.
  mat4.translate(
    modelViewMatrix, // destination matrix
    modelViewMatrix, // matrix to translate
    //[-20.0, 20.0, -76.0]
    // [positionCheap.x, positionCheap.y, positionCheap.z]
    [0,0,positionCheap.z]
    // [0,0,0]
  ); // amount to translate


  // Set the shader uniforms
  gl.uniformMatrix4fv(
    programInfo.uniformLocations.projectionMatrix,
    false,
    projectionMatrix
  );
  gl.uniformMatrix4fv(
    programInfo.uniformLocations.modelViewMatrix,
    false,
    modelViewMatrix
  );

  
  // Tell WebGL to use our program when drawing
  gl.useProgram(programInfo.program);
  
  const positionBuffer = gl.createBuffer();
  
  var colorUniformLocation = gl.getUniformLocation(programInfo.program, "u_color");

  //gl.bindBuffer(gl.ARRAY_BUFFER, buffers.position);
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
  
    
  // Tell WebGL how to pull out the positions from the position
  // buffer into the vertexPosition attribute.
  // setPositionAttribute(gl, buffers, programInfo);
  const numComponents = 2; // pull out 2 values per iteration
  const type = gl.FLOAT; // the data in the buffer is 32bit floats
  const normalize = false; // don't normalize
  const stride = 0; // how many bytes to get from one set of values to the next
  // 0 = use type and numComponents above
  const offset = 0; // how many bytes inside the buffer to start from
  gl.vertexAttribPointer(
    programInfo.attribLocations.vertexPosition,
    numComponents,
    type,
    normalize,
    stride,
    offset
  );
  
  

  gl.enableVertexAttribArray(programInfo.attribLocations.vertexPosition);

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


  
  // setRectangle(gl, randomBetween(-4,4), 8, 12, 8);
  // gl.uniform4f(colorUniformLocation, Math.random(), Math.random(), Math.random(), 1);
  // gl.drawArrays(primitiveType, offset2, vertexCount);
  // 
  // 
  // setRectangle(gl, -9, randomBetween(-4,4), 8, 8);
  // gl.uniform4f(colorUniformLocation, Math.random(), Math.random(), Math.random(), 1);
  // gl.drawArrays(primitiveType, offset2, vertexCount);
  // 
  // 
  // 
  // setRectangle(gl,-24, randomBetween(-4,4) + -22, 8, 12);
  // gl.uniform4f(colorUniformLocation, Math.random(), Math.random(), Math.random(), 1);
  // gl.drawArrays(primitiveType, offset2, vertexCount);
  // 
  
  // var gg = loadSquares(gl, colorUniformLocation);
  // 
  // for (var i = 0; i < gg.length; i++) {
  //   gg[i]();
  //   gl.drawArrays(primitiveType, offset2, vertexCount);
  // 
  // }
  
  // thiws goes into a APP cache
  {
    // here we have a wordy but very direct example of custom scripting for each object square
  //   var sq1 = new SquareLike(gl, -4, 4, 12, 8);
  //   sq1.playCode = `return { do : function(obj, helpers){
  //     obj.x = helpers.randomBetween(-4,4);
  //     obj.color.x = Math.random();
  //     obj.color.y = Math.random();
  //     obj.color.z = Math.random();
  //   }}`;
  //   var sq2 = new SquareLike(gl, -4 + -12, 4, 12, 8);
  //   sq2.playCode = `return { do : function(obj, helpers){
  //     // obj.x = helpers.randomBetween(-14,14);
  //     obj.y = helpers.randomBetween(-14,14);
  //     obj.color.x = Math.random();
  //     obj.color.y = Math.random();
  //     obj.color.z = Math.random();
  //   }}`;
  //   var sq3 = new SquareLike(gl, -4 + -12, 4 + -12, 8, 12);
  //   sq3.playCode = `return { do : function(obj, helpers){
  //     obj.x = helpers.randomBetween(-24,24);
  //     // obj.y = helpers.randomBetween(-14,14);
  //     obj.color.x = Math.random();
  //     obj.color.y = Math.random();
  //     obj.color.z = Math.random();
  //   }}`;
  // var ff = [
  //     sq1, sq2, sq3
  //     // new SquareLike(gl, randomBetween(-4,4) + 12, randomBetween(-4,4) - 12, 12, 8),
  //     // new SquareLike(gl, randomBetween(-22,-18) , randomBetween(-22-18), 12, 8),
  // ];
  
  // for (var i = 0; i < ff.length; i++) {
  //   //ff[i].draw(colorUniformLocation);
  //   ff[i].play(colorUniformLocation);
  //   gl.drawArrays(primitiveType, offset2, vertexCount);
  // }
  
  // NOW the objects are from the scene grapth!!!
  // tyme for plus button!!!
  const offset2 = 0;
  const vertexCount = 6;// 3 for tri, 6 for 2 tris making a square
  var primitiveType = gl.TRIANGLES;
  
  for (var i = 0; i < app.sceneGrapth.objects.length; i++) {
    var ff = app.sceneGrapth.objects[i];
    ff.gl = gl;
    ff.play(colorUniformLocation);
    var vertexCount2 = ff.pointsCount;
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
}
