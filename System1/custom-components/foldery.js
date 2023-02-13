
class DRRR_Foldery extends HTMLElement {
  constructor() {
    super();

    const template = document.createElement('template');
    template.innerHTML = `
        <style>
          div {
            color: white;
            background-color: #333;
            zzzpadding: 15px;
            zzzmargin-bottom: 12px;
          }
          /* Style the button that is used to open and close the collapsible content */
          #collapsible {
            background-color: #000;
            color: #fff;
            cursor: pointer;
            padding: 8px 4px;
            width: 100%;
            border: none;
            text-align: left;
            outline: none;
            font-size: 15px;
            display: block;
          }

          /* Add a background color to the button if it is clicked on (add the .active class with JS), and when you move the mouse over it (hover) */
          .active, #collapsible:hover {
            background-color: #444;
          }

          /* Style the collapsible content. Note: hidden by default */
          #content {
            padding: 0 0px;
            display: block;
            overflow: hidden;
            zzzcolor: #fff;
            zzzbackground-color: #f1f1f1;
            zzzbackground-color: #aaa;
          }
        </style>
        <li>
          <button type="button" class="active" id="collapsible"><span id="icon">↧</span> <slot name="label">naaame</slot></button>
          <div id="content" style="display:block;">
            <slot name="content">kdmfs</slot>
          </div>
        </li>
    `;

    
    //const template = document.getElementById('derp-moxy');
    const templateContent = template.content;

    this.attachShadow({mode: 'open'}).appendChild(
      templateContent.cloneNode(true)
    );
    
    
        // debugger
    var button = this.shadowRoot.getElementById("collapsible");
    var content = this.shadowRoot.getElementById("content");
    var icon = this.shadowRoot.getElementById("icon");
          // var bb = this.shadowRoot.getElementById('filepicker');

    button.addEventListener("click", function() {
        this.classList.toggle("active");
        if (content.style.display === "block") {
          content.style.display = "none";
          icon.innerText = "↦";
        } else {
          content.style.display = "block";
          icon.innerText = "↧";
        }
    });
            

  }
}


// const slottedSpan = document.querySelector('derp-moxy span');

// console.log(slottedSpan.assignedSlot);
// console.log(slottedSpan.slot);

customElements.define('drrr-foldery', DRRR_Foldery);
