import { useEffect, useState } from "react";
import logo from "../assets/images/logo.png";
import Fade from "@material-ui/core/Fade";

export const LoadingPage = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading((ps) => !ps);
    }, 1500);
    return () => clearTimeout(timer);
  }, [loading]);

  return (
    <div
      style={{
        backgroundColor: "black",
        textAlign: "center",
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
      }}
    >
      {loading ? (
        <Fade timeout={4000} in={false}>
          <img src={logo} alt="Loading logo" width="180" />
        </Fade>
      ) : (
        <Fade timeout={1000} in={true}>
          <img src={logo} alt="Loading logo" width="180" />
        </Fade>
      )}
    </div>
  );
};
