
// this is typeof System()

export let loop = function(){

  if(this.runtimeState === "play"){
    this.loopID = requestAnimationFrame( this.loop.bind(this) );
  }
  // console.log("popcorn");
  
  this.time.now = Date.now();
  this.time.delta = this.time.now - this.time.mTime;

  // renderer.render( scene, camera );
  // console.log(this.pointer);
  //console.log("moof");
  
  
  this.loopHookPoints.editorBeforeDraw();
  
  this.loopHookPoints.beforeDraw();
  
  // drawScene(gl, programInfo);
  // this.drawScene(this, this.gl, this.programInfo, this.fauxPointer);
  this.drawScene(this, this.gl, this.programInfo);
  
  this.time.mTime = this.time.now;
};



var time;
function updateTimes(system){
  time = new Date();
  system.time.millisecondsSinceStarted = time.getMilliseconds();
  system.time.sinceStarted = Date.now();
}
