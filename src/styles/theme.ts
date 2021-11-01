import merge from "lodash/merge";
import { defaultTheme } from "react-admin";

export const theme = merge({}, defaultTheme, {
  palette: {
    primary: {
      main: "#3da6c7",
    },
  },
  typography: {
    fontFamily: "lato, sans-serif",
  },
});
