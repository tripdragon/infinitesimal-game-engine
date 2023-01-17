

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
  var sq1 = new Polygon("player", points, x, y, 10);

  // APPPP.sceneGrapth.addActor();
  this.system.sceneGrapth.add(sq1);
  
  
  // render order, this renders next
  var border1 = new Rectangle("wall", 20, y + 40, 600, 30, {x:0,y:0.5,z:0,w:0});
  this.system.sceneGrapth.add(border1);
  
  // console.log(border1.origin.x);
  // here we can see that origin is not correct yet
  console.log(border1.origin.x, border1.origin.y);
  var centerOfBorder = new Rectangle("wall 2", border1.origin.x + border1.x, border1.origin.y + border1.y, 1, 1, {x:1.0,y:0.4,z:1.0,w:0});
  this.system.sceneGrapth.add(centerOfBorder);
  
  //
  // set up walk system, should go into a composition module
  //
  var arrowsDown = {
    up: false, down: false, left: false, right: false
  }
  
  //speed
  var x = 2.5;
  var y = 2.5;
  this.system.loopHookPoints.beforeDraw = function(){
    if(arrowsDown.left){
      sq1.x += -x;
    }
    if(arrowsDown.right){
      sq1.x += x;
    }
    // in screen space we need to flip y
    if(arrowsDown.down){
      sq1.y += -y * -1;
    }
    if(arrowsDown.up){
      sq1.y += y * -1;
    }
  }

  keyboard({
    ArrowLeft_down: (ev) => {
      // console.log(ev);
      // console.log(sq1);
      // sq1.x += -1;
      // isArrowLeftDown = true;
      // console.log(ev);
      console.log("down!");
      arrowsDown.left = true;
    },
    ArrowLeft_up: (ev) => {
      // console.log(ev);
      // console.log(sq1);
      // sq1.x += -1;
      // isArrowLeftDown = true;
      // console.log(ev);
      console.log("up!");
      arrowsDown.left = false;
    },
    ArrowRight_up: (ev) => {
      console.log("up!");
      arrowsDown.right = false;
    },
    ArrowRight_down: (ev) => {
      console.log("down!");
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
