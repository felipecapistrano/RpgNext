import { FieldArray, Formik, Field, Form } from "formik";
import * as Yup from "yup";
import {
  DialogTitle,
  DialogContent,
  DialogActions,
  MenuItem,
  TextField,
  Button,
  Box,
} from "@material-ui/core";
import { useRouter } from "next/router";
import axios from "axios";
import { mutate } from "swr";

import DeleteIcon from "@material-ui/icons/Delete";
import AddIcon from "@material-ui/icons/Add";

const types = ["Text", "TextArea"];

export default function ModalEditSheet({ onClose, sheet }) {
  const router = useRouter();
  const { game } = router.query;
  console.log(sheet);

  return (
    <Formik
      initialValues={{
        fields: sheet.length ? sheet : [{ id: 1, name: "", type: "Text" }],
      }}
      onSubmit={async (values, { resetForm }) => {
        try {
          await axios.post("/api/games/sheet", {
            id: game,
            fields: values.fields,
          });
          console.log(values.fields);
          resetForm();
          mutate(`/api/games/get?id=${game}`);
          onClose();
        } catch (e) {
          alert(e);
        }
      }}
      validationSchema={Yup.object({
        link: Yup.array().of(
          Yup.object().shape({
            name: Yup.string().required("Required"),
            type: Yup.string().required("Required"),
          })
        ),
      })}
    >
      {({ values, errors, touched }) => (
        <Form>
          <DialogTitle>Edit Sheet</DialogTitle>
          <DialogContent>
            <FieldArray name="fields">
              {({ remove, push }) => (
                <Box>
                  {values.fields.map((field, index) => (
                    <Box key={index} display="flex" flexDirection="row">
                      <Field
                        style={{ marginRight: "16px" }}
                        name={`fields.${index}.name`}
                        as={TextField}
                        label="Field"
                        error={errors.name && touched.name}
                        helperText={errors.name ? errors.name : ""}
                      />
                      <Field
                        style={{ marginRight: "16px" }}
                        name={`fields.${index}.type`}
                        select
                        as={TextField}
                        label="Type"
                        error={errors.type && touched.type}
                        helperText={errors.type ? errors.type : ""}
                      >
                        {types.map((type) => (
                          <MenuItem disableGutters key={type} value={type}>
                            {type}
                          </MenuItem>
                        ))}
                      </Field>
                      <DeleteIcon
                        style={{ alignSelf: "center", cursor: "pointer" }}
                        fontSize="large"
                        onClick={() => remove(index)}
                      />
                    </Box>
                  ))}
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() =>
                      push({
                        id: values.fields.length + 1,
                        name: "",
                        type: "Text",
                      })
                    }
                  >
                    <AddIcon />
                  </Button>
                </Box>
              )}
            </FieldArray>
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
              Edit
            </Button>
          </DialogActions>
        </Form>
      )}
    </Formik>
  );
}
