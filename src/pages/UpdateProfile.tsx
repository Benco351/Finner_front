import { useRef, useState, useEffect } from "react";
import { Card, Button, Form, Alert } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { updatePassword } from "../redux/slices/user";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { AuthCard } from "../components/UI/AuthCard";

const useStyles = makeStyles({
  input: {
    backgroundColor: "var(--input-color)",
    color: "white",
  },
});

export default function UpdateProfile() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [error, setError] = useState("");
  const user = useSelector((state: stateType) => state.user);
  const passwordRef = useRef<HTMLInputElement>(null);
  const passwordConfirmRef = useRef<HTMLInputElement>(null);

  const signUpHandler = (e: any) => {
    e.preventDefault();
    setError("");
    if (passwordRef.current !== null && passwordConfirmRef.current !== null) {
      if (passwordRef.current.value === passwordConfirmRef.current.value) {
        dispatch(updatePassword(passwordRef.current.value));
      } else {
        setError("Password do not match...");
      }
    } else {
      setError("One of the fields is empty...");
    }
  };

  useEffect(() => {
    if (user.error) {
      setError(user.error);
    }
  }, [user.error]);

  return (
    <AuthCard>
      <Card.Body>
        <h2 className="text-center mb-4">Update password</h2>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={signUpHandler}>
          <Form.Group id="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              disabled
              required
              defaultValue={user.email}
              style={{
                backgroundColor: "var(--main-color-light)",
                color: "grey",
              }}
            />
          </Form.Group>
          <Form.Group id="password">
            <Form.Label>New password</Form.Label>
            <Form.Control
              type="password"
              ref={passwordRef}
              required
              className={classes.input}
              // placeholder="Leave blank to keep the same"
            />
          </Form.Group>
          <Form.Group id="password-confirm">
            <Form.Label>New password confirm</Form.Label>
            <Form.Control
              type="password"
              ref={passwordConfirmRef}
              required
              className={classes.input}
            />
          </Form.Group>
          <Button disabled={user.loading} type="submit" className="w-100">
            Update{" "}
          </Button>
        </Form>
      </Card.Body>
      <div className="w-100 text-center mt-2">
        <Link to="/dash-board">Cancel</Link>
      </div>
    </AuthCard>
  );
}
