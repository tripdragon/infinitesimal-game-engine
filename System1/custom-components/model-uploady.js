// customElements.define('uploader-yy',
  class DRRR_ModelUploady extends HTMLElement {
    constructor() {
      super();

      const template = document.createElement('template');
      template.innerHTML = `
          <style>
            div {
              color: white;
              background-color: #666;
              padding: 15px;
              margin-bottom: 12px;
            }
          </style>

          <div>
            <label for="avatar"> Upload a 3D Model (.glb/.gltf)</label>
            <input id="filepicker" type="file" id="docpicker" accept=".gltf,.glb" />
          </div>

      `;
      
      //const template = document.getElementById('derp-moxy');
      const templateContent = template.content;

      this.attachShadow({mode: 'open'}).appendChild(
        templateContent.cloneNode(true)
      );
      
      
      var mmm = new CustomEvent("model-uploaded-kinda", {
        bubbles: true,
        cancelable: true,
        composed: true,
        detail : {value: -1}
      });
      
      var bb = this.shadowRoot.getElementById('filepicker');
      
      
      
      // this.shadowRoot.addEventListener("input", function (ev) {
      bb.addEventListener("change", function (ev) {
        // debugger
        mmm.detail.value = ev.target.files[0];
        // mmm.detail.value = ev.target.files;
        console.log("fiiiifle");
        console.log(ev.target.value);
        // readFile(this, "second");
        this.dispatchEvent(mmm);
      });
      
      
    }
  }
// );
customElements.define('drrr-modeluploady', DRRR_ModelUploady);


/*


*/
