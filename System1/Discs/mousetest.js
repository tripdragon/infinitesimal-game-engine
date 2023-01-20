

// Basic example of a basic buch of things in the view

// hrmmm dont like going UP a folder for games stuff
// it makes a game nested
import { Polygon } from "../Primitives/Polygon.js";
import { Rectangle } from "../Primitives/Rectangle.js";

import { Game } from "../Core/Game.js";

import { keyboard } from '../Modules/input/keyboard.js';
import { randomBetween } from "../Modules/mathness.js";

import { AABBTest, pointInRect } from "../Modules/collisions.js";


import { Actor } from "../Primitives/Actor.js";

export let disc = new Game("mousetest");

disc.load = function(){

  // changing the screen space mode for a platformer game
  this.system.screenSpaceMode = this.system.screenModes.screen;
  this.system.reboot();

  var _this = this;
  
  
  this.system.gravity = 9.7;
  
  var modes = {
    mousing : "mousing",
    canDrag : "canDrag",
    canDraw : "canDraw"
  }
  
  var mode = modes.mousing;
  
  


  // add draw button
  
  // block for : add button for making squares
  {
    var controls = document.createElement('div');
    controls.id = "controls";
    controls.style.cssText = `
    position: absolute;
    top: 0px;
    left: 0px;
    z-index: 2;
    /* background: green; */
    width: 100px;
    height: 100px;
    padding: 20px 0 0 20px;
    `;
    var button = document.createElement('button');
    button.classList.add("button");
    button.classList.add("add");
    button.innerText = "+";
    button.style.cssText = `width: 32px;
    height: 32px;`;
    controls.appendChild(button);
    // var gg = document.getElementById("bodyInjectionPointMain");
    var gg = document.getElementById("gamespace");
    gg.innerHTML = "";
    // document.body.appendChild(controls);
    // gg.appendChild(controls);

// <<<<<<
// stuck at im[plementing draw]
    var mDrawingRectPointer = {x:0,y:0};
    
    
  
    function startDrawMode(ev){
      
      // remove event is Maaaybe the right way
      // but its also so strict
      if(mode !== modes.canDraw){
        console.log("canDraw");
        mode = modes.canDraw;
        console.log("mode", mode);
        window.removeEventListener( 'pointerdown', mouseSelectDown );
        window.removeEventListener( 'pointerup', mouseSelectOnPointerUp );
      }
      else if(mode === modes.canDraw){
        console.log("canDraw exit");
        window.addEventListener( 'pointerdown', mouseSelectDown );
        window.addEventListener( 'pointerup', mouseSelectOnPointerUp );
        mode = modes.mousing;
      }
      
    }
  
    let add = document.querySelector("#controls .add");
    if(add){
        add.addEventListener( "click", startDrawMode, false );
    }
    
    
    function mouseDrawRect(ev){
      
    }

    
  }


  // Since its screen space 0,0 top left
  // mouse testing SHOULD be pretty forward

  var pointer = {x:0,y:0};
  
  function onPointerMove( event ) {

  	// calculate pointer position in normalized device coordinates
  	// (-1 to +1) for both components
    
    // need for when camera is in 3d
  	// pointer.x = ( event.clientX / window.innerWidth ) * 2 - 1;
  	// pointer.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
    // pointer.x = ( event.clientX / window.innerWidth );
  	// pointer.y = - ( event.clientY / window.innerHeight ) * -1;
    pointer.x = event.clientX ;
    pointer.y = event.clientY;
    // console.log(pointer);
  }
  
  window.addEventListener( 'pointermove', onPointerMove );

  
  // build player
  var player = new Actor("player", 500, 140, 20, 20);
  player.system = this.system;
  window.player = player;
  this.system.sceneGrapth.add(player);
  
  
  
  // 
  // 
  // here we can see that origin is not correct yet
  // console.log(border1.origin.x, border1.origin.y);
  // var centerOfBorder = new Rectangle("wall 2", border1.origin.x + border1.x, border1.origin.y + border1.y, 1, 1, {x:1.0,y:0.4,z:1.0,w:0});
  // this.system.sceneGrapth.add(centerOfBorder);
  
  var isMouseDown = false;
  var mPointerPos = {x:0,y:0};
  var mSelectedPos = {x:0,y:0};
  var selectedObject = null;
  var wasEverIN = false;
  
  function mouseSelectDown(ev){
    
    if(selectedObject !== null && pointInRect(pointer, selectedObject)){
      mode = modes.canDrag;
      mPointerPos.x = pointer.x;
      mPointerPos.y = pointer.y;
      mSelectedPos.x = selectedObject.x;
      mSelectedPos.y = selectedObject.y;
      selectedObject.color = {x:0,y:0,z:1,w:0};      
    }
    isMouseDown = true;
  }
  
  function mouseSelectOnPointerUp(ev){
    mode = modes.mousing;
    isMouseDown = false;
  }
  
  window.addEventListener( 'pointerdown', mouseSelectDown );
  window.addEventListener( 'pointerup', mouseSelectOnPointerUp );
  

  
  
  var mTime = Date.now();
  var delta;
  
  this.system.loopHookPoints.beforeDraw = function(){
  
    delta = Date.now() - mTime;
  
    // this handles all tests so we can cache its position
    
    
    mouseSelecting();
    playerWalking(delta, _this.system.gravity);
    
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

      } // empty block
      
    }
    
    else if(mode === modes.canDrag){
      // need to know if the pointer is down on the object
      if(selectedObject !== null){
        selectedObject.x = pointer.x + (mSelectedPos.x - mPointerPos.x);
        selectedObject.y = pointer.y + (mSelectedPos.y - mPointerPos.y);
      }
    }
    
    
  } // mouseSelecting
  
  
  
  function playerWalking(deltaTime, gravity){
    
    player.updateWalking(deltaTime, gravity);
    
  
    //
    // AABB hit testing
    //

    
    // this handles all tests so we can cache its position
    var wasIn = false;
    
    player.useGravity = true;
    
    {

      for (var i = 0; i < APPPP.colliders.length; i++) {
        var isInMuch = false;
        
        var wall = APPPP.colliders[i];
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
          player.useGravity = false;
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
        player.x = player.mPos.x;
        player.y = player.mPos.y;
      }
      else {
        player.mPos.x = player.x;
        player.mPos.y = player.y;
      }
            

      
    }
  } // playerWalking
  
  
  // var arrowsDown = {
  //   up: false, down: false, left: false, right: false
  // }
  
  // set up aditional event types fro keys
  keyboard({
    " _down" : (ev) => {
      // make a ton!!!
      for (var i = 0; i < 20; i++) {
        addHipToBeSquare();
      }
    },
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
      player.walkSpeed = Math.max(player.walkSpeed - 1, 1);
    },
    w : (ev) => {
      player.walkSpeed = Math.max(player.walkSpeed + 1, 10);
    },
    // replacing arrow keys for system.keysDown
  
  });
  


  
  // platforms builder for multiness
  
  var index = 5;
  function addHipToBeSquare(ev){
    // console.log(ev, "fish");
    
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
    
    _this.system.sceneGrapth.add(border1);
    
    // collide events
    
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

    if(_this.system.runtimeState !== "play"){
      // should have a draw command
      _this.system.loop();
    }
    
    console.log("?¿¿¿?!??!");
    
  }

  
  
  // make a ton!!!
  for (var i = 0; i < 20; i++) {
    addHipToBeSquare();
  }
  
  




};
