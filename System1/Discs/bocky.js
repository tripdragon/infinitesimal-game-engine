

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
  this.system.spaceMode = "screen";
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
  var x = 4.5;
  var y = 4.5;
  
  var previousPos = {x:player.x,y:player.y};
  
  this.system.loopHookPoints.beforeDraw = function(){
    
    var isINnnn = false;
    
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
      var p_minX = player.x; // if top left is origin
      var p_maxX = player.width + player.x;
      var p_minY = player.y; // if top lft is origin
      var p_maxY = player.height + player.y;
      
      var w_minX = border1.x; // if top left is origin
      var w_maxX = border1.width + border1.x;
      var w_minY = border1.y; // if top lft is origin
      var w_maxY = border1.height + border1.y;
      
      
      // console.log("player w ", p_minX, p_maxX, "h ", p_minY, p_maxY);
      // console.log("wall w ", w_minX, w_maxX, "h ", w_minY, w_maxY);
      // console.log(p_minX, p_maxX, p_minY, p_maxY);
      
      // console.log(border1);
      // console.log(player);
      
      // console.log("player.x ", p_minX);
      
      // var isIn = false;
      // // border1.color = {x:0,y:0,z:1,w:0};
      // if(p_minX >= w_minX || p_maxX <= w_maxX && p_minY >= w_minY || p_maxY <= w_maxY){
      //   isIn = true;
      // }
      
      
      // 
      // if(isIn){
      //   console.log("in??");
      //   border1.color = {x:0,y:0,z:1,w:0};
      // }
      // else {
      //   console.log("out???");
      //   border1.color = {x:0,y:1,z:0,w:0};
      // }
      
      // console.log("player.x", player.x, player.width);
      // console.log("wall.x", border1.x, border1.width, border1.height, border1.y);
      
      // if(p_minX >= w_minX && p_maxY <= w_maxY || p_maxY >= w_minY && p_maxY <= w_maxY){
      //   console.log("x in");
      // }
      // else {
      //   console.log("x out");
      // }
      
      // if(p_minX >= w_minX && p_maxX <= w_maxX){
      //   console.log("x in");
      // }
      // else {
      //   console.log("x out");
      // }
      
      // console.clear()
      // if(p_minY >= w_minY && p_maxY <= w_maxY){
      //   console.log("y in");
      // }
      // else {
      //   console.log("y out");
      // }
      // 
      // function testlike(p,w){
      //   if(p.w.min >= w.w.min || p.w.max <= w.w.max &&
      //     p.h.min >= w.h.min || p.h.max <= w.h.max){
      //     console.log("in");
      //   }
      //   else {
      //     console.log("out");
      //   }
      // }
      
      // pp =  {w:{min:10,max:20}, h:{min:10,max:20} };
      // ww = {w:{min:0,max:40}, h:{min:8,max:30} };
      // testlike(pp,ww)
      
      // player w  386.5 406.5 h  440 460
      // wall w    400 600 h      447.5 497.5
      // 
      // player w  386.5 406.5 h  440 460 bocky.js:122:15
      // wall w    400 600 h  447.5 497.5
      
      // player w  389 409 h  460 480 bocky.js:122:15
        // wall w  400 600 h  447.5 497.5
        
        // console.log("player.height", player.height);
        // console.log("wall.height", border1.height);
      
      // if (p_minX >= w_minX && p_minX <= w_maxX ||
      //   p_maxX >= w_minY && p_maxX <= w_maxX) {
      //   console.log("x in");
      // }
      // else {
      //   console.log("x out");
      // }
      
      // if (p_minY >= w_minY && p_minY <= w_maxY ||
      // p_maxY >= w_minY && p_maxY <= w_maxY) {
      //   console.log("y in");
      // }
      // else {
      //   console.log("y out");
      // }
      
      // 
      // if(p_minX >= w_minX && p_minX <= w_maxX ||
      //   p_maxX >= w_minY && p_maxX <= w_maxX
      //   &&
      //   p_minY >= w_minY && p_minY <= w_maxY ||
      //   p_maxY >= w_minY && p_maxY <= w_maxY
      // ){
      //   console.log("in");
      // }
      // else {
      //   console.log("out");
      // }
      
      // var isINnnn = false;
      
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
      
      
      // 
      // function intersect(a, b) {
      //   return (
      //     a.minX <= b.maxX &&
      //     a.maxX >= b.minX &&
      //     a.minY <= b.maxY &&
      //     a.maxY >= b.minY
      //   );
      // }
      // 
      // isINnnn = intersect({minX:p_minX, maxX: p_maxX}, {minX:w_minX, maxX: w_maxX});
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
        console.log("innnn?");
        border1.color = {x:0,y:0,z:1,w:0};
      }
      else {
        console.log("ouuuut???");
        border1.color = {x:0,y:0.5,z:0,w:0};
      }
      
  if(isINnnn){
    player.x = previousPos.x;
    player.y = previousPos.y;
  }
  else {
    previousPos.x = player.x;
    previousPos.y = player.y;
  }
      
      
      // if(p_minX >= w_minX ){
      //   console.log("x min in");
      // }
      // else {
      //   console.log("x min out");
      // }
      
      // if(p_maxX <= w_maxX ){
      //   console.log("x max in");
      // }
      // else {
      //   console.log("x max out");
      // }
      
      
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
