

// Basic example of a basic buch of things in the view

// hrmmm dont like going UP a folder for games stuff
// it makes a game nested

import { Game } from "../Core/Game.js";

import { Rectangle } from "../Primitives/Rectangle.js";
import { Plane } from "../Primitives/Plane.js";



import { Editor111 } from "../Editor/Editor111.js";
// import { ToolsController as _ToolsController } from "../Tools/ToolsController.js";
// import { Tool } from "../Tools/Tool.js";
// import { BotStamp } from "../Tools/BotStamp.js";

export let disc = new Game("loadEditor111");

disc.load = function(){

  var _this = this;


  // changing the screen space mode for a platformer game
  this.system.screenSpaceMode = this.system.screenModes.screen;
  this.system.reboot();


  console.log("panels start like");
  
  this.system.backgroundColor = {r:0,g:0.05,b:0.05,a:1};

  var box2 = new Plane("plane", 400, 500, 200, 80, {r:0.4,g:0.4,b:0.7,a:1});
  var box3 = new Plane("plane", 360, 400, 160, 70, {r:0.0,g:0.9,b:0.2,a:1});
  this.system.sceneGrapth.add(box2);
  this.system.sceneGrapth.add(box3);


  

  
  var EditorMagic = new Editor111(this.system);
  
  EditorMagic.launch_CM();
  
  

};
