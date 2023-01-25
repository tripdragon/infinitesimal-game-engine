


// Basic example of a basic buch of things in the view

// hrmmm dont like going UP a folder for games stuff
// it makes a game nested
import { SquareLike } from "../Primitives/squareLike.js";

import { Game } from "../Core/Game.js";

import { randomBetween } from "../Modules/mathness.js";


export let disc = new Game("squaresATron_I");

disc.load = function(){

  
  this.system.screenSpaceMode = this.system.screenModes.main3d;
  this.system.reboot();

  
  // THiS ADD button is a common pattern
  // could move it back into index but as a optional
  // "editor slot"
  
  //
  // Editor UI stuff, figure out where else to put
  //
  // function addStyle(element, styleString) {
  //   const style = document.createElement('style');
  //   style.textContent = styleString;
  // 
  // }
  
  // block for : add button for making squares
  {
    var controls = document.createElement('div');
    controls.id = "controls";
    controls.style.cssText = `
    position: absolute;
    top: 0px;
    left: 0px;
    z-index: 2;
    /* background: green; */
    width: 100px;
    height: 100px;
    padding: 20px 0 0 20px;
    `;
    var button = document.createElement('button');
    button.classList.add("button");
    button.classList.add("add");
    button.innerText = "+";
    button.style.cssText = `width: 32px;
    height: 32px;`;
    controls.appendChild(button);
    // var gg = document.getElementById("bodyInjectionPointMain");
    var gg = document.getElementById("gamespace");
    gg.innerHTML = "";
    // document.body.appendChild(controls);
    gg.appendChild(controls);


    
    var that = this;
    
    function addHipToBeSquare(ev){
      // console.log(ev, "fish");
      
      const xx = randomBetween(-40,40);
      const xy = randomBetween(-40,40);
      const ww = randomBetween(2,8);
      const wh = randomBetween(2,8);
      
      var sq1 = new SquareLike(null, -xx, xy, ww, wh);
      sq1.playCode = `return { do : function(obj, helpers){
        obj.x = helpers.randomBetween(${-xx},${xy});
        obj.color.r = Math.random();
        obj.color.g = Math.random();
        obj.color.b = Math.random();
      }}`;
      
      that.system.sceneGrapth.add(sq1);

      if(that.system.runtimeState !== "play"){
        // should have a draw command
        that.system.loop();
      }
      
    }
    
    // let controls = document.getElementById('controls');
    let add = document.querySelector("#controls .add");
    if(add){
        add.addEventListener( "click", addHipToBeSquare, false );
    }
    // for (var i = 0; i < 1000; i++) {
    //   add.click()
    // }
    
  }





  
  // here we pump objects into the Systems scene grapth
  // Base charactor objects!!
  // here we have a wordy but very direct example of custom scripting for each object square
  // in this example the first arg is gl which is not available yet so well set it in the loop
  var sq1 = new SquareLike(null, -4, 4, 4, 6);
  sq1.playCode = `return { do : function(obj, helpers){
    obj.x = helpers.randomBetween(-4,4);
    obj.color.r = Math.random();
    obj.color.g = Math.random();
    obj.color.b = Math.random();
  }}`;
  var sq2 = new SquareLike(null, -4 + -12, 4, 3, 4);
  sq2.playCode = `return { do : function(obj, helpers){
    // obj.x = helpers.randomBetween(-14,14);
    obj.y = helpers.randomBetween(-14,14);
    obj.color.r = Math.random();
    obj.color.g = Math.random();
    obj.color.b = Math.random();
  }}`;
  var sq3 = new SquareLike(null, -4 + -12, 4 + -12, 2, 5);
  sq3.playCode = `return { do : function(obj, helpers){
    obj.x = helpers.randomBetween(-24,24);
    // obj.y = helpers.randomBetween(-14,14);
    obj.color.r = Math.random();
    obj.color.g = Math.random();
    obj.color.b = Math.random();
  }}`;
  
  // APPPP.sceneGrapth.addActor();
  this.system.sceneGrapth.add(sq1);
  this.system.sceneGrapth.add(sq2);
  this.system.sceneGrapth.add(sq3);

};
