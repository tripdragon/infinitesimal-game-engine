

// Fill the buffer with the values that define a rectangle.
// export function setRectangle(gl, x, y, width, height) {
//   var x1 = x;
//   var x2 = x + width;
//   var y1 = y;
//   var y2 = y + height;
//   gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
//      x1, y1,
//      x2, y1,
//      x1, y2,
//      x1, y2,
//      x2, y1,
//      x2, y2,
//   ]), gl.STATIC_DRAW);
// }


export function setRectangle(gl, x, y, width, height) {
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
