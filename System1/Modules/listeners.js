
// =P zill wuz here

const LISTENERS_REGISTRAR = document;

const listenersCache = {};

const getRunListenersForEvent = (event) => {
  return (...evt) => {
    const config = listenersCache[event];
    config.listeners.forEach((listener) => listener(...evt));
  }
}

// This is not a pure function.
// It'll side-effect create a new cache obj and add an event listener to the LISTENERS_REGISTRAR if needed.
const getFromCache = (event) => {
  if (!listenersCache[event]) {
    listenersCache[event] = { handler: getRunListenersForEvent(event), listeners: new Map() };
    LISTENERS_REGISTRAR.addEventListener(event, listenersCache[event].handler);
  }

  return listenersCache[event];
}

export function removeListener(event, func) {
  const config = getFromCache(event);

  config.listeners.delete(func);

  // Clean it uuuuuuuupppppppp
  if (config.listeners.size === 0) {
    LISTENERS_REGISTRAR.removeEventListener(event, listenersCache[event].handler);
    delete listenersCache[event];
  }
}

export function addListener({ event, func }) {

  const config = getFromCache(event);
  config.listeners.set(func, func);

  return () => removeListener(event, func);
}
