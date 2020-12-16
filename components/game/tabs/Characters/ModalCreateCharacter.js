import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import {
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from "@material-ui/core";
import axios from "axios";
import { mutate } from "swr";

export default function ModalCreateCharacter({
  owner,
  onClose,
  sheet,
  character,
  game,
  user,
}) {
  async function eraseCharacter(id) {
    await axios.post(`/api/characters/erase`, { _id: id, gameId: game });
    mutate(`/api/characters/get?gameId=${game}`);
    onClose();
  }

  const sheetFields = sheet.map((field) => ({
    ...field,
    value: "",
  }));

  return (
    <Formik
      initialValues={
        character || {
          name: "",
          image: "",
          fields: sheetFields,
          gameId: game,
          userId: user,
          npc: !!owner,
        }
      }
      onSubmit={async (values, { resetForm }) => {
        try {
          await axios.post("/api/characters/create", {
            ...values,
          });
          resetForm();
          mutate(`/api/characters/get?gameId=${game}`);
          onClose();
        } catch (e) {
          alert(e);
        }
      }}
      validationSchema={Yup.object({
        name: Yup.string().required("Required"),
        image: Yup.string(),
      })}
    >
      {({ values, errors, touched }) => (
        <Form>
          <DialogTitle>
            {character ? "Edit Character" : "Create Character"}
          </DialogTitle>
          <DialogContent>
            <Field
              name="name"
              as={TextField}
              label="Name"
              error={errors.name && touched.name}
              helperText={errors.name ? errors.name : ""}
            />
            <Field
              name="image"
              as={TextField}
              label="Image URL"
              error={errors.image && touched.image}
              helperText={errors.image && touched.image}
            />
            {values.fields.map((field, index) => (
              <Field
                name={`fields.${index}.value`}
                as={TextField}
                label={field.name}
                multiline={field.type === "TextArea"}
                rows={6}
              />
            ))}
          </DialogContent>
          <DialogActions>
            {character && (
              <Button
                style={{ marginRight: "auto" }}
                type="button"
                variant="contained"
                fullWidth={false}
                onClick={() => eraseCharacter(character._id)}
              >
                Delete
              </Button>
            )}
            <Button
              type="button"
              variant="contained"
              fullWidth={false}
              onClick={() => onClose()}
            >
              Cancel
            </Button>
            <Button type="submit" variant="contained" fullWidth={false}>
              {character ? "Edit" : "Create"}
            </Button>
          </DialogActions>
        </Form>
      )}
    </Formik>
  );
}
