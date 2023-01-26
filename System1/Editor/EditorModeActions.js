


// depricated

  //
  // these can get complex
  // lots of per tool thinking and state to figure out
  // for now just jame into EventListeners
  //
export class EditorModeActions {
    
    constructor(){
      
    }
    
    // these go in the addEventListener
    // Dont like this patteren
    _pointerMoving(){
      this.pointerMoving();
    }
    _pointerDown() {
      console.log("down 1111");
      // debugger
      this.pointerDown();
    }
    _pointerUp(){
      this.pointerUp();
      console.log("up 2222");
    }
    
    // replace these as the tool needs
    pointerMoving(){}
    pointerDown(){
      console.log("down 1111");
    }
    pointerUp(){
      console.log("up 2222");
    }
  }
