

import { Editor } from "./Editor.js";

import { Rectangle } from "../Primitives/Rectangle.js";
import { Plane } from "../Primitives/Plane.js";

// tools
import { StampTool } from "../Tools/StampTool.js";
// import { Bot } from "../Primitives/Bot.js";
import { Alien1 } from "../Cast/Alien1.js";
import { Alien2 } from "../Cast/Alien2.js";
import { SelectTool } from "../Tools/SelectTool.js";



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
    
    
    
    
    
    // 
    // Stamps
    // 
    
    console.warn("Note we still need .visible = false instead of drawing offscreen -40");
    var wobjetStamper_tool = new StampTool("wobject_stamper", "wobject stamper", this.system);
    wobjetStamper_tool.visualObject = new Alien1("newRect", -40, -40, 40, 40, {r:0,g:1,b:1,a:1});
    wobjetStamper_tool.visualObject.canUpdate = false;
    wobjetStamper_tool.stampingObject = new Alien1("newRect", -40, -40, 40, 40, {r:0,g:0,b:1,a:1}, this.system);
    


    EditorMagic.addTool(wobjetStamper_tool);

    
    
    
    
    
    var wobjetStamper_tool222 = new StampTool("wobject_stamper222", "wobject stamper222", this.system);
    wobjetStamper_tool222.visualObject = new Alien2("newRect", -40, -40, 40, 40, {r:1,g:0,b:1,a:1});
    wobjetStamper_tool222.visualObject.canUpdate  = false;
    wobjetStamper_tool222.stampingObject = new Alien2("newRect", -40, -40, 40, 40, {r:0,g:1,b:0,a:1}, this.system);
    

    EditorMagic.addTool(wobjetStamper_tool222);



    
    
    console.warn("TEMPPPPPP    alien3 ");
    var wobjetStamper_tool333 = new StampTool("wobject_stamper222", "wobject stamper222", this.system);
    wobjetStamper_tool333.visualObject = new Alien2("newRect", -40, -40, 40, 40, {r:1,g:0,b:1,a:1});
    wobjetStamper_tool333.visualObject.canUpdate  = false;
    wobjetStamper_tool333.stampingObject = new Alien2("newRect", -40, -40, 40, 40, {r:0,g:1,b:0,a:1}, this.system);
    
    // debugger
      var aa = wobjetStamper_tool333.stampingObject;
      // // debugger
      aa.platform = window.box3;
      // 
      // debugger
      aa.useGravity = false;
      aa.walkSpeed = 1.2;
      aa.directionVector.x = 1;
      aa.hasTurned = false;
      aa.update = function(){
        // this.x + 1;
        var platform = this.platform;
        // var platform = window.box3;
      
        this.y = platform.max.y + -this.height + -2;
      
        this.updateWalking(this.system.time.delta, 9);
      
        // filp direction
        if (this.x >= platform.max.x){
          this.directionVector.x *= -1;
          this.x = platform.max.x;
        }
        else if (this.x <= box3.min.x){
          this.directionVector.x *= -1;
          this.x = platform.min.x;
        }
      
      }
      // 
      // 

    EditorMagic.addTool(wobjetStamper_tool333);





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
    
    // <<<<
    // window.toolsssss = wobjetStamper_tool
     // <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike">
    var item1Select = document.createElement('input');
    item1Select.classList.add("item");
    item1Select.type = "checkbox";
    // item1Select.style.background = "transparent url('./Cast/Alien1.png') center center/cover no-repeat";
    item1Select.style.backgroundImage = "url(./Editor/arrow1.png)";
    item1Select.style.backgroundColor = "#ffffff";
    panel.appendChild(item1Select);
    checkboxes.push(item1Select);
    
    // This pattern can be ratified
    item1Select.onclick = function(ev){
      console.log(ev.target.checked);
      checkBoxChanged(ev.target);
      // could emit an event instead and handle teardown
      // or STATE onExit()
      if(ev.target.checked){
        console.log("checked yes");
        
        EditorMagic.changeTool(selectTool);
      }
      else if( ! ev.target.checked){
        console.log("checked no");
        // EditorModeActions.pointerMoving = function(){
        // 
        // }
        EditorMagic.stopTool(selectTool);
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
    // item2.style.background = "transparent url('./Cast/Alien1.png') center center/cover no-repeat";
    item2.style.backgroundImage = "url(./Cast/Alien1.png)";
    panel.appendChild(item2);
    checkboxes.push(item2);
    
    
    // 
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
        EditorMagic.changeTool(wobjetStamper_tool);
      }
      else if( ! ev.target.checked){
        console.log("checked no");
        // EditorModeActions.pointerMoving = function(){
        // 
        // }
        EditorMagic.stopTool(wobjetStamper_tool);
      }
      
    }
    


    // needs more robotting
    var item3 = document.createElement('input');
    item3.classList.add("item");
    item3.type = "checkbox";
    item3.style.backgroundImage = "url(./Cast/Alien2.png)";
    panel.appendChild(item3);
    checkboxes.push(item3);
    
    item3.onclick = function(ev){
      checkBoxChanged(ev.target);
      console.log(ev.target.checked);
      if(ev.target.checked){
        console.log("checked yes");
        EditorMagic.changeTool(wobjetStamper_tool222);
      }
      else if( ! ev.target.checked){
        console.log("checked no");
        EditorMagic.stopTool(wobjetStamper_tool222);
      }
    }




  
      // needs more robotting
      var item4 = document.createElement('input');
      item4.classList.add("item");
      item4.type = "checkbox";
      item4.style.backgroundImage = "url(./Cast/Alien2.png)";
      panel.appendChild(item4);
      checkboxes.push(item4);
      
      item4.onclick = function(ev){
        checkBoxChanged(ev.target);
        console.log(ev.target.checked);
        if(ev.target.checked){
          console.log("checked yes");
          EditorMagic.changeTool(wobjetStamper_tool333);
        }
        else if( ! ev.target.checked){
          console.log("checked no");
          EditorMagic.stopTool(wobjetStamper_tool333);
        }
      }


    // Make select tool active first
    item1Select.click();




    
    
  }
  
}
