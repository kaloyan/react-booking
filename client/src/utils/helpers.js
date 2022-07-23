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
