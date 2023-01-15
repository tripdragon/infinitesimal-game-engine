


// build() is the open point for setting up custom game levels and such
// start(system) makes it all beep and boop

export class Game {
  
  levels = [];
  
  constructor(system = null){
    this.system = system;
  }
  
  build(){
    
  }
  
  start(system){
    this.system = system;
    this.build();
  }
  
  
}
