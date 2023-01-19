


// build() is the open point for setting up custom game levels and such
// start(system) makes it all beep and boop

export class Game {
  
  levels = [];
  
  camera; // hrrrrmmm ???
  
  //constructor(system = null){
    // this.system = system;
  // }
  constructor(name, system = null){
    this.name = name;
    this.system = system;
  }
  
  
  load(){
    
  }
  
  unload(){
    
  }
  
  start(system){
    this.system = system;
    this.load();
  }
  
  
}
