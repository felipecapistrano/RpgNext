import { useState } from "react";
import { Fab, Dialog } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";

import { makeStyles } from "@material-ui/core/styles";
import ModalCreateCharacter from "./ModalCreateCharacter";

const useStyles = makeStyles(() => ({
  fab: {
    position: "absolute",
    bottom: "3vh",
    right: "12vw",
  },
  paper: {
    width: "40vw",
    scrollbarWidth: "thin",
  },
}));

export default function CreateCharacter({ sheet, game, user }) {
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
      <Dialog
        PaperProps={{ className: classes.paper }}
        open={open}
        onClose={toggle}
      >
        <ModalCreateCharacter
          onClose={toggle}
          sheet={sheet}
          game={game}
          user={user}
        />
      </Dialog>
    </>
  );
}
