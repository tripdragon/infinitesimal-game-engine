import { keyboard } from '../Modules/input.js';
import { setStyles } from '../Modules/elUtils.js';
import { bind } from '../Modules/classUtils.js';

const CURSOR_BLINK = 1000;
const SPACE = '\u00A0';

export class WordsAdder {

  element;
  lv = 1;

  _setStyles(element) {
    setStyles({ element, styles: {
      fontFamily: "Roboto",
      position: "absolute",
      top: 0,
      right: 0,
      padding: "20px",
      maxWidth: "700px",
      color: "white",
      fontSize: "24px",
      fontStyle: "normal",
      overflow: "scroll"
    } });
  }

  _manageCursor = (text) => {
    text = String(text).replaceAll(/$\s|_/g, '');
    return text + "_";
  }

  _renderWords(text) {
    this.lastRender = Date.now();
    this.element.innerText = this._manageCursor(text);
  }

  _text() {
    return this.element.innerText;
  }

  constructor(element) {

    const { _renderWords, _text } = bind(this, { _renderWords: this._renderWords, _text: this._text });

    this.element = element;
    this._setStyles(this.element);

    keyboard({
      Backspace: () => {
        // text = "";
        console.log("Backspace 2222");
        _renderWords(_text().slice(0, -1));
      },
      Enter: () => {
        // text = text+"\n";
        console.log("¿¿ enter 222 ¿¿");
        _renderWords(`${_text()}
`);
      },
      " ": () => {
        _renderWords(_text() + SPACE);
        // _renderWords(_text() + '&nbsp');
        console.log("Spaces 222¿¿");
      },
      rest: (evt) => {
        _renderWords(_text() + evt.key);
      }
    });
  }
}
