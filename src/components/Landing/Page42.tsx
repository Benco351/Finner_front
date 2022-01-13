import { useState, useRef, useCallback } from "react";
import { useDispatch } from "react-redux";
import { setSnackBar } from "../../redux/slices/snackbar";
import { Grid } from "@material-ui/core";
import { ControlledCarousel } from "./ReviewCard2";
import { FAQ } from "./FaqCard2";
import { faq } from "../../assets/text/faq";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import ReactGa from "react-ga";
import useAxios from "../../hooks/axios";
import Rocket from "../UI/Rocket";
import * as EmailValidator from "email-validator";
import { serverUrl } from "../../assets/text/urls";

export const Page4 = () => {
  const dispatch = useDispatch();
  const rocket = {
    maxWidth: "80px",
    minWidth: "40px",
    position: "relative",
    top: "0",
    height: 100,
  };

  const emailRef = useRef<HTMLInputElement>(null);
  const [isValid, setIsValid] = useState("");

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
      lg={9}
      md={10}
      sm={10}
      xs={11}
      style={{ minHeight: "94vh" }}
      alignItems="center"
    >
      <Grid item lg={12} xs={12} className="mb-5">
        {" "}
        <h1
          className="text-center mt-4"
          style={{ fontSize: "clamp(1.2rem, 7vw, 2.5rem)" }}
        >
          Community Feedbacks
        </h1>
      </Grid>
      <Grid
        item
        lg={6}
        md={10}
        sm={10}
        xs={11}
        container
        justify="center"
        className="m-auto"
      >
        <ControlledCarousel />
      </Grid>
      <Grid
        item
        container
        lg={12}
        md={12}
        sm={12}
        xs={12}
        className="rounded"
        style={{
          backgroundColor: "rgb(11, 11, 11)",
          border: "1px solid var(--orange-color)",
          marginTop: "5vh",
          padding: "0vw 0vw 3vh 0vw",
        }}
        direction="column"
        alignItems="center"
      >
        <h2
          className="text-center mt-4"
          style={{ fontSize: "clamp(1.2rem, 3vw, 1.8rem)" }}
        >
          Join Beta now.{" "}
        </h2>
        <h5
          className="text-center "
          style={{ fontSize: "clamp(0.7rem, 1.3vw, 1.2rem)" }}
        >
          No obligation or credit card is required.
        </h5>
        <Grid
          item
          container
          lg={7}
          md={8}
          sm={10}
          xs={12}
          direction="row"
          className="mt-1"
          justify="center"
        >
          <div className="hide-rockets pr-4">
            <Rocket styles={rocket} />{" "}
          </div>

          <input
            autoComplete="email"
            placeholder="Enter your email address"
            className="marketing-input mt-4"
            ref={emailRef}
            style={{ width: "clamp(210px, 10vw, 400px)", height: "40px" }}
          ></input>
          <Button
            variant="outlined"
            className="button ml-2 mt-4"
            style={{
              backgroundColor: "var(--orange-color)",
              color: "rgb(220,220,220)",
              fontWeight: "bold",
              height: "40px",
              border: "1px solid rgb(41,41,41)",
              fontSize: "clamp(0.6rem, 2.5vw, 0.95rem)",
            }}
            onClick={emailHandler}
            disabled={isLoading}
          >
            JOIN BETA
          </Button>
          <div className="hide-rockets pl-4">
            <Rocket styles={rocket} />
          </div>
        </Grid>
        <span style={{ color: "var(--grey-color)" }} className="center">
          {error && isValid.length === 0 && error}
          {isValid.length > 0 && isValid}
        </span>
      </Grid>
      <div style={{ width: "100%", textAlign: "center", paddingTop: "80px" }}>
        <h1>FAQs</h1>
        {faq.map((data, index) => (
          <FAQ data={data} key={index} />
        ))}
      </div>
      <Grid
        item
        lg={10}
        md={10}
        sm={10}
        xs={10}
        container
        justify="center"
        className="m-auto"
      />
      <Grid
        item
        container
        justify="center"
        alignItems="center"
        direction="column"
      >
        <Link to="/disclaimer" style={{ color: "grey" }}>
          Finner Disclaimer
        </Link>

        <a
          href="https://lordicon.com/"
          style={{
            color: "rgb(34,34,34)",
            justifySelf: "center",
            textDecoration: "none",
          }}
          target="_blank"
          rel="noreferrer"
        >
          Animated icons by Lordicon.com
        </a>
      </Grid>
    </Grid>
  );
};
