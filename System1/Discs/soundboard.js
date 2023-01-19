

// Basic example of a basic buch of things in the view

// hrmmm dont like going UP a folder for games stuff
// it makes a game nested

import { Game } from "../Core/Game.js";

import { keyboard } from '../Modules/input.js';

export let disc = new Game("soundboard");

disc.load = function(){

  //
  // set up walk system, should go into a composition module
  //
  var arrowsDown = {
    up: false, down: false, left: false, right: false
  }

  var x = 0.5;
  var y = 0.5;
  this.system.loopHookPoints.beforeDraw = function(){
    if(arrowsDown.left){
      // sq1.x += -x;
    }
    if(arrowsDown.right){
      // sq1.x += x;
    }
    if(arrowsDown.down){
      // sq1.y += -y;
    }
    if(arrowsDown.up){
      // sq1.y += y;
    }
  }

  keyboard({
    a: (ev) => {
      // console.log(ev);
      console.log("aaa !");
      arrowsDown.left = true;
    },
    A: (ev) => {
      // console.log(ev);
      console.log("AAAA !");
      arrowsDown.left = true;
    },
    a_down: (ev) => {
      // console.log(ev);
      
      console.log("a down!");
      arrowsDown.left = true;
    }
    // ArrowLeft_up: (ev) => {
    //   // console.log(ev);
    //   // console.log(sq1);
    //   // sq1.x += -1;
    //   // isArrowLeftDown = true;
    //   // console.log(ev);
    //   console.log("up!");
    //   arrowsDown.left = false;
    // },


  }, false);

};
