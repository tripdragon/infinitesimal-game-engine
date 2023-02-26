
// should be "Console" but thats taken
// so its "system"

// This is the main APP of sorts
// it holds the SceneGrapth and Render loopy loop


import { initShaderProgram, vertexBasicShader, fragmentBasicShader} from './shaders.js';
import { vScreen, fScreen } from '../Shaders/screenSpace.js';


// import { initBuffers } from './initbuffers.js';
import { drawScene as _drawScene } from "./drawscene.js";
import { drawSceneScreenspace as _drawSceneScreenspace } from "./drawsceneScreenspace.js";

import { loadSquares } from "../Demos/loadSquares.js";
import { SceneGrapth } from "./SceneGrapth.js";
import { Pointer } from "./Pointer.js";

import { loop as _loop } from "./loop.js";

import { Quark } from "../Primitives/Quark.js";
import { World } from "../Primitives/World.js";
import { Color } from "../Modules/Color.js";
import { Vector2 } from "../Modules/Vector2.js";
import { Vector3 } from "../Modules/Vector3.js";

import { Matrix4 } from "../Modules/GL-Matrix.js";

import { testColliders as _testColliders } from "../Modules/Colliders/testColliders.js";


export class Basestation {
  
  canvas = null;
  
  programInfo;
  gl;
  
  // console.warn("this needs to be adjusted");
  // see https://webglfundamentals.org/webgl/lessons/webgl-anti-patterns.html
  // window.innerWidth
  // window.innerHeight roughly...
  get gameWidth(){
    return this.gl.canvas.width;
  }
  get gameHeight(){
    return this.gl.canvas.height;
  }
  
  
  
  
  // cameraDefault = {x:0,y:0, z: -70};
  cameraDefault = {x:0,y:0, z: 0}; // this can become a full object
  cameraZoom = 1;
  
  // main place to run matrix updates
  // are there universes????
  world = null;
  
  // internal to these are validation checking
  // so its simple here
  // this should later handle routing of which objects go where
  // or do the longer names addBot etc...
  add(thingy){
    this.sceneGrapth.add(thingy);
    this.world.add(thingy);
  }
  remove(thingy){
    this.sceneGrapth.remove(thingy);
    this.world.remove(thingy);
  }
  
  
  
  
  // just a convenience so every file does not have to import
  helpers = {
    color : Color,
    vector2 : Vector2,
    vector3 : Vector3,
    Quark : Quark
  }
  
  
  // not proper yet 9.82?
  gravity = 9.72873473;
  
  backgroundColor = {r:0,g:0,b:0,a:1};
  
  // need more logic, to a classsss!!!
  // need a default far z
  // pointer = new Vector3();
  pointer = new Pointer(this);
  
  
  // pointerXYScalar = 12;
  // pointerGrid = 1; // ideally there are multiple grids, so its more a function, object dimentions matter
  // pointer = {x:0,y:0};
  // this is for 3d coords
  // onPointerMove( event ) {
  //   this.pointer.x = ( event.clientX / window.innerWidth ) * 2 - 1;
  //   this.pointer.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
  // }
  // 
  // //   window.addEventListener( 'pointermove', onPointerMove, true );
  // onPointerMoveScreenSpace( event ) {
  // 
  //   this.pointer.x = event.clientX;
  //   this.pointer.y = event.clientY;
  //   // console.log(that.system.pointer);
  // 
  //   // we can add this later in another event
  //   // EditorModeActions.pointerMoving(); 
  // }
  
  /*
  function onPointerMove( event ) {

    // calculate pointer position in normalized device coordinates
    // (-1 to +1) for both components
    
    // need for when camera is in 3d
    // pointer.x = ( event.clientX / window.innerWidth ) * 2 - 1;
    // pointer.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
    // pointer.x = ( event.clientX / window.innerWidth );
    // pointer.y = - ( event.clientY / window.innerHeight ) * -1;
    pointer.x = event.clientX ;
    pointer.y = event.clientY;
    // console.log(pointer);
  }
  
  window.addEventListener( 'pointermove', onPointerMove );
  */
  
  
  
  
  // player.x = system.input.keyboard.isArrowLeftDown
  // player.x = system.getArrowLeftDown()
  // player Keyboard.isArrowLeftDown
  // var pressedKeys = {};
  // window.onkeyup = function(e) { pressedKeys[e.key] = false; }
  // window.onkeydown = function(e) { pressedKeys[e.key] = true; }
  // 
  
  // APPPP.keysDown, these CAN get stuck!!!
  // if it loses focus absolutely
  keysDown = {};
  keysUp = {};
  
  // dont use this, they are just to assign with, see constructor()
  getKeyDown = function(ev) {
    this.keysDown[ev.key] = true;
    this.keysUp[ev.key] = false;
  }
  getKeyUp = function(ev) {
    this.keysDown[ev.key] = false;
    this.keysUp[ev.key] = true;
  }
  // input = {
  //   keyboard : {},
  //   keysDown : {},
  //   keysUp : {},
  //   device : {}
  // };
  
  
  
