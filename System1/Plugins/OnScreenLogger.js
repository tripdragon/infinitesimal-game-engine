
/*
OnScreenLogger

provides an onscreen debugger console
with the same interface as console.log();

onConsole.log();


var onConsole = new OnScreenLogger();
window.onConsole;

var updateInterval = 1;

var ii = 0;
var intervalID = setInterval( () =>{
  onConsole.log("fish", Date.now());
  onConsole.log("narfs", Date.now()+ 234896, "moof", "fipot");
}, updateInterval);


*/


import { Vector3 } from "../Modules/Vector3.js";
import { Vector2 } from "../Modules/Vector2.js";

export class OnScreenLogger{

  items = {};
  
  constructor(){
    this.logger = document.createElement("div");
    document.body.appendChild(this.logger);
    var st = this.logger.style;
    st.id = "logger";
    st.position = "absolute";
    st.zIndex = "100";
    st.right = "0";
    st.top = "0";
    st.padding = "10px";
    st.color = "#ffffff";
    st.fontSize = "14px";
    st.maxWidth = "500px";
    
    // var text1 = document.createElement("p");
    // onLog.appendChild(text1);
    // text1.innerText = "ldkmfgdfg";

    
  }
  
  createItem(name){
    var text1 = document.createElement("p");
    text1.id = name;
    this.logger.appendChild(text1);
    text1.innerText = "??";
  
    return {
      name : name,
      text : text1,
      messages : []
    }
  }
  
  // called like traditional console.log()
  log(name, ...vals){

    if (this.items[name] === undefined) {
      this.items[name] = this.createItem(name);
    }
    
    this.items[name].messages = vals;
    
    var tt = ""
    for (const item of vals) {
      tt += item + ", ";
    }
    tt = tt.substring(0, tt.length - 2);
    
    this.items[name].text.innerText = name + " : " + tt;
    
  }
  
  wrapLog(name, wobject){
    setInterval( () =>{
      this.log(name, wobject );

    }, 2)
  }


}
