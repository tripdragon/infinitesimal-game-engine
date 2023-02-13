

/*

at some point this should be a HSL HSV type of color picker
for now its a basic rgba html input picker


blegh, the picker in chrome does not have copy and paste support...

*/


  class DRRR_ColorSpinny extends HTMLElement {
    constructor(label = "Color piiicker", color="#ffffff") {
    
      super();
      
      if(this.getAttribute("label")){
        label = this.getAttribute("label");
      }
      if(this.getAttribute("color")){
        color = this.getAttribute("color");
      }

      const template = document.createElement('template');
      template.innerHTML = `
          <style>
            #wrapper {
              color: white;
              background-color: #212121;
              padding: 4px 10px;
              margin-bottom: 0px;
            }
            ___label{
              display:block;
              font-size: 0.9em;
            }
            input {
                margin: .4rem;
            }

            
          </style>
          <div id="wrapper" part="wrapper">
            <input type="color" id="picker" name="picker" value=${color}>
            <label for="picker">${label}</label>
          </div>
      `;
      

      

      var mmm = new CustomEvent("color-changed", {
         bubbles: true,
         cancelable: true,
         composed: true,
         detail : {value: -1}
       });
      
      const templateContent = template.content;

      this.attachShadow({mode: 'open'}).appendChild(
        templateContent.cloneNode(true)
      );
      
      var picker = this.shadowRoot.querySelector("#picker");
      
      
      // this feeels like the wrong way to do this sending data out
      picker.addEventListener("input", function (ev) {
        // debugger
        // value is hex color string
        this.value = ev.target.value;

        mmm.detail.value = ev.target.value;
        this.dispatchEvent(mmm);
      });
      
      

      
    }
  }

customElements.define('drrr-colorspinny', DRRR_ColorSpinny);
