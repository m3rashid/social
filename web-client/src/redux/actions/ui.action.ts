import { NARROW, WIDE, LIGHT_MODE, DARK_MODE } from "../constants";

export const makeNarrow = () => {
  return {
    type: NARROW,
  };
};

export const makeWide = () => {
  return {
    type: WIDE,
  };
};

export const darkMode = () => {
  return {
    type: DARK_MODE,
  };
};

export const lightMode = () => {
  return {
    type: LIGHT_MODE,
  };
};
