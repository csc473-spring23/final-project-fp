import axios from "axios";
import React, { useEffect, useState } from "react";
import { Col } from "react-bootstrap";
import { useHistory } from "react-router-dom";

const SendBox = () => {
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
      .get("http://localhost:3001/emails/send", {
        headers: { email: localStorage.getItem("email") },
      })
      .then((resp) => {
        console.log(resp.data);
        setListOfEmails(resp.data);
      });
  }, []);
  return (
    <div className="SendBox">
      {listOfEmails.map((value, key) => {
        return (
          <div
            className="d-flexflex-row"
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

export default SendBox;
