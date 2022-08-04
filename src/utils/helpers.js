// Helper functions

export const extractImageName = (path) => {
  let result = null;

  try {
    result = path.split("%2F")[2].split("?")[0];
  } catch (err) {
    result = null;
  }

  // if cant find filename - return original path
  return result || path;
};

export const createBlobImage = (image) => {
  return window.URL.createObjectURL(image);
};

export const storageTool = {
  get: (key) => {
    const value = localStorage.getItem(key);

    if (value) {
      return JSON.parse(value);
    } else {
      return false;
    }
  },

  set: (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
  },

  remove: (key) => {
    localStorage.removeItem(key);
    return true;
  },
};
