import { addListener } from './listeners.js';

// TODO add gameController

export function keyboard(config) {
  addListener({ event: 'keydown', func: function(evt) {
    console.log(evt.key);
    if (typeof config[evt.key] === 'function') {
      config[evt.key](evt);
    } else if (typeof config.rest === 'function') {
      config.rest(evt);
    }

    if (typeof config.any === 'function') {
      config.any(evt);
    }
  }});
}
