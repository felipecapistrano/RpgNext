import { makeStyles } from "@material-ui/core/styles";

import {
  Card,
  CardContent,
  CardHeader,
  Paper,
  TextField,
  Typography,
} from "@material-ui/core";

import EditSheet from "./EditSheet";

const useStyles = makeStyles(() => ({
  card: {
    alignSelf: "center",
    width: "75%",
  },
  multiline: {
    height: "200px",
  },
}));

export function Sheet({ sheet, isOwner }) {
  const classes = useStyles();

  return (
    <>
      <Typography>Currently used sheet:</Typography>
      {sheet.length ? (
        sheet.map((field) => (
          <TextField
            key={field.id}
            label={field.name}
            multiline={field.type === "TextArea"}
            rows={6}
            disabled
          />
        ))
      ) : (
        <Typography>A sheet has not yet been created for this game</Typography>
      )}
      {isOwner && <EditSheet sheet={sheet} />}
    </>
  );
}
