import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";
import {
  Button,
  TextField,
  Typography,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@material-ui/core";
import useUser from "../hooks/useUser";

export default function ModalCreateGame({ onClose, mutate }) {
  const user = useUser();

  return (
    <Formik
      initialValues={{ name: "", genre: "", image: "", description: "" }}
      onSubmit={async (values, { resetForm }) => {
        try {
          await axios.post("/api/games/create", {
            ...values,
            owner: user,
          });
          mutate();
          resetForm();
          onClose();
        } catch (e) {
          alert(e);
        }
      }}
      validationSchema={Yup.object({
        name: Yup.string()
          .required("Required")
          .max(30, "Must be less than 30 characters."),
        genre: Yup.string().max(30, "Must be less than 30 characters."),
        image: Yup.string(),
        description: Yup.string().max(200, "Must be less than 200 characters."),
      })}
    >
      {({ errors, touched }) => (
        <Form>
          <DialogTitle>
            <Typography variant="h4">Create Game</Typography>
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
              name="genre"
              as={TextField}
              label="Genre"
              error={errors.genre && touched.genre}
              helperText={errors.genre ? errors.genre : ""}
            />
            <Field
              name="image"
              as={TextField}
              label="Image URL"
              error={errors.image && touched.image}
              helperText={errors.image && touched.image}
            />
            <Field
              name="description"
              as={TextField}
              label="Description"
              error={errors.description && touched.description}
              helperText={errors.description ? errors.description : ""}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={onClose} variant="contained" fullWidth={false}>
              Cancel
            </Button>
            <Button type="submit" variant="contained" fullWidth={false}>
              Create
            </Button>
          </DialogActions>
        </Form>
      )}
    </Formik>
  );
}
