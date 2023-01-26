

// OH BOY!!!!
// ERE WEEE GOOOOOOOO!!!

import { ToolsController as _ToolsController } from "../Tools/ToolsController.js";
import { EditorModeActions as _EditorModeActions } from "../Editor/EditorModeActions.js";



  
  /*
  ok, discussiojn
  we need a panel, it has buttons that have two or more modes
  tap : on object what happens?
  on : add object to center? NO cause any object could be there
  on : draw mode
  drag : drag has issues
  drag css has style issues and overlap issues for showing the gl object to match looks
  drag does have a on go state
  but does not have mouse clientXY and blocks the pointermove event
  input : checkbox : has changed event
  
  ok how about Mode : stamp or drag
  stamp mouseUp from limited distance to drop copy of object
  If mouseDown and distance moved > lim then start drawing
  
  that solves mostly everything?!?!?!?.....
  
  well drag and drop is still a tool, but can wait for later?
  Stamp is faster, but gets stuck in stamp mode
  
  */
  
  
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
  
  
  launch_CM(){}
  
  hide(){}
  
  remove(){}
  
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
