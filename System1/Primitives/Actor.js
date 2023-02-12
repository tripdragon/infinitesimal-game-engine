

// Character Charactor
// Player Villian Drone WorkerBee
// Homosapien homoerectus vs homosapien vs munky
// denisovan
// Pawn

// WAHT to name it???!?!?!?
// UnrealEngine uses Character : Pawn
// A Pawn that moves from input

// an Actor takes Direction or INput so that seems about right
// A WorkerDrone would be an ai, A Player is a Drone that breaks free
// from the corparate tyranny
// An Actor can play any role for the art of the Stage!!!

// ehhhhh Actor it is, tabun~

import { Rectangle } from '../Primitives/Rectangle.js';
import { Plane } from '../Primitives/Plane.js';
import { Vector3 } from '../Modules/Vector3.js';

import { BehavioursController, Behaviour } from '../Behaviours/Behaviour.js';


// extends Rectangle cause we gotta render it somehow and in previous
// practice making a .renderObject.x = 0839048
// is SUCH A PAIN to keep code syncing when building
// or you have to write get setters for EVERYTHING over again

// Change to PLane, just need to fix collider logic first
export class Actor extends Plane {
// export class Actor extends Rectangle {
  
  // temp untill we fix .type
  subType = "actor";
  
  walkSpeed = 19.5; // needs xy
  
  mPos = new Vector3();
  
  delayStart = false;
  
  // make this easier to type
  get deltaTime(){
    return this.system.time.delta;
  }
  
  // the thing its standing on
  // if your flying it shoudl revert to null
  // if it needs to "guard" a platform that some other logic
  platform = null;
  outColliders = [];
  
  // is this just a helper function>????
  // logic was/is in Behaviour > Freefall
  // we need to hide the outColliders but not create it in a loop
  findPlatform(){
    this.outColliders = [];
    var colliders = this.system.platforms;
    
    this.platform = null;
    
    for (var i = 0; i < colliders.length; i++) {
      
      var wasIn = this.intersectsScreenSpaceWithPadding(colliders[i]);
      if(wasIn){
        
        this.outColliders.push(colliders[i]);
      }
    }
    if(this.outColliders.length > 0){
      // debugger
      this.platform = this.outColliders[0];
      
    }
  }
  
  
  
  // type???
  
  // this shoudl be static but then its Player.modes.lksjdfo
  // enums suck in js
  modes = {
    player : "player",
    bot : "bot"
  };
  _mode = this.modes.player;
  get mode(){
    return this._mode;
  }
  set mode(val){
    if(val === "player"){
      this._mode = this.modes.player;
    }
    else if(val === "bot"){
      this._mode = this.modes.bot;
    }
  }
  
  // bots mainly use this BUT actor can as well
  // so leave it here for now
  behaviours = new BehavioursController();
  
  // called in update
  behavioursHook(){}
  
  // action = {};
  // reaction = {};
  // quest = {};
  // task = {}; // job
  // Hrrrrrmmmm this is a space of AI
  
  // thinky thinky
  // idle, walking, seeking, alsleepIdle, etc...
  // behaviours = {
  //   current : null,
  //   cache : null,
  //   list : {}
  // }
  
  /*
  
  
  */
  
  
  
  
  // for mode.bot remote mote
  // can be handled by a vector2
  // but would still take impluses in
  // Can also be used for main Actor so leave it in here
  directionVector = new Vector3();
  // directions = {
  //   idle : "idle",
  //   up : "up",
  //   down : "down",
  //   left : "left",
  //   right : "right",
  //   upLeft : "upLeft",
  //   downLeft : "downLeft",
  //   downRight : "downRight",
  //   upRight : "upRight"
  // };
  // direction = this.directions.idle;
  
  // constant
  gravity = 9.2;
  acceleration = new Vector3();
  force = new Vector3();
  mass = 1; // nothing value for now
  velocity = new Vector3();
  frictionPlatform = 0.01; // this shoudl come from the platform, but if in space need something as well
  frictionInSpace = 0.01;
  dragForce = new Vector3();
  
  
  // you can change this func for the funs
  mGravity = function(){};
  
  gravityForce = function(delta, _gravity){
    this.y += (delta * 0.01 ) + _gravity;
  }
  useGravity = true;
  
  
  setApplyForce(x,y,z){
    if(isNaN(x) || isNaN(y) || isNaN(z)){
      debugger
    }
    this.force.set(x,y,z);
    this.force.divideScalar(this.mass);
    this.acceleration.add(this.force);
    
    // console.log("this.force", this.force);
    // var speed = this.velocity.magnitude();
    // if(isNaN(speed)){
    //   debugger
    // }

  }
  applyForce(_force){
    if(isNaN(_force.x) || isNaN(_force.y) || isNaN(_force.z)){
      debugger
    }
    this.force.copy(_force);
    this.force.divideScalar(this.mass);
    this.acceleration.add(this.force);
    
    // console.log("this.force 222", this.force);
    
    // var speed = this.velocity.magnitude();
    // if(isNaN(speed)){
    //   debugger
    // }
  }
  
  skjdfndf = new Vector3();
  updateFromForces(){
    // Velocity changes according to acceleration
    this.velocity.add(this.acceleration);
    // console.log("this.acceleration", this.acceleration);
    var speed = this.velocity.magnitude();
    // if(isNaN(speed)){
    //   debugger
    // }
    
    // console.log("this.velocity 222", this.velocity);
    // position changes by velocity
    // this.velocity.y *= -1;
    // this.skjdfndf.copy(this.position).add(this.velocity);
    // if(isNaN(this.skjdfndf.x) || isNaN(this.skjdfndf.y) || isNaN(this.skjdfndf.z)){
    //   debugger
    // }
    this.position.add(this.velocity);
    this.updateBoundingBox(); // MUST do this or it breaks collisions
    
    // We must clear acceleration each frame
    this.acceleration.clear();
    
    // need to clear to avoid it ramping up but breaks sliding friction
    // also might need to recalculate it then?
    // this.velocity.clear();
  }
  
