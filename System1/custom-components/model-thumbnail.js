

/*

  

*/

  class DRRR_ModelThumbnail extends HTMLElement {
    
    
    
    constructor(label = "name like") {
      super();
      
      // var _that = this;
      
      if(this.getAttribute("label")){
        label = this.getAttribute("label");
      }
      
      const template = document.createElement('template');
      template.innerHTML = `
          <style>
          #wrapper{
            margin-right: 12px;
            padding: 0px;
            width: 100px;
            height: 100px;
            margin: 2px;
            ___background: green;
            overflow: hidden;
            position: relative;
          }
          label {
            display: block;
            color: white;
          }
          
          
          
          #thumbnail {
            background: silver;
            background-position: center;
            width: 100%;
            height: 100%;
            ___height: auto;
            background-repeat: no-repeat;
            ___background-size: 100%;
            background-size: cover;
            ___overflow: hidden;
            position: relative;
            cursor: pointer;
          }
          
          #thumbnail.selected{
            opacity: 1;
          }
          
          #thumbnail.selected:hover {
            opacity: 0.8;
          }
          
          #thumbnail.deselected {
            opacity: 0.5;
          }
          
          #thumbnail.deselected:hover {
            opacity: 1;
          }
          
          #deleteButton {
            position: absolute;
            top: 20px;
            right: 2px;
            width: 20px;
            height: 20px;
            background: black;
            color: white;
            z-index: 1;
            cursor: pointer;
            border: none;
            padding:0;
            border-radius: 50%;
            opacity: 0.4;
          }
          #deleteButton:hover {
            opacity: 1;
          }

            
          </style>
          
          <div id="wrapper">
          
            <label for="title">${label}</label>
            <button id="deleteButton">✕</button>
            <div id="thumbnail" class="selected" style="
              background-image: url('https://cdn.glitch.global/9b3a11e2-87e6-4d3f-9b6d-fc3815fec6d1/woof.jpg?v=1645131589935');
              ">
              
            </div>
          </div>
      `;
      
      // <img style="display:none;" src="" />
      //         <input id="view-toggle" type="checkbox">⽬</input>
      const templateContent = template.content;

      this.attachShadow({mode: 'open'}).appendChild(
        templateContent.cloneNode(true)
      );
      
      // ev.detail.value
      var thumbnailToggle = new CustomEvent("thumbnail-toggle", {
         bubbles: true,
         cancelable: true,
         composed: true,
         detail : {value: -1}
       });
      
      var thumbnailDelete = new CustomEvent("thumbnail-delete", {
         bubbles: true,
         cancelable: true,
         composed: true,
         detail : {value: -1}
       });

      
      
      var thumbnail = this.shadowRoot.querySelector("#thumbnail");
      this.thumbnail = thumbnail;
      
      var isSelected = true;
      
      thumbnail.addEventListener("mousedown", function (ev) {
        //console.log(this.checked);
        
        if(this.classList.contains('selected')){
          this.classList.remove('selected');
          this.classList.add('deselected');
          isSelected = false;
        }
        else{
          this.classList.remove('deselected');
          this.classList.add('selected');
          isSelected = true;
        }
        
        thumbnailToggle.detail.value = isSelected;
        this.dispatchEvent(thumbnailToggle);
      });
      
      
      var deletebutton = this.shadowRoot.querySelector("#deleteButton");
      deletebutton.addEventListener("mousedown", function (ev) {
        
        this.remove();
        thumbnailDelete.detail.value = true;
        this.dispatchEvent(thumbnailDelete);
        
      }.bind(this))
      

  }
    
      
}
  

customElements.define('drrr-modelthumbnail', DRRR_ModelThumbnail);
