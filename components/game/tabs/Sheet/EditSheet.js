import { useState } from "react";
import { Fab, Dialog } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";

import { makeStyles } from "@material-ui/core/styles";
import ModalEditSheet from "./ModalEditSheet";

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

export default function EditSheet({ sheet }) {
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
        <EditIcon />
      </Fab>
      <Dialog
        PaperProps={{ className: classes.paper }}
        open={open}
        onClose={toggle}
      >
        <ModalEditSheet onClose={toggle} sheet={sheet} />
      </Dialog>
    </>
  );
}
