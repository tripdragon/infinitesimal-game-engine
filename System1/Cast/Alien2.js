

// see Alien1 for notes

import {StampTool} from "../Tools/StampTool.js";
import {Bot} from "../Primitives/Bot.js";

export class Alien2 extends Bot {
  
  constructor(name, x, y, width, height, color) {
    super(name, x, y, width, height, color);
  }
  
  
  update(){
    
    if(this.canUpdate === false){
      return;
    }

    this.y -= this.system.time.delta * 0.05;
    if( (this.y + this.height) < 0){
      this.y = window.innerHeight;
    }

  }
  
  
}
