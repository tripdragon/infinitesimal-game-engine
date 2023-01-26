


// It would be nice to be able to use a tool without a ToolsController
// well we have Stop()

import { AABBTest, pointInRect, pointInBoundingBoxScreenSpace } from "../Modules/collisions.js";


import { Tool } from "./Tool.js";
import { Plane } from "../Primitives/Plane.js";

export class SelectTool extends Tool {
  
  selectedObject = null;
  
  isMouseDown = false;
  mPointerPos = {x:0,y:0};
  mSelectedPos = {x:0,y:0};
  
  // var wasEverIN = false;
  
  constructor(system){
    super("SelectTool", "Select Tool", system);
  }
  
  modes = {
    mousing : "mousing",
    canDrag : "canDrag",
    canDraw : "canDraw"
  }
  
  mode = this.modes.mousing;
  
  
  start(){
    
    this.bindUpEvent();
    this.bindDownEvent();
    
    this.system.loopHookPoints.editorBeforeDraw = () => {

      this.update();
    };
    
    
  }
  
  update(){
    this.mouseSelecting();
  }
  
  // replace(){}
  // 
  // stop(){
  // 
  // }

  
  pointerUp(){
    this.mode = this.modes.mousing;
    this.isMouseDown = false;
  }
  
  pointerDown(){
    
    if(this.selectedObject !== null && pointInRect(this.system.pointer, this.selectedObject)){
      this.mode = this.modes.canDrag;
      this.mPointerPos.x = this.system.pointer.x;
      this.mPointerPos.y = this.system.pointer.y;
      this.mSelectedPos.x = this.selectedObject.x;
      this.mSelectedPos.y = this.selectedObject.y;
      this.selectedObject.color.copy({r:0,g:0,b:1,a:1});
    }
    this.isMouseDown = true;
    
  }
  
  
  pointerMoving(){}
  

  mouseSelecting(){
    
    var pointer = this.system.pointer;
    
    if(this.mode === this.modes.mousing){
      
      var wasIn = false;
      var wasEverIN = false;
      this.selectedObject = null;
  
      // for (var i = 0; i < walls.length; i++) {
      for (var i = 0; i < this.system.colliders.length; i++) {
        // break;
        var isInMuch = false;
        
        var wall = this.system.colliders[i];
        // var wall = walls[i];
        // cheap for now dont test player collide
        // we dont have a player right now
        // if(wall === player){
        //   continue;
        // }
        
        if(wall.subType !== "actor"){
          //wall.color.copy({r:0,g:0.5,b:0,a:1});
          wall.color.copy(wall.mColor);
        }
        
        var wasIn = false;
        if(wall instanceof Plane){
          wasIn = pointInBoundingBoxScreenSpace(pointer, wall);
          // debugger
        }
        else {
          wasIn = pointInRect(pointer, wall);
        } 
        // wasIn = pointInRect(pointer, wall);
        
        
        // console.log(wall.width, wall.height);
        // console.log(pointer);
        if(wasIn){
            // wall.color = {r:0,g:0,b:1,a:0};
            wall.color.copy({r:1,g:1,b:1,a:1});
            if(wasEverIN == false){
              wasEverIN = true;
              this.selectedObject = wall;
            }
            break;
        }
        
        // // do a moving and generative effect
        // if(wall.shiftLeft){
        //   wall.x += wall.shiftLeft * 0.05;
        //   if (wall.x > window.innerWidth){
        //     wall.x = -wall.width;
        //         wall.shiftLeft = randomBetween(1,100);
        //   }
        // }
        // 
        // isInMuch = AABBTest(player, wall);
        // 
        // if(isInMuch){
        //   // console.log("innnn?");
        //   wall.color = {x:0,y:0,z:1,w:0};
        //   wall.onCollide();
        // }
        // else {
        //   // console.log("ouuuut???");
        //   wall.color = {x:0,y:0.5,z:0,w:0};
        // }
        // 
        // 
        // if(wasIn == false && isInMuch == true){
        //   wasIn = true;
        // }
            
      } // colliders loop

    
      
    }
    
    else if(this.mode === this.modes.canDrag){
      // need to know if the pointer is down on the object
      if(this.selectedObject !== null){
        this.selectedObject.x = pointer.x + (this.mSelectedPos.x - this.mPointerPos.x);
        this.selectedObject.y = pointer.y + (this.mSelectedPos.y - this.mPointerPos.y);
      }
    }
    
    
  } // mouseSelecting
  
  
  

}