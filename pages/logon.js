import { makeStyles } from "@material-ui/core/styles";

import LoginPage from "../components/login/";

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    marginLeft: "auto",
    marginRight: "auto",
    textAlign: "center",
    justifyContent: "center",
    width: "100%",
    height: "100vh",
    backgroundColor: "#212121",
  },
}));

export default function Logon() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <LoginPage />
    </div>
  );
}
