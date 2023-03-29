
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

// import { AABBTest, pointInRect, pointInBoundingBoxScreenSpace } from "../Modules/Colliders/collisions.js";


// import { Tool } from "./Tool.js";
// import { Plane } from "../Primitives/Plane.js";
// import { VisualPlane } from "../Primitives/VisualPlane.js";
// import { Platform } from "../Primitives/Platform.js";
// import { Vector3 } from "../Modules/Vector3.js";
// import { Color } from "../Modules/Color.js";
import { SelectTool } from "./SelectTool.js";

import { Grid } from "../Modules/Grid.js";

export class SelectToolMusic extends SelectTool {
  
  
  scrollBoxPointer = null;
  
  grid;
  
  startingOctave = 1;
  
  constructor(system, name = "SelectToolMusic", displayName = "SelectToolMusic"){
    
    // super(name, displayName, system);
    super(system, name, displayName);
  }
  
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
    
    
    
    update(){
      super.update();
      // debugger
    }
    
    // mPos98345 = new Vector3();
    pointerUp(){
      super.pointerUp();
      
      this.isMouseDown = false;
      // if(this.selectedObject !== null && this.scrollBoxPointer !== null){
      //   if(this.selectedObject !== this.scrollBoxPointer){
      // 
      //     // move box to local space of scrollbox
      //     // this should happen in Quark but for now just get it done here
      //     this.scrollBoxPointer.worldToLocal( this.mPos98345.copy(this.selectedObject.position) );
      // 
      //     this.selectedObject.parent = this.scrollBoxPointer;
      // 
      //     this.selectedObject.position.copy(this.mPos98345);
      // 
      //     this.selectedObject.bbb();
      //   }
      // }
    }
  
  
  

}
