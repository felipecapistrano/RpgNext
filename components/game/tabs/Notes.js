import { useState } from "react";
import { Formik, Field, Form } from "formik";
import {
  Button,
  CircularProgress,
  DialogActions,
  Snackbar,
  TextField,
} from "@material-ui/core";
import useSWR from "swr";
import axios from "axios";

export function Notes({ user, game }) {
  const [open, setOpen] = useState(false);
  const { data: notes, isValidating } = useSWR(
    `/api/notes/get?userId=${user}&gameId=${game}`
  );
  if (isValidating) return <CircularProgress />;
  return (
    <Formik
      initialValues={notes || { userId: user, gameId: game, notes: "" }}
      onSubmit={async (values) => {
        try {
          await axios.post("/api/notes/save", {
            ...values,
          });
          setOpen(true);
        } catch (e) {
          alert(e);
        }
      }}
    >
      <Form>
        <Field name="notes" as={TextField} label="Notes" multiline rows={16} />
        <DialogActions>
          <Button type="submit" variant="contained" fullWidth={false}>
            Save
          </Button>
        </DialogActions>
        <Snackbar
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          open={open}
          autoHideDuration={6000}
          onClose={() => setOpen(false)}
          message="Notes saved"
        />
      </Form>
    </Formik>
  );
}
