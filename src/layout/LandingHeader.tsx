import logo from "../assets/images/logo.png";
///Material///
import { AppBar, Toolbar } from "@material-ui/core";
import Button from "@material-ui/core/Button";
///Redux///
import { withRouter } from "react-router-dom";
const LandingHeader = (props: any) => {
  const { history } = props;
  const handleMenuClick = (pageURL: string) => {
    if (pageURL === "/home") {
      window.scrollTo(0, 0);
    }
    history.push(pageURL);
  };

  return (
    <AppBar
      position="fixed"
      style={{ backgroundColor: "var(--main-color-dark)" }}
    >
      <Toolbar
        style={{ minWidth: "77%", alignSelf: "center", display: "flex" }}
      >
        <img
          src={logo}
          alt="Finner icon"
          className="cursor"
          width={155}
          height={36.1}
          onClick={() => handleMenuClick("/home")}
        />
        <div style={{ flex: 1 }}></div>
        <Button
          className="mr-3 button"
          style={{
            backgroundColor: "var(--orange-color)",
            fontSize: "clamp(0.5rem, 2.5vw, 0.9rem)",
            minWidth: "70px",
            marginLeft: "30px",
          }}
          onClick={() => handleMenuClick("/home")}
        >
          Join Beta
        </Button>
        <Button
          className="button"
          style={{
            backgroundColor: "var(--input-color)",
            fontSize: "clamp(0.5rem, 2.5vw, 0.9rem)",
          }}
          onClick={() => handleMenuClick("/login")}
        >
          Sign in
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default withRouter(LandingHeader);
