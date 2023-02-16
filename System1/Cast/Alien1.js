

// need both 
// a Tool, StampTool
// and a Bot that has logics

// this is a Rect for now

function  skjdfiudfg(){
  
  aa = new Alien1("aa", 100, 120, 40, 40, {r:0,g:1,b:1,a:1});
  aa.system = this.system;
  // aa.canUpdate = false;
  this.system.sceneGrapth.add(aa);
  
  
}


import {StampTool} from "../Tools/StampTool.js";
import {Bot} from "../Primitives/Bot.js";


// import {Behaviour} from "../Behaviours/Behaviour.js";
import {walk} from "../Behaviours/walk.js";
import {freefall} from "../Behaviours/freefall.js";
import {flipdirection} from "../Behaviours/flipdirection.js";


// Be sure to assign system
// this really should be auto handled
export class Alien1 extends Bot {
  
  
  walkSpeed = 4;
  useGravity = true;
  
  
  
  // stampTool = null;
  // 
  // constructor(name, x, y, width, height, color, system) {
  //   super(name, x, y, width, height, color, system);
  //   // this.system = system;
  // 
  //   // ??? NOT SURE of this
  //   // this.stampTool = new StampTool("Alien1", "Alien1 stamper", this.system);
  //   // this.stampTool
  // 
  //   // placeholder image waiting
  //   // this.imageTexture = null
  // 
  // }
  // 
  
  start(){
    
    
    // this.behaviours.actions["taks"] = 
    this.behaviours.add(walk(this));
    this.behaviours.add(freefall(this));
    
    this.behaviours.add(flipdirection(this));
    
    this.directionVector.x = 1;
    
    // debugger
    
  }
  
  
  
  
  // IN this example we use behaviours.updateTasks
  // to perform walking and logic testing
  // you dont have to use it, its a greater complicated system
  // for quazy ai
  // update(){
  // 
  //   // super.update();
  //   if(this.canUpdate === false){
  //     return;
  //   }
  //   if(!this.system){
  //     console.log(" trying to animate without this.system");
  //     return;
  //   }
  // 
  // }
    
  behavioursHook(){
    
    
    // this.behaviours.updateTasks();
    
    // this.behaviours.updateActions();
    
    
    
    // here we just directly call it
    // not as roboty
    
    if( this.platform ){
    
      // this.behaviours.walk.update();
      // debugger
      this.behaviours.walk.walk.update();
    }
    else {
      // this.behaviours.inSpace.update();
      this.behaviours.inSpace.freefall.update();
      
    }
    
    
    this.behaviours.updateActions();
    

    // simpler code walk example
    // this delta time will not work with pause for now
    // the width here is too hard coded

    // this.x += this.system.time.delta * 0.05;
    // if(this.x > this.system.gameWidth){
    //   this.x = 0 - this.width;
    // }

    // this.x += 0.1;
    
  }
  
}
// // 
// var wobjetStamper_tool = new StampTool("wobject_stamper", "wobject stamper", this.system);
// // wobjetStamper_tool.editorModeActions = _EditorModeActions;
// wobjetStamper_tool.visualObject = new Rectangle("newRect", -40, -40, 40, 40, {r:0,g:1,b:1,a:1});
// wobjetStamper_tool.stampingObject = new Rectangle("newRect", -40, -40, 40, 40, {r:0,g:0,b:1,a:1});
// wobjetStamper_tool.stampingObject.system = this.system;
// 
// wobjetStamper_tool.stampingObject.update = function(){
//   // console.log("????");
//   // debugger
//   // console.log(this.system.time.delta);
//   // console.log(this.x);
//   // console.log(this.system.time.delta);
//     this.x += EditorMagic.system.time.delta * 0.05;
//     if(this.x > window.innerWidth){
//       this.x = 0 - this.width;
//     }
//     // this.x += 0.1;
// }
