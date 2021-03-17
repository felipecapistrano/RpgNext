import { useState } from "react";
import { Box, Paper, Tab, Tabs } from "@material-ui/core";

import { Info, Resources, Sheet, Characters, Notes } from "./";

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
        <Tab label="Sheet" />
        <Tab label="Characters" />
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
            <Resources game={game} isOwner />
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
            <Sheet sheet={data.sheet} game={game} />
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
            <Characters
              characters={data.characters}
              sheet={data.sheet}
              game={game}
              user={user}
            />
          </Box>
        </Paper>
      )}
      {value === 4 && (
        <Paper>
          <Box
            className={classes.container}
            display="flex"
            flexDirection="column"
          >
            <Notes user={user} game={game} />
          </Box>
        </Paper>
      )}
    </>
  );
}
