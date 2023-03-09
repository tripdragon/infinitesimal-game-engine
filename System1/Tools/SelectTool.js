
/*

debug within


plat = box4;
plat.boundingBox.print()

point = {x:0,y:0}
point.x = plat.boundingBox.min.x;
point.y = plat.boundingBox.max.y;

if(box){
box.delete()
box = null;
}
var box = new Plane("boxlike", point.x, point.y, 0, 10, 10, new Color().random());
APPPP.add(box);

pointInBoundingBoxScreenSpace(point, plat)

*/


// This needs to become a first class Tool
// in that its dynamicly available when hovering over something
// even when not selected
// so the instant interactive flow continues


// It would be nice to be able to use a tool without a ToolsController
// well we have Stop()

import { AABBTest, pointInRect, pointInBoundingBoxScreenSpace } from "../Modules/Colliders/collisions.js";


import { Tool } from "./Tool.js";
import { Plane } from "../Primitives/Plane.js";
import { VisualPlane } from "../Primitives/VisualPlane.js";
import { Platform } from "../Primitives/Platform.js";
import { Vector3 } from "../Modules/Vector3.js";
import { Color } from "../Modules/Color.js";

export class SelectTool extends Tool {
  
  selectedObject = null;
  
  isMouseDown = false;
  mPointerPos = new Vector3();
  mSelectedPos = new Vector3();
  
  previousGoodPosition = new Vector3();
  workPos = new Vector3();
  
  
  usePreventCollide = false;
  // usePreventCollide = true;
  
  tapTimer = 0;
  // tapTimer = Date.now();
  tapLimit = 0.2;
  
  
  useGrid = false;
  grid = null;

  // need a grid
  // so its .snap()
  // 
  // var grid = new Grid(40,20,40, this.system);
  // // grid.snap(_this.system.pointer.client.x, _this.system.pointer.client.y).screenTo3D();
  // // 
  // // box2.x = grid.position3D.x;
  // // box2.y = grid.position3D.y;
  // 
  // 



  
  
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
    
    
    window.pointInBoundingBoxScreenSpace = pointInBoundingBoxScreenSpace;
    window.Plane = Plane;
    window.Color = Color;
    
