import React from 'react';
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import axios from "axios";

const Write = () => {
  const initVals = {
    subject: "",
    emailText: "",
    receiEmail: "",
  }
  const onSubmit = (data : Object) => {
    axios.post("http://localhost:3001/emails", {...data, senderEmail: localStorage.getItem("email")}).then((resp) => {
      console.log(resp.data);
    })
  }

  const validationSchema = Yup.object().shape({
    subject: Yup.string().required(),
    emailText: Yup.string().required(),
    receiEmail: Yup.string().email().required(),
  })

  return (
    <Formik initialValues={initVals} onSubmit={onSubmit} validationSchema={validationSchema}>
          <Form>
            <label>subject: </label>
            <ErrorMessage name= "subject" component = "span"/>
            <Field name = "subject" placeholder = "EX: YAH..."/>
            
            <label>emailText: </label>
            <ErrorMessage name= "emailText" component = "span"/>
            <Field name = "emailText" placeholder = "EX: ABC@DEF.com"/>
            
            <label>receiEmail: </label>
            <ErrorMessage name= "receiEmail" component = "span"/>
            <Field name = "receiEmail" placeholder = "Enter you password"/>

            <button type = 'submit'>Send</button>
          </Form>
      </Formik>
  )
}

export default Write
