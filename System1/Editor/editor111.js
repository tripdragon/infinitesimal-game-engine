

import { Editor } from "./Editor.js";

import { Rectangle } from "../Primitives/Rectangle.js";
import { Plane } from "../Primitives/Plane.js";
import { Platform } from "../Primitives/Platform.js";

// tools
import { StampTool } from "../Tools/StampTool.js";
// import { Bot } from "../Primitives/Bot.js";
import { Alien1 } from "../Cast/Alien1.js";
import { Alien2 } from "../Cast/Alien2.js";
import { SelectTool } from "../Tools/SelectTool.js";

import { Grid } from "../Modules/Grid.js";



import { PlatformStampTool } from "../Tools/PlatformStampTool.js";



export class Editor111 extends Editor {


  

  constructor(system){
    
    super(system);
    
    // mouse actions
    // noisey
    // moving just to Tool class cause its like 3 layer of abstraction
    // this.system.canvas.addEventListener( 'pointerdown', this.editorModeActions._pointerDown.bind(this.editorModeActions) );
    // this.system.canvas.addEventListener( 'pointerup', this.editorModeActions._pointerUp.bind(this.editorModeActions) );
    
    // this.launch_CM();
    
  }
  
  
  
  
  // 
  // LAUNCH!!!!
  // 
  launch_CM(){
    
    // it shows up better in the code editor.....
    //  and its a carry over name from previous file
    var EditorMagic = this;
    
    var _this = this;
    
    
    //
    // Select tool
    //
    
    var selectTool = new SelectTool(this.system);

    EditorMagic.addTool(selectTool);
    
    
    EditorMagic.baseGrid = new Grid(40,20,40, this.system);
    
    
    
    
    // 
    // Stamps
    // 
    
    // ----
    console.warn("Note we still need .visible = false instead of drawing offscreen -40");
    var wobjetStamper_tool = new StampTool("wobject_stamper", "wobject stamper", this.system);
    wobjetStamper_tool.visualObject = new Alien1("newRect", -40, -40, 0, 40, 40, {r:0,g:1,b:1,a:1}, this.system);
    wobjetStamper_tool.visualObject.canUpdate = false;
    wobjetStamper_tool.stampingObject = new Alien1("newRect", -40, -40, 0, 40, 40, {r:0,g:0,b:1,a:1}, this.system);

    EditorMagic.addTool(wobjetStamper_tool);

    
    
    
    
    // ----
    var wobjetStamper_tool222 = new StampTool("wobject_stamper222", "wobject stamper222", this.system);
    wobjetStamper_tool222.visualObject = new Alien2("newRect", -40, -40, 0, 40, 40, {r:1,g:0,b:1,a:1}, this.system);
    wobjetStamper_tool222.visualObject.canUpdate  = false;
    wobjetStamper_tool222.stampingObject = new Alien2("newRect", -40, -40, 0, 40, 40, {r:0,g:1,b:0,a:1}, this.system);

    EditorMagic.addTool(wobjetStamper_tool222);


    // ---- 
    
    var platy = new Platform("platy", 0, 0, 0, 10, 10, {r:0,g:0,b:1,a:1});
    // this.system.add(box);

    // box.onCollide = function(){
    //   console.log("wap!", box.name);
    //   // soundboard1.play();
    //   var ss = new Audio("./Discs/Soundeffects/bleep-audiomass-output.wav");
    //   ss.play();
    // }

    var platy_stamper = new StampTool("wobject_stamper_platform", "platform stamper", this.system);
    platy_stamper.visualObject = platy;
    platy_stamper.visualObject.canUpdate  = false;
    platy_stamper.stampingObject = new Platform("platy", 0, 0, 0, 10, 10, {r:0,g:0,b:1,a:1});
    
    EditorMagic.addTool(platy_stamper);




    var platy222 = new Platform("platy", 0, 0, 0, 160, 140, {r:0,g:1,b:1,a:1});
    var platy_stamper222 = new StampTool("wobject_stamper_platform", "platform stamper", this.system);
    platy_stamper222.visualObject = platy222;
    platy_stamper222.visualObject.canUpdate  = false;
    platy_stamper222.stampingObject = platy222.clone();
    
    EditorMagic.addTool(platy_stamper222);


    

    var platy333 = new Platform("platy", 0, 0, 0, EditorMagic.baseGrid.size, EditorMagic.baseGrid.size, {r:0,g:1,b:1,a:1});
    var platy_stamper333 = new PlatformStampTool("wobject_stamper_platform", "platform stamper", this.system);
    platy_stamper333.visualObject = platy333;
    platy_stamper333.visualObject.canUpdate  = false;
    // platy_stamper333.stampingObject = platy333.clone();
    platy_stamper333.stampingObject = new Platform("platy", 0, 0, 0, EditorMagic.baseGrid.size, EditorMagic.baseGrid.size, {r:0,g:1,b:1,a:1});
    platy_stamper333.stampingObject.color.setHex(0x00ff37);
    platy_stamper333.baseGrid = EditorMagic.baseGrid;
    platy_stamper333.editor = EditorMagic;
    
    EditorMagic.addTool(platy_stamper333);








    
    // ----
    // 
    // console.warn("TEMPPPPPP    alien3 ");
    // var wobjetStamper_tool333 = new StampTool("wobject_stamper222", "wobject stamper222", this.system);
    //   wobjetStamper_tool333.visualObject = new Alien2("newRect", -40, -40, 0, 40, 40, {r:1,g:0,b:1,a:1}, this.system);
    // wobjetStamper_tool333.visualObject.canUpdate  = false;
    // wobjetStamper_tool333.stampingObject = new Alien1("newRect", -40, -40, 0, 40, 40, {r:0,g:1,b:0,a:1}, this.system);
    // 
    
      // var aa = wobjetStamper_tool333.stampingObject;
      
      // for now we need some defaults items to get the bot to walk
      // aa.platform = window.box3;
      // aa.directionVector.x = 1;
      
      
      // can delete, was basic walk code
      // 
      // debugger
      // aa.useGravity = false;
      // aa.walkSpeed = 1.2;
      // aa.directionVector.x = 1;
      // aa.hasTurned = false;
      // aa.update = function(){
      //   // this.x + 1;
      //   var platform = this.platform;
      //   // var platform = window.box3;
      // 
      //   this.y = platform.max.y + -this.height + -2;
      // 
      //   this.updateWalking(this.system.time.delta, 9);
      // 
      //   // filp direction
      //   if (this.x >= platform.max.x){
      //     this.directionVector.x *= -1;
      //     this.x = platform.max.x;
      //   }
      //   else if (this.x <= box3.min.x){
      //     this.directionVector.x *= -1;
      //     this.x = platform.min.x;
      //   }
      // 
      // }
      // // 
      // // 

    // EditorMagic.addTool(wobjetStamper_tool333);



    // 
    // DOM stuff
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
    background: #000000ba;
    width: 170px;
    min-height: 600px;
    padding: 20px 0 0 0;
    border-right : 1px #3c3c3c solid;
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
    // var item = document.createElement('div');
    // item.classList.add("item");
    // item.style.backgroundImage = "url(./Editor/arrow1.png)";
    
    var itemstyle = `
    #panel .item {
      background: white;
      width: 60px;
      height: 60px;
      margin-bottom: 12px;
      ____padding: 20px 0 0 0px;
      border : 1px white solid;
      border-radius: 12px;
      appearance: none;
      background-position: center center;
      background-size: cover;
      background-repeat: no-repeat;
      background-color: transparent;
      overflow: hidden;
      
      order: 0;
      flex: 0 1 auto;
      align-self: auto;
    }
    #panel .item:checked {
      appearance: checkbox;
      border-radius: 12px;
    `;
    gamestyles.innerHTML += itemstyle;
    
    // panel.appendChild(item);
    
    
    

    
    // item.addEventListener( 'pointermove', onPointerMove, true );
    
    
    
    // let dragged;

    // var newRect = null;
    
    // toggle all checkboxes when needed
    var checkboxes = [];
    function checkBoxChanged(item) {
      for (var i = 0; i < checkboxes.length; i++) {
        if(item !== checkboxes[i]){
          checkboxes[i].checked = false;
        }
      }
    }
    
    //
    // checkbox toggle tools
    // 
    
    // item1Select = new ToolCheckBoxFactory(panel, checkboxes, wobjetStamper_tool, "url(./Cast/Alien1.png)");
    // Make select tool active first
    // item1Select.click();
    // TEMP for some web component
    // tooo complex to sift through right now
    function ToolCheckBoxFactory(parent, cache, tool, imageURL){
      
      this.tool = tool;
      
      // needs more robotting
      this.checkbox = document.createElement('input');
      this.checkbox.classList.add("item");
      this.checkbox.type = "checkbox";
      // item.style.backgroundImage = "url(./Cast/Alien2.png)";
      this.checkbox.style.backgroundImage = imageURL;
      this.checkbox.style.backgroundColor = "#000000";
      parent.appendChild(this.checkbox);
      cache.push(this.checkbox);
      
      var _this = this;
      
      this.checkbox.onclick = function(ev){
        checkBoxChanged(ev.target);
        console.log(ev.target.checked);
        if(ev.target.checked){
          console.log("checked yes");
          EditorMagic.changeTool(_this.tool);
        }
        else if( ! ev.target.checked){
          console.log("checked no");
          EditorMagic.stopTool(_this.tool);
        }
      }
      
      this.click = function(){
        this.checkbox.click();
      }
      
    } // ToolCheckBoxFactory
    
    var item1Select = new ToolCheckBoxFactory(panel, checkboxes, selectTool, "url(./Editor/arrow1.png)");
    item1Select.checkbox.style.backgroundColor = "#ffffff";
    

    // Make select tool active first
    item1Select.click();


    
    
    // // <<<<
    // // window.toolsssss = wobjetStamper_tool
    //  // <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike">
    // var item1Select = document.createElement('input');
    // item1Select.classList.add("item");
    // item1Select.type = "checkbox";
    // // item1Select.style.background = "transparent url('./Cast/Alien1.png') center center/cover no-repeat";
    // item1Select.style.backgroundImage = "url(./Editor/arrow1.png)";
    // item1Select.style.backgroundColor = "#ffffff";
    // panel.appendChild(item1Select);
    // checkboxes.push(item1Select);
    // 
    // // This pattern can be ratified
    // item1Select.onclick = function(ev){
    //   console.log(ev.target.checked);
    //   checkBoxChanged(ev.target);
    //   // could emit an event instead and handle teardown
    //   // or STATE onExit()
    //   if(ev.target.checked){
    //     console.log("checked yes");
    // 
    //     EditorMagic.changeTool(selectTool);
    //   }
    //   else if( ! ev.target.checked){
    //     console.log("checked no");
    //     // EditorModeActions.pointerMoving = function(){
    //     // 
    //     // }
    //     EditorMagic.stopTool(selectTool);
    //   }
    // 
    // }
    // 

    
    
    
    // 
    // others
    // 
    
    

    new ToolCheckBoxFactory(panel, checkboxes, wobjetStamper_tool, "url(./Cast/Alien1.png)"); // (parent, cache, tool, imageURL)
    
    
    
    new ToolCheckBoxFactory(panel, checkboxes, wobjetStamper_tool222, "url(./Cast/Alien2.png)"); // (parent, cache, tool, imageURL)
    
    // new ToolCheckBoxFactory(panel, checkboxes, wobjetStamper_tool333, "url(./Cast/Alien2.png)"); // (parent, cache, tool, imageURL)
    
    new ToolCheckBoxFactory(panel, checkboxes, platy_stamper, "url(./Cast/Alien2.png)"); // (parent, cache, tool, imageURL)
    
    
    
    new ToolCheckBoxFactory(panel, checkboxes, platy_stamper222, "url(./Cast/Alien2.png)"); // (parent, cache, tool, imageURL)
    
    
    new ToolCheckBoxFactory(panel, checkboxes, platy_stamper333, "url(./Cast/Alien2.png)"); // (parent, cache, tool, imageURL)
    
    
    


    // 
    // 
    // map mover
    // this belongs in editor class
    
    var content = document.getElementById('gamespace');


    var joy1 = new DRRR_Joysticky("joy1", 100, 80, 0, 1.0, 100, 100);
    // content.appendChild(joy1);
    panel.appendChild(joy1);
    joy1.style.zIndex = 100;
    // joy1.style.position = "absolute";

    // var joy2 = new DRRR_Joysticky("joy1", 200, 200, 0, 1.0, 0.5, 0.5, false);
    // content.appendChild(joy2);
    
    function remap(from0, to0, from1, to1, value) {
        return from1 + (to1 - from1) * (value - from0) / (to0 - from0);
    }

    window.addEventListener('joystickUpdate', function(ev){
      // debugger
      // console.log("mouse",ev.detail.value.mouse);
      // console.log("normalizedUV",ev.detail.value.normalizedUV);
      var nor = ev.detail.value.normalizedUV;
      
      // var valX = remap(0,1, -400, 890*2,  nor.x);
      // var valY = remap(0,1, -200, 490,  nor.y);
      
      // APPPP.cameraDefault.x = 1 - (890*2) * nor.x;
      
      // APPPP.cameraDefault.x = valX;
      // APPPP.cameraDefault.y = valY;
      // 
      
      var valX = remap(0,1, -1800, 890*2,  nor.x);
      var valY = remap(0,1, -200, 490,  nor.y);
      
      APPPP.world.x = valX;
      APPPP.world.y = valY;
      
      
      // APPPP.cameraDefault.x = -10
    });
    

    
    
  }
  
}
