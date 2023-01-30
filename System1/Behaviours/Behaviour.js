



export class BehavioursController{
  
  // dictionary(s)
  actions = {};
  reactions = {};
  quests = {};
  
  // you could simplify the walk and fall into a task
  // dictionary
  tasks = {}; // job
  
  // effectively if Actor is the air no platform
  // are you flying, floating, falling, drifting, so many
  inSpace = new Behaviour();
  
  
  // its the most common so well just have it as well
  // it will simply be .walk.update()
  walk = new Behaviour();
  
  
  
  add(behaviour){
    // debugger
    // we dont have enums and this form of naming is gonna keep fluxing
    if (behaviour.type === "task") {
      this.tasks[behaviour.name] = behaviour;
    }
    else if(behaviour.type === "inSpace"){
      this.inSpace = behaviour;
    }
    else if(behaviour.type === "action"){
      this.actions[behaviour.name] = behaviour;
    }
    
    //
    if(behaviour.name === "walk"){
      this.walk = behaviour;
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
