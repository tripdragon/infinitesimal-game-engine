
// =P zill wuz here

const LISTENERS_REGISTRAR = document;

const listenersCache = {};

const getRunListenersForEvent = (eventName) => {
  return (...evt) => {
    const config = listenersCache[eventName];
    config.listeners.forEach((listener) => listener(...evt));
  }
}

// This is not a pure function.
// It'll side-effect create a new cache obj and add an event listener to the LISTENERS_REGISTRAR if needed.
const getFromCache = (eventName) => {
  if (!listenersCache[eventName]) {
    listenersCache[eventName] = { handler: getRunListenersForEvent(eventName), listeners: new Map() };
    LISTENERS_REGISTRAR.addEventListener(eventName, listenersCache[eventName].handler);
  }

  return listenersCache[eventName];
}

export function removeListener(eventName, func) {
  const config = getFromCache(eventName);

  config.listeners.delete(func);

  // Clean it uuuuuuuupppppppp
  if (config.listeners.size === 0) {
    LISTENERS_REGISTRAR.removeEventListener(eventName, listenersCache[eventName].handler);
    delete listenersCache[eventName];
  }
}

export function addListener(eventName, func) {

  const config = getFromCache(eventName);
  config.listeners.set(func, func);

  return () => removeListener(eventName, func);
}
