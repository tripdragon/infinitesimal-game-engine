

// physics is not a great version of walk and jump
// need more specialized methods
/*

https://www.youtube.com/watch?v=3uzcN9PHZZs
https://www.youtube.com/watch?v=hG9SzQxaCm8
https://www.youtube.com/watch?v=Bsy8pknHc0M
http://higherorderfun.com/blog/2012/05/20/the-guide-to-implementing-2d-platformers/
https://www.gamedeveloper.com/programming/designing-a-jump-in-unity

http://higherorderfun.com/blog/2012/06/03/math-for-game-programmers-05-vector-cheat-sheet/
http://higherorderfun.com/blog/2012/05/20/the-guide-to-implementing-2d-platformers/
https://www.gamedeveloper.com/design/platformer-controls-how-to-avoid-limpness-and-rigidity-feelings
https://martinf.dk/jump/Jumping_Thesis_Fasterholdt_09.pdf

http://www.game-feel.com/
https://www.youtube.com/watch?v=EwONt4r2rMM

*/
// physics version of walking
// see
// https://natureofcode.com/book/chapter-2-forces/


import { clamp } from '../Modules/mathness.js';

import { Vector3 } from '../Modules/Vector3.js';

import { Behaviour } from './Behaviour.js';
import { keyboard } from '../Modules/input/keyboard.js';
import { easing } from '../Modules/easing.js';


