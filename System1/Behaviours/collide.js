

import { Behaviour } from './Behaviour.js';
import { Vector3 } from '../Modules/Vector3.js';



export function collide(actor, system){
  
  var bb = new Behaviour("collide", "action", actor, system);
  
  // var outColliders = [];
  
  
  var workPos = new Vector3();
  var previous = new Vector3();
  
  bb.update = function() {
    var actor = this.actor;
    var system = this.system;
    var platform = actor.platform;
    
    
    
    
    
    
    
    
    
    
      
      // mouse with offset
      // workPos.set(
      //   pointer.x + (this.mSelectedPos.x - this.mPointerPos.x), 
      //   pointer.y + (this.mSelectedPos.y - this.mPointerPos.y),
      //   0
      // );
      
      // HRMMmmmm what IS WHERE IS the object????
      // we also dont have a previous position as of yet
      workPos.copy(actor.position);
      
      
      actor.refreshMatrixes();
      actor.bbb();
      
      // 
      // 
      // // when we copy here we have not yet rendered so its fine to experiment with changing its matrix
      // this.selectedObject.position.copy(workPos);
      // this.selectedObject.refreshMatrixes();
      // this.selectedObject.bbb();
      // 
      var hasCollided = false;
      
      var mPick;
      var ii = 0;
      
      // test against walls
      for (var i = 0; i < this.system.colliders.length; i++) {
        var pick = this.system.colliders[i];
        
        // skip our own
        if(pick === actor){
          continue;
        }
        
        hasCollided = actor.boundingBoxWorld.intersectsBox(pick.boundingBoxWorld);
        if(hasCollided){
          mPick = pick;
          ii++;
          break;
        }
      }
      // console.log("ii", ii);
      
      
      // var previous = this.previousGoodPosition;
      
      // here we hit a point so lets try going back to previous good point
      if (hasCollided) {
        actor.position.copy(previous);
      }
      // retain the position and save its good point
      else {
        previous.copy(actor.position);
      }
      
      
      
      
      
      
    
    
    
    // console.log("colllllide");
    
    for (var i = 0; i < this.system.colliders.length; i++) {
      var pick = this.system.colliders[i];
      // console.log("pick", pick.name);
      
      // skip us
      // if (pick === actor) {
      //   // debugger
      //   continue;
      // }
      
      // pick.color.setHex(0x00b7ff);
      // if(pick !== actor){
      //   pick.color.setHex(0x00b7ff);
      // }
      // 
      // if(pick.static === false){
      //   pick.color.setHex(0x00b7ff);
      // }
      
      
      
      if(pick.static){
        continue;
      }
      if(pick === actor){
        continue;
      }
      // 
      // onConsole.log("boop", "_____");
      // actor.color.setHex(0x00b7ff);
      // if (actor.boundingBoxWorld.intersectsBox(pick.boundingBoxWorld)) {
      //   // debugger
      //   onConsole.log("boop", "!!!!!!");
      //   actor.color.setHex(0x2700b3);
      //   // debugger
      //   actor.position.y = pick.edges.bottom(true).y - (actor.edges.top(true).y - actor.position.y);
      //   // snap
      // }
      // 
      
      // try intersects test first
      
    }
    
    
  
  }
  
  return bb;
}
