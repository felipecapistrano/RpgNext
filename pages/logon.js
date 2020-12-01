import { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Paper, Tab, Tabs, Typography } from "@material-ui/core";

import { Login, Register } from "../components/login/";

const useStyles = makeStyles((theme) => ({
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
  paper: {
    backgroundColor: theme.palette.primary.main,
    alignSelf: "center",
    width: "30vw",
  },
  tabs: {
    marginBottom: "16px",
  },
}));

export default function Logon() {
  const classes = useStyles();
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Box display="flex" flexDirection="column">
          <Typography variant="h4" gutterBottom>
            RpgNext
          </Typography>
          <Tabs
            className={classes.tabs}
            variant="fullWidth"
            value={value}
            onChange={handleChange}
          >
            <Tab label="Login" />
            <Tab label="Register" />
          </Tabs>
          {value === 0 && <Login />}
          {value === 1 && <Register />}
        </Box>
      </Paper>
    </div>
  );
}
