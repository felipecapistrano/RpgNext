import { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Paper, Tab, Tabs, Typography } from "@material-ui/core";

import { Login, Register } from ".";

const useStyles = makeStyles((theme) => ({
  paper: {
    backgroundColor: theme.palette.primary.main,
    alignSelf: "center",
    width: "30vw",
  },
  tabs: {
    marginBottom: "16px",
  },
}));

export default function LoginPage() {
  const classes = useStyles();
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
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
  );
}
