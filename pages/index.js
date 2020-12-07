import useUser from "../components/hooks/useUser";
import YourGames from "../components/home";
import { makeStyles } from "@material-ui/core/styles";

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

export default function Home() {
  const classes = useStyles();
  const user = useUser();

  return (
    <div className={classes.root}>
      <YourGames user={user} />
    </div>
  );
}