  // DONT LIKE THIS
  // it should be CLEAN enums
  // and simple === comparisons
  // spaceMode = {
  // 	main3d: Symbol("main3d"),
  // 	screen: Symbol("screen")
  // }
  //   this.system.screenSpaceMode = this.system.screenModes.screen;
  screenModes = {
    main3d : "main3d",
    screen : "screen"
  }
  _screenSpaceMode;
  get screenSpaceMode(){
    return this._screenSpaceMode;
  }
  set screenSpaceMode(val){
    if(val === "main3d"){
      this._screenSpaceMode = val;
    }
    else if(val === "screen"){
      this._screenSpaceMode = val;
    }
  }
  // spaceMode = "3d"; // 3d Euclidean, screen, clip
  
  
  gamesCatalog = {};
  
  time = {
    millisecondsSinceStarted: 0,
    sinceStarted : 0,
    m_millisecondsSinceStarted: 0,
    sincePaused : 0,
    constantRuntime : 0,
    delta : 0,
    mTime : 0,
    now : 0,
  };
  // time since game start, this is paused when game is paused
  gameTime = 0;
  
  
  
  // sceneGrapth = new SceneGrapth(this);
  sceneGrapth = null;
  // made it a getter cause typing that always is a bit much
  // but now its a function .... hrmmmm
  
  // also .visible false should be handled
  get colliders(){
    return this.sceneGrapth.layers.colliders;
  }
  get platforms(){
    return this.sceneGrapth.layers.platforms;
  }
  
  // basic hit testing outside of the loop
  // AABBD was moved to Plane and Box3 as it handles proper screenspace
  // var out = []
  // this.system.testColliders("platforms", this.system.platforms, out)
  // testColliders = _testColliders;
  
  
  
  // need enum
  runtimeState = "play"; // play pause step?
  // APPPP.runtimeState = "pause"
  // then step
  //APPPP.animate()
  
  
  fauxPointer = {};
  
  
  
  currentGame = null;
  
  loop = _loop;
  loopID = 0;
  stopLoop(){
    cancelAnimationFrame(this.loopID);
  }
  startLoop(){
    this.loop.call(this);
  }
  
  
  drawScene = _drawScene;
  // drawScene = _drawSceneScreenspace;
  
  
  // where and how to go
  // need to add collisions at some place
  // this.system.loopHookPoints.beforeDraw = f()
  loopHookPoints = {
    beforeDraw : function(){},
    after1 : function(){},
    editorBeforeDraw : function(){},
  }
  
  
  
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    this.sceneGrapth = new SceneGrapth(this);
    this.bootUp_CM();
    // this.screenSpaceMode = this.screenModes.screen;
    // this.colliders = this.sceneGrapth.layers.colliders;
    
    // need global keys input
    window.onkeyup = (ev) => { 
      this.getKeyUp(ev); 
    }
    window.onkeydown = (ev) => { 
      this.getKeyDown(ev); 
    }
    
    window.addEventListener( 'pointermove', this.pointer.onPointerMove.bind(this.pointer), true );
    
    // need expected mouse coords
    // if(this.screenSpaceMode === this.screenModes.main3d){
    // }
    // else {
    //   document.addEventListener( 'pointermove', this.onPointerMoveScreenSpace.bind(this) );
    // }
    // hrmmmmm
    // //   this.system.screenSpaceMode = this.system.screenModes.screen;
    // // document.addEventListener( 'pointermove', this.onPointerMove.bind(this) );
    // 
    console.warn("this needs to be adjusted gameWidth gameHeight");
    // check above the getter functions for the correct pointer values
    
