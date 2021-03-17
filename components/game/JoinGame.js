import { useState } from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@material-ui/core";

export default function JoinGame({ open, handleClose }) {
  const [clicked, setClicked] = useState(false);

  const close = () => {
    setClicked(true);
    handleClose(true);
  };
  return (
    <Dialog open={open} onClose={() => handleClose(false)}>
      <DialogTitle>Join game</DialogTitle>
      <DialogContent>
        You are not currently a player of this game, do you want to join?
      </DialogContent>
      <DialogActions>
        <Button
          disabled={clicked}
          fullWidth={false}
          variant="contained"
          onClick={close}
        >
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );
}
