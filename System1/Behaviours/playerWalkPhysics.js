

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


import { Behaviour } from './Behaviour.js';

// physics version of walking
// see
// https://natureofcode.com/book/chapter-2-forces/

export function playerWalkPhysics(actor, system){
  
  var bb = new Behaviour("playerWalkPhysics", "walk", actor, system);
  
  
  var isDown = {
    space : false
  }
    
  
  bb.update = function() {
    
    var actor = this.actor;
    var system = this.system;
    var platform = actor.platform;
    // console.log("platform", platform);

    var keysDown = this.system.keysDown;
    var keysUp = this.system.keysUp;
    
    
    
    // NOTE the actors position does not happen here
    // that is within its update() via updateFromForces()
    
    if(keysDown.ArrowLeft){
      
      // actor.x += -actor.walkSpeed;
      actor.setApplyForce(-actor.walkSpeed, 0, 0);
    }
    if(keysDown.ArrowRight){
      // actor.x += actor.walkSpeed;
      actor.setApplyForce(actor.walkSpeed, 0, 0);
    }
    // in screen space we need to flip y
    if(keysDown.ArrowDown){
      // actor.y += -actor.walkSpeed * -1;
      actor.setApplyForce(0, actor.walkSpeed, 0);
    }
    if(keysDown.ArrowUp){
      actor.setApplyForce(0, -actor.walkSpeed, 0);
      // actor.y += actor.walkSpeed * -1;
    }
    

    
    // jump like!
    // if(keysDown[" "] && isDown.space === false){
    if(keysDown[" "] ){
      
      console.log("space down");
      actor.setApplyForce(0, -90, 0);
      // actor.mass = 0.7;
      actor.gravity = 4;
      
      actor.platform = null;
      
      // actor.y += actor.walkSpeed * -1;
      // actor.y += 90 * -1;
      
      isDown.space = true;
    }
    
    if(keysUp[" "]){
      isDown.space = false;
      // actor.mass = 1;
      actor.gravity = 9;
    }
    
    
    // test if wallked off edge
    // not sure if this shoudl go into behaviour file
    if(actor.platform){
      if(actor.boundingBox.max.x < actor.platform.boundingBox.min.x || 
        actor.boundingBox.min.x < actor.platform.boundingBox.max.x
      ){
        actor.platform = null;
      }
    }
    
    
    // console.log("keysDown", keysDown);
    
    
    // debugger
    if(actor.platform){
      actor.applyForce( actor.getDragForce() );
    }
    else {
      actor.applyForce( actor.getDragForce("inSpace") );
      
    }
    
    
    

    
    
    if(actor.useGravity && !actor.platform){
    
    }
  
    
  
  }
  
  return bb;
}
