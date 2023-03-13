
/*

rough work cloned out of SelectTool
Not a subclass, more a rethinking and spilling over design ideas from THREE.js stuff

It will work in conjuction with SelectTool

Each Quark Object can be moved "transformed" for now we just have position
but we need to have axis locking, scrolling to bounds etc


*/




// import { AABBTest, pointInRect, pointInBoundingBoxScreenSpace } from "../Modules/Colliders/collisions.js";


import { Tool } from "./Tool.js";
import { Plane } from "../Primitives/Plane.js";
import { Quark } from "../Primitives/Quark.js";
// import { VisualPlane } from "../Primitives/VisualPlane.js";
// import { Platform } from "../Primitives/Platform.js";
import { Vector3 } from "../Modules/Vector3.js";
import { Color } from "../Modules/Color.js";

export class MoveyThingTool extends Tool {
  
  attached = null; // the pointer to the quark based object
  
  isMouseDown = false;
  mPointerPos = new Vector3();
  mSelectedPos = new Vector3();
  
  previousGoodPosition = new Vector3();
  workPos = new Vector3();
  
  
  usePreventCollide = false;
  // usePreventCollide = true;
  
  tapTimer = 0;
  tapLimit = 0.2;
  
  
  useGrid = false;
  grid = null;

  posWorkVectorToMegas = new Vector3();
  
  // boxLimit = false;
  // limitX = false;
  // limitY = false;
  // limitZ = false;
  // 

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



  

  constructor(system, attachedObject, name = "MoveyThingTool", displayName = "MoveyThingTool"){
    
    super(system, name, displayName);
    this.attached = attachedObject;
  }
  
  
  modes = {
    mousing : "mousing",
    canDrag : "canDrag",
    canDraw : "canDraw"
  }
  
  mode = this.modes.mousing;
  
  
  start(){
    
    if(this.hasStarted === true){
      return;
    }
    
    this.bindUpEvent();
    this.bindDownEvent();
    
    this.system.loopHookPoints.editorBeforeDraw = () => {

      this.update();
    };
    
    
    
    
    // this.mouseVisual = new VisualPlane("boxlike", 0, 0, 0, 20, 20, {r:0,g:0.5,b:1,a:1}, this.system);
    // this.system.add(this.mouseVisual)
    // 
    // window.mouseVisual = this.mouseVisual;
    
  }
  
  update(){
    // this.mouseSelecting();
    // this.pointerMoving();
  }
  
  // replace(){}
  // 
  // stop(){
  // 
  // }

  
  
  onTap(){
    // send some arguments data down
    
    this.attached.onTap();
    
  }
  
  
  pointerUp(){
    this.mode = this.modes.mousing;
    this.isMouseDown = false;
    

    this.attached.deselectState();
    // this.attached.color.copy({r:0,g:0,b:1,a:1});

    this.previousGoodPosition.clear();
    
    const tt = Date.now();
    const delta = (tt - this.tapTimer) / 1000;
    
    if( delta <= this.tapLimit){
      // onConsole.log("tap timer", "yeah!", delta);
      this.onTap();
    }
    else {
      // onConsole.log("tap timer", "boo", delta);
    }
  }
  
  pointerDown(){
    var wasIn = false;
    
    if(this.attached instanceof Plane){
    // if(this.attached instanceof Plane || this.attached instanceof Platform){
    // if(this.attached instanceof Quark){
      
      var pointer3d = this.system.pointer.worldSpace;
      // debugger
      // console.log("pointer b", pointer3d.clone());
      
      wasIn = this.attached.pointCollideCheck(pointer3d);
      
    }
    
    
    if(wasIn){
      // debugger
      
      var pointer3d = this.system.pointer.worldSpace;
      
      this.mode = this.modes.canDrag;
      
      
      this.mPointerPos.copy(pointer3d);

      this.mSelectedPos.x = this.attached.position.x;
      this.mSelectedPos.y = this.attached.position.y;
      
      //window.selectedsdfkdg = this.attached;
      
      this.attached.selectState();
      // this.attached.color.copy({r:0,g:0,b:1,a:1});
      
      this.previousGoodPosition.copy(this.attached.position);
      
    }

    
    this.isMouseDown = true;
    
    this.tapTimer = Date.now();
    
  }
  
  
  pointerMoving(){
    // if(this.attached){
    //   this.attached.onHover();
    // }
    
    if(this.mode === this.modes.canDrag){
      
      this.dragAction();
      
    }
    
  }
  


