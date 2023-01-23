

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


// extends Rectangle cause we gotta render it somehow and in previous
// practice making a .renderObject.x = 0839048
// is SUCH A PAIN to keep code syncing when building
// or you have to write get setters for EVERYTHING over again
export class Actor extends Rectangle {
  
  // temp untill we fix .type
  subType = "actor";
  
  walkSpeed = 19.5; // needs xy
  
  mPos = {x:0,y:0,z:0};
  
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
  
  
  // for mode.bot remote mote
  // can be handled by a vector2
  // but would still take impluses in
  directionVector = {x:0, y:0, z:0};
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
  
  
  // you can change this func for the funs
  mGravity = function(){};
  
  gravityForce = function(delta, gravity){
    this.y += (delta * 0.01 ) + gravity;
  }
  useGravity = true;
  
  // long name....
  canUpdateFromInputs = true;

  // constructor(name, x=0, y=0, width=10, height=10, color = {x:1.0, y:1.0, z:1.0, w:1.0}) {
  constructor(name, x, y, width, height, color = {r:1.0, g:1.0, b:1.0, a:1.0}) {
    
    super(name, x, y, width, height, color);
    
    this._mode = this.modes.player;
    // this.direction = this.directions.idle;
    
  }
    
  update(){
    if( !this.canUpdate ){
      return;
    }
    super.update();
    if(canUpdateFromInputs){
      // need some access to the keyboard or input device joystick
    }
  }
  
  
  updateWalking(deltaTime, externalGravity = 9.7237864){
    
    var keysDown = this.system.keysDown;
    // gravity
    // player.gravity = function(){
    //   player.y += (delta * 0.01 ) + window.gravity;
    // }
    // wrong formula
    // player.y += (delta * 0.01 ) + 9.7;
    // player.y += 0.5;
    if(this.useGravity){
      this.gravityForce(deltaTime, externalGravity);
    }
    
    if(this._mode === this.modes.player){
      // console.log("¿¿¿¿¿");
      //if(arrowsDown.left){
      if(keysDown.ArrowLeft){
        this.x += -this.walkSpeed;
      }
      if(keysDown.ArrowRight){
        this.x += this.walkSpeed;
      }
      // in screen space we need to flip y
      if(keysDown.ArrowDown){
        this.y += -this.walkSpeed * -1;
      }
      if(keysDown.ArrowUp){
        this.y += this.walkSpeed * -1;
      }
      
    }
    else if(this._mode === this.modes.bot){
      
      // this.useGravity = false;
      // this could be handled by a simple vector2/3
      // but would still take impulses in
      this.x += this.walkSpeed * this.directionVector.x;
      this.y += this.walkSpeed * this.directionVector.y * -1;
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
      
      
    }
    
    // needs an IF
    // ASTROIDS!!!! like
    if(this.x > window.innerWidth){
      this.x = 0;
    }
    else if(this.x < 0){
      this.x = window.innerWidth;
    }
    if(this.y > window.innerHeight){
      this.y = 0;
    }
    else if(this.y < 0){
      this.y = window.innerHeight;
    }
    
    
    
  }
  
}
