

import { Tool } from "./Tool.js";



// makes a mouse tool for showing an object and dropping a clone at its position
// 
function sdjifhisdufg(){
  
  // THiS is EXAMPLE code
  // far below is the class
  var wobjetStamper_tool = new StampTool("wobject_stamper", "wobject stamper", _this.system);
  wobjetStamper_tool.editorModeActions = _EditorModeActions;
  wobjetStamper_tool.visualObject = new Rectangle("newRect", -40, -40, 40, 40, {r:0,g:1,b:1,a:1});
  wobjetStamper_tool.stampingObject = new Rectangle("newRect", -40, -40, 40, 40, {r:0,g:0,b:1,a:1});
  wobjetStamper_tool.stampingObject.system = _this.system;

  wobjetStamper_tool.stampingObject.update = function(){
    // console.log("????");
    // debugger
    // console.log(this.system.time.delta);
    // console.log(this.x);
    // console.log(this.system.time.delta);
      this.x += this.system.time.delta * 0.01;
      if(this.x > window.innerWidth){
        this.x = 0 - this.width;
      }
      // this.x += 0.1;
  }
  
  ToolsController.addTool(wobjetStamper_tool);


  // wobjetStamper_tool.stampingObject.play = function(){
  //   // console.log("????");
  //   // debugger
  //   // console.log(this.system.time.delta);
  //     // this.x += this.system.time.delta * 10.2;
  // }

  // animation to tricky for now
  // var mTime = Date.now();
  // wobjetStamper_tool.stampingObject.update = function(){
  //   console.log("¿¿¿");
  //   this.stampingObject.playHelpers.mTime = this.system.time.now;
  // }
  // wobjetStamper_tool.stampingObject.playHelpers = {
  //   mTime : 0
  // };
  // // var sq1 = new SquareLike(null, -xx, xy, ww, wh);
  // wobjetStamper_tool.stampingObject.playCode = `return { do : function(obj, helpers){
  //   console.log("¿??///¿/");
  //   console.log(helpers.mTime);
  // }}`;


}

// 
// Main class
// 

// thinking that The Tool is a First class citizen that handles its 
export class StampTool extends Tool {
// export class BotStamp extends Tool {
  
  visualObject = null;
  stampingObject = null;
  // grid = null;
  
  // pointerUpEvent = null;
  
  start(){
    // 
    // this.system.canvas.addEventListener( 'pointerdown', this.editorModeActions._pointerDown.bind(this.editorModeActions) );


    this.system.sceneGrapth.add(this.visualObject);
    

    this.system.loopHookPoints.editorBeforeDraw = () => {

      this.update();
    };
    
    // Stamp action

    // need to cache perfect signature 
    // this.pointerUpEvent = () => this.pointerUp();
    // if( this.pointerUpEvent === null){
    //   this.pointerUpEvent = this.pointerUp.bind(this);
    // }
    this.bindUpEvent();

    // this.system.canvas.addEventListener( 'pointerup', this.pointerUpEvent );

    
    console.log(`${this.displayName} start`);
  }
  
  replace(){
    console.log(`${this.displayName} replace`);
    this.stop();
  }
  
  stop(){
    console.log("Stop????? 222");
    
    this.system.sceneGrapth.remove(this.visualObject);
    
    console.log(`${this.displayName} stop`);
    
    this.system.canvas.removeEventListener( 'pointerup', this.pointerUpEvent );

  }
  
  // will need to feed this a grid somehow
  update(){
    // console.log(this.system.pointer);
    this.visualObject.x = this.system.pointer.x;
    this.visualObject.y = this.system.pointer.y;
  }

  pointerUp(){
    
      var ff = this.stampingObject.clone();
      ff.x = this.visualObject.x;
      ff.y = this.visualObject.y;
      
      console.log(ff);
      this.system.sceneGrapth.add(ff);
      console.log("pointerUp");
  }
  
  
} 
