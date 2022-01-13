import { useRef, useState, useEffect } from "react";
import { Card, Button, Form, Alert } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { resetPassword } from "../redux/slices/user";
import { AuthCard } from "../components/UI/AuthCard";
const ForgotPassword = () => {
  const emailRef = useRef<HTMLInputElement>(null);
  const [message, setMessage] = useState("");
  const [isEmailSent, setIsEmailSent] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((state: stateType) => state.user);

  const resetPasswordHandler = (e: any) => {
    e.preventDefault();
    setIsEmailSent(false);
    setMessage("");
    if (emailRef?.current) {
      dispatch(resetPassword(emailRef.current.value));
      setIsEmailSent(true);
    }
  };

  useEffect(() => {
    if (
      !user.error.length &&
      !user.loading &&
      !user.firstEntry &&
      isEmailSent
    ) {
      setMessage("Check your inbox for further instructions");
    }
  }, [user, isEmailSent]);

  return (
    <AuthCard>
      <Card.Body>
        <h2 className="text-center mb-4">Password Reset</h2>
        {user.error && <Alert variant="danger">{user.error}</Alert>}
        {message && <Alert variant="success">{message}</Alert>}
        <Form onSubmit={resetPasswordHandler}>
          <Form.Group id="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              ref={emailRef}
              required
              style={{
                backgroundColor: "var(--input-color)",
                color: "white",
              }}
            />
          </Form.Group>

          <Button disabled={user.loading} type="submit" className="w-100">
            Reset Password{" "}
          </Button>
        </Form>
        <div className="w-100 text-center mt-3">
          <Link to="/login">Login</Link>
        </div>
      </Card.Body>
      <div className="w-100 text-center mt-2">
        Need an account ? <Link to="./signup">Sign Up</Link>
      </div>
    </AuthCard>
  );
};
export default ForgotPassword;
