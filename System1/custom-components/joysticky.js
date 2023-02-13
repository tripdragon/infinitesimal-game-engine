

/*

exposes 2d vectors:
@ normalizedCoordsUV y is flipped
@ mouse in screenCoords with 0,0 being top left of canvas element
@ normalized 

<script src="./custom-components/joysticky.js" ___type="module" ___defer></script>

var content = document.getElementById('gamespace');


var joy1 = new DRRR_Joysticky("joy1", 100, 80, 0, 1.0, 0.5, 0.5);
content.appendChild(joy1);
joy1.style.zIndex = 100;
joy1.style.position = "absolute";

// var joy2 = new DRRR_Joysticky("joy1", 200, 200, 0, 1.0, 0.5, 0.5, false);
// content.appendChild(joy2);


window.addEventListener('joystickUpdate', function(ev){
  // debugger
  console.log(ev.detail.value.mouse)
  console.log(ev.detail.value.normalizedUV)
});

*/

  // the constructor does not take named arguments easily, so we went back to the loooong form for now
  class DRRR_Joysticky extends HTMLElement {

    
    
    rect;
    ctx;
    canvas;
    normalizedCoordsDom;
    screenCoordsDom;
    mmmEvent;
    
    // var that = this;
    
    IS_DOWN = false;
    debuggerOn = false;;
    
    canvasSize = {width: 0, height: 0};
    mouse = {x:-1, y:-1};
    normalizedCoordsUV = {x:-1, y:-1};
    normalized = {x:-1, y:-1};

    
    // static get observedAttributes() {
    //   return [`width`, `height`];
    // }
    
    constructor(label = "laabel", width = 100, height = 100, min = 0, max = 1.0, x = 0.5, y = 0.5, usedebugger = false) {

      super();
      
      
      this.debuggerOn = usedebugger;
      
      this.canvasSize.width = width;
      this.canvasSize.height = height;
      
      
      //console.log(this.getAttribute("tacos"));
      // 
      // var val = this.getAttribute("val");
      // this.value = val;
      // // 
      // var min = this.getAttribute("min") || 0;
      // this.min = min;
      // var max = this.getAttribute("max") || 1;
      // 
      // var step = this.getAttribute("step") || 0.01;
      // // step = "any";
      // 
      // var label = this.getAttribute("label") || "laabel";
      // // 
      
      
      const template = document.createElement('template');
      template.innerHTML = `
          <style>
            #wrapper{
              /* position: absolute;
              left: 20px;
              top : 20px; */
            }
            canvas {
              /* left: 20px;
              top : 20px; */
              
              /* left: 50%;
              top : 100px; */
              
              __position: absolute;
              ___border: solid 2px green;
              ___float: left;
            }
            #tools {
              ____float: left;
              margin: 10px;
              font-size: 1.4em;
            }
          </style>
          <div id="wrapper">
            
            <canvas id="canvas" width=${this.canvasSize.width} height=${this.canvasSize.height}></canvas>
            <div id="tools">
              <p id="screenCoords">screen: <span>-1</span></p>
              <p id="normalizedCoords">normalized: <span>-1</span></p>
            </div>
          </div>
          
          <!--<input type="range" id="volume" name="volume" min="0" max="11"  />
            <label for="volume">Volume</label>
            -->
      `;
      
      this.mmmEvent = new CustomEvent("joystickUpdate", {
        bubbles: true,
        cancelable: true,
        composed: true,
        detail : {value: -1}
       });
      
      const templateContent = template.content;

      this.attachShadow({mode: 'open'}).appendChild(
        templateContent.cloneNode(true)
      );
      
      // debugger
      
      this.canvas = this.shadowRoot.getElementById('canvas');
      this.normalizedCoordsDom = this.shadowRoot.getElementById('normalizedCoords');
      this.screenCoordsDom = this.shadowRoot.querySelector('#screenCoords span');
      
      this.ctx = this.canvas.getContext('2d');

      if (this.debuggerOn === false) {
        const tools = this.shadowRoot.getElementById('tools');
        tools.remove();
      }


      this.redraw();
      

      
      this.canvas.addEventListener('mousedown', (ev) => {
        
        this.IS_DOWN = true;
        this.updateMousePos(this.canvas, ev);
        //console.log(mouse);
        this.redraw();
      });
      this.canvas.addEventListener('mouseup', (ev) => {
        this.IS_DOWN = false;
      });
      
      // window.addEventListener('mousemove', function(ev){
      this.canvas.addEventListener('mousemove', (ev) => {
        if(this.IS_DOWN){
          this.updateMousePos(this.canvas, ev);
          //console.log(mouse);
          this.redraw();
        }
      });
      

    }
    
    
    
    
    redraw(){
      var ctx = this.ctx;
      
      if(!ctx){
        return;
      }
      ctx.fillStyle = 'silver';
      ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

      ctx.fillStyle = '#242424';
      var handleSize = 10;
      // ctx.fillRect(
      //   (size.width/2) - (handleSize/2), 
      //              (size.height/2) - (handleSize/2), handleSize, handleSize);
      ctx.fillRect( (this.mouse.x) - (handleSize/2), (this.mouse.y) - (handleSize/2), handleSize, handleSize);

    }
    
    
    updateMousePos(canvas, evt) {
      this.rect = canvas.getBoundingClientRect();
      var rect = this.rect;
      
      var mouse = this.mouse;
      
      var normalizedCoordsUV = this.normalizedCoordsUV;
      
      var mmm = this.mmmEvent;
      
      mouse.x = evt.clientX - rect.left;
      mouse.y = evt.clientY - rect.top;

      this.updateNormaliedToUV(mouse);
      this.updateNormalied(mouse);
      
      if(this.debuggerOn){
        this.normalizedCoordsDom.innerText = `x: ${normalizedCoordsUV.x}, y: ${normalizedCoordsUV.y}`;
        this.screenCoordsDom.innerText = mouse.x + "  " + mouse.y;
      }
      
      mmm.detail.value = {mouse: mouse, normalizedUV: normalizedCoordsUV, normalized: this.normalized };
      // debugger
      // dispatchEvent(mmm);
      evt.target.dispatchEvent(mmm);
    }
    
    
    updateNormaliedToUV(mouse){
      
      var normalizedCoordsUV = this.normalizedCoordsUV;
      
      normalizedCoordsUV.x = mouse.x / this.canvasSize.width;
      normalizedCoordsUV.y = 1 - ( mouse.y / this.canvasSize.height);
    }
    
    updateNormalied(mouse){
      this.normalized.x = mouse.x / this.canvasSize.width;
      this.normalized.y =  mouse.y / this.canvasSize.height;
    }
    
  }

customElements.define('drrr-joysticky', DRRR_Joysticky);
