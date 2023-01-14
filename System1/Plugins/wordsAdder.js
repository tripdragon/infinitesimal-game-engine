import { addListener } from '../Modules/listeners.js';
import { setStyles } from '../Modules/elUtils.js';

const _appendCursor = (text) => {
  return text + "_";
}

export class WordsAdder {

  element;
  lv = 1;

  _setStyles(element) {
    setStyles({ element, styles: {
      position: "absolute",
      top: 0,
      right: 0,
      padding: "20px",
      maxWidth: "700px",
      color: "white",
      fontSize: "24px",
      fontStyle: "normal"
    } });
  }

  constructor(element){

    this.element = element;
    this._setStyles(this.element);

    const words = this.element;

    // cheap cursor
    let text = words.innerText;
    text += "_";
    words.innerText = text;

    addListener({ event: 'keydown', func: function(ev) {
      console.log(ev.key);

      //let text = words.innerHTML;
      let text = words.innerText;

      // cheap cursor
      text = text.slice(0, -1);

      if(ev.key === "Backspace"){
        // text = "";
        console.log("Backspace 2222");
        text = text.slice(0, -1);
      }
      else if(ev.key === "Shift"){

      }
      // ??????
      else if(ev.key === "Enter"){
        // text = text+"\n";
        console.log("¿¿ enter 222 ¿¿");
        text = `${text}
        `;
      }
      else if(ev.key === " "){
        text = `${text}\u00A0`;
        // text += '&nbsp';
        console.log("Spaces 222¿¿");
      }
      else {
        //text += ev.key;
        text = `${text}${ev.key}`;
      }

      //words.innerHTML = text;
      words.innerText = _appendCursor(text);
    }});
  }
}
