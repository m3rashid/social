import { NARROW, WIDE, LIGHT_MODE, DARK_MODE } from "../constants";

// TODO add hex values of colors also in both
const dark = {
  name: "dark",
  theme: "bg-gray-900",
  theme_bg: "bg-gray-700",
  theme_light: "",
  theme_fg: "",
};

// TODO add some light theme colors
const light = {
  name: "light",
  theme: "bg-red-500",
  theme_bg: "bg-red-100",
  theme_light: "",
  theme_fg: "",
};

const initialState = {
  narrow: window.innerWidth < 768 ? true : false,
  theme: dark,
};

const UiReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case NARROW:
      return {
        ...state,
        narrow: true,
      };

    case WIDE:
      return {
        ...state,
        narrow: false,
      };

    case DARK_MODE:
      return {
        ...state,
        theme: dark,
      };

    case LIGHT_MODE:
      return {
        ...state,
        theme: light,
      };

    default:
      return state;
  }
};

export default UiReducer;
