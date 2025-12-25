
let navigateFunc = null;

export const setNavigate = (nav) => {
  navigateFunc = nav;
};

export const navigate = (path, state = {}) => {
  if (navigateFunc) {
    navigateFunc(path, { state });
  } else {
    console.warn("Navigate function is not initialized yet.");
  }
};