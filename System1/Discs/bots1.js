

// Basic example of a basic buch of things in the view

// hrmmm dont like going UP a folder for games stuff
// it makes a game nested
import { Polygon } from "../Primitives/Polygon.js";
import { Rectangle } from "../Primitives/Rectangle.js";

import { Game } from "../Core/Game.js";

import { keyboard } from '../Modules/input/keyboard.js';
import { randomBetween, random1orNeg, simpleNoise, remapNegPositiveOne } from "../Modules/mathness.js";

import { AABBTest, pointInRect } from "../Modules/collisions.js";


import { Actor } from "../Primitives/Actor.js";

export let disc = new Game("bots1");

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
  
  
  var pointer = {x:0,y:0};
  
  // holds bots and 
  var robots = [];
    


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
  player.directionVector.x = -1;
  // player.directionVector.y = -1;
  // when in bot mode
  // player.mode = player.mode = "bot";
  // player.walkSpeed = 6;
  window.player = player;
  this.system.sceneGrapth.add(player);
  
  
  
  var botty = new Actor("botty", 200, 240, 20, 20);
  botty.system = this.system;
  botty.mode = botty.modes.bot;
  botty.directionVector.x = -1;
  botty.color = {x:0.7,y:0.7,z:0.9,w:1};
  // botty.directionVector.y = -1;
  // when in bot mode
  botty.walkSpeed = 6;
  window.botty = botty;
  this.system.sceneGrapth.add(botty);
  
  robots.push(botty);
  
  
  for (var i = 0; i < 40; i++) {
    const xx = randomBetween(0,window.innerWidth);
    const yy = randomBetween(0,window.innerHeight);
    
    
    var botty = new Actor("botty" + i, xx, yy, 20, 20);
    botty.system = this.system;
    botty.mode = botty.modes.bot;
    botty.color = {x:0.7,y:0.7,z:0.9,w:1};
    
    // botty.directionVector.x = randomBetween(-1,1);
    // botty.directionVector.y = randomBetween(-1,1);
    botty.directionVector.x = random1orNeg();
    // botty.directionVector.y = random1orNeg();
    
    // botty.directionVector.y = -1;
    // when in bot mode
    botty.walkSpeed = 6;
    window.botty = botty;
    this.system.sceneGrapth.add(botty);
    robots.push(botty);
  }
  
  
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
  var deltaTime;
  
  this.system.loopHookPoints.beforeDraw = function(){
    
    var time = Date.now();
    deltaTime = time - mTime;
  
    // this handles all tests so we can cache its position
    
    
    mouseSelecting();
    playerWalking(player, deltaTime, _this.system.gravity);
    // playerWalking(botty, delta, _this.system.gravity);
    for (var i = 0; i < robots.length; i++) {
      playerWalking(robots[i], deltaTime, _this.system.gravity);
      // change robots walk over noise time
      
      // var noise = simpleNoise((time + (i * 100)) * 0.0005);
      // var noise = simpleNoise((time + (i * 100)) * 0.0005) * random1orNeg();
      var noise = simpleNoise((time + (i * 100)) * 0.0005);
      robots[i].directionVector.x = remapNegPositiveOne(0, 1, noise );
      // robots[i].directionVector.y = remapNegPositiveOne(0, 1, noise );
    }
    // console.log(robots[0].directionVector.x);
    
    mTime = time;

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
          
          if(wall.subType !== "actor"){
            wall.color = {x:0,y:0.5,z:0,w:0};
          }
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
  
  
  
  function playerWalking(actor, deltaTime, gravity){
    
    actor.updateWalking(deltaTime, gravity);
    
  
    //
    // AABB hit testing
    //

    
    // this handles all tests so we can cache its position
    var wasIn = false;
    
    actor.useGravity = true;
    
    {

      for (var i = 0; i < APPPP.colliders.length; i++) {
        var isInMuch = false;
        
        var pick = APPPP.colliders[i];
        // cheap for now dont test player collide
        // if(wall === actor){
        //   continue;
        // }
        // exit loop if its a player or robot
        if(pick.subType === "actor"){
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
      
        isInMuch = AABBTest(actor, pick);
        
        if(isInMuch){
          // console.log("innnn?");
          if(pick.subType !== "actor"){
            
            pick.color = {x:0,y:0,z:1,w:0};
          }
          pick.onCollide();
        }
        else {
          if(pick.subType !== "actor"){
            
            pick.color = {x:0,y:0.5,z:0,w:0};
            
          }
          // console.log("ouuuut???");
        }
      

        if(wasIn == false && isInMuch == true){
          wasIn = true;
          actor.useGravity = false;
        }
            
      } // colliders loop
      
      // 
      // if(isINnnn){
      //   actor.x = previousPos.x;
      //   actor.y = previousPos.y;
      // }
      // else {
      //   previousPos.x = actor.x;
      //   previousPos.y = actor.y;
      // }
      // 

      if(wasIn){
        actor.x = actor.mPos.x;
        actor.y = actor.mPos.y;
      }
      else {
        actor.mPos.x = actor.x;
        actor.mPos.y = actor.y;
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
    
    var platform = new Rectangle("wall" + index, xx, xy, ww, wh, {x:0,y:0.5,z:0,w:0});
    
    platform.shiftLeft = randomBetween(1,100);
    
    // cant play if the wall test is overlap for now
    if( AABBTest(player, platform) == true){
      return;
    }
    
    for (var i = 0; i < robots.length; i++) {
      if( AABBTest(robots[i], platform) == true){
        return;
      }
    }
    
    _this.system.sceneGrapth.add(platform);
    
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
  for (var i = 0; i < 80; i++) {
  // for (var i = 0; i < 1; i++) {
    addHipToBeSquare();
  }
  
  




};
