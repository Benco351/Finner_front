import { useState, useRef, useCallback } from "react";
import screen from "../../assets/images/screen.png";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import ReactGa from "react-ga";
import { useDispatch } from "react-redux";
import { setSnackBar } from "../../redux/slices/snackbar";
import useAxios from "../../hooks/axios";
import { serverUrl } from "../../assets/text/urls";
import * as EmailValidator from "email-validator";

const useStyles = makeStyles({
  mainTitle: {
    fontSize: "clamp(1.45rem, 3.7vw, 2.45rem)",
  },
  secondTitle: {
    color: "var(--orange-color)",
    fontSize: "clamp(1.35rem, 3.5vw, 2.28rem)",
  },
  image: {
    height: "50%",
    maxWidth: "95%",
    boxShadow:
      "0 19px 38px rgba(81,81,81,0.30), 0 15px 12px rgba(81,81,81,0.22)",
  },
  errors: {
    color: "var(--grey-color)",
    fontSize: "1rem",
    marginTop: "30px",
  },
  betaButton: {
    backgroundColor: "var(--orange-color)",
    color: "rgb(220,220,220)",
    height: "40px",
    fontWeight: "bold",
    border: "1px solid rgb(41,41,41)",
    fontSize: "clamp(0.6rem, 2.5vw, 0.95rem)",
    marginLeft: "30px",
    "&:hover": {
      backgroundColor: "var(--orange-color)",
      opacity: 0.7,
    },
  },
});

export const Page1 = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [isValid, setIsValid] = useState("");
  const emailRef = useRef<HTMLInputElement>(null);

  const emailResponse = useCallback(
    (res: any) => {
      const payload: setSnackbarType = {
        snackbarOpen: true,
        snackbarType: "success",
        snackbarMessage: res?.data?.message,
      };
      dispatch(setSnackBar(payload));
      ReactGa.event({
        category: "Button",
        action: "First Beta button",
      });
    },
    [dispatch]
  );

  const {
    isLoading,
    error,
    sendRequest: sendEmail,
  } = useAxios(
    {
      url: `${serverUrl}/beta`,
      method: "post",
      body: { email: emailRef?.current?.value },
    },
    emailResponse
  );

  const emailHandler = () => {
    if (emailRef?.current?.value) {
      const isValid = EmailValidator.validate(emailRef.current.value);
      if (isValid) {
        setIsValid("");
        sendEmail();
      } else {
        setIsValid("Please enter a valid email address.");
      }
    }
  };

  return (
    <Grid
      item
      container
      md={10}
      xs={12}
      style={{ minHeight: "92vh", paddingTop: "30px" }}
    >
      <Grid
        item
        container
        lg={6}
        md={12}
        alignItems="center"
        alignContent="center"
        direction="column"
        justify="center"
        className="center"
      >
        <Grid
          item
          container
          alignItems="center"
          alignContent="center"
          direction="column"
          justify="center"
          className="center"
        >
          <h1 className={classes.mainTitle}>Real Time Stock Tracker</h1>
          <h1 className={classes.secondTitle}>Anywhere, Anytime.</h1>

          <div
            className="mt-5"
            style={{ fontSize: "clamp(0.9rem, 2.5vw, 1.3rem)" }}
          >
            Use keywords and symbols for real time news customization.{" "}
          </div>
          <div style={{ fontSize: "clamp(0.9rem, 2.5vw, 1.3rem)" }}>
            Get a Hedge-Fund's tool to gain your edge.
          </div>
        </Grid>

        <Grid
          item
          container
          direction="row"
          justify="center"
          style={{ marginTop: "80px" }}
        >
          <input
            autoComplete="email"
            ref={emailRef}
            placeholder="Enter your email address"
            className="marketing-input white-button"
            style={{
              width: "clamp(210px, 13vw, 400px)",
              height: "38px",
              borderRadius: "4px",
            }}
          />
          <Button
            variant="outlined"
            className={classes.betaButton}
            onClick={emailHandler}
            disabled={isLoading}
          >
            join beta{" "}
          </Button>
        </Grid>
        <span className={classes.errors}>
          {error && isValid.length === 0 && error}
          {isValid.length > 0 && isValid}
        </span>
      </Grid>
      <Grid
        item
        container
        lg={6}
        md={12}
        alignContent="center"
        justify="center"
        className="center"
      >
        <img
          src={screen}
          alt="loading..."
          className={`rounded ${classes.image}`}
        />
      </Grid>
    </Grid>
  );
};
