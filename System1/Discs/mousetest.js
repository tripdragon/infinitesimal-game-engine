

// Basic example of a basic buch of things in the view

// hrmmm dont like going UP a folder for games stuff
// it makes a game nested
import { Polygon } from "../Primitives/Polygon.js";
import { Rectangle } from "../Primitives/Rectangle.js";

import { Game } from "../Core/Game.js";

import { keyboard } from '../Modules/input.js';
import { randomBetween } from "../Modules/mathness.js";

import { AABBTest, pointInRect } from "../Modules/collisions.js";

export let disc = new Game("mousetest");

disc.load = function(){

  // changing the screen space mode for a platformer game
  this.system.screenSpaceMode = this.system.screenModes.screen;
  this.system.reboot();


  // Since its screen space 0,0 top left
  // mouse testing SHOULD be pretty forward

  var pointer = {x:0,y:0};
  
  function onPointerMove( event ) {

  	// calculate pointer position in normalized device coordinates
  	// (-1 to +1) for both components

  	// pointer.x = ( event.clientX / window.innerWidth ) * 2 - 1;
  	// pointer.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
    // pointer.x = ( event.clientX / window.innerWidth );
  	// pointer.y = - ( event.clientY / window.innerHeight ) * -1;
    pointer.x = event.clientX ;
    pointer.y = event.clientY;
    // console.log(pointer);
  }
  
  window.addEventListener( 'pointermove', onPointerMove );
  
  // in world space for now
  // function pointInRect(point, rect){
  //   var wasin = false;
  //   if(point.x > rect.x && point.y > rect.y && point.x < rect.width + rect.x && point.y < rect.height + rect.y){
  //     return true;
  //   }
  //   return wasin;
  // }
  
  // Player, and its collision needs to be ratified to clear out some of this copy code
  
  

  
  var x = window.innerWidth / 2;
  var y = window.innerHeight / 2;
  // var player = new Polygon("player", points, x, y, 10);
  var player = new Rectangle("player", 500, 140, 20, 20);
  // var player = new Rectangle("player", x, 340, 120, 120);
  window.player = player;
  //speed
  player.speed = 19.5;

  
  this.system.sceneGrapth.add(player);
  // 
  // 
  // console.log(border1.origin.x);
  // here we can see that origin is not correct yet
  // console.log(border1.origin.x, border1.origin.y);
  // var centerOfBorder = new Rectangle("wall 2", border1.origin.x + border1.x, border1.origin.y + border1.y, 1, 1, {x:1.0,y:0.4,z:1.0,w:0});
  // this.system.sceneGrapth.add(centerOfBorder);
  
  var isMouseDown = false;
  var mPointerPos = {x:0,y:0};
  var mSelectedPos = {x:0,y:0};
  var selectedObject = null;
  var wasEverIN = false;
  
  function onPointerDown(ev){
    
    if(selectedObject !== null && pointInRect(pointer, selectedObject)){
      mode = modes.canDrag;
      mPointerPos.x = pointer.x;
      mPointerPos.y = pointer.y;
      mSelectedPos.x = selectedObject.x;
      mSelectedPos.y = selectedObject.y;
    }
    isMouseDown = true;
  }
  
  function onPointerUp(ev){
    mode = modes.mousing;
    isMouseDown = false;
  }
  
  window.addEventListener( 'pointerdown', onPointerDown );
  window.addEventListener( 'pointerup', onPointerUp );
  
  
  var modes = {
    mousing : "mousing",
    canDrag : "canDrag",
  }
  
  var mode = modes.mousing;
  
  
  
  
  var mTime = Date.now();
  var delta;
  
  this.system.loopHookPoints.beforeDraw = function(){
  
    delta = Date.now() - mTime;
  
    
    
    

    // this handles all tests so we can cache its position
    
    
    mouseSelecting();
    playerWalking();
    
    mTime = Date.now();

  } // loop
  
  
  
  
  // 
  // Functionsssssss
  // 
  
  
  function mouseSelecting(){
    
    if(mode === modes.mousing){
      var wasIn = false;
      var wasEverIN = false;
      selectedObject = null;
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
        
        wall.color = {x:0,y:0.5,z:0,w:0};
        var wasin = pointInRect(pointer, wall);
        // console.log(wall.width, wall.height);
        // console.log(pointer);
        if(wasin){
            wall.color = {x:0,y:0,z:1,w:0};
            if(wasEverIN == false){
              wasEverIN = true;
              selectedObject = wall;
            }
            break;
        }
        
        // // do a moving and generative effect
        // if(wall.shiftLeft){
        //   wall.x += wall.shiftLeft * 0.05;
        //   if (wall.x > window.innerWidth){
        //     wall.x = -wall.width;
        //         wall.shiftLeft = randomBetween(1,100);
        //   }
        // }
        // 
        // isInMuch = AABBTest(player, wall);
        // 
        // if(isInMuch){
        //   // console.log("innnn?");
        //   wall.color = {x:0,y:0,z:1,w:0};
        //   wall.onCollide();
        // }
        // else {
        //   // console.log("ouuuut???");
        //   wall.color = {x:0,y:0.5,z:0,w:0};
        // }
        // 
        // 
        // if(wasIn == false && isInMuch == true){
        //   wasIn = true;
        // }
            
      } // colliders loop
      
      

      
    }
    }
    
    else if(mode === modes.canDrag){
      // need to know if the pointer is down on the object
      if(selectedObject !== null){
        // selectedObject.x = pointer.x + mPointerPos.x;
        // selectedObject.y = pointer.y + mPointerPos.y;
        // selectedObject.x = pointer.x + -20;
        // selectedObject.y = pointer.y;
        selectedObject.x = pointer.x + (mSelectedPos.x - mPointerPos.x);
        selectedObject.y = pointer.y + (mSelectedPos.y - mPointerPos.y);
        // selectedObject.y = mSelectedPos.y + pointer.y;
      }
    }
    
    
  } // mouseSelecting
  
  
  
  var playerPreviousPos = {x:0,y:0};
  
  function playerWalking(){
    
    player.y += (delta * 0.01 ) + 9.7;
    
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
        // if(wall.shiftLeft){
        //   wall.x += wall.shiftLeft * 0.05;
        //   if (wall.x > window.innerWidth){
        //     wall.x = -wall.width;
        //         wall.shiftLeft = randomBetween(1,100);
        //   }
        // }
      
        isInMuch = AABBTest(player, wall);
        
        if(isInMuch){
          // console.log("innnn?");
          wall.color = {x:0,y:0,z:1,w:0};
          wall.onCollide();
        }
        else {
          // console.log("ouuuut???");
          wall.color = {x:0,y:0.5,z:0,w:0};
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
        player.x = playerPreviousPos.x;
        player.y = playerPreviousPos.y;
      }
      else {
        playerPreviousPos.x = player.x;
        playerPreviousPos.y = player.y;
      }
            

      
    }
  } // playerWalking
  
  
  var arrowsDown = {
    up: false, down: false, left: false, right: false
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
    const ww = randomBetween(1,400);
    const wh = randomBetween(1,100);
    // need a technique to make tall walls
    
    var border1 = new Rectangle("wall" + index, xx, xy, ww, wh, {x:0,y:0.5,z:0,w:0});
    
    border1.shiftLeft = randomBetween(1,100);
    
    // cant play if the wall test is overlap for now
    if( AABBTest(player, border1) == true){
      return;
    }
    
    that.system.sceneGrapth.add(border1);
    
    // border1.onCollide = function(){
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
    // }
    
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
  for (var i = 0; i < 20; i++) {
    addHipToBeSquare();
  }
  
  




};
// stop  loop??
