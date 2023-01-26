

// Basic example of a basic buch of things in the view

// hrmmm dont like going UP a folder for games stuff
// it makes a game nested

import { Game } from "../Core/Game.js";

import { Rectangle } from "../Primitives/Rectangle.js";

import { ToolsController as _ToolsController } from "../Tools/ToolsController.js";
import { Tool } from "../Tools/Tool.js";
// import { StampTool } from "../Tools/StampTool.js";
import { StampTool } from "../Tools/StampTool.js";

export let disc = new Game("panels");

disc.load = function(){

  var _this = this;


  // changing the screen space mode for a platformer game
  this.system.screenSpaceMode = this.system.screenModes.screen;
  this.system.reboot();


  console.log("panels start like");
  
  this.system.backgroundColor = {r:0,g:0.05,b:0.05,a:1};
  this.system.backgroundColor = {r:0.5,g:0.55,b:0.5,a:1};
  
  
  // this shoudl be ratified up to System
  // function onPointerMove( event ) {
  // 
  //   _this.system.pointer.x = event.clientX;
  //   _this.system.pointer.y = event.clientY;
  //   // console.log(that.system.pointer);
  // 
  //   // we can add this later in another event
  //   // EditorModeActions.pointerMoving(); 
  // }
  // 
  // window.addEventListener( 'pointermove', onPointerMove, true );
  // 
  // 
  
  
  /*
  ok, discussiojn
  we need a panel, it has buttons that have two or more modes
  tap : on object what happens?
  on : add object to center? NO cause any object could be there
  on : draw mode
  drag : drag has issues
  drag css has style issues and overlap issues for showing the gl object to match looks
  drag does have a on go state
  but does not have mouse clientXY and blocks the pointermove event
  input : checkbox : has changed event
  
  ok how about Mode : stamp or drag
  stamp mouseUp from limited distance to drop copy of object
  If mouseDown and distance moved > lim then start drawing
  
  that solves mostly everything?!?!?!?.....
  
  well drag and drop is still a tool, but can wait for later?
  Stamp is faster, but gets stuck in stamp mode
  
  */
  var EditorModes = {
    select : "select",
    draw : "draw"
  }
  // 
  // // this manages the database of tools thus far
  // // update is in EditorModeActions
  // var ToolsController = {
  //   visualObject : null, // what will appear under the mouse
  //   mode : EditorModes.select,
  //   currentTool : null, // type Class as state machine
  //   tools : {
  //     // select : null,
  //     // platform : null,
  //     // wobject : null,
  //     // player : null
  //   },
  //   toolsList : [],
  // 
  //   addTool : function(tool){
  //     if(tool instanceof Tool){
  //       this.tools[tool.name] = tool;
  //       this.toolsList.push(tool);
  //     }
  //     else {
  //       console.log("tool is not a tool!!!? lucky it");
  //     }
  //   },
  //   changeTool : function(tool){
  //     var index = this.toolsList.indexOf(tool);
  //     if(index === -1){
  //       console.log("tool missing ", tool.name);
  //       return;
  //     }
  //     if(this.currentTool !== null){
  //       this.currentTool.replace();
  //     }
  //     this.currentTool = tool;
  //     tool.start();
  //   },
  //   stopTool : function(tool){
  //     var index = this.toolsList.indexOf(tool);
  //     if(index === -1){
  //       console.log("tool missing ", tool.name);
  //       return;
  //     }
  //     if(this.currentTool !== null){
  //       this.currentTool.stop();
  //     }
  //   }
  // }
  var ToolsController = new _ToolsController();
  window.ToolsController = ToolsController;

  //
  // these can get complex
  // lots of per tool thinking and state to figure out
  // for now just jame into EventListeners
  //
  class EditorModeActions {
    
    constructor(){
      
    }
    // these go in the addEventListener
    _pointerMoving(){
      this.pointerMoving();
    }
    _pointerDown() {
      console.log("down 1111");
      // debugger
      this.pointerDown();
    }
    _pointerUp(){
      this.pointerUp();
      console.log("up 2222");
    }
    
    // replace these as the tool needs
    pointerMoving(){}
    pointerDown(){
      console.log("down 1111");
    }
    pointerUp(){
      console.log("up 2222");
    }
  }
  var _EditorModeActions = new EditorModeActions();
  
  // this is window without the bind
  this.system.canvas.addEventListener( 'pointerdown', _EditorModeActions._pointerDown.bind(_EditorModeActions) );
  this.system.canvas.addEventListener( 'pointerup', _EditorModeActions._pointerUp.bind(_EditorModeActions) );

  

  
  
  // 
  // window.box = newRect;
  // // need clone()
  // function dupeWobjectStamp(wobject){
  //   var newRect;
  //   if(wobject){
  //     newRect = new Rectangle("newRect", wobject.x, wobject.y, wobject.width, wobject.height, wobject.color);  
  //   }
  //   // need .visible = false instead of rendering off screen
  //   else {
  //     newRect = new Rectangle("newRect", -40, -40, 40, 40, {r:0,g:1,b:1,a:1});
  //   }
  //   // _this.system.sceneGrapth.add(newRect);
  //   // this.visualObject = newRect;
  //   return newRect;
  // }
  // 
  //
  //
  //
  // class WobjectTool extends Tool {
  
  var wobjetStamper_tool = new StampTool("wobject_stamper", "wobject stamper", _this.system);
  wobjetStamper_tool.editorModeActions = _EditorModeActions;
  wobjetStamper_tool.visualObject = new Rectangle("newRect", -40, -40, 40, 40, {r:0,g:1,b:1,a:1});
  wobjetStamper_tool.stampingObject = new Rectangle("newRect", -40, -40, 40, 40, {r:0,g:0,b:1,a:1});
  wobjetStamper_tool.stampingObject.system = _this.system;
  
  wobjetStamper_tool.stampingObject.update = function(){
    // console.log("????");
    // debugger
    // console.log(this.system.time.delta);
    // console.log(this.x);
    // console.log(this.system.time.delta);
      this.x += this.system.time.delta * 0.01;
      if(this.x > window.innerWidth){
        this.x = 0 - this.width;
      }
      // this.x += 0.1;
  }
  
  // wobjetStamper_tool.stampingObject.play = function(){
  //   // console.log("????");
  //   // debugger
  //   // console.log(this.system.time.delta);
  //     // this.x += this.system.time.delta * 10.2;
  // }
  
  // animation to tricky for now
  // var mTime = Date.now();
  // wobjetStamper_tool.stampingObject.update = function(){
  //   console.log("¿¿¿");
  //   this.stampingObject.playHelpers.mTime = this.system.time.now;
  // }
  // wobjetStamper_tool.stampingObject.playHelpers = {
  //   mTime : 0
  // };
  // // var sq1 = new SquareLike(null, -xx, xy, ww, wh);
  // wobjetStamper_tool.stampingObject.playCode = `return { do : function(obj, helpers){
  //   console.log("¿??///¿/");
  //   console.log(helpers.mTime);
  // }}`;

  ToolsController.addTool(wobjetStamper_tool);

  
  
  
  
  
  var wobjetStamper_tool222 = new StampTool("wobject_stamper222", "wobject stamper222", _this.system);
  
  wobjetStamper_tool222.editorModeActions = _EditorModeActions;
  wobjetStamper_tool222.visualObject = new Rectangle("newRect", -40, -40, 40, 40, {r:1,g:0,b:1,a:1});
  wobjetStamper_tool222.stampingObject = new Rectangle("newRect", -40, -40, 40, 40, {r:0,g:1,b:0,a:1});

  ToolsController.addTool(wobjetStamper_tool222);

  wobjetStamper_tool222.stampingObject.system = _this.system;
  
  wobjetStamper_tool222.stampingObject.update = function(){
    // console.log("????");
    // debugger
    // console.log(this.system.time.delta);
    // console.log(this.x);
    // console.log(this.system.time.delta);
      this.y -= this.system.time.delta * 0.01;
      if( (this.y + this.height) < 0){
        this.y = window.innerHeight;
      }
      // this.x += 0.1;
  }
  
  
  
  // var pointer = {x:0,y:0};
  // window.pointer = pointer;

  
  
  
  
  // 
  // 
  // 
  // var box = new Rectangle("box", 500, 140, 20, 20, {r:0,g:0.1,b:0.7,a:1});
  // window.box = box;
  // this.system.sceneGrapth.add(box);
  // 
  // 
  
  var gg = document.getElementById("gamespace");
  gg.innerHTML = "";
  // document.body.appendChild(controls);
  var gamestyles = document.getElementById("gamestyles");

  var panel = document.createElement('div');
  panel.id = "panel";
  panel.style.cssText = `
  position: absolute;
  ___overflow: hidden;
  top: 0px;
  left: 0px;
  z-index: 2;
  background: black;
  width: 170px;
  min-height: 600px;
  padding: 20px 0 0 0;
  border-right : 1px white solid;
  /* flex box */
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-content: stretch;
  align-items: center;
  `;
  gg.appendChild(panel);


  // this needs to be a webcompontent for the css to not get duplicated
  // or we cram css into the dom since we can select the syle tag with an id!
  var item = document.createElement('div');
  item.classList.add("item");
  var itemstyle = `
  #panel .item {
    background: white;
    width: 60px;
    height: 60px;
    margin-bottom: 12px;
    ____padding: 20px 0 0 0px;
    border : 1px white solid;
    border-radius: 12px;
    
    order: 0;
    flex: 0 1 auto;
    align-self: auto;
  }
  `;
  gamestyles.innerHTML += itemstyle;
  
  panel.appendChild(item);
  
  
  

  
  // item.addEventListener( 'pointermove', onPointerMove, true );
  
  
  
  // let dragged;

  var newRect = null;
  
  // var draggingStyle = `
  // .dragging {
  //   background-color: green !important;
  //   ____border : 1px white solid;
  //   _____border-radius: 12px;
  // }
  // `;
  // gamestyles.innerHTML += draggingStyle;
  // 
  // /* events fired on the draggable target */
  // // const source = document.getElementById("draggable");
  // var source = item;
  // source.setAttribute("draggable", true);
  // // console.log("source", source);
  // source.addEventListener("drag", (event) => {
  //   console.log("dragging");
  //   // console.log(event);
  // });
  // 
  // 
  // source.addEventListener("dragstart", (event) => {
  //   console.log("drag start");
  //   // store a ref. on the dragged elem
  //   dragged = event.target;
  //   // make it half transparent
  //   event.target.classList.add("dragging");
  //   // item.classList.add("dragging");
  // 
  // 
  //   newRect = new Rectangle("newRect", -40, -40, 40, 40, {r:0,g:1,b:1,a:1});
  //   window.box = newRect;
  //   this.system.sceneGrapth.add(newRect);
  // 
  // 
  // 
  // 
  // });
  // 
  // source.addEventListener("dragend", (event) => {
  //   console.log("drag stop");
  //   // reset the transparency
  //   event.target.classList.remove("dragging");
  //   newRect = null;
  // });
  // 
  
  // need mouse points
  /* events fired on the drop targets */
  // canvassss
  // var gg = document.getElementById("gamespace");
  // const target = document.getElementById("gamespace");
  // const target = this.system.canvas;
  // target.addEventListener("dragover", (event) => {
  //   // prevent default to allow drop
  //   event.preventDefault();
  //   pointer.x = event.clientX;
  //   pointer.y = event.clientY;
  //   // console.log("drag pointer", pointer);
  // 
  //   newRect.x = pointer.x;
  //   newRect.y = pointer.y;
  // 
  // }, false);
  
  
  var checkboxes = [];
  function checkBoxChanged(item) {
    for (var i = 0; i < checkboxes.length; i++) {
      if(item !== checkboxes[i]){
        
        checkboxes[i].checked = false;
      }
    }
  }
  
  // 
  // item 2
  // 
  
  // window.toolsssss = wobjetStamper_tool
   // <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike">
  var item2 = document.createElement('input');
  item2.classList.add("item");
  item2.type = "checkbox";
  panel.appendChild(item2);
  checkboxes.push(item2);
  
  item2.onclick = function(ev){
    console.log(ev.target.checked);
    checkBoxChanged(ev.target);
    // could emit an event instead and handle teardown
    // or STATE onExit()
    if(ev.target.checked){
      console.log("checked yes");
      // EditorModeActions.pointerMoving = function(){
      // 
      // }
      ToolsController.changeTool(wobjetStamper_tool);
    }
    else if( ! ev.target.checked){
      console.log("checked no");
      // EditorModeActions.pointerMoving = function(){
      // 
      // }
      ToolsController.stopTool(wobjetStamper_tool);
    }
    
  }
  


  // needs more robotting
  var item3 = document.createElement('input');
  item3.classList.add("item");
  item3.type = "checkbox";
  panel.appendChild(item3);
  checkboxes.push(item3);
  
  item3.onclick = function(ev){
    checkBoxChanged(ev.target);
    console.log(ev.target.checked);
    if(ev.target.checked){
      console.log("checked yes");
      ToolsController.changeTool(wobjetStamper_tool222);
    }
    else if( ! ev.target.checked){
      console.log("checked no");
      ToolsController.stopTool(wobjetStamper_tool222);
    }
  }










  // 
  // 
  // var button = document.createElement('button');
  // button.classList.add("button");
  // button.classList.add("add");
  // button.innerText = "+";
  // button.style.cssText = `width: 32px;
  // height: 32px;`;
  // controls.appendChild(button);
  // // var gg = document.getElementById("bodyInjectionPointMain");
  // 
  // 
  // 
  
    
    
    
  // 
  // 
  //   // Create a new stylesheet that can be shared by all `stop-watch` elements
  // const styles = new CSSStyleSheet()
  // styles.replaceSync(`
  //   :host {
  //     font-size: var(--font-size-3);
  //     font-style: italic;
  //   }
  // `)
  // 
  // // Define the StopWatch element Class
  // class StopWatchElement extends HTMLElement {
  //   static define(tag = "stop-watch") {
  //     customElements.define(tag, this)
  //   }
  // 
  //   // Give this element its own encapsulated DOM
  //   shadowRoot = this.attachShadow({ mode: "open" })
  // 
  //   // Initialize private state
  //   #start = Date.now()
  // 
  //   connectedCallback() {
  //     // Add the shared styles
  //     this.shadowRoot.adoptedStyleSheets = [styles]
  // 
  //     // Start the timer
  //     this.#tick()
  //   }
  // 
  //   #tick() {
  //     const milliseconds = Date.now() - this.#start
  //     const minutes = String(Math.floor(milliseconds / (1000 * 60))).padStart(2, "0")
  //     const seconds = String(Math.floor((milliseconds / 1000) % 60)).padStart(2, "0")
  //     const hundredths = String(Math.floor((milliseconds % 1000) / 10)).padStart(2, "0")
  // 
  //     this.shadowRoot.replaceChildren(`${minutes}:${seconds}:${hundredths}`)
  // 
  //     // Schedule next update
  //     requestAnimationFrame(() => this.#tick())
  //   }
  // }
  // 
  // // Register the element with the Custom Element Registry
  // StopWatchElement.define()
  // 
  // // <stop-watch role="timer"></stop-watch>
  // 
  // 
  // var el = document.createElement('stop-watch');
  // el.setAttribute("role", "timer");
  // 
  // var gg = document.getElementById("gamespace");
  // gg.innerHTML = "";
  // 
  // gg.appendChild(el);



};
