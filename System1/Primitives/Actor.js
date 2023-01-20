

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

  walkSpeed = 19.5; // needs xy
  
  mPos = {x:0,y:0,z:0};
  
  // you can change this func for the funs
  mGravity = function(){};
  
  gravityForce = function(delta, gravity){
    this.y += (delta * 0.01 ) + gravity;
  }
  useGravity = true;
  
  // long name....
  canUpdateFromInputs = true;

  // constructor(name, x=0, y=0, width=10, height=10, color = {x:1.0, y:1.0, z:1.0, w:1.0}) {
  constructor(name, x, y, width, height, color = {x:1.0, y:1.0, z:1.0, w:1.0}) {
    
    super(name, x, y, width, height, color);
    
    
  }
    
  update(){
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
