import { lazy } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { Home } from "../pages/Landing";
import { PrivateRoute } from "./Private";

import { LoadingPage } from "../pages/Loading";

const NotFound = lazy(() => import("../pages/404"));
const SignUp = lazy(() => import("../pages/SignUp"));
const Login = lazy(() => import("../pages/Login"));
const ForgotPassword = lazy(() => import("../pages/ForgotPassword"));
const UpdateProfile = lazy(() => import("../pages/UpdateProfile"));
const TrackerPage = lazy(() => import("../pages/MainPage"));
const Disclaimer = lazy(() => import("../pages/Disclaimer2"));
const DashBoard = lazy(() => import("../pages/DashBoard"));
const OneTweet = lazy(() => import("../pages/OneTweet"));

interface Props {
  loading: boolean;
  error: any;
  user: any;
}

export const Routes = (props: Props) => {
  const { loading, error, user } = props;
  return (
    <Switch>
      <Route exact path="/">
        {loading && <LoadingPage />}
        {error && <Home />}
        {!loading && !user?.email && <Redirect to="/home" />}
        {!loading && user?.email && <Redirect to="/feed" />}
      </Route>
      <Route exact path="/home" component={Home} />
      <Route exact path="/signup" component={SignUp} />
      <Route exact path="/disclaimer" component={Disclaimer} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/forgot-password" component={ForgotPassword} />
      <Route exact path="/social/:name/:words?" component={OneTweet} />
      <PrivateRoute
        exact
        path="/feed"
        component={TrackerPage}
        user={user}
        loading={loading}
        error={error}
      />
      <PrivateRoute
        exact
        path="/dash-board"
        component={DashBoard}
        user={user}
        loading={loading}
        error={error}
      />
      <PrivateRoute
        exact
        path="/update-profile"
        component={UpdateProfile}
        user={user}
        loading={loading}
        error={error}
      />
      <Route path="*" component={NotFound} />
    </Switch>
  );
};
