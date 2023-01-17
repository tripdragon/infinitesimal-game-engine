import { addListener } from './listeners.js';

// TODO add gameController

/*
docs:

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
