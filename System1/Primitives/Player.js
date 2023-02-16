

import { Vector3 } from '../Modules/Vector3.js';

import { BehavioursController, Behaviour } from '../Behaviours/Behaviour.js';
import { Actor } from './Actor.js';

import {freefall} from "../Behaviours/freefall.js";
import {playerWalk} from "../Behaviours/playerWalk.js";
import {playerWalkPhysics} from "../Behaviours/playerWalkPhysics.js";
import {playerWalkFancy01} from "../Behaviours/playerWalkFancy01.js";
import {screenwrap} from "../Behaviours/screenwrap.js";

export class Player extends Actor {

  // subType = "player";
  
  gravity = 9.2;
  
  
  // walkSpeed = 0.1;
  walkSpeed = 5;
  floatSpeed = 5;
  jumpSpeed = 48;
  // walkSpeed = 25;
  
  maxSpeed = {
    x:100, y: 12, z:0
  }
  
  maxJumpHeight = 120; // ????
  isJumping = false;
  
  // unsigned
  // currentSpeed = {
  //   x: 0, y: 0, z:0
  // }
  
  velocity = new Vector3();
  
  frictionSpeed = {
    x: 8, y: 8, z: 1
  }
  
  // this does nothign notacible yet cause velecity is getting cleared
  // each frame
  frictionPlatform = 0.01; // this shoudl come from the platform, but if in space need something as well
  frictionInSpace = 0.001;

  constructor(name, x, y, z, width, height, color = {r:1.0, g:1.0, b:1.0, a:1.0}, system) {
    
    super(name, x, y, z, width, height, color, system);
    
    this._mode = this.modes.player;
    
  }
  
  clone(){
    return new this.constructor().copy(this);
  }
  
  copy(thing){
    super.copy(thing);

    return this;
  }

  start(){  
    // this.behaviours.add(walk(this));
    // debugger
    this.behaviours.add(freefall(this));
    this.behaviours.add(playerWalk(this));
    this.behaviours.add(playerWalkPhysics(this));
    this.behaviours.add(playerWalkFancy01(this));
    this.behaviours.add(screenwrap(this));
    
    
    // this.behaviours.add(flipdirection(this));
    

  }

    
  behavioursHook(){
    

    // if(!this.platform){
    //   this.useGravity = true;
    // }
    // else {
    //   this.useGravity = false;
    // 
    // }
    
    window.ggg = this;
    
    // this would read better as this.freefall();
    // this.behaviours.inSpace.freefall.update();
    

    

    // if(this.useGravity && !this.platform){
    // 
    //   this.setApplyForce(0, this.gravity * this.deltaTime * 0.05, 0);
    // 
    // }

    
    // if jump or is off edge test
    // need to do a isOnTest() to check if player moved past the edge
    // otherwise should not look for platform cause it resets it


    
    
    // this.updateWalking2();
    
    // this.behaviours.walk.playerWalk.update();
    // this.behaviours.walk.playerWalkPhysics.update();
    this.behaviours.walk.playerWalkFancy01.update();
    
    // This might belong in a behaviour
    if(this.platform){
      if(this.boundingBox.max.x < this.platform.boundingBox.min.x || 
        this.boundingBox.min.x > this.platform.boundingBox.max.x
      ){
        // debugger
        this.platform = null;
        this.useGravity = false;
      }
    }
    
    
    
    // this.updateFromForces();
    
    // make it stop gliding
    // if(Math.abs(this.velocity.x) < 0.4 ){
    //   this.velocity.x = 0;
    // }
    
    
    
    this.behaviours.actions.screenwrap.update();
    
    // never used yet
    // this.behaviours.updateTasks();
    // this.behaviours.updateActions();
    
    
    // this.findPlatform();
    if(!this.platform){
      this.findPlatform();
      // debugger
    }
    
    if(this.platform){
      // debugger
    }
    

    if( this.platform ){
      
      this.useGravity = false;
      // this.behaviours.walk.update();
    }
    else {
      
      this.useGravity = true;
      // Hmmmmm this name
      // this.behaviours.inSpace.update();
      
    }
    
    // console.log("velocity", this.velocity);
    
    // this.behaviours.updateActions();

  }


  
}
