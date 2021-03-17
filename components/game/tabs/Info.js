import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  image: {
    height: "60vh",
    width: "70vw",
    alignSelf: "center",
    marginBottom: "8px",
  },
}));

export function Info({ image, owner, genre, players, description }) {
  const classes = useStyles();
  const playersLength = players.length;
  const playerList = players.map((player, index) => {
    if (playersLength === index + 1) return `${player.name}`;
    return `${player.name}, `;
  });

  return (
    <>
      <img className={classes.image} src={image} alt={description} />
      <Typography gutterBottom>Genre: {genre}</Typography>
      <Typography gutterBottom>Players: {playerList}</Typography>
      <Typography gutterBottom style={{ fontWeight: 600 }} gutterBottom>
        Owner: {owner.name}
      </Typography>
      <Typography gutterBottom>Description: {description}</Typography>
    </>
  );
}
