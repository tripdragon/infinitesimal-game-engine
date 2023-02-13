customElements.define('derp-moxy',
  class extends HTMLElement {
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
          <div><slot name="ma-text">kdmfs</slot></div>
      `;
      
      //const template = document.getElementById('derp-moxy');
      const templateContent = template.content;

      this.attachShadow({mode: 'open'}).appendChild(
        templateContent.cloneNode(true)
      );
      
    }
  }
);

// const slottedSpan = document.querySelector('derp-moxy span');

// console.log(slottedSpan.assignedSlot);
// console.log(slottedSpan.slot);

// window.customElements.define('search-result', SearchResult);
