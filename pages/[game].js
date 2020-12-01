import { useRouter } from "next/router";
import useUser from "../components/hooks/useUser";
import { makeStyles } from "@material-ui/core/styles";

import GameContainer from "../components/game";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    marginLeft: "auto",
    marginRight: "auto",
    justifyContent: "center",
    width: "100%",
    minHeight: "100vh",
    backgroundColor: "#212121",
  },
}));

export default function Game() {
  const classes = useStyles();
  const router = useRouter();
  const { game } = router.query;
  const user = useUser();

  if (!game || !user) return null;

  return (
    <div className={classes.root}>
      <GameContainer game={game} user={user} />
    </div>
  );
}
