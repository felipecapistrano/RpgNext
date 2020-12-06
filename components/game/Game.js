import { makeStyles } from "@material-ui/core/styles";
import { Box, Paper, Typography } from "@material-ui/core";
import useSWR from "swr";
import ReactLoading from "react-loading";
import { useRouter } from "next/router";
import axios from "axios";

import OwnerGame from "./OwnerGame";
import PlayerGame from "./PlayerGame";
import JoinGame from "./JoinGame";

const useStyles = makeStyles((theme) => ({
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
  const router = useRouter();

  const { data } = useSWR(`/api/games/get?id=${game}`);

  if (!data) return <ReactLoading />;

  const isOwner = data.owner._id === user;

  const players = data.players.map((player) => player._id);
  const isPlayer = players.includes(user);

  async function handleClose(bool) {
    if (bool) await axios.post("/api/games/join", { id: game, player: user });
    router.reload();
  }

  if (!isPlayer) return <JoinGame open handleClose={handleClose} />;
  return (
    <Paper className={classes.paper}>
      <Box display="flex" flexDirection="column">
        <Typography align="center" variant="h4" gutterBottom>
          {data.name}
        </Typography>
        {isOwner ? (
          <OwnerGame game={game} data={data} classes={classes} />
        ) : (
          <PlayerGame game={game} data={data} classes={classes} />
        )}
      </Box>
    </Paper>
  );
}
