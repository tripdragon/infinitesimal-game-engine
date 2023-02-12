

// see Alien1 for notes

import {StampTool} from "../Tools/StampTool.js";
import {Bot} from "../Primitives/Bot.js";

export class Alien2 extends Bot {
  
  // constructor(name, x, y, width, height, color, system) {
  //   super(name, x, y, width, height, color, system);
  // }
  
  
  update(){
    
    if(this.canUpdate === false){
      return;
    }
    
    if(!this.system){
      console.log(" trying to animate without this.system");
      return;
    }
    
    // not much of a behaviour yet
    // so just place in update here
    this.y -= this.system.time.delta * 0.15;
    if( (this.y + this.height) < 0){
      this.y = window.innerHeight;
    }

  }
  
  // behavioursHook = function(){}
  
  
}
