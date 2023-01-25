

// Basic example of a basic buch of things in the view

// hrmmm dont like going UP a folder for games stuff
// it makes a game nested
// import { Polygon } from "../Primitives/Polygon.js";
// import { Rectangle } from "../Primitives/Rectangle.js";

import { Game } from "../Core/Game.js";

import { keyboard } from '../Modules/input/keyboard.js';
// import { randomBetween } from "../Modules/mathness.js";
import { Rectangle } from "../Primitives/Rectangle.js";

export let disc = new Game("pianoclassical");

disc.load = function(){


// piano.jpg

var pianoimg = document.createElement('div');
pianoimg.id = "piano";
pianoimg.style.cssText = `
position: absolute;
top: 100px;
left: 40px;
z-index: 2;
width: 100px;
height: 100px;
padding: 20px 0 0 20px;
color: white;
`;
pianoimg.innerText = " Press keyboard with speakers on";

var gg = document.getElementById("gamespace");
gg.innerHTML = "";
// document.body.appendChild(controls);
gg.appendChild(pianoimg);




  var alpha = ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "a", "s", "d", "f", "g", "h", "j", "k", "l", ";", "z", "x", "c", "v", "b", "n", "m", ",", ".", "/"];
  // dont have enough files, so will need to loop
  
  // need to make a loop up cause hard coding names
  // did not work
  var lookup = {};
  for (var i = 0; i < alpha.length; i++) {
    lookup[alpha[i]] = { 
      key : alpha[i],
      path : "",
      rect3d : null
    }
  }
  
  
  // fancy loopssss path building
  var names = [];
  // names start at 01
  var indexNames = 1;
  
  for (var i = 0; i < alpha.length; i++) {
    // console.log(i, indexNames);
    if(indexNames > 24){
      indexNames = 1;
    }
    var gg = alpha[ i ];
    var key = "key0";
    if(indexNames > 9){
      key = "key";
    }
    var name = key+indexNames+".mp3";
    names.push(name);
    console.log(gg);
    console.log(name);
    
    lookup[alpha[ i ]].path = "./Discs/Soundeffects/pianokeys/mp3s/"+name;
    
    indexNames++;
  }
  
  
  // custom keyboard events from alphabet list
  var kerboardargs = {};
  
  for (var i = 0; i < alpha.length; i++) {
    //console.log(name, alpha[i]);
    kerboardargs[alpha[i]+"_down"] = function(ev) {
      console.log(ev.key);
      var path = lookup[ev.key].path;
      var ss = new Audio(path);
      ss.play();
      
      // if(lookup[ev.key].rect3d){
      //   lookup[ev.key].rect3d.color = 
      // }
    }
  }
  
  keyboard(kerboardargs);
  
  // set up walking player
  // keyboard({
  //   a: (ev) => {
  //   // ArrowDown_down: (ev) => {
  //     var ss = new Audio("./Discs/Soundeffects/pianokeys/mp3s/key14.mp3");
  //     ss.play();
  //   },
  // });
  // 
  // kerboardargs = {
  //   a : function(ev){
  //     console.log("aaaa");
  //     console.log(ev.key);
  //   },
  //   b : function(ev){
  //     console.log("bbbb");
  //     console.log(ev.key);
  //   },
  //   c : function(ev){
  //     console.log("ccc");
  //     console.log(ev.key);
  //   },
  // }
  
  {
    for (var i = 0; i < alpha.length; i++) {
      
      var key = new Rectangle("key"+i, (24 * i) + 44, 300, 20, 100, {r:1,g:1,b:1,a:1});
      this.system.sceneGrapth.add(key);
      
      // lookup[alpha[i]].rect3d = key;
      
    }
  
  // border1.onCollide = function(){
  //   console.log("wap!", border1.name);
  //   // soundboard1.play();
  //   var ss = new Audio("./Discs/Soundeffects/bleep-audiomass-output.wav");
  //   ss.play();
  // }
  }
  



};
