


// It would be nice to be able to use a tool without a ToolsController
// well we have Stop()

/*

should be as simplke as .start() .stop()

*/

// 
// 
// 
export class Tool {
  displayName = "";
  
  system = null;
  // editorModeActions = null;

  
  // these are caches to allow proper scope and proper
  // removeEvent signature
  pointerUpEvent = null;
  pointerDownEvent = null;
  pointerMoveEvent = null;
  
  hasStarted = false;



  // constructor(name="tool", displayName, system){
  constructor(system, name="tool", displayName){
    this.name = name;
    this.displayName = displayName;
    this.system = system;
  }
  
  
  // use these to bind as needed, they are not assigned automaticly
  
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

  bindMoveEvent(){
    if( this.pointerMoveEvent === null){
      this.pointerMoveEvent = this.pointerDown.bind(this);
    }
    // common place for mouse events, otherwise fork this function
    this.system.canvas.addEventListener( 'pointermove', this.pointerMoveEvent );
  }
  
  
  replace(){
    this.stop();
  }
  
  start(){}
  update(){}
  
  stop(){
    this.system.canvas.removeEventListener( 'pointerup', this.pointerUpEvent );
    this.system.canvas.removeEventListener( 'pointerdown', this.pointerDownEvent );
    this.system.canvas.removeEventListener( 'pointermove', this.pointerMoveEvent );
    this.hasStarted = false;
  }

  
  pointerUp(){}
  pointerDown(){}
  pointerMove(){}
  
  
}
