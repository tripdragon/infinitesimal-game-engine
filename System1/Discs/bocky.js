

// Basic example of a basic buch of things in the view

// hrmmm dont like going UP a folder for games stuff
// it makes a game nested
import { Polygon } from "../Primitives/Polygon.js";
import { Rectangle } from "../Primitives/Rectangle.js";

import { Game } from "../Core/Game.js";

import { keyboard } from '../Modules/input.js';

export let disc = new Game("bocky");

disc.load = function(){

  // changing the sapce mode for a platformer game

  this.system.screenSpaceMode = this.system.screenModes.screen;
  this.system.reboot();

  // here we pump objects into the Systems scene grapth
  // Base charactor objects!!
  // here we have a wordy but very direct example of custom scripting for each object square
  // in this example the first arg is gl which is not available yet so well set it in the loop
  //var sq1 = new SquareLike(null, -4, 4, 4, 6);
  // sq1.playCode = `return { do : function(obj, helpers){
  //   obj.x = helpers.randomBetween(-4,4);
  //   obj.color.x = Math.random();
  //   obj.color.y = Math.random();
  //   obj.color.z = Math.random();
  // }}`;

  // constructor(gl, points = [], x, y, scalar, color = {x:1.0, y:1.0, z:1.0, w:1.0}) {
  var points = [
    -1,1,
    -1,-1,
    1,-1,
    1,1,
    // other tri
    -1,1,
    1,-1
  ];
  // the points units -1,1 makes for a width of 2
  //var sq1 = new Polygon(null, points, -2, 4, 2);
  //var sq1 = new Polygon(null, points, 10, 0, 0.5);
  
  var x = window.innerWidth / 2;
  var y = window.innerHeight / 2;
  // var player = new Polygon("player", points, x, y, 10);
  var player = new Rectangle("player", x, 340, 20, 20);
  // var player = new Rectangle("player", x, 340, 120, 120);


  // APPPP.sceneGrapth.addActor();
  this.system.sceneGrapth.add(player);
  
  
  // render order, this renders next
  // var border1 = new Rectangle("wall", 20, y + 40, 600, 30, {x:0,y:0.5,z:0,w:0});
  var border1 = new Rectangle("wall", 400, 400, 200, 50, {x:0,y:0.5,z:0,w:0});
  this.system.sceneGrapth.add(border1);
  
  
  var border2 = new Rectangle("wall", 400, 200, 200, 50, {x:0,y:0.5,z:0,w:0});
  this.system.sceneGrapth.add(border2);
  
  var walls = [border1, border2];
  
  // console.log(border1.origin.x);
  // here we can see that origin is not correct yet
  // console.log(border1.origin.x, border1.origin.y);
  // var centerOfBorder = new Rectangle("wall 2", border1.origin.x + border1.x, border1.origin.y + border1.y, 1, 1, {x:1.0,y:0.4,z:1.0,w:0});
  // this.system.sceneGrapth.add(centerOfBorder);
  
  //
  // set up walk system, should go into a composition module
  //
  var arrowsDown = {
    up: false, down: false, left: false, right: false
  }
  
  // 
  // ADDIng to the loop
  // 
  //speed
  var x = 19.5;
  var y = 19.5;
  
  var previousPos = {x:player.x,y:player.y};
  
  this.system.loopHookPoints.beforeDraw = function(){
    
    
    
    if(arrowsDown.left){
      player.x += -x;
    }
    if(arrowsDown.right){
      player.x += x;
    }
    // in screen space we need to flip y
    if(arrowsDown.down){
      player.y += -y * -1;
    }
    if(arrowsDown.up){
      player.y += y * -1;
    }
    
    //
    // AABB hit testing
    //
    // the objects dont yet have self updating world position bounding boxes
    // so well just calculate them here
    // x = -40 width = 100
    // -40 + 100 = 60 ?
    // 
    // aa = {
    //   x: -20, y: -40, width: 200, height : 20,
    //   origin : {x: 200 / 2, height : 20 /2 }
    // }
    {
      var wasIn = false;
    // for (var i = 0; i < walls.length; i++) {
    for (var i = 0; i < APPPP.colliders.length; i++) {
      var wall = APPPP.colliders[i];
      // var wall = walls[i];
      // cheap for now dont test player collide
      if(wall === player){
        continue;
      }
    
      
      var isINnnn = false;
      
      var p_minX = player.x; // if top left is origin
      var p_maxX = player.width + player.x;
      var p_minY = player.y; // if top lft is origin
      var p_maxY = player.height + player.y;
      
      var w_minX = wall.x; // if top left is origin
      var w_maxX = wall.width + wall.x;
      var w_minY = wall.y; // if top lft is origin
      var w_maxY = wall.height + wall.y;
      
      
      // if(p_minX >= w_minX && p_minX <= w_maxX ||
      //   p_maxX >= w_minY && p_maxX <= w_maxX) {
      //     if (p_minY >= w_minY && p_minY <= w_maxY ||
      //       p_maxY >= w_minY && p_maxY <= w_maxY) {
      //       console.log("in");
      //       isINnnn = true;
      //     }
      //     else {
      //       console.log("ouuttt¿¿¿");
      //     }
      //   }  
      // else {
      //   console.log("out");
      // }
      // 
      
    //   if(player.x < border1.x + border1.width &&
    // player.x + player.width > border1.x &&
    // player.y < border1.y + border1.height &&
    // player.y + player.height > border1.y)
    if(p_minX < w_maxX &&
  p_maxX > w_minX &&
  p_minY < w_maxY &&
  p_maxY > w_minY)
{
    isINnnn = true;
}

      
      if(isINnnn){
        // console.log("innnn?");
        wall.color = {x:0,y:0,z:1,w:0};
      }
      else {
        // console.log("ouuuut???");
        wall.color = {x:0,y:0.5,z:0,w:0};
      }
      

if(wasIn == false && isINnnn == true){
  wasIn = true;
}
      
}
// 
// if(isINnnn){
//   player.x = previousPos.x;
//   player.y = previousPos.y;
// }
// else {
//   previousPos.x = player.x;
//   previousPos.y = player.y;
// }
// 

if(wasIn){
  player.x = previousPos.x;
  player.y = previousPos.y;
}
else {
  previousPos.x = player.x;
  previousPos.y = player.y;
}
      

      
    }
  }
  
  
  // set up walking player
  keyboard({
    ArrowLeft_down: (ev) => {
      // console.log(ev);
      // console.log(player);
      // sq1.x += -1;
      // isArrowLeftDown = true;
      // console.log(ev);
      // console.log("down!");
      arrowsDown.left = true;
    },
    ArrowLeft_up: (ev) => {
      // console.log(ev);
      // console.log(sq1);
      // sq1.x += -1;
      // isArrowLeftDown = true;
      // console.log(ev);
      // console.log("up!");
      arrowsDown.left = false;
    },
    ArrowRight_up: (ev) => {
      // console.log("up!");
      arrowsDown.right = false;
    },
    ArrowRight_down: (ev) => {
      // console.log("down!");
      arrowsDown.right = true;
    },
    ArrowUp_up: (ev) => {
      arrowsDown.up = false;
    },
    ArrowUp_down: (ev) => {
      arrowsDown.up = true;
    },
    ArrowDown_up: (ev) => {
      arrowsDown.down = false;
    },
    ArrowDown_down: (ev) => {
      arrowsDown.down = true;
    },

  });

};
