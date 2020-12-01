import { createMuiTheme } from "@material-ui/core/styles";
import purple from "@material-ui/core/colors/purple";
import grey from "@material-ui/core/colors/grey";

const spacing = 8;

// Create a theme instance.
const theme = createMuiTheme({
  palette: {
    primary: {
      main: grey[200],
    },
    secondary: {
      main: purple[700],
    },
  },
  spacing,
  overrides: {
    MuiCard: {
      root: {
        margin: spacing,
      },
    },
    MuiTextField: {
      root: { marginBottom: spacing },
    },
    MuiPaper: {
      root: {
        padding: "16px",
      },
    },
    MuiDialog: {
      root: {
        padding: "0px",
      },
    },
    MuiButton: {
      root: {
        marginBottom: spacing,
      },
    },
    MuiFab: {
      root: {
        position: "absolute",
        bottom: spacing,
        right: spacing,
      },
    },
    MuiTableContainer: {
      root: {
        width: "unset",
      },
    },
  },
  props: {
    MuiTextField: {
      color: "secondary",
      fullWidth: true,
      variant: "outlined",
    },
    MuiButton: {
      color: "secondary",
      fullWidth: true,
    },
    MuiFab: {
      size: "small",
    },
    MuiCheckbox: {
      color: "primary",
    },
    MuiDialog: {
      PaperProps: { style: { padding: spacing } },
    },
  },
});

export default theme;
