

/*

in Actor class

import {walk} from "../Behaviours/walk.js";
import {freefall} from "../Behaviours/freefall.js";
import {flipdirection} from "../Behaviours/flipdirection.js";

start(){  
  this.behaviours.add(walk(this));
  this.behaviours.add(freefall(this));
  this.behaviours.add(flipdirection(this));
  
  this.directionVector.x = 1;

}


behavioursHook(){


  // this.behaviours.updateTasks();

  // this.behaviours.updateActions();

  // here we just directly call it
  // not as roboty

  if( this.platform ){

    this.behaviours.walk.update();
  }
  else {
    this.behaviours.inSpace.update();
    
  }


  this.behaviours.updateActions();


}

*/




export class BehavioursController{
  
  // dictionary(s)
  actions = {};
  reactions = {};
  quests = {};
  edge = {};
  
  // you could simplify the walk and fall into a task
  // dictionary
  tasks = {}; // job
  
  // switching to a dictionary
  // cause its difficult to read what is calling in the call classes
  // still need some basic default
  
  // effectively if Actor is the air no platform
  // are you flying, floating, falling, drifting, so many
  //inSpace = new Behaviour();
  inSpace = {};
  
  
  // its the most common so well just have it as well
  // it will simply be .walk.update()
  //walk = new Behaviour();
  walk = {};
  
  
  
  add(behaviour){
    // debugger
    // we dont have enums and this form of naming is gonna keep fluxing
    if (behaviour.type === "task") {
      this.tasks[behaviour.name] = behaviour;
    }
    else if(behaviour.type === "inSpace"){
      //this.inSpace = behaviour;
      this.inSpace[behaviour.name] = behaviour;
    }
    else if(behaviour.type === "action"){
      this.actions[behaviour.name] = behaviour;
    }
    
    //
    // if(behaviour.name === "walk"){
    //   this.walk = behaviour;
    // }
    else if(behaviour.type === "walk"){
      this.walk[behaviour.name] = behaviour;
    }
    else if(behaviour.type === "edge"){
      this.edge[behaviour.name] = behaviour;
    }
  }
  
  updateTasks(){
    
    for (const prop in this.tasks) {
      if (Object.hasOwn(this.tasks, prop)) {
        // debugger
        // console.log(`obj.${prop} = ${obj[prop]}`);
        this.tasks[prop].update();
      }
    }
    
  }
  
  // this ideally would fill an array
  // you would check it if needed
  updateActions(){
    for (const prop in this.actions) {
      if (Object.hasOwn(this.actions, prop)) {
        // console.log(`obj.${prop} = ${obj[prop]}`);
        this.actions[prop].update();
      }
    }
  }
  

}

//
//
//
export class Behaviour{
  
  type = "";
  name = "";
  has = false;
  
  system;
  actor;
  time;
  
  
  constructor(name, type, actor, system){
    this.name = name;
    this.type = type;
    this.actor = actor;
    if(system){
      this.system = system;
    }
    else if(actor){
      this.system = this.actor.system;
    }
    if(this.system){
      this.time = this.system.time;
    }
  }
  
  // start(){}
  
  // logic(){}
  
  update(){}
  
  check(action){
    
    // Action: is drop
    // Actor is in midair
    // actor gravity is enabled
    // gravity is 9
    // 
    // Action: is collide from floor
    // look for object, if is a panel
    // set .panel to found panel
    // 
    
    
  }
  
}
