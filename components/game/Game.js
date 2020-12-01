import { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Paper, Tab, Tabs, Typography } from "@material-ui/core";
import useSWR from "swr";
import ReactLoading from "react-loading";

import { Info, Resources } from "./";

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
    height: "100vh",
    width: "80vw",
  },
  tabs: {
    marginBottom: "16px",
  },
  container: {
    maxHeight: "78vh",
    overflowY: "scroll",
    scrollbarWidth: "thin",
    padding: "16px",
    textAlign: "start",
  },
}));

export default function Game({ game, user }) {
  const classes = useStyles();
  const [value, setValue] = useState(0);
  const { data } = useSWR(`/api/games/get?id=${game}`);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  if (!data) return <ReactLoading />;

  const isOwner = user === data.owner._id;

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Box display="flex" flexDirection="column">
          <Typography variant="h4" gutterBottom>
            {data.name}
          </Typography>
          <Tabs
            className={classes.tabs}
            value={value}
            onChange={handleChange}
            centered
          >
            <Tab label="Info" />
            <Tab label="Resources" />
            <Tab label="Sheets" />
            <Tab label="Npcs" />
            <Tab label="Notes" />
          </Tabs>
          {value === 0 && (
            <Paper>
              <Box
                className={classes.container}
                display="flex"
                flexDirection="column"
              >
                <Info
                  image={data.image}
                  genre={data.genre}
                  description={data.description}
                  players={data.players}
                  owner={data.owner}
                />
              </Box>
            </Paper>
          )}
          {value === 1 && (
            <Paper>
              <Box
                className={classes.container}
                display="flex"
                flexDirection="column"
              >
                <Resources resources={data.resources} isOwner={isOwner} />
              </Box>
            </Paper>
          )}
        </Box>
      </Paper>
    </div>
  );
}
