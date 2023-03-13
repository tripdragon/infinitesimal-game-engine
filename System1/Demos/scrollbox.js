

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

import { Grid } from "../Modules/Grid.js";


export let disc = new Game("scrollbox");

disc.load = function(){

  var _this = this;

  var EditorMagic = new Editor111(this.system);
  
  // EditorMagic.launch_CM();
  

  // changing the screen space mode for a platformer game
  this.system.screenSpaceMode = this.system.screenModes.screen;
  this.system.reboot();

  this.system.cameraZoom = 0.4;

  console.log("panels start like");
  
  this.system.backgroundColor = {r:0,g:0.05,b:0.05,a:1};




// this wont work
// its too janky in where and how
// so instead! we can infact generate positions and do hit testing on them DIFERENTLY
// group the  y up colums and do a hit test on that
// and then do a hit test on all in column
// not not perfect, but it allows offset

// THOUGh we could cast the point into the local space of the box and do snap testing that way

  // need a grid
  // so its .snap()
  // 
  
  var bb = new Plane("scroll space", 280, 100, 0, 600, 500, {r:0.1,g:0.3,b:0.8,a:1});
  bb.setOriginAndGeometry("leftBottom");
  // gg.setOriginAndGeometry("rightBottom");
  // gg.setOriginAndGeometry("rightTop");
  // gg.setOriginAndGeometry("leftTop");
  this.system.add(bb);
  bb.isSelectableAlways = true;
  
  
  var gg = new Plane("big thingy", 280, 100, 0, 400, 300, {r:0.1,g:1,b:0,a:1});
  gg.setOriginAndGeometry("leftBottom");
  this.system.add(gg);
  gg.isSelectableAlways = false;
  
  bb.parent = gg;
  bb.position.set(0,0,0);

  var _update = bb.update.bind(bb);
  bb.update = function() {
    _update();
  }
  bb.onHoverIn = function () {
    console.log("????");
  }




};
