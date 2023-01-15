import { Basestation } from './Core/System1.js';
import { WordsAdder } from './Plugins/wordsAdder.js';

import { SquareLike } from "./Primitives/squareLike.js";


import { disc as squaresATron_I } from  "./Discs/square_a_tron.js";



// dont like this pattern

export default function AppMain() {
  var APPPP = new Basestation("canvassss");
  // APPPP.bootUp_CM();

  // words module lv 1
  const words = document.createElement('div');
  const injectionPoint = document.getElementById("bodyInjectionPointMain");
  injectionPoint.appendChild(words);

  // Init words with an element
  APPPP.words1 = new WordsAdder(words);

  console.log('APPPP');
  
  
  // Should have some stupid function like insertDisc ...
  // moving Game setup into its class
  APPPP.insertDisc(squaresATron_I);
  
  
  
  
  
  // Need a scene grapth
  
  /*
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
  APPPP.sceneGrapth.add(sq1);
  APPPP.sceneGrapth.add(sq2);
  APPPP.sceneGrapth.add(sq3);
  */

  return APPPP;  
  
}
