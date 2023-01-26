


// It would be nice to be able to use a tool without a ToolsController
// well we have Stop()

// 
// 
// 
export class Tool {
  displayName = "";
  
  system = null;
  // editorModeActions = null;

  constructor(name="tool", displayName, system){
    this.name = name;
    this.displayName = displayName;
    this.system = system;
  }
  replace(){}
  start(){}
  update(){}
  stop(){}
  
  // even
  // eventPointerUp(){
  //   this.pointerUp();
  // }
  // eventPointerDown(){
  //   this.pointerDown();
  // }
  // eventPointerMoving(){
  //   this.pointerMoving();
  // }
  
  
  pointerUp(){}
  pointerDown(){}
  pointerMoving(){}
  
  
}
