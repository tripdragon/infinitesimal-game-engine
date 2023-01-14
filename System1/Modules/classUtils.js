export function bind(thiss, { ...funcs }) {
  return Object.entries(funcs).reduce((obj, [key, val]) => {

    return {
      ...obj,
      [key]: val.bind(thiss)
    }
  }, {});
}
