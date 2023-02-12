

import { Behaviour } from './Behaviour.js';

// Basic x + n movement
// physics is in another

export function playerWalk(actor, system){
  
  var bb = new Behaviour("playerWalk", "walk", actor, system);
  
  
  
  bb.update = function() {
    // debugger
    var actor = this.actor;
    var system = this.system;
    var platform = actor.platform;
    // console.log("platform", platform);
    
    
    
    var keysDown = this.system.keysDown;
    
    
    // gravity
    // player.gravity = function(){
    //   player.y += (delta * 0.01 ) + window.gravity;
    // }
    // wrong formula
    // player.y += (delta * 0.01 ) + 9.7;
    // player.y += 0.5;
    
    
    // this.updateWalking(this.system.time.delta, this.gravity);
    // if(actor.useGravity){
    //   this.gravityForce(system.time.deltaTime, actor.gravity);
    // }
    
    
    // console.log("¿¿¿¿¿");
    //if(arrowsDown.left){
    if(keysDown.ArrowLeft){
      
      actor.x += -actor.walkSpeed;
    }
    if(keysDown.ArrowRight){
      actor.x += actor.walkSpeed;
    }
    // in screen space we need to flip y
    if(keysDown.ArrowDown){
      actor.y += -actor.walkSpeed * -1;
    }
    if(keysDown.ArrowUp){
      actor.y += actor.walkSpeed * -1;
    }
    
    
    

    
    
    if(actor.useGravity && !actor.platform){
    
    }
  
    
  
  }
  
  return bb;
}
