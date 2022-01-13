import React, { useEffect } from "react";
////styling///
import { Card, Button } from "react-bootstrap";
import { AuthCard } from "../components/UI/AuthCard";
import Tooltip from "@material-ui/core/Tooltip";
///router///
import { Link, useHistory } from "react-router-dom";
///redux///
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../redux/slices/user";

const DashBoard = () => {
  const user = useSelector((state: stateType) => state.user);
  const dispatch = useDispatch();
  const history = useHistory();

  const logoutHandler = () => dispatch(logOut);

  useEffect(() => {
    if (
      !user.email.length &&
      !user.token.length &&
      !user.error.length &&
      !user.loading
    ) {
      history.push("/login");
    }
  }, [user, history]);

  return (
    <AuthCard>
      <Card
        style={{ backgroundColor: "var(--main-color-regular)" }}
        text="light"
      >
        <Card.Body>
          <h2 className="text-center mb-4"> Profile </h2>
          {/* {error && <Alert variant="danger"> {error} </Alert>} */}
          <strong> Email : {user?.email} </strong>
          <Tooltip title="Coming soon..">
            <Link
              to="/update-profile"
              className="btn w-100 mt-3"
              style={{
                backgroundColor: "var(--orange-color)",
                color: "white",
              }}
            >
              <Button
                disabled
                style={{
                  padding: "0px",
                  backgroundColor: "var(--orange-color)",
                  border: "0px solid white",
                }}
              >
                Update Profile
              </Button>
            </Link>
          </Tooltip>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        <Button
          variant="link"
          onClick={logoutHandler}
          style={{ fontWeight: "bold", color: "var(--blue-color)" }}
        >
          Log Out
        </Button>
      </div>
    </AuthCard>
  );
};
export default DashBoard;
