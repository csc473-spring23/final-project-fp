import React, { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../helpers/AuthContext";
import { useHistory } from "react-router-dom";

const login = () => {
  const [userEmail, setUserEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setAuthState } = useContext(AuthContext);
  let history = useHistory();
  const onSubmit = () => {
    const data = { userEmail: userEmail, password: password };
    axios.post("http://localhost:3001/auth/login", data).then((resp) => {
      if (resp.data.error) {
        alert(resp.data.error);
        return;
      } else {
        localStorage.setItem("accessToken", resp.data);
        localStorage.setItem("email", userEmail);
        console.log(resp);
        setAuthState(true);
        history.push("/");
        window.location.reload();
      }
    });
  };

  return (
    <div className="row">
      <label>UserEmail: </label>
      <input
        type="text"
        onChange={(ev) => {
          setUserEmail(ev.target.value);
        }}
      />
      <label>Password: </label>
      <input
        type="password"
        onChange={(ev) => {
          setPassword(ev.target.value);
        }}
      />
      <p></p>
      <button className="loginbutton" onClick={onSubmit}>
        Login
      </button>
    </div>
  );
};

export default login;
