import { useState } from "react";
import { Box, Paper, Tab, Tabs } from "@material-ui/core";

import { Info, Resources, Character, Notes } from "./";

export default function OwnerGame({ data, classes, game, user }) {
  const [value, setValue] = useState(0);

  return (
    <>
      <Tabs
        className={classes.tabs}
        value={value}
        onChange={(e, value) => setValue(value)}
        centered
      >
        <Tab label="Info" />
        <Tab label="Resources" />
        <Tab label="Character" />
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
            <Resources game={game} />
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
            <Character game={game} user={user} sheet={data.sheet} />
          </Box>
        </Paper>
      )}
      {value === 3 && (
        <Paper>
          <Box
            className={classes.container}
            display="flex"
            flexDirection="column"
          >
            <Notes game={game} user={user} />
          </Box>
        </Paper>
      )}
    </>
  );
}
