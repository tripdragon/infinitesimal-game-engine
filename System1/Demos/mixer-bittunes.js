

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

import { Grid } from "../Modules/Grid.js";

import {SemitoneDistances, calcFrequency, 
  SemitoneDistancesArray, generateTone, generateToneFromNote} from '../Modules/music/musictools.js';

import { MusicNote } from "../Primitives/MusicNote.js";

export let disc = new Game("mixerBittunes");

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

// generateTone(this.frequency, "sine", 0.15);
window.generateTone = generateTone;
window.generateToneFromNote = generateToneFromNote;

// generateTone(262, "sine", 0.55);
// generateTone(262+4, "sine", 0.75);

// generateToneFromNote

var sheetMusic = [
  ["C", "3", "sine", 0.5, 0],
  ["D", "3", "sine", 0.5, 0.5],
  ["E", "3", "sine", 1, 0.4],
]

generateToneFromNote("C", "3", "sine", 0.2)

window.playsheetmusic = function(){
  for (var i = 0; i < sheetMusic.length; i++) {
    
    generateToneFromNote(sheetMusic[i][0], sheetMusic[i][1], sheetMusic[i][2], sheetMusic[i][3], sheetMusic[i][4])
  }
}



// this wont work
// its too janky in where and how
// so instead! we can infact generate positions and do hit testing on them DIFERENTLY
// group the  y up colums and do a hit test on that
// and then do a hit test on all in column
// not not perfect, but it allows offset

