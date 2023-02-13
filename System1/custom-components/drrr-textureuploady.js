// http://wtfforms.com/
  class DRRR_TextureUploady extends HTMLElement {
    constructor(image) {
      super();

      
      // send this in an event
      this.material = null;
      
      const template = document.createElement('template');
      template.innerHTML = `
          <style>
            #wrapper {
              color: white;
              background-color: #666;
              padding: 15px;
              margin-bottom: 12px;
            }
            img {
              max-width: 100px;
              width: auto;
              max-height: 100px;
              zzztransform: scale(0.5)
            }
            #image-container {
              ___display: grid | inline-grid;
              display: grid;
              grid-template-columns: repeat(2, 1fr);
              grid-template-rows: 1fr;
              grid-column-gap: 0px;
              grid-row-gap: 0px;
            }

            #filepicker {
              width: 0.1px;
              height: 0.1px;
              opacity: 0;
              overflow: hidden;
              position: absolute;
              z-index: -1;
            }

            #filepicker + label {
                font-size: 1.25em;
                font-weight: 700;
                color: #1c1c1c;
                background-color: #d9d9d9;
                display: inline-block;
                padding: 8px;
                margin: 0 0 4px 0;
            }

            #filepicker:focus + label,
            #filepicker + label:hover {
                background-color: #1c1c1c;
                color: white;
            }

            #filepicker + label {
              cursor: pointer; /* "hand" cursor */
            }
            
            #mockuv {
              background-color: orange;
              max-width: 100px;
              width: auto;
              max-height: 100px;
            }
            #imageSlider{
              background-color: white !important;
            }

          </style>

          <div id="wrapper">
            <drrr-toggley id="mode-toggle" label="mode swap" ></drrr-toggley>
            
            <input type="file" name="file" id="filepicker" accept=".hdr,.jpg,.png"/>
            <label for="filepicker">Choose a texturey</label>

            <div id="image-container">
              <img id="display" />
              <drrr-joysticky id="joystick"></drrr-joysticky>
            </div>
            
            
            <canvas id="mockuv"></canvas>
            
          </div>
      `;
      
//       get image() {
//         return this.shadowRoot.getElementById('display');
//       }
      
//       // not sure about just setting the src
//       set image(val) {
//         var yy = this.shadowRoot.getElementById('display');
//         yy.src = val;
//       }
      
      var _this = this;
      
      //const template = document.getElementById('derp-moxy');
      const templateContent = template.content;

      this.attachShadow({mode: 'open'}).appendChild(
        templateContent.cloneNode(true)
      );
      
      
      var mmm = new CustomEvent("texture-uploady-ed", {
        bubbles: true,
        cancelable: true,
        composed: true,
        detail : {value: -1}
      });
      
      
      var wrapper = this.shadowRoot.getElementById('wrapper');
      
      var filepicker = this.shadowRoot.getElementById('filepicker');
      
      var displayImage = this.shadowRoot.getElementById('display');
      
      this.filepicker = filepicker;
      this.displayImage = displayImage;
      
      var canvasUpdatedEventInner = new CustomEvent("canvasUpdatedEventInner", {
        bubbles: true,
        cancelable: true,
        composed: true,
        detail : {value: -1}
      });
      var canvasUpdatedEvent = new CustomEvent("canvas-updated", {
        bubbles: true,
        cancelable: true,
        composed: true,
        detail : {value: -1}
      });
      
            
      var normalizedPosition = {x:0,y:0};
      var deltaPos = {x:0, y:0};
      var scalar = 1.0;
      // need images size
      //var scaledSize = {width: 600*scalar, height: 333*scalar};
      var loadedImageSize = {width: 1*scalar, height: 1*scalar};
      var scaledSize = {width: 1*scalar, height: 1*scalar};

      // var shadowDommm = this.shadowRoot;
      
      
      filepicker.addEventListener("change", function (ev) {
        
          // ev.preventDefault();
        
          mmm.detail.value = ev.target.files[0];
          console.log("fiiiifle");
          console.log(ev.target.value);
          
          var that = this;
        
        
          //const preview = document.querySelector('#display');
          //const file = document.querySelector('input[type=file]').files[0];
          var file = mmm.detail.value
          const reader = new FileReader(ev);

          reader.addEventListener("load", function () {
            // convert image file to base64 string
            displayImage.src = reader.result;
            
            
            // tempImage.src = displayImage.src;
            

            // Add canvas updater here
            // its moved to tempImage load event
//             tempImage.onload = function(ev) {
//               // access image size here 
//               // console.log(this.width);
//               // console.log(this.height);
//               loadedImageSize.width = this.width;
//               loadedImageSize.height = this.height;

//               restartCanvasImage();
//               debugger
//               canvasUpdatedEvent.detail.value = {canvas : canvas};
//               this.dispatchEvent(canvasUpdatedEvent);
//             };
            var loadImage = (url) => new Promise((resolve, reject) => {
              var img = new Image();
              img.addEventListener('load', () => resolve(img));
              img.addEventListener('error', (err) => reject(err));
              img.src = url;
                // tempImage.src = url;
                // tempImage.src = displayImage.src;
            });

            // loadImage("example.com/house.jpg")
            loadImage(displayImage.src)
              .then(img => {
              
                console.log(`w: ${img.width} | h: ${img.height}`);
                loadedImageSize.width = img.width;
                loadedImageSize.height = img.height;

                restartCanvasImage();
              
                canvasUpdatedEvent.detail.value = {canvas : canvas};
                that.dispatchEvent(canvasUpdatedEvent);

              })
              .catch(err => console.error(err));

            
            // readFile(this, "second");

            that.dispatchEvent(mmm);
            
          }, false);

          if (file) {
            reader.readAsDataURL(file);
          }
        
      });
      
      
      
      var joystick = this.shadowRoot.getElementById('joystick');
      joystick.style.display = 'none';
      
      var modetoggle = this.shadowRoot.getElementById('mode-toggle');
      
      modetoggle.addEventListener('toggleChanged', function(ev){
        //console.log("toggle " + ev.detail.value);
        if(ev.detail.value){
          joystick.style.display = 'block';
        }
        else {
          joystick.style.display = 'none';
        }
        
      }, false);
      
      
      
      
      /*
      The idea here for canvas
      we need transparent padding around an uploaded image
      so we use a large offscreen canvas to render the image into and offset and scale
      via the joystick
      
      any other views are previews either in another canvas or an img
      we could just css shrink the large canvas image as the preview cause
      we dont have to render in a loop just when transfoming
      */
      

      
      const canvas = this.shadowRoot.getElementById('mockuv');
      var imageCanvasSize = {width:2048, height: 2048}; // well try a hard limit of 2048
      canvas.width = imageCanvasSize.width;
      canvas.height = imageCanvasSize.height;
      // canvas.style.display = 'none';
      
      var maxScale = 8; // this needs to be computed later
      var imageSlider = new DRRR_Slidey("image scalar", 0.1, maxScale, 0.5, 0.01)
      wrapper.append(imageSlider)
      imageSlider.id = "imageSlider";
      
      imageSlider.addEventListener('slideyMoved', function(ev){

        updateScaleSize(ev.detail.value);
        // need to update this setter but its 
        redrawImage({x: imageCanvasSize.width * normalizedPosition.x, y: imageCanvasSize.height * normalizedPosition.y },
                   displayImage);

        // redrawImage(normalizedPosition);
        // exportCanvasToImg(window.imageFoo);
        
                        canvasUpdatedEvent.detail.value = {canvas : canvas};
                // that.parentElement.dispatchEvent(canvasUpdatedEvent);
                this.dispatchEvent(canvasUpdatedEvent);
        
      });
      

      
      // this lets us read the uploaded images sizes
//       var tempImage2 = new Image();
//       tempImage2.onload = function() {
//         // access image size here 
//         // console.log(this.width);
//         // console.log(this.height);
//         loadedImageSize.width = this.width;
//         loadedImageSize.height = this.height;
        
//         restartCanvasImage();
//         debugger
//         canvasUpdatedEvent.detail.value = {canvas : canvas};
//         this.dispatchEvent(canvasUpdatedEvent);
//       };
      
      const ctx = canvas.getContext('2d');
      // source image #displayImage
      //const image = document.getElementById('source');
      // image.crossOrigin = 'Anonymous';
      //displayImage.src
      
      function updateScaleSize(_s){
        scalar = _s;
        scaledSize = {width: loadedImageSize.width*scalar, height: loadedImageSize.height*scalar};
      }
      
       
      // needs to be on a class
      // pos here is canvas pixels coords???? not normalized, need that next
      function redrawImage(pos, image){
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        deltaPos.x = pos.x - (scaledSize.width/2);
        deltaPos.y = pos.y - (scaledSize.height/2);
        // debugger
        ctx.drawImage(image, 0, 0, loadedImageSize.width, loadedImageSize.height, deltaPos.x, deltaPos.y, scaledSize.width, scaledSize.height);
        // debugger
        // this.dispatchEvent(canvasUpdatedEvent);
      }
      
      
      function restartCanvasImage(){
        normalizedPosition.x = 0.5;
        normalizedPosition.y = 0.5;
        updateScaleSize(scalar);
        // debugger
        redrawImage({x: imageCanvasSize.width * normalizedPosition.x, y: imageCanvasSize.height * normalizedPosition.y },
                   displayImage);
      }
      
      
      // this comes from the joystick
      this.shadowRoot.addEventListener('joystickUpdate', function(ev){
        ev.preventDefault();
        // console.log("---------");
        // console.log(ev.detail.value.mouse);
        // console.log(ev.detail.value.normalizedUV);
        // console.log(ev.detail.value.normalized);
        var pos = ev.detail.value.normalized;
        // (scaledSize.width/2)
        // ctx.clearRect(0, 0, canvas.width, canvas.height);
        // console.log("new x : " + imageCanvasSize.width * pos.x);
        normalizedPosition.x = pos.x;
        normalizedPosition.y = pos.y;
        redrawImage({x: imageCanvasSize.width * pos.x, y: imageCanvasSize.height * pos.y }, displayImage);
        //exportCanvasToImg(window.imageFoo);
        

                canvasUpdatedEvent.detail.value = {canvas : canvas};
                // that.parentElement.dispatchEvent(canvasUpdatedEvent);
                this.dispatchEvent(canvasUpdatedEvent);
        
      });
      

      
    }
  }

