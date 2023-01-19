import { addListener } from './listeners.js';

// TODO 
// add debug arg

/*
docs:

// keyboard @arg takes an object{}
// can supply object outside of function call

var gg = {}

keyboard(gg)

// typical fun use

keyboard({
  // space
  " _down" : (ev) => {
    // make a ton!!!
    for (var i = 0; i < 20; i++) {
      addHipToBeSquare();
    }
  },
  // even numbers!!
  1 : (ev) => {
    player.setScaletemp(0.1);
  },
  
  // you can have all 3 events, plain _up and _down
  ArrowDown_down: (ev) => {
    arrowsDown.down = true;
  },
  ArrowDown_up: (ev) => {
    arrowsDown.down = true;
  },
  ArrowDown: (ev) => {
    arrowsDown.down = true;
  },

});



*/


// NEEDS: debug for turning on console logs
export function keyboard(config, debug) {
  addListener({ event: 'keydown', func: function(evt) {
    if (typeof config[evt.key] === 'function') {
      config[evt.key](evt);
    } else if (typeof config[`${evt.key}_down`] === 'function') {
      config[`${evt.key}_down`](evt);
    } else if (typeof config.rest === 'function') {
      config.rest(evt);
    }

    if (typeof config.any === 'function') {
      config.any(evt);
    }
    
    if(evt && debug){
      console.log("keyboard ev", evt, evt.key);
    }
  }});

  addListener({ event: 'keyup', func: function(evt) {
    // console.log(evt.key);
    if (typeof config[evt.key] === 'function') {
      config[evt.key](evt);
    } else if (typeof config[`${evt.key}_up`] === 'function') {
      config[`${evt.key}_up`](evt);
    } else if (typeof config.rest === 'function') {
      config.rest(evt);
    }

    if (typeof config.any === 'function') {
      config.any(evt);
    }
  }});
}
