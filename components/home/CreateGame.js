import { useState } from "react";
import { Fab, Dialog } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";

import { makeStyles } from "@material-ui/core/styles";
import ModalCreateGame from "./ModalCreateGame";

const useStyles = makeStyles((theme) => ({
  fab: {
    position: "absolute",
    bottom: "7vh",
    right: "27vw",
  },
  paper: {
    backgroundColor: theme.palette.primary.main,
    padding: "8px",
  },
}));

export default function CreateGame({ mutate, user }) {
  const classes = useStyles();

  const [open, setOpen] = useState(false);
  const toggle = () => setOpen(!open);

  return (
    <>
      <Fab
        className={classes.fab}
        onClick={() => toggle()}
        color="secondary"
        size="medium"
      >
        <AddIcon />
      </Fab>
      <Dialog open={open} onClose={toggle}>
        <ModalCreateGame mutate={mutate} onClose={toggle} user={user} />
      </Dialog>
    </>
  );
}
