import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import {
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from "@material-ui/core";
import { useRouter } from "next/router";
import axios from "axios";
import { mutate } from "swr";

import useUser from "../../../hooks/useUser";

export default function ModalCreateCharacter({ onClose, sheet, character }) {
  const router = useRouter();
  const { game } = router.query;
  const user = useUser();

  const sheetFields = sheet.map((field) => ({
    ...field,
    value: "",
  }));

  return (
    <Formik
      initialValues={character || { name: "", image: "", fields: sheetFields }}
      onSubmit={async (values, { resetForm }) => {
        try {
          await axios.post("/api/characters/create", {
            game: game,
            user: user,
            ...values,
          });
          resetForm();
          mutate(`/api/games/get?id=${game}`);
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
