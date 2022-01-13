import { Component, ErrorInfo, ReactNode } from "react";
import { Grid } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import logo from "../assets/images/logo.png";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(_: Error): State {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {}

  public render() {
    if (this.state.hasError) {
      return (
        <Grid
          container
          justify="center"
          direction="column"
          alignContent="center"
          alignItems="center"
          style={{ height: "93vh" }}
        >
          <img
            src={logo}
            alt=""
            style={{ height: "80px", marginBottom: "100px" }}
          />
          <h3>Something.. went wrong!</h3>
          <Button
            variant="outlined"
            style={{
              backgroundColor: "var(--orange-color)",
              textDecoration: "none",
            }}
            className="mt-3 button"
            onClick={() => window.location.reload()}
          >
            go back
          </Button>
        </Grid>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
