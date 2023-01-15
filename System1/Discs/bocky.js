

// Basic example of a basic buch of things in the view

// hrmmm dont like going UP a folder for games stuff
// it makes a game nested
import { Polygon } from "../Primitives/Polygon.js";

import { Game } from "../Core/Game.js";

import { keyboard } from '../Modules/input.js';


export let disc = new Game("bocky");

disc.load = function(){
  
  // Need a scene grapth
  
  
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
  var sq1 = new Polygon(null, points, -2, 4, 2);

  // APPPP.sceneGrapth.addActor();
  this.system.sceneGrapth.add(sq1);
  
  
  var arrowsDown = {
    up: false, down: false, left: false, right: false
  }
  
  var x = 0.5;
  var y = 0.5;
  this.system.loopHookPoints.beforeDraw = function(){
    if(arrowsDown.left){
      sq1.x += -x;
    }
    if(arrowsDown.right){
      sq1.x += x;
    }
    if(arrowsDown.down){
      sq1.y += -y;
    }
    if(arrowsDown.up){
      sq1.y += y;
    }
  }

    

  keyboard({
    ArrowLeft: (ev) => {
      // console.log(ev);
      // console.log(sq1);
      // sq1.x += -1;
      // isArrowLeftDown = true;
      // console.log(ev);
      if(ev.type === "keyup"){
        console.log("up!");
        arrowsDown.left = false;
      }
      if( ev.type === "keydown") {
        console.log("down!");
        arrowsDown.left = true;
      }
    },
    ArrowRight: (ev) => {
      if(ev.type === "keyup"){
        console.log("up!");
        arrowsDown.right = false;
      }
      if( ev.type === "keydown") {
        console.log("down!");
        arrowsDown.right = true;
      }
    },
    ArrowUp: (ev) => {
      if(ev.type === "keyup"){
        arrowsDown.up = false;
      }
      if( ev.type === "keydown") {
        arrowsDown.up = true;
      }
    },
    ArrowDown: (ev) => {
      if(ev.type === "keyup"){
        arrowsDown.down = false;
      }
      if( ev.type === "keydown") {
        arrowsDown.down = true;
      }
    },

  });

};
