export const VALIDATION_ERRORS = {
  LENGTH_OUT_OF_BOUNDS: (min, max) => {
    return `Input must be between ${min} and ${max} characters`;
  }
};