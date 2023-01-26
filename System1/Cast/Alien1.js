

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


// Be sure to assign system
// this really should be auto handled
export class Alien1 extends Bot {
  
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
  
  update(){
    
    // super.update();
    if(this.canUpdate === false){
      return;
    }
    if(!this.system){
      console.log(" trying to animate without this.system");
      return;
    }
    // console.log("????");
    // debugger
    // console.log(this.system.time.delta);
    // console.log(this.x);
    // console.log(this.system.time.delta);
      
    // this delta time will not work with pause for now
    // the width here is too hard coded
    this.x += this.system.time.delta * 0.05;
    if(this.x > this.system.gameWidth){
      this.x = 0 - this.width;
    }
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
