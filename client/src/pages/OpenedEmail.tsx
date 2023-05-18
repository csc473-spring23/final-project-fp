import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { Button, Card, Col, Container, Form, ListGroup } from "react-bootstrap";
import { useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { ErrorMessage, Field, Formik } from "formik";

const OpenedEmail = () => {
  interface Email {
    id: number;
    subject: string;
    emailText: string;
    senderEmail: string;
    receiEmail: string;
    replyToId: number;
  }
  const init: Email = {
    id: 0,
    subject: "",
    emailText: "",
    senderEmail: "",
    receiEmail: "",
    replyToId: 0,
  };
  const { id } = useParams<{ id: string }>();
  const [email, setEmail] = useState<Email>(init);
  const [reply, setReply] = useState("");
  const [replyEmails, setReplyEmails] = useState<Email[]>([]);

  const submitHandle = () => {
    console.log(reply);
    alert("Reply Success");
    axios
      .post("http://localhost:3001/emails", {
        emailText: reply,
        senderEmail: localStorage.getItem("email"),
        receiEmail: email.senderEmail,
        subject: `re to: ${email.subject}`,
        replyToId: email.id,
      })
      .then((resp) => {
        console.log(resp.data);
      });
  };

  useEffect(() => {
    axios.get(`http://localhost:3001/emails/${id}`).then((resp) => {
      setEmail(resp.data);
    });
    axios.get(`http://localhost:3001/emails/replys/${id}`).then((resp) => {
      setReplyEmails(resp.data);
      console.log(resp);
    });
  }, []);
  return (
    <Container style={{ width: "100%" }} className="mb-0ms-0me-0d-flexflex-row">
      <Card className="h-200">
        <Card.Body>
          <Card.Title className="text-center">{email.subject}</Card.Title>
          <Card.Text className="textfile">{email.emailText}</Card.Text>

          <Form className="text" onSubmit={submitHandle}>
            <label>Reply: </label>
            <Form.Control
              as="textarea"
              rows={3}
              onChange={(ev) => {
                setReply(ev.target.value);
              }}
            />
            <button className="Replybutton" type="submit">
              Reply
            </button>
          </Form>
        </Card.Body>
      </Card>
      <ListGroup>
        {replyEmails.map((value, key) => {
          return (
            <ListGroup.Item
              key={value.id}
              className="d-flex flex-row me-0"
              style={{ width: "100%" }}
            >
              <Col>{value.subject}</Col>
              <Col className="text-end">From: {value.senderEmail}</Col>
            </ListGroup.Item>
          );
        })}
      </ListGroup>
    </Container>
  );
};

export default OpenedEmail;