    // this.mouseVisual = new VisualPlane("boxlike", 0, 0, 0, 20, 20, {r:0,g:0.5,b:1,a:1}, this.system);
    // this.system.add(this.mouseVisual)
    // 
    // window.mouseVisual = this.mouseVisual;
    
  }
  
  update(){
    this.mouseSelecting();
    this.pointerMoving();
  }
  
  // replace(){}
  // 
  // stop(){
  // 
  // }

  
  pointerUp(){
    this.mode = this.modes.mousing;
    this.isMouseDown = false;
    
    if(this.selectedObject){
      
      this.selectedObject.deselectState();
      // this.selectedObject.color.copy({r:0,g:0,b:1,a:1});
    }
    
    this.previousGoodPosition.clear();
    
    const tt = Date.now();
    const delta = (tt - this.tapTimer) / 1000;
    // debugger
    if( delta <= this.tapLimit){
      onConsole.log("tap timer", "yeah!", delta);
      this.onTap();
    }
    else {
      onConsole.log("tap timer", "boo", delta);
    }
  }
  
  pointerDown(){
    var wasIn = false;
    
    if(this.selectedObject !== null){
      
      if(this.selectedObject instanceof Plane || this.selectedObject instanceof Platform){
        
        var pointer3d = this.system.pointer.worldSpace;
        
        wasIn = this.selectedObject.pointCollideCheck(pointer3d);
        
      }
      
      
      if(wasIn){
        
        var pointer3d = this.system.pointer.worldSpace;
        
        this.mode = this.modes.canDrag;
        
        
        this.mPointerPos.copy(pointer3d);

        this.mSelectedPos.x = this.selectedObject.position.x;
        this.mSelectedPos.y = this.selectedObject.position.y;
        
        window.selectedsdfkdg = this.selectedObject;
        
        this.selectedObject.selectState();
        // this.selectedObject.color.copy({r:0,g:0,b:1,a:1});
        
        this.previousGoodPosition.copy(this.selectedObject.position);
        
      }
    }
    
    this.isMouseDown = true;
    
    this.tapTimer = Date.now();
    
  }
  
  
  pointerMoving(){
    if(this.selectedObject){
      this.selectedObject.onHover();
    }
  }
  

  mouseSelecting(){
    
    
  
    // var pointer = this.system.pointer.screenUV;
    var pointer = this.system.pointer.worldSpace;
    
    
    
    // this.mouseVisual.position.copy(pointer);//.applyMatrix4(this.mouseVisual.worldMatrix)
    
    
    // window.onConsole.log("mouse", pointer.x, pointer.y);
    
    
    if(this.mode === this.modes.mousing){
      
      var wasIn = false;
      var wasEverIN = false;
      this.selectedObject = null;
  
  // console.log("mousing");
      
      for (var i = 0; i < this.system.colliders.length; i++) {
        // break;
        var isInMuch = false;
        
        var wall = this.system.colliders[i];
        

        // cheap for now dont test player collide
        // we dont have a player right now
        // if(wall === player){
        //   continue;
        // }
        
        if(wall.subType !== "actor"){
          // wall.color.copy({r:0,g:0.5,b:0,a:1});
          // wall.color.copy(wall.mColor);
        }
        
        var wasIn = false;
        if(wall instanceof Plane || wall instanceof Platform){
          
          wasIn = wall.pointCollideCheck(pointer);
          
          // hasCollided = true;
          
          // wall.color.copy({r:0,g:0.2,b:0.5,a:1});
        }
        
      

        
        // color swapping needs work
        if(wasIn){
            
            if(wasEverIN == false){
              wasEverIN = true;
              this.selectedObject = wall;
              this.selectedObject.selectState();
              // this.selectedObject.color.copy({r:0,g:0.4,b:1,a:1});
              
              onConsole.log("this.selectedObject", this.selectedObject);
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
      
      
      if( !this.usePreventCollide ){
        
        if(this.selectedObject !== null){
          this.selectedObject.position.set(pointer.x + (this.mSelectedPos.x - this.mPointerPos.x), 
          pointer.y + (this.mSelectedPos.y - this.mPointerPos.y),
          0
          );
          this.selectedObject.refreshMatrixes();
          this.selectedObject.bbb();
          
          return;
        }
        
      }
      
      
      // else forced collide
      
      
      // VERY rough box testing 
      // need to know if the pointer is down on the object
      if(this.selectedObject !== null){
        
        // mouse with offset
        this.workPos.set(
          pointer.x + (this.mSelectedPos.x - this.mPointerPos.x), 
          pointer.y + (this.mSelectedPos.y - this.mPointerPos.y),
          0
        );
        
        
        // when we copy here we have not yet rendered so its fine to experiment with changing its matrix
        this.selectedObject.position.copy(this.workPos);
        this.selectedObject.refreshMatrixes();
        this.selectedObject.bbb();
        
        var hasCollided = false;
        
        var mPick;
        var ii = 0;
        
        // test against walls
        for (var i = 0; i < this.system.colliders.length; i++) {
          var pick = this.system.colliders[i];
          
          // skip our own
          if(pick === this.selectedObject){
            continue;
          }
          
          hasCollided = this.selectedObject.boundingBoxWorld.intersectsBox(pick.boundingBoxWorld);
          if(hasCollided){
            mPick = pick;
            ii++;
            break;
          }
        }
        // console.log("ii", ii);
        
        
        var previous = this.previousGoodPosition;
        
        // here we hit a point so lets try going back to previous good point
        if (hasCollided) {
          this.selectedObject.position.copy(previous);
        }
        // retain the position and save its good point
        else {
          previous.copy(this.selectedObject.position);
        }
        
        
        
        
      }
    }
    
    
  } // mouseSelecting
  
  
  
  onTap(){
    // send some arguments data down
    if (this.selectedObject) {
      this.selectedObject.onTap();
    }
  }
  

}
