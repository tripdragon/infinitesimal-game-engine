
// import { Rectangle } from '../Primitives/Rectangle.js';
import { Actor } from '../Primitives/Actor.js';



export class Bot extends Actor {
  
  subType = "bot";
  _mode = this.modes.bot;
  
  clone(){
    return new this.constructor().copy(this);
  }
  
  copy(thing){
    super.copy(thing);
    this.subType = thing.subType;
    this._mode = thing._mode;
    return this;
  }
  
  walkingForumla(){
    
  }
  
}
