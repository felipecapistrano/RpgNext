import { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Box,
  Card,
  CardMedia,
  CardActionArea,
  CardContent,
  Fab,
  Paper,
  Typography,
  Grid,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import useUser from "../components/hooks/useUser";
import useSWR from "swr";
import ReactLoading from "react-loading";

import { CreateGame } from "../components/home";

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

export default function Home() {
  const classes = useStyles();
  const user = useUser();
  const { data, mutate } = useSWR(`/api/games/list?id=${user}`);

  const [open, setOpen] = useState(false);
  const toggle = () => setOpen(!open);

  if (!data) return <ReactLoading type={"spin"} />;

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Box className={classes.box} display="flex" flexDirection="column">
          <Typography className={classes.title} variant="h4">
            Your Games
          </Typography>
          {data.map((game) => (
            <Card className={classes.card}>
              <CardActionArea>
                <Grid container>
                  <Grid item xs={5}>
                    <CardMedia>
                      <img src={game.image} className={classes.media}></img>
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
          <Fab
            className={classes.fab}
            onClick={() => toggle()}
            color="secondary"
            size="medium"
          >
            <AddIcon />
          </Fab>
        </Box>
        <CreateGame mutate={mutate} open={open} onClose={toggle} />
      </Paper>
    </div>
  );
}
