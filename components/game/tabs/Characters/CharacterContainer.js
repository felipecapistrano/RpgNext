import { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@material-ui/core";

import CreateCharacter from "./CreateCharacter";
import EditCharacter from "./EditCharacter";

const useStyles = makeStyles(() => ({
  card: {
    height: "300px",
    width: "12vw",
    padding: "0px",
  },
  media: {
    height: "240px",
    width: "100%",
  },
}));

export default function CharacterContainer({ characters, sheet, game, user }) {
  const classes = useStyles();

  const [open, setOpen] = useState(false);
  const [character, setCharacter] = useState();

  function toggle(char) {
    if (char) setCharacter(char);
    setOpen(!open);
  }
  return (
    <>
      <Box display="flex" flexDirection="row" flexWrap="wrap">
        {characters.map((char) => (
          <div key={char._id}>
            <Card className={classes.card}>
              <CardActionArea onClick={() => toggle(char)}>
                <CardMedia>
                  <img src={char.image} className={classes.media} />
                </CardMedia>
                <CardContent>
                  <Typography
                    style={{ fontWeight: "600", textAlign: "center" }}
                  >
                    {char.name}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </div>
        ))}
      </Box>
      <EditCharacter
        sheet={sheet}
        game={game}
        character={character}
        open={open}
        onClose={() => toggle()}
      />
    </>
  );
}
