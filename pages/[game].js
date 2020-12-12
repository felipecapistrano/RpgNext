import useUser from "../components/hooks/useUser";
import { makeStyles } from "@material-ui/core/styles";
import { useRouter } from "next/router";

import GamePage from "../components/game";

const useStyles = makeStyles(() => ({
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

  if (!user || !game) return null;

  return (
    <div className={classes.root}>
      <GamePage user={user} game={game} />
    </div>
  );
}
