// this is a BASIC idea
// each game would have some different form
// a great place for Composition maybe

import { keyboard } from '../Modules/input.js';
import { setStyles } from '../Modules/elUtils.js';
import { bind } from '../Modules/classUtils.js';

const CURSOR_BLINK = 1000;
const SPACE = '\u00A0';
const IGNORE_KEYS = {
  Meta: true,
  Shift: true,
  Alt: true,
  CapsLock: true,
  ArrowRight: true,
  ArrowLeft: true,
  ArrowUp: true,
  ArrowDown: true
};

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

  // pattern is before getting text, remove the last most char which is _
  // add new char, then add _ back on
  // regex is a bad idea cause we would liek to use _ in text
  _renderWords(text) {
    this.lastRender = Date.now();
    this.element.innerText = this._manageCursor(text);
  }

  _text() {
    return this.element.innerText;
  }

  _wrapForKeydown(func) {
    return (evt) => {
      if (evt.type === 'keydown') {
        func(evt);
      }
    }
  }

  _wrapKeysForKeydown(obj) {
    return Object.entries(obj).reduce((obj, [key, val]) => {

      return {
        ...obj,
        [key]: this._wrapForKeydown(val)
      };
    })
  }

  constructor(element) {

    const { _renderWords, _text } = bind(this, { _renderWords: this._renderWords, _text: this._text });

    this.element = element;
    this._setStyles(this.element);

    keyboard(this._wrapKeysForKeydown({
      Backspace: () => {
        // text = "";
        console.log("Backspace 2222");
        var tt = _renderWords(_text().slice(0, -1));
        // console.log("tt ", tt); // tt undefined
      },
      Enter: () => {
        // text = text+"\n";
        console.log("¿¿ enter 222 ¿¿");
        _renderWords(`${_text()}
`);// why u be trailing left flush??? // My zude I thought this was more accurate and we can manage indentation later
      },
      " ": () => {
        _renderWords(_text() + SPACE);
        // _renderWords(_text() + '&nbsp');
        console.log("Spaces 222¿¿");
      },
      rest: (evt) => {
        if (!IGNORE_KEYS[evt.key]) {
          _renderWords(_text() + evt.key);
        }
      }
    }));
  }
}
