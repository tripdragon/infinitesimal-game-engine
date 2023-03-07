

//
//
// This shows a game in progress and then loades the Editor ontop of it!!!
// Where we can for this editor add in some bots and drag them for now
//

import { Game } from "../Core/Game.js";

import { Rectangle } from "../Primitives/Rectangle.js";
import { Plane } from "../Primitives/Plane.js";
import { Platform } from "../Primitives/Platform.js";
import { Polygon } from "../Primitives/Polygon.js";
import { Vector3 } from "../Modules/Vector3.js";

import { VisualPlane } from "../Primitives/VisualPlane.js";



// import { Editor111 } from "../Editor/editor111.js";
// import { Alien1 } from "../Cast/Alien1.js";
// import { Actor } from "../Primitives/Actor.js";
import { Player } from "../Primitives/Player.js";

import { Editor111 } from "../Editor/editor111.js";


export let disc = new Game("playerDemo");

disc.load = function(){

  var _this = this;

  var EditorMagic = new Editor111(this.system);
  
  EditorMagic.launch_CM();
  

  // changing the screen space mode for a platformer game
  this.system.screenSpaceMode = this.system.screenModes.screen;
  this.system.reboot();

  this.system.cameraZoom = 0.4;

  console.log("panels start like");
  
  this.system.backgroundColor = {r:0,g:0.05,b:0.05,a:1};







  // 
  // var points = [
  //   new Vector3(-1,1,0), new Vector3(-1,-1,0), new Vector3(1,-1,0) ,
  //   // new Vector3(-1,1,0), new Vector3(-1,-1,0),
  // ];
  // var plaoototty = new Polygon("plwoeir", points, 400,200,0,  112, {r:0.0,g:0.9,b:0.2,a:1}, this.system);
  // plaoototty.subType = "ksdlnfjdsf"
  // this.system.add(plaoototty);
  // window.plaoototty = plaoototty;
  // 

  
  // 
  // var box3 = new Platform("plane", 0, 0, 0, 360, 70, {r:0.0,g:0.9,b:0.2,a:1}, this.system);
  // // this.system.sceneGrapth.add(box3);
  // this.system.add(box3);
  // // window.box3 = box3;

  
  // 
  // 
  var cSize1 = 1200;
  var notclouds1 = new Plane("not clouds 1", 540, 420, 0, cSize1, cSize1, {r:1,g:1,b:1,a:1}, this.system);
  notclouds1.canCollide = false;
  this.system.add(notclouds1);
  notclouds1.loadImage("./Cast/NFT_could_this_be_ourealy.png");
  
  
  
  
  // window.box4 = box4;
  
  var box4 = new Platform("plane magic", 540, 420, 0, 360, 70, {r:0.9,g:0.9,b:0.2,a:1}, this.system);
  this.system.add(box4);
  window.box4 = box4;
  
  
  // debugger
  // box4.visible = false;
  
  // var box5 = box4.clone();
  // // box5.visible = true;
  //   this.system.add(box5);
  //   box5.position.y = 200;
  //   box5.refreshMatrixes();
  // box5.bbb();
  
  
  
  // 
  // var box4bbb = new Platform("plane magic", 540, 220, 0, 360, 70, {r:0.5,g:0.7,b:0.2,a:1}, this.system);
  // this.system.add(box4bbb);
  // window.box4bbb = box4bbb;
  // // debugger
  // box4bbb.visible = false;
  
  
  // debugger
  
  // 
  // 
  // var box5 = new Platform("plane", 240, 200, 0, 360, 30, {r:0.0,g:0.9,b:0.2,a:1}, this.system);
  // this.system.add(box5);
  // // this.system.add(box5);
  // 
  // 
  // 
  // 
  // var box5 = new Platform("plane", 180, 260, 0, 360, 30, {r:0.0,g:0.9,b:0.2,a:1}, this.system);
  // this.system.add(box5);
  // this.system.add(box5);
  // 
  // // 
  
  
  for (var i = 0; i < 20; i++) {
  
    var w = 80;
    var h = 8;
    var box = new Platform("plane", (i*(w+10)), ((i*(h+18))), 0, w, h, {r:0.0,g:0.9,b:0.2,a:1}, this.system);
    this.system.add(box);
  
  }
  
  
  // 
  
  // 
  // 
  // 
  // debugger
  // var aa = new Alien1("aa", 320, 320, 40, 40, {r:0,g:1,b:1,a:1}, this.system);
  // this.system.sceneGrapth.add(aa);
  // debugger
  // aa.canUpdate = false;
  // for now we need some defaults items to get the bot to walk
  // aa.platform = box3;
  // aa.directionVector.x = 1;
  
  // aa.start();
  
  
  
  
  
  
  
  
  
  // Player
  
  
  
        
        
        
        
        // var aa = new Actor("aa", 320, 320, 40, 40, {r:0,g:1,b:1,a:1}, this.system);
        var size = 40; // 40
        var playyyer = new Player("playyyyyer", 470, 600, 0, size, size, {r:0,g:1,b:1,a:1}, this.system);
        this.system.add(playyyer);
        window.playyyer = playyyer;
        // aa.canUpdate = false;
        // for now we need some defaults items to get the bot to walk
        // aa.platform = box3;
        // aa.directionVector.x = 1;
        
        playyyer.loadImage("./Cast/cat1.png");
        playyyer.start();
        
        
        
          // 
          // // images like
          // var image = new Image();
          // // image.src = "./Cast/cat1.png";  // MUST BE SAME DOMAIN!!!
          // image.src = "./Cast/cubetexture.png";  // MUST BE SAME DOMAIN!!!
          // // image.onload = function() {
          // //   // render(image);
          // //   // debugger
          // //   playyyer.image = image;
          // //   onConsole.log("dfkjng", "NEAT!!!");
          // // };
          // 
          // image.addEventListener('load', function() {
          //     // playyyer.image = image;
          //     // debugger
          //     playyyer.loadTexture(image);
          //   // // Now that the image has loaded make copy it to the texture.
          //   // gl.bindTexture(gl.TEXTURE_2D, texture);
          //   // gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA,gl.UNSIGNED_BYTE, image);
          //   // gl.generateMipmap(gl.TEXTURE_2D);
          // });
          // 
          // 

        
        
        
        
  // 
  // aa.platform = box3;
  
  // aa.useGravity = false;
  // aa.mGravity = 0.01;
  // aa.update = function(){
  //   if(!aa.platform){
  //     this.useGravity = true;
  //   }
  //   else {
  //     this.useGravity = false;
  // 
  //   }
  //   this.updateWalking2();
  // }
  
  // aa.useGravity = false;
  // aa.walkSpeed = 4.2;
  // aa.directionVector.x = 1;
  // aa.hasTurned = false;
  // aa.update = function(){
  //   // this.x + 1;
  //   var platform = this.platform;
  // 
  //   this.y = platform.max.y + -this.height + -2;
  // 
  //   this.updateWalking(this.system.time.delta, 9);
  // 
  //   // filp direction
  //   if (this.x >= platform.max.x){
  //     aa.directionVector.x *= -1;
  //     this.x = platform.max.x;
  //   }
  //   else if (this.x <= box3.min.x){
  //     aa.directionVector.x *= -1;
  //     this.x = platform.min.x;
  //   }
  // 
  // }
  

  


};
