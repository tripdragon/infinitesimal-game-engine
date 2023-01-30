

import { Behaviour } from './Behaviour.js';



export function walk(actor, system){
  
  var bb = new Behaviour("walk", "task", actor, system);
  
  bb.update = function() {
    var actor = this.actor;
    var system = this.system;
    var platform = actor.platform;
    
    // debugger
    // actor.x += this.time.delta * 0.05;
    // if(this.x > system.gameWidth){
    //   actor.x = 0 - actor.width;
    // }
    // console.log(actor.x);
    
    
    if(platform){
        
      // stick to platform
      //actor.y = platform.max.y + -actor.height + 1;
      actor.y = platform.max.y + -actor.height/2 + 0;

      // walk from joystick
      actor.x += actor.walkSpeed * actor.directionVector.x;
      // actor.y += actor.walkSpeed * actor.directionVector.y * -1;


      // filp direction
      // if (actor.x >= platform.max.x){
      //   actor.directionVector.x *= -1;
      //   actor.x = platform.max.x;
      // }
      // else if (actor.x <= platform.min.x){
      //   actor.directionVector.x *= -1;
      //   actor.x = platform.min.x;
      // }
      
    }
    
  
  }
  
  return bb;
}
