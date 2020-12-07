import { TextField, Typography } from "@material-ui/core";

import EditSheet from "./EditSheet";

export function Sheet({ sheet, game }) {
  return (
    <>
      {sheet.length ? (
        <>
          <Typography>Currently used sheet</Typography>

          {sheet.map((field) => (
            <TextField
              key={field.id}
              label={field.name}
              multiline={field.type === "TextArea"}
              rows={6}
              disabled
            />
          ))}
        </>
      ) : (
        <Typography>A sheet has not yet been created for this game</Typography>
      )}
      <EditSheet sheet={sheet} game={game} />
    </>
  );
}
