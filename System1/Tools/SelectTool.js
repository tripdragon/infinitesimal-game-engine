
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
    
    // debugger
    window.pointInBoundingBoxScreenSpace = pointInBoundingBoxScreenSpace;
    window.Plane = Plane;
    window.Color = Color;
    
    this.mouseVisual = new VisualPlane("boxlike", 0, 0, 0, 20, 20, {r:0,g:0.5,b:1,a:1}, this.system);
    this.system.add(this.mouseVisual)
    
    window.mouseVisual = this.mouseVisual;
    
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
    
    if(this.selectedObject){
      
      this.selectedObject.deselectState();
      // this.selectedObject.color.copy({r:0,g:0,b:1,a:1});
    }
    
  }
  
  pointerDown(){
    var wasIn = false;
    
    if(this.selectedObject !== null){
      
      if(this.selectedObject instanceof Plane || this.selectedObject instanceof Platform){
        // debugger
        // wasIn = pointInBoundingBoxScreenSpace(this.system.pointer, this.selectedObject);
        // wasIn = pointInBoundingBoxScreenSpace(this.system.pointer.client, this.selectedObject);
        // wasIn = pointInBoundingBoxScreenSpace(this.system.pointer.screenUV, this.selectedObject);
        // box.position.applyMatrix4(selectedsdfkdg.worldMatrix)
        // wasIn = this.selectedObject.pointCollideCheck(this.system.pointer.screenUV.applyMatrix4(this.system.world.worldMatrix.invert()) );
        
        var pointer3d = this.system.pointer.worldSpace;
        // wasIn = this.selectedObject.pointCollideCheck(this.system.pointer.screenUV);
        wasIn = this.selectedObject.pointCollideCheck(pointer3d);
        
      }
      // else {
      //   wasIn = pointInRect(this.system.pointer.screenUV, this.selectedObject);
      // } 
      
      if(wasIn){
        // debugger
        var pointer3d = this.system.pointer.worldSpace;
        
        this.mode = this.modes.canDrag;
        // this.mPointerPos.x = this.system.pointer.x;
        // this.mPointerPos.y = this.system.pointer.y;
        // this.mPointerPos.copy(this.system.pointer.client);
        
        this.mPointerPos.copy(pointer3d);

        this.mSelectedPos.x = this.selectedObject.x;
        this.mSelectedPos.y = this.selectedObject.y;
        
        window.selectedsdfkdg = this.selectedObject;
        
        this.selectedObject.selectState();
        this.selectedObject.color.copy({r:0,g:0,b:1,a:1});
      }
    }
    
    this.isMouseDown = true;
    
    
  }
  
  
  pointerMoving(){}
  

  mouseSelecting(){
    
    
    
    // var pointer = this.system.pointer.client;
    // pointer.y *= -1;
    
    // var pp = {x:pointer.x,y:pointer.y, z:0}
    // 
    // // pp.x = pointer.x - this.system.world.position.x;
    // // pp.y = this.system.gameHeight - pointer.y - this.system.world.position.x;
    // // 
    // 
    // pp.x = pointer.x - this.system.world.position.x;
    // pp.y = this.system.gameHeight - pointer.y - this.system.world.position.y;
    // 
    
    // 
    // var pointer = this.system.pointer.screenUV;
    var pointer = this.system.pointer.worldSpace;
    // var pointer3d = this.system.pointer.worldSpace;
    
    // console.log("pointer", pointer);
    
    //pointer = 
    // pointer.sub(this.system.world.position);
    
    // var ff = this.system.world.worldMatrix.clone().identity()

    // pointer.applyMatrix4( ff.copy( this.system.world.worldMatrix ).invert() );
    // pointer.applyMatrix4(  this.system.world.worldMatrix.clone().invert()  );
    
    
    // pointer.clone().applyMatrix4( this.system.world.worldMatrix.invert() );
    //pointer.clone().applyMatrix4( this.system.world.worldMatrix );
    // pointer.clone().add(new Vector3(this.system.world.x, this.system.world.y) )
    
    
    // var tt = pointer.clone();
    // // tt.x += this.system.world.position.x;
    // // tt.y += this.system.world.position.y;
    
    // this.mouseVisual.position.copy(pointer).add(this.system.world.position)
    
    // var pointerWorld = this.system.pointer.screenUVWorldSpace;
    // console.log(pointerWorld);
    // this.mouseVisual.position.copy(pointerWorld)//.add(this.system.world.position)
    
    // this.mouseVisual.position.copy(pointer).applyMatrix4(this.mouseVisual.worldMatrix)
    
    this.mouseVisual.position.copy(pointer)//.applyMatrix4(this.mouseVisual.worldMatrix)
    
    window.mouseVisual = this.mouseVisual;
    
    window.onConsole.log("mouse", pointer.x, pointer.y);
    // window.onConsole.log("world mouse", pointer3d.x, pointer3d.y);
    //window.onConsole.log("pos", this.mouseVisual.position.x, this.mouseVisual.position.y);
    //window.onConsole.log("mat", this.system.world.worldMatrix.getPosition());
    
    
    // console.log("pointer UV", this.system.pointer.screenUV);
    
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
          // wall.color.copy({r:0,g:0.5,b:0,a:1});
          // wall.color.copy(wall.mColor);
        }
        
        var wasIn = false;
        if(wall instanceof Plane || wall instanceof Platform){
          // wasIn = pointInBoundingBoxScreenSpace(pointer, wall);
          
          // pointer.x -= this.system.world.position.x;
          
          // DONT know why yet we have to add the world back in
          // var tt = pointer.clone();
          // tt.x += this.system.world.position.x;
          // tt.y += this.system.world.position.y;
          
          // wasIn = wall.pointCollideCheck(tt);
          wasIn = wall.pointCollideCheck(pointer);
          // debugger
          // wall.color.copy({r:0,g:0,b:1,a:1});
          wall.color.copy({r:0,g:0.2,b:0.5,a:1});
        }
        // else {
        //   wasIn = pointInRect(pointer, wall);
        // } 

        
        // console.log(wall.width, wall.height);
        // console.log(pointer);
        if(wasIn){
            // wall.color = {r:0,g:0,b:1,a:0};
            // wall.color.copy({r:1,g:1,b:1,a:1});
            if(wasEverIN == false){
              wasEverIN = true;
              this.selectedObject = wall;
              this.selectedObject.selectState();
              this.selectedObject.color.copy({r:0,g:0.4,b:1,a:1});
            }
            
            
            break;
        }
        else {
          
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