    // debugger
    this.addWorld();

  }
  
  addWorld(){
    if(this.world){
      this.sceneGrapth.remove(this.world);
    }
    this.world = new World(this);
    this.sceneGrapth.add(this.world);
    if(this.world === null){
      // debugger
    }
  }
  
  addGameToCatalog(game){
    this.gamesCatalog[game.name] = game;
    game.system = this; // system has to manage the games system cause order derps
  }
  
  // type of Game
  // this needs to recontruct system construct functions
  insertDisc(game){
    if(this.currentGame !== null){
      this.currentGame.unload();
    }
    this.unloadDisc();
    this.currentGame = game;
    // or change to a Set()
    this.gamesCatalog[game.name] = game;
    game.start(this);
    
  }
  
  
  unloadDisc(){
    console.warn("unloadDisc NOT GOOD ENOUGH!!!");
    // simply trash arrays for now
    this.sceneGrapth = new SceneGrapth(this);
    // needs world.DeleteAll
    console.warn("needs world.DeleteAll");
    this.addWorld();
  }
  

  
  
  
  
  reboot(){
    this.stopLoop();
    this.bootUp_CM();
  }
  
  bootUp_CM(){
    
    // this.stopLoop();
    
    // default to 3d first
    this.drawScene = _drawScene;
    if(this.screenSpaceMode === this.screenModes.screen){
      this.drawScene = _drawSceneScreenspace;
    }
    
    // this.canvas = document.getElementById(canvasId);
    
    console.warn("NOT SuRE OF THIS this.canvas.width = window.innerWidth;");
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
          
          
    // Initialize the GL context
    // const gl = this.canvas.getContext("webgl");
    const gl = this.canvas.getContext("webgl");
    this.gl = gl;
    
    // Only continue if WebGL is available and working
    if (gl === null) {
      alert(
        "Unable to initialize WebGL. Your browser or machine may not support it guesses."
      );
      return;
    }

    // Set clear color to black, fully opaque
    gl.clearColor(0.0, 0.4, 0.7, 1.0);
    // Clear the color buffer with specified clear color
    gl.clear(gl.COLOR_BUFFER_BIT);
    
    
    
    // Initialize a shader program; this is where all the lighting
    // for the vertices and so forth is established.
    var shaderProgram;
    
    // this might not be nessesary unless some other design is added later for a loading screen
    if(this.screenSpaceMode === this.screenModes.screen){
      shaderProgram = initShaderProgram(gl, vScreen, fScreen);
    }
    else {
      shaderProgram = initShaderProgram(gl, vertexBasicShader, fragmentBasicShader);
    }

    // Collect all the info needed to use the shader program.
    // Look up which attribute our shader program is using
    // for aVertexPosition and look up uniform locations.
    const programInfo = {
      program: shaderProgram,
      attribLocations: {
        vertexPosition: gl.getAttribLocation(shaderProgram, "aVertexPosition"),
      },
      uniformLocations: {
        projectionMatrix: gl.getUniformLocation(shaderProgram, "uProjectionMatrix"),
        modelViewMatrix: gl.getUniformLocation(shaderProgram, "uModelViewMatrix"),
      },
    };
    
    if(this.screenSpaceMode === this.screenModes.screen){
      programInfo.uniformLocations.resolution = gl.getUniformLocation(shaderProgram, "u_resolution");
    }

    
    this.programInfo = programInfo;
    
    
    // Here's where we call the routine that builds all the
    // objects we'll be drawing.
    // const buffers = initBuffers(gl, shaderProgram);


    // Draw the scene once
    // and later run loop
    //drawScene(gl, programInfo, buffers);
              // this.drawScene(this, gl, programInfo);

    // console.warn("pointermove, THIS DOES NOT BELONG HERE");
    // THIS DOES NOT BELONG HERE
    // window.addEventListener( 'resize', onWindowResize );
    // document.addEventListener( 'pointermove', this.onPointerMove.bind(this) );
    
    
    
    // testing where this stuff goes not in the loop
    
                        
                        // Tell WebGL to use our program when drawing
                        gl.useProgram(programInfo.program);
                        
                        // #GLRWORK does this belong here????
                        const positionBuffer = gl.createBuffer();
                        
                        // #GLRWORK
                        // does this belong here????
                        // var colorUniformLocation = gl.getUniformLocation(programInfo.program, "u_color");
                        this.colorUniformLocation = gl.getUniformLocation(programInfo.program, "u_color");
                        // 
                        // var matrixUniformLocation = gl.getUniformLocation(programInfo.program, "u_matrix");
                        this.matrixUniformLocation = gl.getUniformLocation(programInfo.program, "u_matrix");


// figuring out where to put the projection Matrix and then
// in the model where to put its com[putation]
var m4 = new Matrix4();
{
var left = 0;
var right = this.gameWidth;
var bottom = this.gameHeight;
var top = 0;
var near = 400;
var far = -400;
m4.makeOrthographic(left, right, bottom, top, near, far);

this.projectionMatrix = m4;
}

                      // var mm = new mat4.create()


                        //gl.bindBuffer(gl.ARRAY_BUFFER, buffers.position);
                        gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
                        
                          
                        // Tell WebGL how to pull out the positions from the position
                        // buffer into the vertexPosition attribute.
                        // setPositionAttribute(gl, buffers, programInfo);
                        // const numComponents = 2; // pull out 2 values per iteration
                        const numComponents = 3; // pull out 3 values per iteration for xyz
                        const type = gl.FLOAT; // the data in the buffer is 32bit floats
                        const normalize = false; // don't normalize
                        const stride = 0; // how many bytes to get from one set of values to the next
                        // 0 = use type and numComponents above
                        const offset = 0; // how many bytes inside the buffer to start from
                        gl.vertexAttribPointer(
                          programInfo.attribLocations.vertexPosition,
                          numComponents,
                          type,
                          normalize,
                          stride,
                          offset
                        );
                        
                        

                        gl.enableVertexAttribArray(programInfo.attribLocations.vertexPosition);

                        // Pass in the canvas resolution so we can convert from
                        // pixels to clipspace in the shader
                        if(programInfo.uniformLocations.resolution){
                          //console.log("resolution", programInfo.uniformLocations.resolution);
                          gl.uniform2f(programInfo.uniformLocations.resolution, gl.canvas.width, gl.canvas.height);
                        }

    
    
    
    this.startLoop();


  }

}
