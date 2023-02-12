

import { Behaviour } from './Behaviour.js';



export function screenwrap(actor, system){
  
  var bb = new Behaviour("screenwrap", "action", actor, system);
  
  console.warn("// NEEDS to change the source of the wrap from window");
  
  bb.update = function() {
    var actor = this.actor;
    var system = this.system;
    var platform = actor.platform;
    
    
    // this is an "EDGE" "Behaviour"
    // Dont know where to place it yet
    // needs an IF
    // ASTROIDS!!!! like
    // NEEDS to change the source of the wrap from window
    if(actor.x > window.innerWidth){
      actor.x = 0;
    }
    else if(actor.x < 0){
      actor.x = window.innerWidth;
    }
    if(actor.y > window.innerHeight){
      actor.y = 0;
    }
    else if(actor.y < 0){
      actor.y = window.innerHeight;
    }
    
    
  
  }
  
  return bb;
}
