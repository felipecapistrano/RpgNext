import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useCookies } from "react-cookie";
import { useRouter } from "next/router";
import axios from "axios";

import { Button, TextField } from "@material-ui/core";

export function Register() {
  const router = useRouter();
  const [, setCookie] = useCookies(["user"]);

  return (
    <Formik
      initialValues={{ name: "", password: "", confirmPassword: "" }}
      onSubmit={async (values) => {
        if (values.password !== values.confirmPassword) {
          alert("num ta igual");
          return;
        }
        try {
          const { data } = await axios.post("/api/users/register", values);
          setCookie("user", data._id, {
            path: "/",
          });
          router.push("/");
        } catch (e) {
          alert(e);
        }
      }}
      validationSchema={Yup.object({
        name: Yup.string()
          .required("Required")
          .min(6, "UserName need at least 6 characters"),
        password: Yup.string()
          .required("Required")
          .min(6, "Password need at least 6 characters"),
        confirmPassword: Yup.string().required("Required"),
      })}
    >
      {({ errors, touched }) => (
        <Form>
          <Field
            name="name"
            as={TextField}
            label="UserName"
            error={errors.name && touched.name}
            helperText={errors.name ? errors.name : ""}
          />
          <Field
            name="password"
            type="password"
            as={TextField}
            label="Password"
            error={errors.password && touched.password}
            helperText={errors.password ? errors.password : ""}
          />
          <Field
            name="confirmPassword"
            type="password"
            as={TextField}
            label="Confirm your password"
            error={errors.confirmPassword && touched.confirmPassword}
            helperText={
              errors.confirmPassword && touched.confirmPassword && "Required"
            }
          />
          <Button type="submit" variant="contained">
            Register
          </Button>
        </Form>
      )}
    </Formik>
  );
}
