

/*

changed the instancer to polute the global vars for now since making web compoents
by nature does that, but we needed the constructor to take arguments
to assign data at start

testing a named spaced set of names
DRRR_Slide something short

alright it was fun , but theres a lot of boilier plate needed
do to do basic things, time to find a basic libarary


base = document.querySelector('#toolz')

folder = document.createElement('li')
folder.setAttribute('class', 'wrapperIiiin')

gg = new DRRR_Slidey("foooo", 0.2, 19, 4.2874, 0.1)
//gg = new SlidySlide("foooo", 0.2, 19, 4.2874, 0.1)

folder.append(gg)

base.append(folder)


gg.addEventListener('party', function(ev){
  //SUPA.moofs = ev.detail.value;
  //updateDats()
  camera.setZoom(ev.detail.value);
  
  SUPA.moofs = ev.detail.value;
  updateDats()
  
})


*/

// exposes @val : number
// @min @max
// The out data is in the event , eg: ev.detail.value


// customElements.define('drrr-slidey',
  // class extends HTMLElement {
  class DRRR_Slidey extends HTMLElement {
    constructor(label = "laabel", min = 0, max = 1.0, val = 0.5, step = 0.01) {
    // constructor() {
      super();
      
      // if(this.getAttribute("label")){
      //   label = this.getAttribute("label");
      // }
      
      
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
            #wrapper {
              color: white;
              background-color: #212121;
              padding: 4px 10px;
              margin-bottom: 0px;
            }
            label{
              display:block;
              font-size: 0.9em;
            }
            #giraffes {
            max-width: 40px;
            }
            input,
            output {
              display: inline-block;
              vertical-align: middle;
              font-size: 1em;
              font-family: Arial, sans-serif;
            }

            output {
              background: #ff4500;
              padding: 5px 16px;
              border-radius: 3px;
              color: #fff;
            }
            input[type="range"] {
              -webkit-appearance: none;
              margin-right: 15px;
              zzwidth: 200px;
              height: 20px;
              background: rgba(255, 255, 255, 0.6);
              border-radius: 5px;
              background-image: linear-gradient(#fff, #fff);
              background-size: 70% 100%;
              background-repeat: no-repeat;
            }
            /* Input Thumb */
            input[type="range"]::-webkit-slider-thumb {
              -webkit-appearance: none;
              height: 20px;
              width: 4px;
              zborder-radius: 50%;
              background: #ffa8d4;
              cursor: ew-resize;
              zzzbox-shadow: 0 0 2px 0 #555;
              zzztransition: background .3s ease-in-out;
            }

            input[type="range"]::-moz-range-thumb {
              -webkit-appearance: none;
              height: 20px;
              width: 4px;
              zborder-radius: 50%;
              background: #ffa8d4;
              cursor: ew-resize;
              zzzbox-shadow: 0 0 2px 0 #555;
              zzztransition: background .3s ease-in-out;
            }
          </style>
          <div id="wrapper" part="wrapper">
            <label for="volume">${label}</label>
            <input type="range" id="volume" name="volume" min=${min} max=${max} step=${step} />
            <input
              type="number"
              id="giraffes"
              name="giraffes"
              min=${min} max=${max} step=${step}
            />
          </div>
      `;
      
      // get value() {
      //   //return this.value;
      //   var input = this.shadowRoot.querySelector("#giraffes");
      //   input.setAttribute('value', val);
      // }
      // set value(val){
      //   this.value = val;
      //   var input = this.shadowRoot.querySelector("#giraffes");
      //   input.setAttribute('value', val);
      //   var input = this.shadowRoot.querySelector("#volume");
      //   input.setAttribute('value', val);
      // }
      // 
      // get min() {
      //   return this.value;
      // }
      // set value(val){
      //   this.value = val;
      //   var input = this.shadowRoot.querySelector("#giraffes");
      //   input.setAttribute('value', val);
      //   var input = this.shadowRoot.querySelector("#volume");
      //   input.setAttribute('value', val);
      // }
      

      //var mmm = new CustomEvent("party", {
      var mmm = new CustomEvent("slideyMoved", {
         bubbles: true,
         cancelable: true,
         composed: true,
         detail : {value: -1}
       });
      
      const templateContent = template.content;

      this.attachShadow({mode: 'open'}).appendChild(
        templateContent.cloneNode(true)
      );
      
      val = Math.max(min,Math.min(val, max));
      var volume = this.shadowRoot.querySelector("#volume");
      volume.value = val;
      
      var giraffes = this.shadowRoot.querySelector("#giraffes");
      giraffes.value = val;
      


      volume.style.backgroundSize = (volume.value - volume.min) * 100 / (volume.max - volume.min) + '% 100%'

      
      //debugger
      // var ww = document.querySelector("#volume")
      // console.log(ww)
      // ww.addEventListener('change', function(){
      //   console.log("sdf ds")
      //   console.log(ev.target.value)
      // })
      
      
      // this feeels like the wrong way to do this sending data out
      this.shadowRoot.addEventListener("input", function (ev) {
        //console.log(ev.target.value)
        //console.log(giraffes)
        giraffes.value = ev.target.value;
        volume.value = ev.target.value;
        
        
        // css update
        volume.style.backgroundSize = (volume.value - volume.min) * 100 / (volume.max - volume.min) + '% 100%'

        
        this.value = ev.target.value;

        //this.dispatchEvent(this.evev);
        
        // initially the value is a string, gltf export gives it an error if its not a number
        mmm.detail.value = +ev.target.value;
        
        // console.log("mmm.detail.value", mmm.detail.value)
        this.dispatchEvent(mmm);
      });
      
      

      
    }
  }
// );
customElements.define('drrr-slidey', DRRR_Slidey);
