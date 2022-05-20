export const once = <T>(fn: (...args: T[]) => void) => {
  let done = false;
  return (...args: T[]) => {
    if (!done) {
      done = true;
      fn(...args);
    }
  };
};
