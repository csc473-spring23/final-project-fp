import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Routes,
  Router,
  Switch,
  Route,
  Link,
  useHistory,
  Redirect,
} from "react-router-dom";
import axios from "axios";
import { Col, ListGroup } from "react-bootstrap";

const InBox = () => {
  let history = useHistory();
  interface Email {
    id: number;
    subject: string;
    emailText: string;
    senderEmail: string;
    receiEmail: string;
    replyToId: number;
  }
  const [listOfEmails, setListOfEmails] = useState<Email[]>([]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/emails", {
        headers: { email: localStorage.getItem("email") },
      })
      .then((resp) => {
        console.log(resp.data);
        setListOfEmails(resp.data);
      });
  }, []);

  return (
    <div className="InBox">
      {listOfEmails.map((value, key) => {
        return (
          <div
            className="d-flex flex-row"
            key={value.id}
            onClick={() => {
              history.replace(`/emails/${value.id}`);
              window.location.reload();
            }}
          >
            <Col>{value.subject}</Col>
            <Col className="text-end">From: {value.senderEmail}</Col>
          </div>
        );
      })}
    </div>
  );
};

export default InBox;
