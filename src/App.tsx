import { Routes } from "./routes/Routes";
import { Page } from "./layout/Page";
import { useCallback, useEffect } from "react";
import { auth } from "./assets/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useDispatch } from "react-redux";
import { getUserData } from "./redux/slices/login";
import ErrorBoundary from "./components/ErrorBoundary";

export const App = () => {
  const [user, loading, error] = useAuthState(auth);
  const dispatch = useDispatch();
  const setToken = useCallback(
    (user: any) => {
      user.getIdToken(true).then((token: string) => {
        dispatch(getUserData(user.email, token));
      });
    },
    [dispatch]
  );

  useEffect(() => {
    if (loading || error || !user?.email) return;
    setToken(user);
  }, [loading, user, error, setToken]);

  return (
    <ErrorBoundary>
      <Page email={user?.email}>
        <Routes loading={loading} user={user} error={error} />
      </Page>
    </ErrorBoundary>
  );
};
