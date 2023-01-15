

// Basic example of a basic buch of things in the view

// hrmmm dont like going UP a folder for games stuff
// it makes a game nested
import { SquareLike } from "../Primitives/squareLike.js";

import { Game } from "../Core/Game.js";



export let disc = new Game("utzSquares");

disc.load = function(){
  
  // Need a scene grapth
  
  
  // here we pump objects into the Systems scene grapth
  // Base charactor objects!!
  // here we have a wordy but very direct example of custom scripting for each object square
  // in this example the first arg is gl which is not available yet so well set it in the loop
  var sq1 = new SquareLike(null, -4, 4, 4, 6);
  sq1.playCode = `return { do : function(obj, helpers){
    obj.x = helpers.randomBetween(-4,4);
    obj.color.x = Math.random();
    obj.color.y = Math.random();
    obj.color.z = Math.random();
  }}`;
  var sq2 = new SquareLike(null, -4 + -12, 4, 3, 4);
  sq2.playCode = `return { do : function(obj, helpers){
    // obj.x = helpers.randomBetween(-14,14);
    obj.y = helpers.randomBetween(-14,14);
    obj.color.x = Math.random();
    obj.color.y = Math.random();
    obj.color.z = Math.random();
  }}`;
  var sq3 = new SquareLike(null, -4 + -12, 4 + -12, 2, 5);
  sq3.playCode = `return { do : function(obj, helpers){
    obj.x = helpers.randomBetween(-24,24);
    // obj.y = helpers.randomBetween(-14,14);
    obj.color.x = Math.random();
    obj.color.y = Math.random();
    obj.color.z = Math.random();
  }}`;
  
  // APPPP.sceneGrapth.addActor();
  this.system.sceneGrapth.add(sq1);
  this.system.sceneGrapth.add(sq2);
  this.system.sceneGrapth.add(sq3);

};
