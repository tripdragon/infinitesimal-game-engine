

//
//
// This shows a game in progress and then loades the Editor ontop of it!!!
// Where we can for this editor add in some bots and drag them for now
//

import { Game } from "../Core/Game.js";

import { Rectangle } from "../Primitives/Rectangle.js";
import { Plane } from "../Primitives/Plane.js";
import { Platform } from "../Primitives/Platform.js";
import { Polygon } from "../Primitives/Polygon.js";
import { Vector3 } from "../Modules/Vector3.js";

import { VisualPlane } from "../Primitives/VisualPlane.js";



// import { Editor111 } from "../Editor/editor111.js";
// import { Alien1 } from "../Cast/Alien1.js";
// import { Actor } from "../Primitives/Actor.js";
import { Player } from "../Primitives/Player.js";

import { Editor111 } from "../Editor/editor111.js";


export let disc = new Game("mixer-bittunes");

disc.load = function(){

  var _this = this;

  var EditorMagic = new Editor111(this.system);
  
  EditorMagic.launch_CM();
  

  // changing the screen space mode for a platformer game
  this.system.screenSpaceMode = this.system.screenModes.screen;
  this.system.reboot();

  this.system.cameraZoom = 0.4;

  console.log("panels start like");
  
  this.system.backgroundColor = {r:0,g:0.05,b:0.05,a:1};







  // 
  // // 
  // // 
  // var cSize1 = 1200;
  // var notclouds1 = new Plane("not clouds 1", 540, 420, 0, cSize1, cSize1, {r:1,g:1,b:1,a:1}, this.system);
  // notclouds1.canCollide = false;
  // this.system.add(notclouds1);
  // notclouds1.loadImage("./Cast/NFT_could_this_be_ourealy.png");
  // 
  // 
  
  for (var i = 0; i < 86; i++) {
  
    var w = 80;
    var h = 12;
    var xx = 200;
    var yy = i;
    var box = new Platform("plane", xx, ((i*(h+1))+ 10), 0, w, h, {r:1,g:1,b:1,a:1}, this.system);
    this.system.add(box);
  
  }
  
  


};
