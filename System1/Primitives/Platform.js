
import { Plane } from "../Primitives/Plane.js";
import { Rectangle } from "./Rectangle.js";
import { Vector3 } from "../Modules/Vector3.js";
import { Color } from "../Modules/Color.js";


import {collide} from "../Behaviours/collide.js";

import { BehavioursController, Behaviour } from '../Behaviours/Behaviour.js';


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
  
  behaviours = new BehavioursController();
  
  // origin = new Vector3();
  
  constructor(name, x, y, z, width, height, color, system, autoStart = true) {
    
    super(name, x, y, z, width, height, color, system);
    
    this.gridSize.width = width;
    this.gridSize.height = height;
    // this.origin.copy(this.position);
    // debugger
    
    if(autoStart){
      this.start();
    }
  }
  
  
  clone(){
    var rr = new this.constructor(this.name, this.x, this.y, this.z, this.width, this.height, this.color.clone(), this.system).copy(this);
    // debugger
    return rr;
  }
  copy(thing){
    super.copy(thing);
    this.gridSize.width = thing.gridSize.width;
    this.gridSize.height = thing.gridSize.height;
    this.gridSize.scalar = thing.gridSize.scalar;
    this.gridSize.layer = thing.gridSize.layer;
    this.gridSize.subType = thing.gridSize.subType;
    return this;
  }
  
  
  
  start(){
    
    // this.behaviours.add(collide(this));
  }
  
  
  
  behavioursHook(){
    // debugger
    // this.behaviours.actions.collide.update();
  }
  
  update(){
    super.update();
    this.behavioursHook();
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
        this.sidePoints.left[0].x = -width/2;
        this.sidePoints.left[1].x = -width/2;
        this.sidePoints.right[0].x = width/2;
        this.sidePoints.right[1].x = width/2;
        this.rebuildDimensions();
        return;
      }
      else if(side === "bottom" || side === "top"){
        this.sidePoints.top[0].y = height/2;
        this.sidePoints.top[1].y = height/2;
        this.sidePoints.bottom[0].y = -height/2;
        this.sidePoints.bottom[1].y = -height/2;
        this.rebuildDimensions();
        return;
      }
    }
    // debugger
    // use the half of the grid width of the center
    // sure!
    var valWidth = (width/2) + (width * (scalar-1));
    var valHeight = (height/2) + (height * (scalar-1));
    
    if(side === "left"){
      this.sidePoints.left[0].x = -valWidth;
      this.sidePoints.left[1].x = -valWidth;
    }
    else if(side === "bottom"){
      this.sidePoints.bottom[0].y = -valHeight;
      this.sidePoints.bottom[1].y = -valHeight;
    }
    else if(side === "right"){
      
      this.sidePoints.right[0].x = valWidth;
      this.sidePoints.right[1].x = valWidth;
    }
    else if(side === "top"){
      this.sidePoints.top[0].y = valHeight;
      this.sidePoints.top[1].y = valHeight;
    }
    
    
    this.rebuildDimensions();
    
  }



}
