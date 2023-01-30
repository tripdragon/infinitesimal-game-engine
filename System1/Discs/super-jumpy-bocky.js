

// Basic example of a basic buch of things in the view

// hrmmm dont like going UP a folder for games stuff
// it makes a game nested
import { Polygon } from "../Primitives/Polygon.js";
import { Rectangle } from "../Primitives/Rectangle.js";

import { Game } from "../Core/Game.js";

import { keyboard } from '../Modules/input/keyboard.js';
import { randomBetween } from "../Modules/mathness.js";

import { AABBTest } from "../Modules/Colliders/collisions.js";

export let disc = new Game("superjumpybocky");

disc.load = function(){

  // changing the screen space mode for a platformer game
  this.system.screenSpaceMode = this.system.screenModes.screen;
  this.system.reboot();

  

  // the points units -1,1 makes for a width of 2
  //var sq1 = new Polygon(null, points, -2, 4, 2);
  //var sq1 = new Polygon(null, points, 10, 0, 0.5);
  
  var x = window.innerWidth / 2;
  var y = window.innerHeight / 2;
  // var player = new Polygon("player", points, x, y, 10);
  var player = new Rectangle("player", 500, 140, 20, 20);
  // var player = new Rectangle("player", x, 340, 120, 120);
  window.player = player;

  // APPPP.sceneGrapth.addActor();
  this.system.sceneGrapth.add(player);
  
  
  // render order, this renders next
  // var border1 = new Rectangle("wall", 20, y + 40, 600, 30, {r:0,g:0.5,b:0,a:1});
  var border1 = new Rectangle("wall", 40, 600, 400, 50, {r:0,g:0.5,b:0,a:1});
  this.system.sceneGrapth.add(border1);
  border1.onCollide = function(){
    console.log("wap!", border1.name);
    // soundboard1.play();
    // var ss = new Audio("./Discs/Soundeffects/bleep-audiomass-output.wav");
    // ss.play();
  }
  border1.shiftLeft = randomBetween(1,100);

  
  
  var border2 = new Rectangle("wall", 400, 200, 200, 50, {r:0,g:0.5,b:0,a:1});
  this.system.sceneGrapth.add(border2);
  border2.onCollide = function(){
    console.log("wap!", border2.name);
    // soundboard1.play();
    // var ss = new Audio("./Discs/Soundeffects/bleep-audiomass-output.wav");
    // ss.play();
  }
  border2.shiftLeft = randomBetween(1,100);

  
  var walls = [border1, border2];
  
  // console.log(border1.origin.x);
  // here we can see that origin is not correct yet
  // console.log(border1.origin.x, border1.origin.y);
  // var centerOfBorder = new Rectangle("wall 2", border1.origin.x + border1.x, border1.origin.y + border1.y, 1, 1, {x:1.0,y:0.4,z:1.0,a:1});
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
  player.speed = 19.5;
  // var x = 19.5;
  // var y = 19.5;
  
  var previousPos = {x:player.x,y:player.y};
  
  
  var mTime = Date.now();
  this.system.loopHookPoints.beforeDraw = function(){
    var delta = Date.now() - mTime;
    player.y += (delta * 0.01 ) + 9.7;
    mTime = Date.now();
    
    if(arrowsDown.left){
      player.x += -player.speed;
    }
    if(arrowsDown.right){
      player.x += player.speed;
    }
    // in screen space we need to flip y
    if(arrowsDown.down){
      player.y += -player.speed * -1;
    }
    if(arrowsDown.up){
      player.y += player.speed * -1;
    }
    
    // ASTROIDS!!!! like
    if(player.x > window.innerWidth){
      player.x = 0;
    }
    else if(player.x < 0){
      player.x = window.innerWidth;
    }
    if(player.y > window.innerHeight){
      player.y = 0;
    }
    else if(player.y < 0){
      player.y = window.innerHeight;
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
    
    // this handles all tests so we can cache its position
    var wasIn = false;
    
    
    
    {

      // for (var i = 0; i < walls.length; i++) {
      for (var i = 0; i < APPPP.colliders.length; i++) {
        // break;
        var isInMuch = false;
        
        var wall = APPPP.colliders[i];
        // var wall = walls[i];
        // cheap for now dont test player collide
        if(wall === player){
          continue;
        }
        
        // do a moving and generative effect
        if(wall.shiftLeft){
          wall.x += wall.shiftLeft * 0.05;
          if (wall.x > window.innerWidth){
            wall.x = -wall.width;
                wall.shiftLeft = randomBetween(1,100);
          }
        }
      
        isInMuch = AABBTest(player, wall);
        
        if(isInMuch){
          // console.log("innnn?");
          wall.color = {r:0,g:0,b:1,a:1};
          wall.onCollide();
        }
        else {
          // console.log("ouuuut???");
          wall.color = {r:0,g:0.5,b:0,a:1};
        }
      

        if(wasIn == false && isInMuch == true){
          wasIn = true;
        }
            
      } // colliders loop
      
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
    1 : (ev) => {
      player.setScaletemp(0.1);
    },
    2 : (ev) => {
      player.setScaletemp(1);
    },
    3 : (ev) => {
      player.setScaletemp(2);
    },
    q : (ev) => {
      player.speed = Math.max(player.speed - 1, 1);
    },
    w : (ev) => {
      player.speed = Math.max(player.speed + 1, 10);
    },
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



  

  var that = this;
  var index = 5;
  function addHipToBeSquare(ev){
    console.log(ev, "fish");
    
    index++;
    
    const xx = randomBetween(0,window.innerWidth);
    const xy = randomBetween(0,window.innerHeight);
    const ww = randomBetween(0.5,400);
    const wh = randomBetween(1,50);
    // need a technique to make tall walls
    
    var border1 = new Rectangle("wall" + index, xx, xy, ww, wh, {r:0,g:0.5,b:0,a:1});
    
    border1.shiftLeft = randomBetween(1,100);
    
    // cant play if the wall test is overlap for now
    if( AABBTest(player, border1) == true){
      return;
    }
    
    that.system.sceneGrapth.add(border1);
    
    border1.onCollide = function(){
      // new Audio()
      // var ss = new Audio("./Discs/Soundeffects/bleep-audiomass-output.wav");
      // ss.play();

      // soundboard1.stop();
      // soundboard1.play();
      // setTimeout(()=> {
      // 
      //      window.soundboard1.stop();
      // 
      //  }, 10);
    }
    
    // var sq1 = new SquareLike(null, -xx, xy, ww, wh);
    // sq1.playCode = `return { do : function(obj, helpers){
    //   obj.x = helpers.randomBetween(${-xx},${xy});
    //   obj.color.x = Math.random();
    //   obj.color.y = Math.random();
    //   obj.color.z = Math.random();
    // }}`;
    
    // that.system.sceneGrapth.add(border1);

    if(that.system.runtimeState !== "play"){
      // should have a draw command
      that.system.loop();
    }
    
    console.log("?¿¿¿?!??!");
    
  }

  
  
  // make a ton!!!
  for (var i = 0; i < 40; i++) {
    addHipToBeSquare();
  }
  
  




};
// stop  loop??
