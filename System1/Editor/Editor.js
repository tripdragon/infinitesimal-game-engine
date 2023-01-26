

// OH BOY!!!!
// ERE WEEE GOOOOOOOO!!!

import { ToolsController as _ToolsController } from "../Tools/ToolsController.js";
import { EditorModeActions as _EditorModeActions } from "../Editor/EditorModeActions.js";

export class Editor{
  
  system;
  
  toolsShelf = {};
  
  toolsController = new _ToolsController();
  
  addTool(tool){
    this.toolsController.addTool(tool);
  }
  
  changeTool(tool){
    this.toolsController.changeTool(tool);
  }
  
  
  stopTool(tool){
    this.toolsController.stopTool(tool);
  }
  
  // moving editor actions to the Tool for now,
  // its like 3 layers of abstraction otherwise
  // editorModeActions = new _EditorModeActions();
  
  // these go in the addEventListener
  // Dont like this patteren
  // _pointerMoving(){
  //   this.pointerMoving();
  // }
  // _pointerDown() {
  //   console.log("down 1111");
  //   // debugger
  //   this.pointerDown();
  // }
  // _pointerUp(){
  //   this.pointerUp();
  //   console.log("up 2222");
  // }
  // 
  // // replace these as the tool needs
  // pointerMoving(){
  // }
  // pointerDown(){
  //   console.log("down 1111");
  // }
  // pointerUp(){
  //   console.log("up 2222");
  // }
  // 
  constructor(system){
    this.system = system;
  }
  
  // dont know where this goes yet
  EditorModes = {
    select : "select",
    draw : "draw"
  }
  
}