export function playerWalkFancy01(actor, system){
  
  var bb = new Behaviour("playerWalkFancy01", "walk", actor, system);
  
  
  var isDown = {
    space : false
  }
  
  var mGravity = 0;
  
  var mPos = new Vector3();
  
  
  var m_deltaTime;
  var start_deltaTime;
  var m_startTime;
  // maxJumpHeight is on player
  
  // start()????
  
  // hard coded function over the speed and max
  // bb.clampSpeedIncrease = function(axis){
  //   var actor = this.actor;
  //   if(actor.currentSpeed[axis] > actor.maxSpeed[axis]){
  //     actor.currentSpeed[axis] = actor.maxSpeed[axis];
  //   }
  //   // if(axis === "x"){
  //   //   if(actor.currentSpeed.x > actor.maxSpeed.x){
  //   //     actor.currentSpeed.x = actor.maxSpeed.x;
  //   //   }
  //   // }
  //   // else if(axis === "y"){
  //   //   if(actor.currentSpeed.y > actor.maxSpeed.y){
  //   //     actor.currentSpeed.y = actor.maxSpeed.y;
  //   //   }
  //   // }
  // }
  
  // 
  // bb.clampSpeedDecrease = function(axis){
  //   var actor = this.actor;
  // 
  //   if(actor.currentSpeed[axis] < 0 ){
  //     actor.currentSpeed[axis] = 0;
  //   }
  // 
  // }
  
  bb.update = function() {
    
    var actor = this.actor;
    var system = this.system;
    var platform = actor.platform;
    
    var deltaTime = actor.deltaTime * 0.01;
    var time = Date.now();
    
    
    // console.log("platform", platform);

    var keysDown = this.system.keysDown;
    var keysUp = this.system.keysUp;
    
    
    
    // NOTE the actors position does not happen here
    // that is within its update() via updateFromForces()
    
    // 
    // keyboard({
    //   // space
    //   " _down" : (ev) => {
    //     // make a ton!!!
    //     for (var i = 0; i < 20; i++) {
    //       addHipToBeSquare();
    //     }
    //   },
    //   // even numbers!!
    //   1 : (ev) => {
    //     player.setScaletemp(0.1);
    //   },
    // 
    //   // you can have all 3 events, plain _up and _down
    //   ArrowDown_down: (ev) => {
    //     arrowsDown.down = true;
    //   },
    //   ArrowDown_up: (ev) => {
    //     arrowsDown.down = true;
    //   },
    //   ArrowDown: (ev) => {
    //     arrowsDown.down = true;
    //   },
    // 
    // });
    
    if(keysDown.ArrowLeft){
      
      actor.velocity.x += -actor.walkSpeed * deltaTime;
      actor.velocity.x = clamp(actor.velocity.x, -actor.maxSpeed.x, 0);

      actor.x += actor.velocity.x;
    }
    
    else if(keysDown.ArrowRight){
      
      actor.velocity.x += actor.walkSpeed * deltaTime;
      actor.velocity.x = clamp(actor.velocity.x, 0, actor.maxSpeed.x);

      actor.x += actor.velocity.x;
    }

    
    
    // apply friction
    // keysUp is always called once its been pressed once
    // so instead we need to check both as that makes sense
    // walking left
    if(keysUp.ArrowLeft && keysUp.ArrowRight){
      if(actor.velocity.x === 0){
        // do nothing
      }
      else if (actor.velocity.x < 0) {
        actor.velocity.x += actor.frictionSpeed.x * deltaTime;
        
        if(actor.velocity.x > 0) {
          actor.velocity.x = 0;
        }
        
        actor.x += actor.velocity.x;
      }
      // walking right
      else if (actor.velocity.x > 0) {
        actor.velocity.x += -(actor.frictionSpeed.x * deltaTime);
        
        if(actor.velocity.x < 0) {
          actor.velocity.x = 0;
        }
        
        actor.x += actor.velocity.x;
      }
    }
    
    // gravity!!! again.... again....
    // if( !actor.platform && actor.useGravity ){
    if( !actor.platform ){
      // actor.velocity.y += actor.gravity * deltaTime;
      // actor.y += actor.velocity.y;
      actor.y += actor.gravity * deltaTime * 4; // 4 is arbitatry here
    }
    
    // actor.updateBoundingBox();


    // 
    // 
    // // jump like!
    // 
    // U0 : clock start (limit)
    //  store position
    // U∞ : update clock 
    //  up(t) easing
    //  max(up)
    //  hold till lim
    //  force release , assign gravity
    //  when released, are you in freefall:behaviour ?
    //    by default yes
    //  
    // 
    // has a float effect

    
    // U0:
    // if(keysDown[" "] ){
    // here we limit to only jummping when on a platform
    if(keysDown[" "] && isDown.space === false && actor.platform){
      
      m_deltaTime = deltaTime;
      start_deltaTime = deltaTime;
      m_startTime = time;
      
      
      console.log("space down");
      // actor.setApplyForce(0, -90, 0);
      
      // actor.velocity.y += -actor.jumpSpeed * deltaTime;
      // actor.velocity.y = clamp(actor.velocity.y, -actor.maxSpeed.y, 0);

      // actor.y += actor.velocity.y;
      mPos.copy(actor.position);
      
      mGravity = actor.gravity;
      // actor.gravity = 4;
    
      actor.platform = null;
      
      actor.isJumping = true;
      
      isDown.space = true;
    }
    // 
    else if(keysUp[" "]){
      isDown.space = false;
      // actor.mass = 1;
      // actor.gravity = 9;
      actor.gravity = mGravity;
    }
    // 
    
    // U∞:
    if(isDown.space && actor.isJumping){
      
      actor.platform = null;
      
      var runtime = 4;
      var holdtime = 3 + runtime;
      
      // console.log("time - m_startTime", time - m_startTime);
      
      // (5/9)/1 => 0.5555
      var norTime = (time - m_startTime) * 0.01 /runtime/1;
      
      // console.log("norTime", norTime);
      
      norTime = clamp(norTime, 0,1);
      // var yy = easing.linear(mPos.y, mPos.y + -actor.maxJumpHeight, norTime );
      var yy = easing.easeOutExpo(mPos.y, mPos.y + -actor.maxJumpHeight, norTime );
      
      // hard assign
      actor.y = yy;
      
      // force drop
      var gHoldTime = (time - m_startTime) * 0.01;
      console.log("gHoldTime", gHoldTime);
      if(gHoldTime >= holdtime){
        actor.isJumping = false;
        actor.gravity = 9;
      }
      
      // 
      // // reverse y noise
      // if(actor.y < mPos.y - actor.maxJumpHeight){
      // 
      //   actor.y = mPos.y - actor.maxJumpHeight;
      //   // debugger
      //   actor.gravity = mGravity;
      //   actor.isJumping = false; // forced fall so its cant float
      // }
                // actor.velocity.y += -(actor.jumpSpeed * deltaTime);
                // actor.velocity.y = clamp(actor.velocity.y, -actor.jumpSpeed, 0);
                // 
                // // this is not a good place for this
                // actor.platform = null;
                // 
                // // console.log("mPos.y", mPos.y, actor.y);
                // actor.y += actor.velocity.y;
                // // reverse y noise
                // if(actor.y < mPos.y - actor.maxJumpHeight){
                // 
                //   actor.y = mPos.y - actor.maxJumpHeight;
                //   // debugger
                //   actor.gravity = mGravity;
                //   actor.isJumping = false; // forced fall so its cant float
                // }
    }
    // gravity should handle the fall again
    // else if(isDown.space && actor.isJumping === false){
    //   actor.velocity.y += -actor.jumpSpeed * deltaTime;
    //   actor.velocity.y = clamp(actor.velocity.y, -actor.maxSpeed.y, 0);
    // 
    // 
    //   actor.y += actor.velocity.y;
    // 
    // }

    
    
    // console.log("keysDown", keysDown);
    
    
    // debugger
    // if(actor.platform){
    //   actor.applyForce( actor.getDragForce() );
    // }
    // else {
    //   actor.applyForce( actor.getDragForce("inSpace") );
    // 
    // }
    
    
    

    
    // 
    // if(actor.useGravity && !actor.platform){
    // 
    // }
    // 
    
  
  }
  
  return bb;
}
