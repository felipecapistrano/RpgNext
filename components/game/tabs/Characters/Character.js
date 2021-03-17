import { useState } from "react";
import {
  CircularProgress,
  Fab,
  TextField,
  Typography,
} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import { makeStyles } from "@material-ui/core/styles";
import useSWR from "swr";

import CreateCharacter from "./CreateCharacter";
import EditCharacter from "./EditCharacter";

const useStyles = makeStyles(() => ({
  fab: {
    position: "absolute",
    bottom: "3vh",
    right: "12vw",
  },
  image: {
    maxHeight: "50vh",
    maxWidth: "50vw",
    alignSelf: "center",
    marginBottom: "16px",
  },
}));

export function Character({ sheet, game, user }) {
  const classes = useStyles();

  const { data: characters } = useSWR(`/api/characters/get?gameId=${game}`);

  const [open, setOpen] = useState(false);
  const toggle = () => setOpen(!open);

  if (!characters) return <CircularProgress />;

  const character = characters.players.filter(
    (character) => character.userId === user
  )[0];

  return (
    <>
      {character ? (
        <>
          <img
            className={classes.image}
            src={character.image}
            alt={character.name}
          />
          <TextField disabled label="Name" value={character.name} />
          {character.fields.map((field) => (
            <TextField
              key={field.id}
              label={field.name}
              value={field.value}
              multiline={field.type === "TextArea"}
              rows={6}
              disabled
            />
          ))}
          <Fab
            className={classes.fab}
            onClick={() => toggle()}
            color="secondary"
            size="medium"
          >
            <EditIcon />
          </Fab>
          <EditCharacter
            sheet={sheet}
            character={character}
            game={game}
            open={open}
            onClose={toggle}
          />
        </>
      ) : (
        <>
          <Typography>
            You haven't created a character for this game yet.
          </Typography>
          <CreateCharacter sheet={sheet} game={game} user={user} />
        </>
      )}
    </>
  );
}
