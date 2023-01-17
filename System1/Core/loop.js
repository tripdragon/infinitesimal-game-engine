


export let loop = function(){
// animate() {
  //requestAnimationFrame( animate.bind(this) );
  //requestAnimationFrame( animate.bind(this) );
  if(this.runtimeState === "play"){
    this.loopID = requestAnimationFrame( this.loop.bind(this) );
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
  
  this.loopHookPoints.beforeDraw();
  //drawScene(gl, programInfo, buffers, fauxPointer);
  // drawScene(gl, programInfo);
  this.drawScene(this, this.gl, this.programInfo, this.fauxPointer);
  
};
