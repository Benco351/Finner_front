import React, { useEffect, useState } from "react";
import { Divider } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import { login, setUser } from "../redux/slices/user";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../assets/firebase";
import { Link, useHistory } from "react-router-dom";
import { AuthCard } from "../components/UI/AuthCard";
import { Card, Button, Form, Alert } from "react-bootstrap";
import { useDebounce } from "use-debounce";

const useStyles = makeStyles({
  divider: {
    width: "100%",
    height: "0.1ch",
    maxWidth: 1300,
    marginBottom: "20px",
    backgroundColor: "var(--orange-color)",
    opacity: 0.4,
  },
});

const Login = () => {
  const classes = useStyles();
  const [user, loading, error] = useAuthState(auth);
  const userData = useSelector((state: stateType) => state.user);
  const [emailInput, setEmailInput] = useState<string>();
  const [passwordInput, setPasswordInput] = useState<string>();
  const [emailValue] = useDebounce(emailInput, 500);
  const [passwordValue] = useDebounce(passwordInput, 500);
  const [triesNum, setTriesNum] = useState(0);
  const history = useHistory();
  const dispatch = useDispatch();

  const handleLogin = (e: any) => {
    e.preventDefault();
    if (emailValue && passwordValue) {
      dispatch(login(emailValue, passwordValue));
      setTriesNum((n) => n + 1);
    }
  };

  useEffect(() => {
    if (!loading && user?.email && !error) {
      history.push("/feed");
    }
  }, [loading, user, error, history]);

  return (
    <AuthCard>
      <Card.Body>
        <h2 className="text-center mb-4">Sign-In</h2>
        <Divider className={classes.divider} />
        <Form onSubmit={handleLogin}>
          <Form.Group id="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setEmailInput(e.target.value)
              }
              style={{
                backgroundColor: "var(--input-color)",
                color: "white",
              }}
              required
              autoComplete="on"
            />
          </Form.Group>
          <Form.Group id="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setPasswordInput(e.target.value)
              }
              required
              style={{
                backgroundColor: "var(--input-color)",
                color: "white",
              }}
              autoComplete="on"
            />
          </Form.Group>
          {userData.error && !userData.firstEntry && triesNum < 3 && (
            <Alert variant="danger">{userData.error}</Alert>
          )}
          {triesNum >= 3 && (
            <Alert variant="danger">Max retries exceeded the limit.</Alert>
          )}
          <Button
            disabled={!emailValue || !passwordValue || triesNum >= 3}
            type="submit"
            className="w-100 button"
            style={{
              backgroundColor: "var(--orange-color)",
              border: "1px solid var(--orange-color)",
              color: "var(--main-color-regular)",
              fontWeight: "bold",
            }}
          >
            {userData.loading ? "Loading.." : "Sign-In"}{" "}
          </Button>
        </Form>
        <div className="w-100 text-center mt-3">
          <Link
            to="/forgot-password"
            onClick={() => dispatch(setUser({ error: "" }))}
            style={{ color: "var(--blue-color)", opacity: 0.8 }}
          >
            Forgot Password?
          </Link>
        </div>
      </Card.Body>
      <div className="w-100 text-center mt-2">
        Need an account ?{" "}
        <Link
          to="/signup"
          style={{ color: "var(--blue-color)", opacity: 0.8 }}
          onClick={() => dispatch(setUser({ error: "" }))}
        >
          Sign Up
        </Link>
      </div>
    </AuthCard>
  );
};
export default Login;
