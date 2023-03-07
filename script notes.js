


aa = `
direction is left and speed is 2
walkPlatform until atEdge
flip
walk platform
repeat
`;

// bb = aa.split(" ")

//example.replace( /\n/g, " " ).split( " " )

bb = aa.replace( /\n/g, " " ).split( " " )


[
  "", "direction", "is", "left", "and", "speed", "is", "2", "walkPlatform",
  "until", "atEdge", "flip", "walk", "platform", "repeat", ""
]

// functions and evals


// platform is already assigned
// otherwise feed functions with ifs
wobject = {
  x:1, y: 0,
  direction : { x: 0, y: 0 },
  platform : object,
  walkRoutine : function(){},

  // this seems to be like such a common task
  // that it should be ratifed into the player object here
  // event
  atEdge : function(){},
  isAtEdge : false,

  update: function(){
    walkRoutine()
    atEdge()
  }
}

// ?!??¿¿⁄÷“…¬¬Ωø”
fucntion is(thing, func, val){
  func(thing, val)
}

function direction(thing, val){
  if(val === "left"){
    thing.direction.x = -1;
  }
}

function speed(thingy, val){
  thingy.speed = val
}

// OR skip is and imply the next is an equal
direction(wobject, "left")

// skip and, its a conjection word for now
// but could be a joiner func (thing1, thing2)

speed(wobject, 2)

// walkPlatform is a function on onject and is called in the update loo
// so here we are just assigning the hook function
// also we just imply its in x direction for now
walkPlatform(thing){
  thing.walkRoutine = function(){
    this.x += this.speed * this.direction.x;
  }
}

// hrmmmm
// this is like a modifer to the object.walkRoutine
function until(thing){
  OR
var ww = walkPlatform(...){}

function until(func){
...
}


// atEdge
// this would seem to be an event
// at edge
// its also a check next word -> action


function at(){

}

function edge(){

}

function atEdge(thingy, func){

  thing.atEdge = function(){

    if( ! inbetween(thing.x, platform.x, platform.width) ){
      func(thingy) // func being flip() in this example
    }

  }

}


function flip(thingy){
  thingy.direction.x *= -1;
}

walkPlatform(thingy)

// do nothing???? since we dont have a logical stop within the codes above
// thus stop() is always implied?
// or is loop repeat?????
repeat(){

}