// THOUGh we could cast the point into the local space of the box and do snap testing that way

  // need a grid
  // so its .snap()
  // 
  
  var gg = new VisualPlane("origin", 280, 100, 0, 20, 20, {r:0.8,g:0.8,b:0,a:1});
  this.system.add(gg);
  
  // var grid = new Grid(20,20,4,12, this.system);
  // grid.origin.set(280,100,0);
  // grid.buildDebuggerScreenSpace();
  // grid.buildDebugger3D(true, true);
  
  // window.griiiid = grid;
  
  // EditorMagic.toolsController.tools.selectToolMusic.grid = grid;
  // EditorMagic.toolsController.tools.selectToolMusic.useGrid = true;
  // 
  
  
  
  
  var scrollSpace = new Plane("scroll space", 380, 200, 0, 1400, 500, {r:0.1,g:0.2,b:0,a:1});
  scrollSpace.color.setHex(0x8a92ff);
  
  scrollSpace.setOriginAndGeometry("leftBottom");
  // scrollSpace.setOriginAndGeometry("rightBottom");
  // scrollSpace.setOriginAndGeometry("rightTop");
  // scrollSpace.setOriginAndGeometry("leftTop");
  //this.system.add(scrollSpace);
  scrollSpace.isSelectableAlways = true;
  scrollSpace.boxLimit = true;
  
  
  // render order for now requires loading after scroll space
  var viewSpace = new Plane("view space", 280, 100, 0, 400, 300, {r:0.1,g:1,b:0,a:1});
  viewSpace.setOriginAndGeometry("leftBottom");
  //this.system.add(viewSpace);
  viewSpace.isSelectableAlways = false;
  viewSpace.isSelectable = false;
  // viewSpace.visible = false;
  viewSpace.renderType = "wires";
  
  
  this.system.add(scrollSpace);
  this.system.add(viewSpace);
  scrollSpace.parent = viewSpace;
  scrollSpace.position.set(0,0,0);
  scrollSpace.bbb();
  
  
  
  var centerPoint = new VisualPlane("cursor like", 500, 500, 0, 10, 10, {r:0,g:0,b:1,a:1});
  centerPoint.position.copy(scrollSpace.position);
  this.system.add(centerPoint);
  
  viewSpace.onHover = function() {
    console.log("hovery");
  }
  viewSpace.onHoverIn = function() {
    console.log("hovery iiiinnn");
  }
  viewSpace.onHoverOut = function() {
    console.log("hovery outttttt");
  }
  
  
  // var grid = new Grid(40,40,40,40, this.system).computeRowsColumns(scrollSpace.width, scrollSpace.height);
  var grid = new Grid(2*8, 20,40,40, this.system).computeRowsColumns(scrollSpace.width, scrollSpace.height);
  // var grid = new Grid(80, 80,40,40, this.system).computeRowsColumns(scrollSpace.width, scrollSpace.height);
  // need bottom left
  // grid.origin.copy(scrollSpace.sidePointsWorld.bottomLeft);
  
  // grid.buildDebugger3D(true, true, {r:1,g:0.2,b:1,a:1});
  // grid.buildDebugger3D(true, true, {r:1,g:0.2,b:1,a:1}, scrollSpace);

  
  var cursorC = new VisualPlane("cursor like C", 0, 0, 0, 18, 18, {r:0,g:1,b:1,a:1});
  this.system.add(cursorC);
  scrollSpace.add(cursorC)
  
  var bb = new Vector3();
  
  var cursorA = new VisualPlane("cursor like A", 500, 500, 0, 14, 14, {r:0,g:0,b:1,a:1});
  this.system.add(cursorA);
  cursorA.update = function(){
    // this jumble gives good visual WORLD results
    // is it correct????
    var pointer3d = this.system.pointer.worldSpace;
    this.position.copy(pointer3d);
    scrollSpace.worldToLocal(bb.copy(pointer3d))
    onConsole.log("bb", bb);
    grid.snap3d(bb.x, bb.y);
    
    // this a local space object parented to the main box
    // cursorC.position.copy(bb);
    // cursorC.position.copy(grid.position3D);
    cursorC.position.copy(grid.position3DCenter);
    
    // this is for a world space object 
              // this.position.copy(grid.position3D).add(scrollSpace.position);
    
    // this.position.copy(grid.position3D).add(scrollSpace.worldPosition);
    this.position.copy(grid.position3DCenter).add(scrollSpace.worldPosition);
    
                // this.position.copy(grid.position3DCenter).add(scrollSpace.position);
    
  }
  
  
  
  // 
  //  Reseting some things 
  //
  var startOctave = 4;
  
  EditorMagic.musicDrawStamp.grid = grid;
  EditorMagic.musicDrawStamp.startingOctave = startOctave;
  
  EditorMagic.selectToolMusic.useGrid = true;
  EditorMagic.selectToolMusic.grid = grid;
  EditorMagic.selectToolMusic.startingOctave = startOctave;
  // EditorMagic.selectToolMusic.scrollBoxPointer = scrollSpace;
  
  
  var musicDrawStamp = EditorMagic.musicDrawStamp;
  musicDrawStamp.scrollBoxPointer = scrollSpace;
  musicDrawStamp.grid = grid;
  
  var musicDraw = new MusicNote("platy", 0, 0, 0, grid.width, grid.height, 0, {r:0,g:1,b:1,a:1}, this.system);
  // var musicDrawStamp = new MusicDrawTool(this.system, "MusicDrawTool_plane", "MusicDrawTool stamper");
  musicDrawStamp.visualObject = musicDraw;
  musicDrawStamp.visualObject.canUpdate  = false;
  // musicDrawStamp.visualObject.color.setHex(0x000547);
  musicDraw.color.setHex(0x000547);
  // musicDrawStamp.visualObject.useGrid = true;
  // musicDrawStamp.visualObject.grid = grid;
  musicDrawStamp.stampingObject = musicDraw.clone();
  
  musicDrawStamp.stampingObject = new MusicNote("MusicDrawTool2", 0, 0, 0, grid.width, grid.height,0, {r:0,g:1,b:1,a:1}, this.system);
  musicDrawStamp.stampingObject.color.setHex(0x44ff1a);
  musicDrawStamp.afterStamp = function(){

    // this sets up the piano key to the octave and key
    this.currentItem.onTap = () => {
      // debugger
      // console.log("_frequency", _frequency);
      window.AudioContext = window.AudioContext || window.webkitAudioContext;
      var ctx = new AudioContext();
      var oo = ctx.createOscillator();
      // oo.type = ev.currentTarget.id;
      // values are "sine", "square", "sawtooth", "triangle" and "custom". The default is "sine".
      oo.type = "sine";
      var octaveScalar = 1;
      // oo.frequency.value = _frequency + octaveScalar;
      oo.frequency.value = 400;
      // oo.frequency.value = Math.pow(0.2, i);
      // console.log("oo.frequency.value", oo.frequency.value);
      // console.log("octaveScalar", octaveScalar);
      oo.start(0);
      oo.connect(ctx.destination);
      oo.stop(0.1);
  
      // setTimeout(function(){ oo.stop(0); console.log("pop"); }, sec*1000);
  
    }
  
  
  }
  // musicDrawStamp.editor = EditorMagic;
  
  // EditorMagic.addTool(musicDrawStamp);
  // musicDrawStamp.stampingObject.color.setHex(0xff14c0);
  

  
  
  
  
  
  
  
  
  
  
  // var cursor = new VisualPlane("cursor like", 500, 500, 0, 18, 18, {r:0.9,g:1,b:1,a:1});
  // this.system.add(cursor);
  // 
  // cursor.updatesdfsdf = function(){
  // 
  //   var pointer3d = this.system.pointer.worldSpace;
  // 
  //   grid.snap();
  //   // grid.origin.copy(gg.sidePointsWorld.bottomLeft);
  //   // grid.snapAtRowCol(pointer3d.x,pointer3d.y,"3d");
  // 
  //   this.position.copy(grid.position3DCenter);
  // 
  // }
  // 

  // gg.update = function() {
  // 
  //   var pointer3d = this.system.pointer.worldSpace;
  // 
  //   var wasIn = this.pointCollideCheck(pointer3d);
  // 
  //   if(wasIn){
  //     console.log("is in");
  //   }
  //   else {
  //     console.log("is nottttt");
  //   }
  // 
  // 
  // }
  // update
  
  
  
  /*
  
  var selectTool = new SelectTool(this.system);
  var selectToolMusic = new SelectToolMusic(this.system);

  EditorMagic.addTool(selectTool);
  EditorMagic.addTool(selectToolMusic);
  
  // Make select tool active first
  item1Select.click();
  
  */
  
  
  
  // // grid.snap(_this.system.pointer.client.x, _this.system.pointer.client.y).screenTo3D();
  // // 
  // // box2.x = grid.position3D.x;
  // // box2.y = grid.position3D.y;
  // 
  // 





  // 
  // // 
  // // 
  // var cSize1 = 1200;
  // var notclouds1 = new Plane("not clouds 1", 540, 420, 0, cSize1, cSize1, {r:1,g:1,b:1,a:1}, this.system);
  // notclouds1.canCollide = false;
  // this.system.add(notclouds1);
  // notclouds1.loadImage("./Cast/NFT_could_this_be_ourealy.png");
  // 
  // 
  
  // ksdsl klsdfl kk lsdl kklsdfsdff dfdnfdf ksdf ksdf kdfklsdfns
  // 
  
  // cc being group, untill know proper name, maybe its octave
  // var startOctave = 4;
  for (var indexOctave = startOctave; indexOctave < startOctave+1; indexOctave++) {
  
    for (var ii = 0; ii < 12; ii++) {
    
      var ww = 80;
      // var h = 20;
      var hh = grid.height;
      var xx = 200;
      var yy = ii + indexOctave;
      
      // skip at e/f
      if(ii === 5){
          continue;
      }
      
      var margin = 1;
      yy =  (yy * (hh+margin) ) + 140;
      
      // bring down one key at e/f
      if(ii > 5){
        yy -= hh + margin;
      }
      
      
      var box = new Platform("plane", xx, yy, 0, ww, hh, {r:1,g:1,b:1,a:1}, this.system);
      this.system.add(box);
      box.noteType = "full";
      // if odd
      if (ii % 2) {
        box.noteType = "flat";
        box.color.setHex(0x00ff09)
      }
      
        // debugger
        var freq = calcFrequency( SemitoneDistancesArray[ii], indexOctave );
        console.log("freq", freq);
        box.frequency = freq;
    
      // box.onTap = function() {
      //   // debugger
      //   // console.log("_frequency", _frequency);
      //   window.AudioContext = window.AudioContext || window.webkitAudioContext;
      //   var ctx = new AudioContext();
      //   var oo = ctx.createOscillator();
      //   // oo.type = ev.currentTarget.id;
      //   // values are "sine", "square", "sawtooth", "triangle" and "custom". The default is "sine".
      //   oo.type = "sine";
      //   // var octaveScalar = indexOctave;
      //   // oo.frequency.value = _frequency + octaveScalar;
      //   // oo.frequency.value = 400;
      //   // oo.frequency.value = Math.pow(0.2, i);
      //   // console.log("oo.frequency.value", oo.frequency.value);
      //   // console.log("octaveScalar", octaveScalar);
      // 
      // 
      //   // oo.frequency.value = freq;
      //   oo.frequency.value = this.frequency;
      //   console.log("oo.frequency", oo.frequency.value);
      // 
      //   // console.log("this.frequency", this.frequency);
      //   // this.tone = generateTone(this.frequency, this.type);
      // 
      //   oo.start(0);
      //   oo.connect(ctx.destination);
      //   oo.stop(0.1);
      // 
      //   // setTimeout(function(){ oo.stop(0); console.log("pop"); }, sec*1000);
      // 
      // }
      box.onTap = function() {
        generateTone(this.frequency, "sine", 0.15);
      }
      
    
        // box.onHover = () => {
        //   // debugger
        //   // console.log("_frequency", _frequency);
        //   window.AudioContext = window.AudioContext || window.webkitAudioContext;
        //   var ctx = new AudioContext();
        //   var oo = ctx.createOscillator();
        //   // oo.type = ev.currentTarget.id;
        //   // values are "sine", "square", "sawtooth", "triangle" and "custom". The default is "sine".
        //   oo.type = "sine";
        //   var octaveScalar = 1;
        //   // oo.frequency.value = _frequency + octaveScalar;
        //   oo.frequency.value = 400;
        //   // oo.frequency.value = Math.pow(0.2, i);
        //   // console.log("oo.frequency.value", oo.frequency.value);
        //   // console.log("octaveScalar", octaveScalar);
        //   oo.start(0);
        //   oo.connect(ctx.destination);
        //   oo.stop(0.05);
        // 
        //   // setTimeout(function(){ oo.stop(0); console.log("pop"); }, sec*1000);
        // 
        // }
        
    }
      
  }// octave loop
  // 
  // 
  // 
  // for (var i = 0; i < 8 * 4; i++) {
  // 
  //   var w = 80;
  //   var h = 18;
  //   var xx = 160;
  //   var yy = i;
  //   var box = new Platform("plane", xx, ((i*(h+1))+ 30), 0, w, h, {r:0,g:1,b:1,a:1}, this.system);
  //   this.system.add(box);
  // 
  //   box.onTap = () => {
  //     // debugger
  //     // console.log("_frequency", _frequency);
  //     window.AudioContext = window.AudioContext || window.webkitAudioContext;
  //     var ctx = new AudioContext();
  //     var oo = ctx.createOscillator();
  //     // oo.type = ev.currentTarget.id;
  //     // values are "sine", "square", "sawtooth", "triangle" and "custom". The default is "sine".
  //     oo.type = "sine";
  //     var octaveScalar = 1;
  //     // oo.frequency.value = _frequency + octaveScalar;
  //     oo.frequency.value = 400;
  //     // oo.frequency.value = Math.pow(0.2, i);
  //     // console.log("oo.frequency.value", oo.frequency.value);
  //     // console.log("octaveScalar", octaveScalar);
  //     oo.start(0);
  //     oo.connect(ctx.destination);
  //     oo.stop(0.1);
  // 
  //     // setTimeout(function(){ oo.stop(0); console.log("pop"); }, sec*1000);
  // 
  //   }
  // 
  // 
  // }
  // 
  // 


};
