


/*

var system = APPPP
var box = new VisualPlane("boxlike", 400, 400, 0, 10, 10, {r:1,g:0.5,b:1,a:1});
system.add(box);

selectedsdfkdg.position.x += 100

box.position.copy(selectedsdfkdg.position)
box.updateBoundingBox()

box.parent  = selectedsdfkdg 
box.position.set(0,0,0)



*/

import { Matrix4 } from "../Modules/GL-Matrix.js";

import { Quark } from "../Primitives/Quark.js";
import { Rectangle } from "./Rectangle.js";
import { Vector3 } from "../Modules/Vector3.js";
import { Color } from "../Modules/Color.js";

import { Plane } from "./Plane.js";


// need to rework this and Plane as a plane needs to create these but load order issue
// so for now this is 


// This is simply a plane with some settings to make sure its not in the Colliders
// mainlo used for debugging position points
export class VisualPlane extends Plane {
// export var VisualPlane = function(name = "visual", x = 0, y = 0, z = 0, width = 10, height = 10, color = new Color(), system)  {
  
  
  // Plane.call(this, name, x, y, z, width, height, color, system);
  
  canCollide = false;
  subType = "visualPlane";
  
  
    // 
    // constructor(name, x, y, z, width, height, color, system) {
    //   super(name, x, y, z, width, height, 0, color, system);
    // 
    // 
    //   this.system = system;
    // 
    //   this.pointsCount = 6;
    //   this.mHeight = height;
    //   this.mWidth = width;
    // 
    //   this.recomputeSides();
    // 
    //   // plane has no origin persay
    //   // its geometry is offset to handle this by default
    //   // thus we have to calculate and prebake positions
    //   this.centerPositions();
    //   this.computeBoundingBox();
    //   this.computeBoundingBoxPadding();
    // 
    // }
    

    
}
// VisualPlane.prototype = Object.create(Plane.prototype);
