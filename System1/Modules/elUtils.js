
export function setStyles({ element, styles }) {
  Object.entries(styles).forEach(([key, val]) => {
    element.style[key] = val;
  });
}
