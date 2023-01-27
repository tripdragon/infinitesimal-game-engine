

//
//
// This shows a game in progress and then loades the Editor ontop of it!!!
// Where we can for this editor add in some bots and drag them for now
//

import { Game } from "../Core/Game.js";

import { Rectangle } from "../Primitives/Rectangle.js";
import { Plane } from "../Primitives/Plane.js";



import { Editor111 } from "../Editor/editor111.js";
import { Alien1 } from "../Cast/Alien1.js";


export let disc = new Game("loadEditor111");

disc.load = function(){

  var _this = this;


  // changing the screen space mode for a platformer game
  this.system.screenSpaceMode = this.system.screenModes.screen;
  this.system.reboot();


  console.log("panels start like");
  
  this.system.backgroundColor = {r:0,g:0.05,b:0.05,a:1};

  // var box2 = new Plane("plane", 400, 500, 200, 80, {r:0.4,g:0.4,b:0.7,a:1});
  // this.system.sceneGrapth.add(box2);
  
  
  var box3 = new Plane("plane", 440, 400, 460, 70, {r:0.0,g:0.9,b:0.2,a:1}, this.system);
  this.system.sceneGrapth.add(box3);
  window.box3 = box3;

  // debugger
  var aa = new Alien1("aa", 260, 320, 40, 40, {r:0,g:1,b:1,a:1}, this.system);
  this.system.sceneGrapth.add(aa);
  // aa.system = this.system;
  // aa.canUpdate = false;
  aa.platform = box3;
  
  aa.useGravity = false;
  aa.walkSpeed = 1.2;
  aa.directionVector.x = 1;
  aa.hasTurned = false;
  aa.update = function(){
    // this.x + 1;
    var platform = this.platform;
    
    this.y = platform.max.y + -this.height + -2;
    
    this.updateWalking(this.system.time.delta, 9);
    
    // filp direction
    if (this.x >= platform.max.x){
      aa.directionVector.x *= -1;
      this.x = platform.max.x;
    }
    else if (this.x <= box3.min.x){
      aa.directionVector.x *= -1;
      this.x = platform.min.x;
    }
    
  }
  

  

  
  var EditorMagic = new Editor111(this.system);
  
  EditorMagic.launch_CM();
  
  

};
