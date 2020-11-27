import { useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useCookies } from "react-cookie";
import { useRouter } from "next/router";
import axios from "axios";

import { Button, TextField, Typography } from "@material-ui/core";

export function Login() {
  const [error, setError] = useState();
  const [, setCookie] = useCookies(["user"]);
  const router = useRouter();

  return (
    <Formik
      initialValues={{ name: "", password: "" }}
      onSubmit={async (values) => {
        try {
          const { data } = await axios.post("/api/users/login", values);
          setCookie("user", data._id, {
            path: "/",
          });
          router.push("/");
        } catch {
          setError(true);
        }
      }}
      validationSchema={Yup.object({
        name: Yup.string().required("Required"),
        password: Yup.string().required("Required"),
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
          {error && (
            <Typography color="error">
              Specified account does not exist
            </Typography>
          )}
          <Button type="submit" variant="contained">
            Login
          </Button>
        </Form>
      )}
    </Formik>
  );
}
