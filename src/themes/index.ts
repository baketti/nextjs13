import { createTheme, responsiveFontSizes } from "@mui/material";

export default responsiveFontSizes(
  createTheme({
    palette: {
      primary: {
        main: "#71B9DA",
      },
      secondary: {
        main: "#f00",
      },
    },
  }),
);
