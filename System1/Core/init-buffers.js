



// Obsolete

export function initBuffers(gl, shaderProgram) {
  // const positionBuffer = initPositionBuffer(gl);
  
  const positionBuffer = gl.createBuffer();
  
  // Select the positionBuffer as the one to apply buffer
  // operations to from here out.
  var colorUniformLocation = gl.getUniformLocation(shaderProgram, "u_color");
  
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
  
  setRectangle(gl, 4, 8, 8, 8);
  gl.uniform4f(colorUniformLocation, Math.random(), Math.random(), Math.random(), 1);
  
  
  // Draw the rectangle.
  // gl.drawArrays(gl.TRIANGLES, 0, 6);

  setRectangle(gl, -9, -9, 8, 8);

  return {
    position: positionBuffer,
  };
}


/*
function initPositionBuffer(gl) {
  // Create a buffer for the square's positions.
  const positionBuffer = gl.createBuffer();

  // Select the positionBuffer as the one to apply buffer
  // operations to from here out.
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

  // Now create an array of positions for the square.
  // const sq1 = [2.0, 1.0, -1.0, 1.0, 1.0, -1.0, -1.0, -1.0];
  // var sq2 = [8.0, 1.0, 7.0, 1.0, 8.0, -1.0, 7.0, -1.0];
  // var x = 4;
  // var y = 4;
  // 
  
  const positions = [2.0, 1.0, -1.0, 1.0, 1.0, -1.0, -1.0, -1.0];
  // var positions = sq1.concat(sq2)

  // Now pass the list of positions into WebGL to build the
  // shape. We do this by creating a Float32Array from the
  // JavaScript array, then use it to fill the current buffer.
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);
  
  // var sq2 = [8.0, 1.0, 7.0, 1.0, 8.0, -1.0, 7.0, -1.0];
  // gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(sq2), gl.STATIC_DRAW);
  // 

  return positionBuffer;
}
*/




// Fills the buffer with the values that define a rectangle.
function setRectangle(gl, x, y, width, height) {
  var x1 = x;
  var x2 = x + width;
  var y1 = y;
  var y2 = y + height;
 
  // NOTE: gl.bufferData(gl.ARRAY_BUFFER, ...) will affect
  // whatever buffer is bound to the `ARRAY_BUFFER` bind point
  // but so far we only have one buffer. If we had more than one
  // buffer we'd want to bind that buffer to `ARRAY_BUFFER` first.
  
  var positions = [
    x1 + 2, y1,
    x1, y2 + 2,
    x2 + 4, y2,
    x2 + 2, y1,
    // other tri
    x1 + 2, y1,
    x2 + 4, y2
  ];

  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);
}