  // this should instead of some large form stack of logics
  // it should add on a drag type of tool
  
  
  mouseSelecting(space){
    
    
    
    var pointer = this.system.pointer.worldSpace;
    
    if (space === "screen") {
      // var pointer = this.system.pointer.screenUV;
    }
    
    // 
    // if(this.mode === this.modes.mousing){
    // 
    //   // return;
    // 
    //   var wasIn = false;
    //   var wasEverIN = false;
    //   this.attached = null;
    // 
    //   // console.log("mousing");
    // 
    //   for (var i = 0; i < this.system.colliders.length; i++) {
    // 
    //     var isInMuch = false;
    // 
    //     var wall = this.system.colliders[i];
    // 
    // 
    //     // cheap for now dont test player collide
    //     // we dont have a player right now
    //     // if(wall === player){
    //     //   continue;
    //     // }
    // 
    //     if(wall.subType !== "actor"){
    //       // wall.color.copy({r:0,g:0.5,b:0,a:1});
    //       // wall.color.copy(wall.mColor);
    //     }
    // 
    //     var wasIn = false;
    //     if(wall instanceof Quark){
    //     //if(wall instanceof Plane || wall instanceof Platform){
    // 
    //       wasIn = wall.pointCollideCheck(pointer);
    // 
    //       // hasCollided = true;
    // 
    //       // wall.color.copy({r:0,g:0.2,b:0.5,a:1});
    //     }
    // 
    // 
    // 
    // 
    //     // color swapping needs work
    //     if(wasIn){
    // 
    //         if(wasEverIN == false){
    //           wasEverIN = true;
    //           this.attached = wall;
    //           this.attached.selectState();
    //           // this.attached. onHover() maybe
    //           // this.attached.color.copy({r:0,g:0.4,b:1,a:1});
    // 
    //           onConsole.log("this.attached", this.attached);
    //         }
    // 
    //         break;
    //     }
    // 
    // 
    //   } // colliders loop
    // 
    // 
    // 
    // }
    // 
    
    // else if(this.mode === this.modes.canDrag){
    // if(this.mode === this.modes.canDrag){
    // 
    //   this.dragAction();
    // 
    // }
    
    
  } // mouseSelecting
  


  // 
  // 
  // 
  dragAction(space){
    
    var pointer = this.system.pointer.worldSpace;
    
    if (space === "screen") {
      // var pointer = this.system.pointer.screenUV;
    }
    
    if( !this.usePreventCollide ){
      
      this.posWorkVectorToMegas.set(pointer.x + (this.mSelectedPos.x - this.mPointerPos.x), 
                                    pointer.y + (this.mSelectedPos.y - this.mPointerPos.y),
                                    0);
                                    
      // Need to figure out what kinda snap we would need
      // this mutates posWorkVectorToMegas
      if(this.useGrid && this.grid){
        // this.grid.snap(this.posWorkVectorToMegas.x, this.posWorkVectorToMegas.y,0);
        this.grid.snap3d(this.posWorkVectorToMegas.x, this.posWorkVectorToMegas.y,0);
        this.posWorkVectorToMegas.copy(this.grid.position3DCenter);
      }
      

      
      this.attached.position.copy(this.posWorkVectorToMegas);
      this.attached.refreshMatrixes();
      this.attached.bbb();
      
      
      // now limit the position to a parent box space
      // a pan scroll space really
      // we need to have updated bounds first
      
      // This only works well if the box is larger
      // otherwise it flips
      if(this.attached.boxLimit && this.attached.parent){
        
        const b0 = this.attached.boundingBoxWorld;
        const b1 = this.attached.parent.boundingBoxWorld;

        if(b0.min.x < b1.min.x && b0.max.x < b1.max.x){
          this.posWorkVectorToMegas.x = this.posWorkVectorToMegas.x + (b1.max.x - b0.max.x);
        }
        else if(b0.min.x > b1.min.x && b0.max.x > b1.max.x){
          this.posWorkVectorToMegas.x = this.posWorkVectorToMegas.x + (b1.min.x - b0.min.x);
        }
        
        if(b0.min.y < b1.min.y && b0.max.y < b1.max.y){
          this.posWorkVectorToMegas.y = this.posWorkVectorToMegas.y + (b1.max.y - b0.max.y);
        }
        else if(b0.min.y > b1.min.y && b0.max.y > b1.max.y){
          this.posWorkVectorToMegas.y = this.posWorkVectorToMegas.y + (b1.min.y - b0.min.y);
        }

        // reupdate 
        this.attached.position.copy(this.posWorkVectorToMegas);
        this.attached.refreshMatrixes();
        this.attached.bbb();
        
      }
      
      

      
      
      
      return;
    
      
    }
    
    // 
    // else forced collide
    // 
    
    // VERY rough box testing 
    // need to know if the pointer is down on the object
    
    
    // mouse with offset
    this.workPos.set(
      pointer.x + (this.mSelectedPos.x - this.mPointerPos.x), 
      pointer.y + (this.mSelectedPos.y - this.mPointerPos.y),
      0
    );
    
    
    // when we copy here we have not yet rendered so its fine to experiment with changing its matrix
    this.attached.position.copy(this.workPos);
    this.attached.refreshMatrixes();
    this.attached.bbb();
    
    var hasCollided = false;
    
    var mPick;
    var ii = 0;
    
    // test against walls
    for (var i = 0; i < this.system.colliders.length; i++) {
      var pick = this.system.colliders[i];
      
      // skip our own
      if(pick === this.attached){
        continue;
      }
      
      hasCollided = this.attached.boundingBoxWorld.intersectsBox(pick.boundingBoxWorld);
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
      this.attached.position.copy(previous);
    }
    // retain the position and save its good point
    else {
      previous.copy(this.attached.position);
    }

    
    
  }


}
