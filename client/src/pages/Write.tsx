import React from "react";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import axios from "axios";

const Write = () => {
  const initVals = {
    subject: "",
    emailText: "",
    receiEmail: "",
  };
  const onSubmit = (data: Object) => {
    axios
      .post("http://localhost:3001/emails", {
        ...data,
        senderEmail: localStorage.getItem("email"),
      })
      .then((resp) => {
        console.log(resp.data);
        alert("Send Success!!!");
      });
  };

  const validationSchema = Yup.object().shape({
    subject: Yup.string().required(),
    emailText: Yup.string().required(),
    receiEmail: Yup.string().email().required(),
  });

  return (
    <div className="Write">
      <Formik
        initialValues={initVals}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        <Form>
          <label>Sent to: </label>
          <ErrorMessage name="receiEmail" component="span" />
          <Field name="receiEmail" placeholder="Add a email" />

          <label>Subject: </label>
          <ErrorMessage name="subject" component="span" />
          <Field name="subject" placeholder="Add a subject" />

          <label>Text: </label>
          <ErrorMessage name="emailText" component="span" />
          <Field name="emailText" placeholder="" />

          <button className="Sendbutton" type="submit">
            Send
          </button>
        </Form>
      </Formik>
    </div>
  );
};

export default Write;
