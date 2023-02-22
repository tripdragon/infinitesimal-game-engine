
import { Plane } from "../Primitives/Plane.js";
import { Rectangle } from "./Rectangle.js";
import { Vector3 } from "../Modules/Vector3.js";
import { Color } from "../Modules/Color.js";



/*

var box = new Platform("boxlike", 400, 400, 0, 10, 10, {r:0,g:0.5,b:1,a:1});
this.system.add(box);

box.onCollide = function(){
  console.log("wap!", box.name);
  // soundboard1.play();
  var ss = new Audio("./Discs/Soundeffects/bleep-audiomass-output.wav");
  ss.play();
}


*/


export class Platform extends Plane {
  
  subType = "platform";
  layer = "platform"; // both???
  
  gridSize = {
    width : 20,
    height : 20,
    scalar : 1
  }
  
  // origin = new Vector3();
  
  constructor(name, x, y, z, width, height, color, system) {
    
    super(name, x, y, z, width, height, color, system);
    
    this.gridSize.width = width;
    this.gridSize.height = height;
    // this.origin.copy(this.position);
    // debugger
  }
  
  /*
  // pops the width and height as a multiple of the grid it retains
  // while it can take fractionals, its not yet designed to handle below 1 properlly
  recent.scaleSidePower(1,"top")
  recent.scaleSidePower(2,"right")
  recent.scaleSidePower(1,"right")
  */
  // same as addSideScalar but usefull for a grid
  scaleSidePower(scalar, side){
    // debugger
    if(scalar <= 0){
      console.log("scalar must be 1 or greater");
      return;
    }
    
    var width = this.gridSize.width;
    var height = this.gridSize.height;
    
    if(scalar === 1){
      if(side === "left" || side === "right"){
        this.sides.left[0].x = -width/2;
        this.sides.left[1].x = -width/2;
        this.sides.right[0].x = width/2;
        this.sides.right[1].x = width/2;
        this.rebuildDimentions();
        return;
      }
      else if(side === "bottom" || side === "top"){
        this.sides.top[0].y = height/2;
        this.sides.top[1].y = height/2;
        this.sides.bottom[0].y = -height/2;
        this.sides.bottom[1].y = -height/2;
        this.rebuildDimentions();
        return;
      }
    }
    // debugger
    // use the half of the grid width of the center
    // sure!
    var valWidth = (width/2) + (width * (scalar-1));
    var valHeight = (height/2) + (height * (scalar-1));
    
    if(side === "left"){
      this.sides.left[0].x = -valWidth;
      this.sides.left[1].x = -valWidth;
    }
    else if(side === "bottom"){
      this.sides.bottom[0].y = -valHeight;
      this.sides.bottom[1].y = -valHeight;
    }
    else if(side === "right"){
      
      this.sides.right[0].x = valWidth;
      this.sides.right[1].x = valWidth;
    }
    else if(side === "top"){
      this.sides.top[0].y = valHeight;
      this.sides.top[1].y = valHeight;
    }
    
    
    this.rebuildDimentions();
    
  }



}
