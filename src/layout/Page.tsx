import { Suspense } from "react";

import AuthHeader from "./AuthHeader";
import Header from "./LandingHeader";
import { Loading } from "../components/UI/Loading";
import { BrowserRouter as Router } from "react-router-dom";
import Analytics from "react-router-ga";
import { AppHelmet } from "../helmet/AppHelmet";
import { ThemeProvider, createTheme } from "@material-ui/core/styles";
import Snackbar from "../components/info/toast2";

export const Page = (props: any) => {
  const { email } = props;
  const theme = createTheme({
    palette: {
      type: "dark",
      primary: {
        main: "rgb(41,41,41)",
      },
      secondary: {
        main: "#1DA1F2",
      },
    },
  });
  return (
    <div style={{ overflow: "hidden", boxSizing: "border-box" }}>
      <ThemeProvider theme={theme}>
        <Snackbar />
        <Router>
          <AppHelmet />
          {email ? <AuthHeader /> : <Header />}
          <div style={{ marginTop: 50 }}></div>
          <Suspense fallback={<Loading />}>
            <Analytics id="UA-197690006-2">{props.children}</Analytics>
          </Suspense>
        </Router>
      </ThemeProvider>
    </div>
  );
};
