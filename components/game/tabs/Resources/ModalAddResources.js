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
import { useRouter } from "next/router";
import { mutate } from "swr";

export default function ModalAddResources({ onClose }) {
  const router = useRouter();
  const { game } = router.query;

  return (
    <Formik
      initialValues={{ name: "", link: "" }}
      onSubmit={async (values, { resetForm }) => {
        try {
          await axios.post("/api/games/resources", {
            id: game,
            resources: values,
          });
          resetForm();
          mutate(`/api/games/get?id=${game}`);
          onClose();
        } catch (e) {
          alert(e);
        }
      }}
      validationSchema={Yup.object({
        name: Yup.string()
          .required("Required")
          .max(30, "Must be less than 30 characters."),
        link: Yup.string().required("Required"),
      })}
    >
      {({ errors, touched }) => (
        <Form>
          <DialogTitle>
            <Typography variant="h4">Add Resource</Typography>
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
              name="link"
              as={TextField}
              label="Link"
              error={errors.link && touched.link}
              helperText={errors.link ? errors.link : ""}
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
