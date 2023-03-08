// ChatGPT Generated

/*
  This function takes in three arguments:

  func: The function to be throttled.
  wait: The number of milliseconds to throttle the function call.
  options: An optional object that may contain the following properties:
  leading: A boolean that specifies whether the first invocation of the throttled function should occur immediately or after wait milliseconds have elapsed. The default value is true.
  trailing: A boolean that specifies whether the function should be called after the wait period has elapsed. The default value is true.

  The returned function can be called multiple times, but it will only call the original function at most once every wait milliseconds.
  If the leading option is set to false, the first invocation will occur after wait milliseconds have elapsed.
  If the trailing option is set to false, the function will not be called after the wait period has elapsed.
  @ChatGPT
*/

export default function Throttle(func, wait, options) {
  let timeout, context, args, result;
  let previous = 0;
  if (!options) options = {};

  const later = function() {
    previous = options.leading === false ? 0 : Date.now();
    timeout = null;
    result = func.apply(context, args);
    if (!timeout) context = args = null;
  };

  const throttled = function() {
    const now = Date.now();
    if (!previous && options.leading === false) previous = now;
    const remaining = wait - (now - previous);
    context = this;
    args = arguments;
    if (remaining <= 0 || remaining > wait) {
      if (timeout) {
        clearTimeout(timeout);
        timeout = null;
      }
      previous = now;
      result = func.apply(context, args);
      if (!timeout) context = args = null;
    } else if (!timeout && options.trailing !== false) {
      timeout = setTimeout(later, remaining);
    }
    return result;
  };

  throttled.cancel = function() {
    clearTimeout(timeout);
    previous = 0;
    timeout = context = args = null;
  };

  return throttled;
}
