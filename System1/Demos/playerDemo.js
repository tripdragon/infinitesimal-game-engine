

//
//
// This shows a game in progress and then loades the Editor ontop of it!!!
// Where we can for this editor add in some bots and drag them for now
//

import { Game } from "../Core/Game.js";

import { Rectangle } from "../Primitives/Rectangle.js";
import { Plane } from "../Primitives/Plane.js";
import { Platform } from "../Primitives/Platform.js";



// import { Editor111 } from "../Editor/editor111.js";
// import { Alien1 } from "../Cast/Alien1.js";
// import { Actor } from "../Primitives/Actor.js";
import { Player } from "../Primitives/Player.js";


export let disc = new Game("playerDemo");

disc.load = function(){

  var _this = this;


  // changing the screen space mode for a platformer game
  this.system.screenSpaceMode = this.system.screenModes.screen;
  this.system.reboot();


  console.log("panels start like");
  
  this.system.backgroundColor = {r:0,g:0.05,b:0.05,a:1};

  // var box2 = new Plane("plane", 400, 500, 200, 80, {r:0.4,g:0.4,b:0.7,a:1});
  // this.system.sceneGrapth.add(box2);
  
  
  // var box3 = new Plane("plane", 440, 400, 260, 70, {r:0.0,g:0.9,b:0.2,a:1}, this.system);
  var box3 = new Platform("plane", 440, 400, 360, 70, {r:0.0,g:0.9,b:0.2,a:1}, this.system);
  this.system.sceneGrapth.add(box3);
  window.box3 = box3;

  
  
  
  var box4 = new Platform("plane", 540, 520, 360, 70, {r:0.0,g:0.9,b:0.2,a:1}, this.system);
  this.system.sceneGrapth.add(box4);
  window.box4 = box4;


  
  var box5 = new Platform("plane", 240, 240, 360, 30, {r:0.0,g:0.9,b:0.2,a:1}, this.system);
  this.system.sceneGrapth.add(box5);
  

    


  // debugger
  // var aa = new Alien1("aa", 320, 320, 40, 40, {r:0,g:1,b:1,a:1}, this.system);
  // this.system.sceneGrapth.add(aa);
  // // aa.canUpdate = false;
  // // for now we need some defaults items to get the bot to walk
  // // aa.platform = box3;
  // // aa.directionVector.x = 1;
  
  // aa.start();
  
  
  // var aa = new Actor("aa", 320, 320, 40, 40, {r:0,g:1,b:1,a:1}, this.system);
  var aa = new Player("aa", 470, 300, 40, 40, {r:0,g:1,b:1,a:1}, this.system);
  this.system.sceneGrapth.add(aa);
  // aa.canUpdate = false;
  // for now we need some defaults items to get the bot to walk
  // aa.platform = box3;
  // aa.directionVector.x = 1;
  
  aa.start();
  
  // aa.platform = box3;
  
  // aa.useGravity = false;
  // aa.mGravity = 0.01;
  // aa.update = function(){
  //   if(!aa.platform){
  //     this.useGravity = true;
  //   }
  //   else {
  //     this.useGravity = false;
  // 
  //   }
  //   this.updateWalking2();
  // }
  
  // aa.useGravity = false;
  // aa.walkSpeed = 4.2;
  // aa.directionVector.x = 1;
  // aa.hasTurned = false;
  // aa.update = function(){
  //   // this.x + 1;
  //   var platform = this.platform;
  // 
  //   this.y = platform.max.y + -this.height + -2;
  // 
  //   this.updateWalking(this.system.time.delta, 9);
  // 
  //   // filp direction
  //   if (this.x >= platform.max.x){
  //     aa.directionVector.x *= -1;
  //     this.x = platform.max.x;
  //   }
  //   else if (this.x <= box3.min.x){
  //     aa.directionVector.x *= -1;
  //     this.x = platform.min.x;
  //   }
  // 
  // }
  

  


};
