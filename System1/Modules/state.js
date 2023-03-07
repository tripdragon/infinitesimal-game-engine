
const STATE_TYPES = {
  MEMORY: true,
  LOCAL_STORAGE: true,
  ROOM: true,
  PERSISTED: true
};

// const _

export function getState({ key, type }) {

  if (!STATE_TYPES[type]) {
    throw new Error(`Unsupported type "${type}"`);
  }

  switch (type) {
    // case STATE_TYPES.
  }

  return {};
}
