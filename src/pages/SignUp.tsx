import { useState } from "react";
import { Terms } from "../components/Modals/Terms2";
import { useSelector } from "react-redux";
import { useDebounce } from "use-debounce";

///styling///
import { Card, Button, Form, Alert } from "react-bootstrap";
import { AuthCard } from "../components/UI/AuthCard";
import Radio from "@material-ui/core/Radio";
import { Grid } from "@material-ui/core";
import { Divider } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
///redux//
import { useDispatch } from "react-redux";
import { signUp } from "../redux/slices/user";

import { Link } from "react-router-dom";
const useStyles = makeStyles({
  divider: {
    width: "100%",
    height: "0.1ch",
    maxWidth: 500,
    marginBottom: "20px",
    backgroundColor: "var(--orange-color)",
    opacity: 0.4,
  },
  input: {
    backgroundColor: "var(--input-color)",
    color: "white",
  },
  signUpButton: {
    backgroundColor: "var(--orange-color)",
    "&:hover, &:focus": {
      backgroundColor: "var(--orange-color)",
    },
    border: "1px solid var(--orange-color)",
    color: "var(--main-color-regular)",
    fontWeight: "bold",
  },
  termsText: {
    marginTop: "3px",
    fontSize: "13px",
  },
  alert: {
    margin: "1.5rem 0",
    textAlign: "center",
  },
});

export default function SignUp() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [terms, setTerms] = useState({ isAgreed: false, firstEntry: true });
  const [message, setMessage] = useState("");
  const [emailInput, setEmailInput] = useState<string>();
  const [passwordInput, setPasswordInput] = useState<string>();
  const [passwordConfirmInput, setPasswordConfirmInput] = useState<string>();
  const [emailValue] = useDebounce(emailInput, 500);
  const [passwordValue] = useDebounce(passwordInput, 500);
  const [passwordConfirmValue] = useDebounce(passwordConfirmInput, 500);
  const [triesNum, setTriesNum] = useState(0);
  const user = useSelector((state: stateType) => state.user);

  const signUpHandler = (e: any) => {
    e.preventDefault();
    setMessage("");
    if (!terms.isAgreed) {
      return setMessage("You must agree to our terms of use.");
    }
    if (passwordValue !== passwordConfirmValue) {
      return setMessage("Password do not match.");
    }
    if (emailValue && passwordValue) {
      dispatch(signUp(emailValue, passwordValue));
      setTriesNum((n) => n + 1);
    }
  };

  return (
    <AuthCard>
      <Card.Body>
        <h2 className="text-center mb-3">Sign-Up</h2>
        <Divider className={classes.divider} />

        <Form onSubmit={signUpHandler}>
          <Form.Group id="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              autoComplete="username"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setEmailInput(e.target.value)
              }
              className={classes.input}
              required
            />
          </Form.Group>
          <Form.Group id="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              autoComplete="new-password"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setPasswordInput(e.target.value)
              }
              className={classes.input}
              required
            />
          </Form.Group>
          <Form.Group id="password-confirm">
            <Form.Label>Password confirm</Form.Label>
            <Form.Control
              type="password"
              autoComplete="new-password"
              className={classes.input}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setPasswordConfirmInput(e.target.value)
              }
              required
            />
          </Form.Group>
          <Grid item container alignItems="center">
            <Radio
              checked={terms.isAgreed ? true : false}
              size="small"
              onClick={() =>
                setTerms((ps) => ({
                  isAgreed: !ps.isAgreed,
                  firstEntry: false,
                }))
              }
            />
            <span className={classes.termsText}>
              {" "}
              By signing you agree to our{" "}
            </span>
            <Terms setTerms={setTerms} />
          </Grid>
          {message.length > 0 && (
            <Alert variant="danger" className={classes.alert}>
              {message}
            </Alert>
          )}
          {user.error.length > 0 && (
            <Alert variant="danger" className={classes.alert}>
              {user.error}
            </Alert>
          )}
          <Button
            disabled={!emailValue || !passwordValue || triesNum >= 3}
            type="submit"
            className={`w-100 button ${classes.signUpButton}`}
          >
            {user.loading ? "Loading.." : "Sign-Up"}
          </Button>
        </Form>
      </Card.Body>
      <div className="w-100 text-center mt-2">
        Already have an account?{" "}
        <Link to="/login" style={{ color: "var(--blue-color)" }}>
          Log in
        </Link>
      </div>
    </AuthCard>
  );
}
