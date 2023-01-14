



export class WordsAdder{
  
  element;
  lv = 1;
  
  constructor(element){
    
    this.element = element;
    
    let words = this.element;
    
    // cheap cursor
    let text = words.innerText;
    text += "_";
    words.innerText = text;
    
    document.addEventListener('keydown', function(ev) {
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
      
      // cheap cursor
      text += "_";
      //words.innerHTML = text;
      words.innerText = text;
      
      
    });
  }
  
  
  
}
