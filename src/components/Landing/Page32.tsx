import friendlyGifVideo from "../../assets/images/consultation.mp4";
import timeGifVideo from "../../assets/images/time3.mp4";

import { Grid } from "@material-ui/core";

export const Page3 = () => {
  return (
    <Grid
      item
      container
      lg={9}
      md={9}
      sm={9}
      xs={9}
      style={{ minHeight: "82vh" }}
      alignItems="center"
    >
      <Grid
        item
        container
        lg={5}
        md={12}
        sm={12}
        xs={12}
        className="center mt-3"
      >
        <div>
          <h1
            style={{
              textDecoration: "underline",
              textDecorationColor: "var(--orange-color)",
              fontSize: "clamp(1.65rem, 5vw, 2.5rem)",
            }}
          >
            Timing
          </h1>
        </div>
        <div
          className="mt-3"
          style={{
            width: "90%",
            fontSize: "clamp(0.8rem, 2vw, 1.3rem)",
            color: "rgb(180,180,180)",
          }}
        >
          Get an access to more than 11,000 real time data sources including
          social media platforms to make sure you will be the
          <span style={{ color: "var(--orange-color)" }}> First to know </span>
          when something happens.
        </div>
      </Grid>
      <Grid item lg={3} md={12} sm={12} xs={12}></Grid>
      <Grid
        item
        container
        className="center mt-3"
        lg={4}
        md={12}
        sm={12}
        xs={12}
      >
        <video
          src={timeGifVideo}
          loop
          autoPlay={true}
          height={170}
          width={170}
          muted
        />
      </Grid>{" "}
      <Grid item lg={5} md={12} sm={12} xs={12} className="center hide-small">
        <video
          src={friendlyGifVideo}
          loop
          autoPlay={true}
          height={170}
          width={170}
          muted
        />
      </Grid>
      <Grid item lg={2} md={12} sm={12} xs={12}></Grid>
      <Grid item container lg={5} md={12} sm={12} xs={12} className="center">
        <h1
          style={{
            textDecoration: "underline",
            textDecorationColor: "var(--purple-color)",
            fontSize: "clamp(1.65rem, 5vw, 2.5rem)",
          }}
        >
          User Friendly
        </h1>
        <div
          className="mt-3"
          style={{
            width: "90%",
            fontSize: "clamp(0.8rem, 2vw, 1.3rem)",
            color: "rgb(180,180,180)",
          }}
        >
          Stop using complicated platforms. Let us do the hard work for you and
          provide data at the
          <span style={{ color: "var(--purple-color)" }}> Simplest</span> way.
        </div>
      </Grid>
      <Grid item lg={5} md={12} sm={12} xs={12} className="hide-big center">
        {" "}
        <video
          src={friendlyGifVideo}
          loop
          autoPlay={true}
          height={170}
          width={170}
          muted
        />
      </Grid>
    </Grid>
  );
};