  skjdfndf2222 = new Vector3();
  getDragForce(type = "platform"){
    var ff = this.frictionPlatform;
    if(type === "inSpace"){
      ff = this.frictionInSpace;
    }
    
    var speed = this.velocity.magnitude();
    // var speed = 1;
    var dragMagnitude = ff * speed * speed;
    this.dragForce.copy(this.velocity);
    this.dragForce.multiplyScalar(-1);
    this.dragForce.normalize();
    this.dragForce.multiplyScalar(dragMagnitude);
    
    if(isNaN(this.dragForce.x) || isNaN(this.dragForce.y) || isNaN(this.dragForce.z)){
      debugger
    }
    
    return this.dragForce;
  }
  
  
  // long name....
  canUpdateFromInputs = true;

  


  // constructor(name, x=0, y=0, width=10, height=10, color = {x:1.0, y:1.0, z:1.0, w:1.0}) {
  constructor(name, x, y, width, height, color = {r:1.0, g:1.0, b:1.0, a:1.0}, system) {
    
    super(name, x, y, width, height, color, system);
    
    this._mode = this.modes.player;
    // this.direction = this.directions.idle;
    
    
    
  }
  
  clone(){
    return new this.constructor().copy(this);
  }
  
  copy(thing){
    super.copy(thing);

    this.subType = thing.subType;
    this.walkSpeed = thing.walkSpeed;
    this.mPos = thing.mPos.clone();
    this.platform = thing.platform;
    
    this._mode = thing._mode;
    
    this.directionVector = thing.directionVector.clone();
    
    this.mGravity = thing.mGravity;
    
    // not sure how to copy this function
    // this.gravityForce = function(delta, gravity){
    //   this.y += (delta * 0.01 ) + gravity;
    // }
    this.gravityForce = thing.gravityForce;
    this.useGravity = thing.useGravity;

    this.canUpdateFromInputs = thing.canUpdateFromInputs;
    
    return this;
  }

  // overwite this as needed
  start(){}


  update(){
    if( !this.canUpdate ){
      return;
    }
    super.update();
    if(this.canUpdateFromInputs){
      // need some access to the keyboard or input device joystick
    }
    
    
    this.behavioursHook();
    
    
    // console.log("actor update???");
    // if(this._mode === this.modes.bot){
    // 
    // }
    // this.
    
  }
  
  // function overloading for updateWalking
  updateWalking2(){
    this.updateWalking(this.system.time.delta, this.gravity);
  }

  // this.updateWalking(this.system.time.delta, 9);
  updateWalking(deltaTime, externalGravity = 9.81864){
    
              // var keysDown = this.system.keysDown;
              // // gravity
              // // player.gravity = function(){
              // //   player.y += (delta * 0.01 ) + window.gravity;
              // // }
              // // wrong formula
              // // player.y += (delta * 0.01 ) + 9.7;
              // // player.y += 0.5;
              // if(this.useGravity){
              //   this.gravityForce(deltaTime, externalGravity);
              // }
              // 
              // if(this._mode === this.modes.player){
              //   // console.log("¿¿¿¿¿");
              //   //if(arrowsDown.left){
              //   if(keysDown.ArrowLeft){
              //     this.x += -this.walkSpeed;
              //   }
              //   if(keysDown.ArrowRight){
              //     this.x += this.walkSpeed;
              //   }
              //   // in screen space we need to flip y
              //   if(keysDown.ArrowDown){
              //     this.y += -this.walkSpeed * -1;
              //   }
              //   if(keysDown.ArrowUp){
              //     this.y += this.walkSpeed * -1;
              //   }
              // 
              // }
    
    // this is a yet to figure out "Behaviour"
    // instead of a direct if item
    // else if(this._mode === this.modes.bot){
      
      // this.useGravity = false;
      // this could be handled by a simple vector2/3
      // but would still take impulses in

                  // this.x += this.walkSpeed * this.directionVector.x;
                  // this.y += this.walkSpeed * this.directionVector.y * -1;

      // console.log("this.x", this.x);
      // this.y += this.walkSpeed * -1;
      // this.y += (this.y + this.walkSpeed) * this.directionVector.y * -1;
      // if(direction === directions.left){
      //   this.x += -this.walkSpeed;
      // }
      // else if(direction === directions.right){
      //   this.x += this.walkSpeed;
      // }
      // // in screen space we need to flip y
      // else if(direction === directions.down){
      //   this.y += -this.walkSpeed * -1;
      // }
      // else if(direction === directions.up){
      //   this.y += this.walkSpeed * -1;
      // }
      
      
    // }
    
    // 
    // // this is an "EDGE" "Behaviour"
    // // Dont know where to place it yet
    // // needs an IF
    // // ASTROIDS!!!! like
    // if(this.x > window.innerWidth){
    //   this.x = 0;
    // }
    // else if(this.x < 0){
    //   this.x = window.innerWidth;
    // }
    // if(this.y > window.innerHeight){
    //   this.y = 0;
    // }
    // else if(this.y < 0){
    //   this.y = window.innerHeight;
    // }
    // 
    
    
  }
  
}
