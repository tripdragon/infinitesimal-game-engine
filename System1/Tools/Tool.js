


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
  
  // these are caches to allow proper scope and proper
  // removeEvent signature
  pointerUpEvent = null;
  pointerDownEvent = null;
  
  bindUpEvent(){
    if( this.pointerUpEvent === null){
      this.pointerUpEvent = this.pointerUp.bind(this);
    }
    // common place for mouse events, otherwise fork this function
    this.system.canvas.addEventListener( 'pointerup', this.pointerUpEvent );
  }
  
  bindDownEvent(){
    if( this.pointerDownEvent === null){
      this.pointerDownEvent = this.pointerDown.bind(this);
    }
    // common place for mouse events, otherwise fork this function
    this.system.canvas.addEventListener( 'pointerdown', this.pointerDownEvent );
  }
  
  
  replace(){
    this.stop();
  }
  
  start(){}
  update(){}
  
  stop(){
    this.system.canvas.removeEventListener( 'pointerup', this.pointerUpEvent );
    this.system.canvas.removeEventListener( 'pointerdown', this.pointerDownEvent );
  }

  
  pointerUp(){}
  pointerDown(){}
  pointerMoving(){}
  
  
}
