import { Dialog } from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";
import ModalCreateCharacter from "./ModalCreateCharacter";

const useStyles = makeStyles(() => ({
  paper: {
    width: "40vw",
    scrollbarWidth: "thin",
  },
}));

export default function CreateCharacter({
  open,
  onClose,
  sheet,
  character,
  game,
}) {
  const classes = useStyles();

  return (
    <>
      <Dialog
        PaperProps={{ className: classes.paper }}
        open={open}
        onClose={onClose}
      >
        <ModalCreateCharacter
          onClose={onClose}
          sheet={sheet}
          character={character}
          game={game}
        />
      </Dialog>
    </>
  );
}
