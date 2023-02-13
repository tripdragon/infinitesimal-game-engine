

/*

  just some styles over a checked value

*/

  class DRRR_Toggley extends HTMLElement {
    //constructor(label = "laabel", min = 0, max = 1.0, val = 0.5, step = 0.01) {
    constructor(label = "name like") {
      super();
      
      
      if(this.getAttribute("label")){
        label = this.getAttribute("label");
      }
      
      const template = document.createElement('template');
      template.innerHTML = `
          <style>
            div {
              color: white;
              ___background-color: #212121;
              padding: 4px 0px;
              margin-bottom: 0px;
            }
            label{
              display:block;
              font-size: 0.9em;
            }
            /* The switch - the box around the slider */
            .switch {
              position: relative;
              display: inline-block;
              width: 52px;
              height: 24px;
            }

            /* Hide default HTML checkbox */
            .switch input {
              opacity: 0;
              width: 0;
              height: 0;
            }

            /* The slider */
            .slider {
              position: absolute;
              cursor: pointer;
              top: 0;
              left: 0;
              right: 0;
              bottom: 0;
              background-color: #ccc;
              -webkit-transition: .1s;
              transition: .1s;
            }

            .slider:before {
              position: absolute;
              content: "";
              height: 16px;
              width: 16px;
              left: 4px;
              bottom: 4px;
              background-color: white;
              -webkit-transition: .1s;
              transition: .1s;
            }

            input:checked + .slider {
              background-color: #2196F3;
            }

            input:focus + .slider {
              box-shadow: 0 0 1px #2196F3;
            }

            input:checked + .slider:before {
              -webkit-transform: translateX(26px);
              -ms-transform: translateX(26px);
              transform: translateX(26px);
            }

            /* Rounded sliders */
            .slider.round {
              border-radius: 34px;
            }

            .slider.round:before {
              border-radius: 50%;
            }
          </style>
          
          <div>
          <label for="volume">${label}</label>
          <label class="switch">
            <input id="checkbox" type="checkbox">
            <span class="slider"></span>
          </label>
          </div>
      `;
      
      const templateContent = template.content;

      this.attachShadow({mode: 'open'}).appendChild(
        templateContent.cloneNode(true)
      );
      
          
      var mmm = new CustomEvent("toggleChanged", {
         bubbles: true,
         cancelable: true,
         composed: true,
         detail : {value: -1}
       });

      var checkbox = this.shadowRoot.querySelector("#checkbox");
      
      checkbox.addEventListener("change", function (ev) {
        //console.log(this.checked);
        mmm.detail.value = this.checked;
        this.dispatchEvent(mmm);
      });

  }
    
      
}
  

customElements.define('drrr-toggley', DRRR_Toggley);
