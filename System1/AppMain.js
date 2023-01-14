import { Basestation } from './Core/System1.js';
import { WordsAdder } from './Plugins/wordsAdder.js';

export default function AppMain() {
  APPPP = new Basestation("canvassss");
  // APPPP.bootUp_CM();

  // words module lv 1
  const words = document.createElement('div');
  const injectionPoint = document.getElementById("bodyInjectionPointMain");
  injectionPoint.appendChild(words);

  // Init words with an element
  APPPP.words1 = new WordsAdder(words);

  console.log('APPPP');
}
