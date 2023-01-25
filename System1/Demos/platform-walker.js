

// showing a bot attached to a platform


import { Game } from "../Core/Game.js";

import { Rectangle } from "../Primitives/Rectangle.js";
import { Plane } from "../Primitives/Plane.js";
// import { AABBTestScreenSpace } from "../Modules/collisions.js";




export let disc = new Game("platformwalker");

disc.load = function(){

  this.system.screenSpaceMode = this.system.screenModes.screen;
  this.system.reboot();

  
  // var platform1 = new Rectangle("platform1", 300, 440, 300, 80, {r:0,g:0.8,b:0.1,a:1});
  // var platform1 = new Plane("platform1", 5, 5, 10, 10, {r:0,g:0.8,b:0.1,a:1});
  var platform1 = new Plane("platform1", 400, 500, 200, 80, {r:0,g:0.8,b:0.1,a:1});
  this.system.sceneGrapth.add(platform1);
  window.platform1 = platform1;
  
  var size = 10;
  
  var p0 = new Plane("platform1", 300, 400, size, size, {r:1,g:0,b:0,a:1});
  this.system.sceneGrapth.add(p0);
  window.p0 = p0;
  
  
  var p1 = new Plane("platform1", 320, 420, size, size, {r:0,g:1,b:0,a:1});
  this.system.sceneGrapth.add(p1);
  window.p1 = p1;
  
  
  p0.position.copy(platform1.min);
  p1.position.copy(platform1.max);
  
  
  
  var platform2 = new Plane("platform2", 280, 450, 80, 60, {r:0,g:0,b:1,a:1});
  this.system.sceneGrapth.add(platform2);
  window.platform2 = platform2;
  platform2.boxPadding = 5;
  
  
  var p0 = new Plane("platform1", 300, 400, size, size, {r:1,g:0,b:0,a:1});
  this.system.sceneGrapth.add(p0);
  window.p0 = p0;
  
  
  var p1 = new Plane("platform1", 320, 420, size, size, {r:0,g:1,b:0,a:1});
  this.system.sceneGrapth.add(p1);
  window.p1 = p1;
  
  p0.position.copy(platform2.min);
  p1.position.copy(platform2.max);
  
  // platform1.y += -200;
  // 
  // p0.position.copy(platform1.min);
  // p1.position.copy(platform1.max);





console.log(platform1.boundingBox);
console.log(platform2.boundingBox);

  // if(AABBTestScreenSpace(platform1, platform2)){
  //   console.log("Yay!!!");
  // }
  // else {
  //   console.log("NARF");
  // }
  
  
  
  var _this = this;
  
  function onPointerMove( event ) {

    platform2.x = _this.system.pointer.x;
    platform2.y = _this.system.pointer.y;
    
    
    p0.position.copy(platform2.min);
    p1.position.copy(platform2.max);
    
    // if(platform2.intersectsScreenSpace(platform1)){
    if(platform2.intersectsScreenSpaceWithPadding(platform1)){
      console.log("Yay!!!");
      platform2.color = {r:1,g:1,b:0,a:1}
    }
    else {
      console.log("NARF");
      platform2.color = {r:0,g:0,b:1,a:1}
    }
    
    
  }

  window.addEventListener( 'pointermove', onPointerMove );


  
  
  // 
  // 
  // var p2 = new Plane("platform1", 340, 440, size, size, {r:0,g:0,b:1,a:1});
  // this.system.sceneGrapth.add(p2);
  // 
  // 
  // var p3 = new Plane("platform1", 360, 460, size, size, {r:1,g:1,b:1,a:1});
  // this.system.sceneGrapth.add(p3);
  
  // compute min max in world space???
  // three has some nice min.min and expandBoxByPoint fun
  // but we just need it main is put point in world

};
