

import { Behaviour } from './Behaviour.js';



export function screenwrap(actor, system){
  
  var bb = new Behaviour("screenwrap", "action", actor, system);
  
  console.warn("// NEEDS to change the source of the wrap from window");
  
  bb.update = function() {
    var actor = this.actor;
    var system = this.system;
    var platform = actor.platform;
    
    // debugger
    // this is an "EDGE" "Behaviour"
    // Dont know where to place it yet
    // needs an IF
    // ASTROIDS!!!! like
    // NEEDS to change the source of the wrap from window
    if(actor.position.x > window.innerWidth){
      actor.position.x = 0;
      
    }
    else if(actor.position.x < 0){
      actor.position.x = window.innerWidth;
      
    }
    if(actor.position.y > window.innerHeight){
      actor.position.y = 0;
      
    }
    else if(actor.position.y < 0){
      actor.position.y = window.innerHeight;
      
    }
    
    
  
  }
  
  return bb;
}
