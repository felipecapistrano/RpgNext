import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@material-ui/core";

export default function JoinGame({ open, handleClose }) {
  return (
    <Dialog open={open} onClose={() => handleClose(false)}>
      <DialogTitle>Join game</DialogTitle>
      <DialogContent>
        You are not currently a player of this game, do you want to join?
      </DialogContent>
      <DialogActions>
        <Button
          fullWidth={false}
          variant="contained"
          onClick={() => handleClose(true)}
        >
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );
}