customElements.define('drrr-textureuploady', DRRR_TextureUploady);
















// function sjdfisdhfisDFHDf(){
//         // need to handle the file input event and compnenet here like
//       var modelUploader = document.querySelector('#modelUploader');
//       modelUploader.addEventListener("party", function (ev) {
//         // debugger
//         console.log(ev.detail.value);
//         if (ev.detail.value !== undefined) {
//           //reupload(ev.detail.value, window.world);
//           //reuploadViaLoaderManager(ev.detail.value, window.world);
//           reuploadViaConvertToURl(ev.detail.value, window.world)
//         }
        
//       });
//       // 
      
// }

/*

      
      var textureUplaodoeorir = document.querySelector('#IUSDHFUDf');
      
      textureUplaodoeorir.addEventListener("texture-uploady-ed", function (ev) {
        console.log(ev.detail.value);
        if (ev.detail.value !== undefined) {
          
          var urlll = URL.createObjectURL(ev.detail.value);
          
          const texture = new THREE.TextureLoader().load( urlll,
            function(texture){
              //(texture.encoding = 3001
              
              modelObject.traverse(node => {
                if(node.type === "Mesh"){

                    // remove orignal texture
                    node.material.map = texture
                    node.material.needsUpdate = true;

                }

              });


            }

          ); 
        }
      });
      
      
      
      or
      
      var textureUplaodoeorir = document.querySelector('#IUSDHFUDf');
      
      textureUplaodoeorir.addEventListener("texture-uploady-ed", function (ev) {
        console.log(ev.detail.value);
        textureSwap(modelObject, ev.detail.value);
      });
      

*/
