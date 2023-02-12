

import { Behaviour } from './Behaviour.js';



export function freefall(actor, system){
  
  var bb = new Behaviour("freefall", "inSpace", actor, system);
  
  // var outColliders = [];
  
  bb.update = function() {
    var actor = this.actor;
    var system = this.system;
    var platform = actor.platform;
    // console.log("platform", platform);
  
    
    
    // console.log("findPlatform");
    actor.findPlatform();
    
    
    // return;
    // gravity down is in updateWalking for now
    
    
    // this.updateWalking(this.system.time.delta, this.gravity);
    
    // if(actor.useGravity){
    if(actor.useGravity && !actor.platform){
      // debugger
      actor.gravityForce(system.time.delta, actor.gravity);
    }
    
    
    if(actor.useGravity && !actor.platform){
      
      
        // actor.gravityForce(this.time.delta);
        // var gravity = 9.81864;
        // actor.y += (this.time.delta * 0.01 ) + gravity;
      
        // this.system.testColliders(actor, this.system.platforms, outColliders);
        // // console.log(outColliders);
        // if(outColliders.length > 0){
        //   debugger
        //   actor.plaform = outColliders[0];
        //   // actor.useGravity = false;
        //   debugger
        // }
        // 
        // 
        // console.log("findPlatform");
        // actor.findPlatform();
        // 
        
        
        // outColliders = [];
        // 
        // var colliders = this.system.platforms;
        // 
        // for (var i = 0; i < colliders.length; i++) {
        //   // console.log(colliders[i], "colliders");
        //   // debugger
        //   var wasIn = actor.intersectsScreenSpaceWithPadding(colliders[i]);
        //   if(wasIn){
        //     // debugger
        //     outColliders.push(colliders[i]);
        //   }
        // 
        // }
        // 
        // if(outColliders.length > 0){
        //   // debugger
        //   actor.platform = outColliders[0];
        //   // actor.useGravity = false;
        // 
        // }
        
    }
  
    
  
  }
  
  return bb;
}
