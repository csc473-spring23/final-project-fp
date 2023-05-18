import React from "react";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import axios from "axios";

function Register() {
  const initVals = {
    userName: "",
    userEmail: "",
    password: "",
  };
  const onSubmit = (data: Object) => {
    axios.post("http://localhost:3001/auth", data).then((resp) => {
      console.log(resp.data);
      alert("register success!!!");
    });
  };

  const validationSchema = Yup.object().shape({
    userName: Yup.string().min(3).max(15).required(),
    userEmail: Yup.string().email().required(),
    password: Yup.string().min(3).max(15).required(),
  });

  return (
    <div className="row2">
      <Formik
        initialValues={initVals}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        <Form>
          <ErrorMessage name="userName" component="span" />
          <label>UserName: </label>
          <Field name="userName" placeholder="EX: YAH..." />

          <ErrorMessage name="userEmail" component="span" />
          <label>UserEmail: </label>
          <Field name="userEmail" placeholder="EX: ABC@DEF.com" />

          <ErrorMessage name="password" component="span" />
          <label>Password: </label>
          <Field
            type="password"
            name="password"
            placeholder="Set you password"
          />
          <p></p>
          <button className="Registerbutton" type="submit">
            Register
          </button>
        </Form>
      </Formik>
    </div>
  );
}

export default Register;
