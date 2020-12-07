import { makeStyles } from "@material-ui/core/styles";
import {
  Box,
  Card,
  CardMedia,
  CardActionArea,
  CardContent,
  CircularProgress,
  Paper,
  Typography,
  Grid,
} from "@material-ui/core";
import { useRouter } from "next/router";
import useSWR from "swr";

import CreateGame from "./CreateGame";

const useStyles = makeStyles((theme) => ({
  paper: {
    backgroundColor: theme.palette.primary.main,
    overflowY: "scroll",
    overflowX: "hidden",
    scrollbarWidth: "thin",
    minHeight: "90vh",
    maxHeight: "90vh",
    alignSelf: "center",
    width: "50vw",
  },
  box: {
    padding: "0px",
  },
  title: {
    textAlign: "center",
  },
  card: {
    height: "160px",
    padding: "0px",
  },
  media: {
    height: "160px",
    width: "100%",
  },
  content: {
    marginLeft: "8px",
    padding: "0px",
  },
  fab: {
    position: "absolute",
    bottom: "7vh",
    right: "27vw",
  },
}));

export default function YourGames({ user }) {
  const classes = useStyles();
  const router = useRouter();
  const { data, mutate } = useSWR(`/api/games/list?playerId=${user}`);

  if (!data) return <CircularProgress />;

  return (
    <Paper className={classes.paper}>
      <Box className={classes.box} display="flex" flexDirection="column">
        <Typography className={classes.title} variant="h4">
          Your Games
        </Typography>
        {data.map((game) => (
          <Card key={game._id} className={classes.card}>
            <CardActionArea onClick={() => router.push(`/${game._id}`)}>
              <Grid container>
                <Grid item xs={5}>
                  <CardMedia>
                    <img src={game.image} className={classes.media} />
                  </CardMedia>
                </Grid>
                <Grid item xs={7}>
                  <CardContent className={classes.content}>
                    <Typography variant="h5">{game.name}</Typography>
                    <Typography
                      gutterBottom
                      variant="body2"
                    >{`Genre: ${game.genre}`}</Typography>
                    <Typography variant="body2">{`Description: ${game.description}`}</Typography>
                  </CardContent>
                </Grid>
              </Grid>
            </CardActionArea>
          </Card>
        ))}
        <CreateGame mutate={mutate} user={user} />
      </Box>
    </Paper>
  );
}
