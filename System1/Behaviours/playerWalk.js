

import { Behaviour } from './Behaviour.js';
import { Vector3 } from '../Modules/Vector3.js';

// Basic x + n movement
// physics is in another

export function playerWalk(actor, system){
  
  var bb = new Behaviour("playerWalk", "walk", actor, system);
  
  var pos = new Vector3();
  
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
    
    
    // check if any nessesary keys are down
    // and assign pos
    // and then assign actor so we bounding box only once
    if(keysDown.ArrowLeft || keysDown.ArrowRight || keysDown.ArrowDown || keysDown.ArrowUp){
      
      pos.clear();
      
      if(keysDown.ArrowLeft){  
        //actor.x += -actor.walkSpeed;
        pos.x = actor.position.x + -actor.walkSpeed;
      }
      if(keysDown.ArrowRight){
        // actor.x += actor.walkSpeed;
        pos.x = actor.position.x + actor.walkSpeed;
      }
      // in screen space we need to flip y
      if(keysDown.ArrowDown){
        //actor.y += -actor.walkSpeed * -1;
        pos.y = actor.position.y + -actor.walkSpeed * -1;
      }
      if(keysDown.ArrowUp){
        //actor.y += actor.walkSpeed * -1;
        pos.y = actor.position.y + actor.walkSpeed * -1;
      }
      
      actor.position.set(pos.x,pos.y,0);
      
    }
    
    
    

    
    
    if(actor.useGravity && !actor.platform){
    
    }
  
    
  
  }
  
  return bb;
}
