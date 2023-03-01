

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
import { Color } from "../Modules/Color.js";
import { VisualPlane } from "../Primitives/VisualPlane.js";



// import { Editor111 } from "../Editor/editor111.js";
// import { Alien1 } from "../Cast/Alien1.js";
// import { Actor } from "../Primitives/Actor.js";
// import { Player } from "../Primitives/Player.js";

import { Editor111 } from "../Editor/editor111.js";


export let disc = new Game("boxHitTest");

disc.load = function(){

  var _this = this;

  var EditorMagic = new Editor111(this.system);
  
  EditorMagic.launch_CM();
  

  // changing the screen space mode for a platformer game
  this.system.screenSpaceMode = this.system.screenModes.screen;
  this.system.reboot();

  // this.system.cameraZoom = 0.4;

  console.log("panels start like");
  
  this.system.backgroundColor = {r:0,g:0.05,b:0.05,a:1};




  // 
  // 
  var box4 = new Platform("box1", 420, 420, 0, 360, 90, new Color().setHex(0xff6a00), this.system);
  this.system.add(box4);
  window.box4 = box4;
  // box4.static = true;
  
  
  
  
  
  var box5 = new Platform("box2", 530, 260, 0, 80, 80, {r:0.5,g:0.2,b:0.9,a:1}, this.system);
  this.system.add(box5);
  box5.static = true;
  window.box5 = box5;
  // this.system.add(box5);
  
  
  // 
  // var left = new VisualPlane("box2", 0, 0, 0, 20, 80, new Color(), this.system);
  // this.system.add(left);
  // left.position.x = box5.edges.left().x + left.width/2;
  // box5.add(left);
  // 
  // var right = new VisualPlane("box2", 0, 0, 0, 20, 80, new Color(), this.system);
  // this.system.add(right);
  // right.position.x = box5.edges.right().x - right.width/2;
  // box5.add(right);
  // 
  // var bottom = new VisualPlane("box2", 0, 0, 0, 80, 20, new Color(), this.system);
  // this.system.add(bottom);
  // bottom.position.y = box5.edges.bottom().y + bottom.height/2;
  // box5.add(bottom);
  // 
  // var top = new VisualPlane("box2", 0, 0, 0, 80, 20, new Color(), this.system);
  // this.system.add(top);
  // top.position.y = box5.edges.top().y - top.height/2;
  // box5.add(top);
  // 
  
  // box5.visualEdges = {
  //   left : left, right: right, bottom: bottom, top: top
  // }
  // 
  
  
  // cc = new VisualPlane()
  // this.system.add(cc);
  // 
  
  
  
  
  
  
  
  
  // debuging with
  
  
  
  var system = this.system;
    var IS_DOWN = false
    var tt = []
    var currentLine;
    var p0Visual;
    var p1Visual;

  function onPointerMove( event ) {
    // w = Math.abs(box5.boundingBoxWorld.min.x - box4.boundingBoxWorld.max.x);
    // h = Math.abs(box5.boundingBoxWorld.max.y - box4.boundingBoxWorld.min.y);
    // dis = Math.sqrt(w*w+h*h)
    // onConsole.log("dis", dis);
    
    // if( ! system.keysDown.a ){
    //   return;
    // }
    
    if(IS_DOWN && currentLine !== null){
      currentLine.points[1].copy(system.pointer.worldSpace);
      currentLine.updatePositions();
      currentLine.bbb();
      
      p1Visual.position.copy(system.pointer.worldSpace);
      
    }
  }

  window.addEventListener( 'pointermove', onPointerMove );



  function onPointerDown( event ) {
    
    // if( ! system.keysDown.a ){
    //   return;
    // }

    p0Visual = new VisualPlane("box2", 0, 0, 0, 10, 10, new Color().setHex(0x170fff), system);
    system.add(p0Visual);
    p0Visual.position.set(system.pointer.worldSpace.x, system.pointer.worldSpace.y, 0)
    tt.push(p0Visual)
    
    p1Visual = new VisualPlane("box2", 0, 0, 0, 10, 10, new Color().setHex(0x170fff), system);
    system.add(p1Visual);
    p1Visual.position.set(system.pointer.worldSpace.x, system.pointer.worldSpace.y, 0)
    tt.push(p1Visual)
    
    
    
    if(IS_DOWN === false){
      IS_DOWN = true;
      var points = [
        system.pointer.worldSpace.clone(), system.pointer.worldSpace.clone(),
      ];
      currentLine = new Polygon("plwoeir", points, 0,0,0,  1, {r:0.0,g:0.9,b:0.2,a:1}, this.system);
      currentLine.canCollide = false;
      system.add(currentLine);
      // window.line = line;
    }
    
  }

  window.addEventListener( 'pointerdown', onPointerDown );





  function onPointerUp( event ) {
    
    // if( ! system.keysDown.a ){
    //   return;
    // }
    
    IS_DOWN = false;
    // currentLine = null;
    currentLine.delete()
    p0Visual.delete();
    p1Visual.delete();
    // p1Visual = new VisualPlane("box2", 0, 0, 0, 10, 10, new Color().setHex(0x170fff), system);
    // system.add(p1Visual);
    // p1Visual.position.set(system.pointer.worldSpace.x, system.pointer.worldSpace.y, 0)
    // tt.push(p1Visual)
    

  }

  window.addEventListener( 'pointerup', onPointerUp );


  
  
  
  

  

};
