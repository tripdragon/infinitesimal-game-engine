

import { Vector3 } from '../Modules/Vector3.js';

import { BehavioursController, Behaviour } from '../Behaviours/Behaviour.js';
import { Actor } from './Actor.js';

import {freefall} from "../Behaviours/freefall.js";
import {playerWalk} from "../Behaviours/playerWalk.js";
import {playerWalkPhysics} from "../Behaviours/playerWalkPhysics.js";
import {playerWalkFancy01} from "../Behaviours/playerWalkFancy01.js";
import {screenwrap} from "../Behaviours/screenwrap.js";



import {VisualPlane} from "../Primitives/VisualPlane.js";
import {freeLoop} from "../Plugins/freeLoop.js";

import {collide} from "../Behaviours/collide.js";

export class Player extends Actor {

  // subType = "player";
  
  gravity = 9.2;
  
  
  walkSpeed = 0.1;
  walkSpeed = 2;
  // walkSpeed = 5;
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
    
    this.behaviours.add(collide(this));
    
    // this.behaviours.add(flipdirection(this));
    

    window.playerStreams = [];

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
    
    
    // var item = new Plane("c", 0, 0, 0, 10, 10, {r:1,g:1,b:1,a:1}, this.system);
    // item.canCollide = false;
    // item.subType = "visualPlane";
    // return item;
    
    
    
    
    // 
    // var gg = new VisualPlane("cc", 0, 0, 0, 10, 10, {r:1,g:1,b:1,a:1}, this.system);
    // gg.position.copy(this.edges.left(true));
    // this.system.add(gg);
    // 
    // 
    // // this little large block performs waaaaay better than freeLoop()
    // gg.timeData = {
    //   time : 0,
    //   mTime : 0,
    //   startTime : -1,
    //   currentTime: 0,
    //   delta : 0,
    //   runTime: 0.5,
    // }
    // 
    // gg.update = function(){
    //   var timeData = this.timeData;
    //   timeData.time = Date.now();
    //   if(timeData.startTime === -1){
  	// 		timeData.startTime = timeData.time;
  	// 		timeData.mTime = timeData.time;
  	// 	}
    //   timeData.delta = (timeData.time - timeData.mTime) / 1000;
  	// 	// console.log(delta);
  	// 	timeData.currentTime += timeData.delta;
    //   timeData.normalizedTime = timeData.currentTime / timeData.runTime;
    //   timeData.mTime = timeData.time;
    //   // debugger
    // 
    //   if(timeData.normalizedTime >= 1.0){
    //     // debugger
    //     this.delete();
    //     this.update = function(){};
    //   }
    // 
    // }
    // 
    // 
    // 
    // window.playerStreams.push(gg);
    
    // gg.delete();
    
    
    // TOOOOOO hard on its brain
    // freeLoop(1, function(x){
    //   if(x.normalizedTime >= 1 && gg){
    //     gg.delete();
    //   }
    //   // if(x.isDone){
    //   //   debugger
    //   // }
    // });
    
    // 
    // var gg = new VisualPlane("cc", 0, 0, 0, 10, 10, {r:1,g:1,b:1,a:1}, this.system);
    // gg.position.copy(this.edges.right(true));
    // this.system.add(gg);
    // 
    // var gg = new VisualPlane("cc", 0, 0, 0, 10, 10, {r:1,g:1,b:1,a:1}, this.system);
    // gg.position.copy(this.edges.bottom(true));
    // this.system.add(gg);
    // 
    // var gg = new VisualPlane("cc", 0, 0, 0, 10, 10, {r:1,g:1,b:1,a:1}, this.system);
    // gg.position.copy(this.edges.top(true));
    // this.system.add(gg);
    // 
    // 
    
    
    
    
    
    // debugger
    
    
    // This might belong in a behaviour
    if(this.platform){
      // if(this.boundingBox.max.x < this.platform.boundingBox.min.x || 
      //   this.boundingBox.min.x > this.platform.boundingBox.max.x
      // )
      // debugger
      
      // testing if left the platform??
      if(this.boundingBoxWorld.max.x < this.platform.boundingBoxWorld.min.x || 
        this.boundingBoxWorld.min.x > this.platform.boundingBoxWorld.max.x
      )
      {
        // debugger
        this.platform = null;
        // this.useGravity = false;
        this.useGravity = true;
      }
    }
    
    
    
    // this.updateFromForces();
    
    // make it stop gliding
    // if(Math.abs(this.velocity.x) < 0.4 ){
    //   this.velocity.x = 0;
    // }
    
    
    
    this.behaviours.actions.screenwrap.update();
    
    
    this.behaviours.actions.collide.update();
    
    
    // never used yet
    // this.behaviours.updateTasks();
    // this.behaviours.updateActions();
    
    
    // this.findPlatform();
    if(!this.platform){
      this.findPlatform();
      
    }
    
    // if(this.platform){
    // 
    // }
    

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
