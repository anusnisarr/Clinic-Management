// utils/authBridge.js
let setUnauthorizedRef = null;

export const registerUnauthorizedSetter = (setter) => {
  setUnauthorizedRef = setter;
};

export const triggerUnauthorized = () => {
  if (setUnauthorizedRef) {
    setUnauthorizedRef(true);
  }
};
