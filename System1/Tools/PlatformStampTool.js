

import { Tool } from "./Tool.js";
import { StampTool } from "./StampTool.js";



// 
// Main class
// 

// thinking that The Tool is a First class citizen that handles its 
export class PlatformStampTool extends StampTool {
  
  visualObject = null;
  stampingObject = null;
  
  editor; // set these outside of the constructor
  basegrid;
  
  // row is x col is y
  startingIdexes = {
    row: -1, col : -1
  }
  
  IS_DOWN = false;
  
  currentItem = null;
  
  pointerDown(ev){
    console.log("down", ev);
    this.baseGrid.snap().screenTo3D();
    this.startingIdexes.row = this.baseGrid.indexRow;
    this.startingIdexes.col = this.baseGrid.indexCol;
    
    this.IS_DOWN  = true;
    
    var ff = this.stampingObject.clone();
    ff.refreshMatrixes();
    this.system.add(ff);
    // debugger
    ff.visible = true;
    // ff.position.copy(this.system.pointer.screenUV);
    ff.position.copy(this.system.pointer.worldSpace);
    // ff.position.copy(this.system.pointer.worldSpace);
    
    if(this.baseGrid){
      // ff.x = this.baseGrid.position3DCenter.x;
      // ff.y = this.baseGrid.position3DCenter.y;
      ff.position.set(this.baseGrid.position3DCenter.x, this.baseGrid.position3DCenter.y, 0);
      
    }
    ff.start();
    this.currentItem = ff;
    window.recent = ff;
  }
  
  // we are moving the logic to mouse down to do resizing
  pointerUp(){
    this.visualObject.visible = true;
    this.IS_DOWN = false;
    this.currentItem.rebuildDimensions();
  }
  
  // 
  start(){
    super.start();
    this.bindDownEvent();
  }


  
  stop(){
    // debugger
    super.stop();
    this.IS_DOWN = false;
    this.currentItem = null;
  }
  
  
  
  // will need to feed this a grid somehow
  update(){
    
    if(this.baseGrid){
      
      this.baseGrid.snap().screenTo3D();
      
      
      // this.baseGrid.snap(_this.system.pointer.client.x, _this.system.pointer.client.y).screenTo3D();
      
      
      // console.log(this.baseGrid.position3D);
      // console.log(this.baseGrid.position3DCenter);
      
      // console.log(this.baseGrid.indexRow, this.baseGrid.indexCol);
      
      // this.visualObject.x = this.baseGrid.position3DCenter.x;
      // this.visualObject.y = this.baseGrid.position3DCenter.y;
      this.visualObject.position.set(this.baseGrid.position3DCenter.x, this.baseGrid.position3DCenter.y, 0);
      
      
      this.visualObject.visible = true;
      if (this.IS_DOWN) {
        this.visualObject.visible = false;
      }
      
      
      
      if (this.IS_DOWN && this.currentItem !== null) {

        
        // left
        // if (this.baseGrid.indexRow === this.startingIdexes.row) {
        //   this.currentItem.scaleSidePower(1,"right");
        // }
        
        if (this.baseGrid.indexRow < this.startingIdexes.row) {
          var val = this.startingIdexes.row - this.baseGrid.indexRow + 1;
          this.currentItem.scaleSidePower(val,"left");
        }
        // right
        else if (this.baseGrid.indexRow > this.startingIdexes.row) {
          // debugger
          var val = this.baseGrid.indexRow - this.startingIdexes.row + 1;
          console.log(this.baseGrid.indexRow , this.startingIdexes.row, val);
          this.currentItem.scaleSidePower(val,"right");
        }
        else if (this.baseGrid.indexRow === this.startingIdexes.row) {
          this.currentItem.scaleSidePower(1,"right");
        }
        
        
        // console.log("this.baseGrid.indexCol", this.baseGrid.indexCol);
        // top
        // 
        if (this.baseGrid.indexCol < this.startingIdexes.col) {
          var val = this.startingIdexes.col - this.baseGrid.indexCol + 1;
          // console.log(val);
          this.currentItem.scaleSidePower(val,"top");
        }
        // bottom
        else if (this.baseGrid.indexCol > this.startingIdexes.col) {
          var val = this.baseGrid.indexCol - this.startingIdexes.col + 1;
          // console.log(val);
          this.currentItem.scaleSidePower(val,"bottom");
        }
        else if (this.baseGrid.indexCol === this.startingIdexes.col) {
          // console.log(val);
          this.currentItem.scaleSidePower(1,"top");
        }
        // 
        this.currentItem.rebuildDimensions();
        
        
      }
      
      
    }
    
    // console.log(this.system.pointer);
    // this.visualObject.x = this.system.pointer.client.x;
    // this.visualObject.y = this.system.pointer.client.y;
    
    // this.visualObject.x = this.system.pointer.screenUV.x;
    // this.visualObject.y = this.system.pointer.screenUV.y;
  }
  
  
  
  
} 
