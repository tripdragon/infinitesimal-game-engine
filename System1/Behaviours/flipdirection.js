

import { Behaviour } from './Behaviour.js';



export function flipdirection(actor, system){
  
  var bb = new Behaviour("flipdirection", "action", actor, system);
  
  bb.update = function() {
    var actor = this.actor;
    var system = this.system;
    var platform = actor.platform;


    if(platform){  
      // filp direction
      if (actor.x >= platform.max.x){
        actor.directionVector.x *= -1;
        actor.x = platform.max.x;
      }
      else if (actor.x <= platform.min.x){
        actor.directionVector.x *= -1;
        actor.x = platform.min.x;
      }
      
    }
    
  
  }
  
  return bb;
}
