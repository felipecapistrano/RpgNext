import { useState } from "react";
import { Box, Paper, Tab, Tabs } from "@material-ui/core";
import ReactLoading from "react-loading";

import { Info, Resources, Character } from "./";

export default function OwnerGame({ data, classes, game }) {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  if (!data) return <ReactLoading />;

  return (
    <>
      <Tabs
        className={classes.tabs}
        value={value}
        onChange={handleChange}
        centered
      >
        <Tab label="Info" />
        <Tab label="Resources" />
        <Tab label="Character" />
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
            <Resources resources={data.resources} />
          </Box>
        </Paper>
      )}
      {value === 2 && (
        <Paper>
          <Box
            className={classes.container}
            display="flex"
            flexDirection="column"
          >
            <Character
              characters={data.characters}
              game={game}
              sheet={data.sheet}
            />
          </Box>
        </Paper>
      )}
    </>
  );
}
