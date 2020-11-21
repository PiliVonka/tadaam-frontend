import { createMuiTheme, colors } from "@material-ui/core";
import shadows from "./shadows";
import typography from "./typography";

const theme = createMuiTheme({
  palette: {
    background: {
      dark: colors.common.white,
      default: colors.common.white,
      paper: colors.indigo[50]
    },
    primary: {
      main: colors.indigo[800]
    },
    secondary: {
      main: "#230505"
    },
    text: {
      primary: "#BB2B2B",
      secondary: colors.common.black
    }
  },
  shadows,
  typography
});

export default theme;
