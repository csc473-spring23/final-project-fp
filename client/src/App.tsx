import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { AuthContext } from "../helpers/AuthContext";
import Nav from "react-bootstrap/Nav";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link,
  useHistory,
} from "react-router-dom";
import InBox from "./pages/InBox";
import SendBox from "./pages/SendBox";
import Write from "./pages/Write";
import Register from "./pages/Register";
import Login from "./pages/Login";
import OpenedEmail from "./pages/OpenedEmail";
import Button from "react-bootstrap/Button";

function App() {
  const [authState, setAuthState] = useState<boolean | null>(false);
  let history = useHistory();
  const handleClick = () => {
    setAuthState(false);
    localStorage.removeItem("accessToken");
    localStorage.removeItem("email");
    history.push("/");
    window.location.reload();
  };

  useEffect(() => {
    axios
      .get("http://localhost:3001/auth/verify", {
        headers: { accessToken: localStorage.getItem("accessToken") },
      })
      .then((resp) => {
        if (resp.data.error) setAuthState(false);
        else setAuthState(true);
      });
  }, []);

  return (
    <div className="APP">
      <AuthContext.Provider value={{ authState, setAuthState }}>
        <Router>
          <Nav fill variant="tabs">
            {authState && (
              <div>
                <Nav.Item>
                  <Nav.Link href="/">InBox</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link href="/SendBox">Sent Box</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link href="/Write">Write New Mail</Nav.Link>
                </Nav.Item>
                <Button onClick={handleClick}>Log out</Button>
              </div>
            )}
            {!authState && (
              <div>
                <Nav.Item>
                  <Nav.Link href="/Login">Login</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link href="/Register">Register</Nav.Link>
                </Nav.Item>
              </div>
            )}
          </Nav>

          {authState && (
            <Switch>
              <Route exact path="/" component={InBox} />
              <Route path="/SendBox" component={SendBox} />
              <Route path="/Write" component={Write} />
              <Route path="/emails/:id" component={OpenedEmail} />
            </Switch>
          )}
          {!authState && (
            <Switch>
              <Route path="/Register" exact component={Register} />
              <Route path="/Login" exact component={Login} />
            </Switch>
          )}
        </Router>
      </AuthContext.Provider>
    </div>
  );
}
export default App;
