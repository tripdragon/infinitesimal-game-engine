



/*

Actor has the basic updateWalking()
The idea is to set the directionVector which is a mapping to
a 2d joystick Vector2
but for walking a platform we set .x

N ow, on to the chanllenging thought place process of BEHAVIOURS

A state tree of sorts

Bot can :
  walk
  hop
  pace plaform
  walk plaform, then hop off, fall, land on new platform, loop
  fly
  etc...
  endless....
  
  point being some logic steps

Now, when in the editor :
  It could have a gif like loop when moving the Bot around
  Or when in drag mode
  
  On release the bot needs to find its place either it:
    falls to a platform and attaches via hittest
    flys
    not much else yet
    
  Grid:
    finding where to drop the Bot can we free of snap
    snap over a plaform would denote that its on the plaform, but the platform
    needs to know this...
    The bot can have a Buffer padding to its hit collider space so it auto finds
    the platform
    OR
    The bot could raycast at its feet
    That then activates its canWalk:bool option
    
    
  Action:
  Reaction:
  Quest:
  Job/Task:
  
  
  Constant testing "when"
  
  "when dropped or in air" freefall, fly, fly and toss
  "when landed on platform" attach to platform, enable roam
  "when at edge", flip, jump, toss, wiggle but, flip repeat roam walk
  "when at player", offer candy, anchient relic
  ""

  update() always
  check task
  check walk
  check actions[]
  
  task walk/guard
  walk .x += n
  when .x < platform min
  change task walk
  jump = directionVector -1,-1 with force and gravity
  ~~until land....
  
  describe "when land" wasInAir and now is not bool
  All jumps do this
  
  is walk a when?
  No cause its a constant task
  if you said when hasNot : then advance x
  but this seems off
  
  
  


*/


// NOTE: we now need .start() after adding creating a Bot
// it cant be in teh constructor yet, need to work that in

// import { Rectangle } from '../Primitives/Rectangle.js';
import { Actor } from '../Primitives/Actor.js';



export class Bot extends Actor {
  
  subType = "bot";
  _mode = this.modes.bot;
  
  // overwrite as needed
  start(){}
  
  
  clone(){
    // debugger
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
