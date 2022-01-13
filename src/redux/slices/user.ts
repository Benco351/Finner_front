import { createSlice, Dispatch } from "@reduxjs/toolkit";
import { auth } from "../../assets/firebase.js";
import { setSnackBar } from "./snackbar";
import { setLists } from "./userLists";
import { setWatchListNews } from "./watchListNews";

const userInitialState = {
  email: "",
  token: "",
  loading: false,
  error: "",
  firstEntry: true,
};

export const login = (email: string, password: string) => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(setUser({ loading: true, error: "", firstEntry: false }));
      const response: any = await auth.signInWithEmailAndPassword(
        email,
        password
      );
      const userToken = await response?.user?.getIdToken(true);
      if (!response?.user?.email || !userToken) {
        dispatch(
          setUser({
            loading: false,
            error: "Email or password are incorrect.",
          })
        );
      } else {
        dispatch(setLists(response.data.lists));
        dispatch(setWatchListNews(response.data.watchListArticles));
        dispatch(
          setUser({
            loading: false,
            email: response.user.email,
            token: userToken,
            error: "",
          })
        );
        setSnackBar({
          snackbarOpen: true,
          snackbarType: "success",
          snackbarMessage: `Welcome aboard ${response.user.email}.`,
        });
      }
    } catch (err) {
      dispatch(
        setUser({
          loading: false,
          error: "Email or password are incorrect.",
        })
      );
    }
  };
};

///Remove all user data and lists

export const logOut = () => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(
        setUser({
          loading: true,
          error: "",
          firstEntry: true,
        })
      );
      await auth.signOut();
      dispatch(
        setUser({
          loading: false,
          email: "",
          token: "",
          error: "",
        })
      );
    } catch (err) {
      dispatch(
        setUser({
          loading: false,
          error: "Logout failed.",
        })
      );
    }
  };
};

export const signUp = (email: string, password: string) => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(
        setUser({
          loading: true,
          error: "",
          firstEntry: true,
        })
      );
      const response = await auth.createUserWithEmailAndPassword(
        email,
        password
      );
      const userToken = await response?.user?.getIdToken(true);
      if (!response?.user?.email || !userToken) {
        dispatch(
          setUser({
            loading: false,
            error: "Sign Up Failed, Maybe email already exists.",
          })
        );
      } else {
        dispatch(
          setUser({
            loading: false,
            email: response.user.email,
            token: userToken,
            error: "",
          })
        );
      }
    } catch (err) {
      dispatch(
        setUser({
          loading: false,
          error: "Sign Up Failed.",
        })
      );
    }
  };
};

export const resetPassword = (email: string) => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(
        setUser({
          loading: true,
          error: "",
          firstEntry: true,
        })
      );
      await auth.sendPasswordResetEmail(email);
      dispatch(
        setUser({
          loading: false,
          error: "",
        })
      );
    } catch (err) {
      dispatch(
        setUser({
          loading: false,
          error: "Email has not been sent, Password reset failed.",
        })
      );
    }
  };
};
export const updatePassword = (password: string) => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(
        setUser({
          loading: true,
          error: "",
          firstEntry: true,
        })
      );
      if (!auth.currentUser) {
        dispatch(
          setUser({
            loading: false,
            error: "Password reset failed.",
          })
        );
      } else {
        await auth.currentUser.updatePassword(password);
        dispatch(
          setUser({
            loading: false,
            error: "",
          })
        );
      }
    } catch (err) {
      dispatch(
        setUser({
          loading: false,
          error: "Password reset failed.",
        })
      );
    }
  };
};

export const updateEmail = (email: string) => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(
        setUser({
          loading: true,
          error: "",
          firstEntry: true,
        })
      );
      if (!auth.currentUser) {
        dispatch(
          setUser({
            loading: false,
            error: "Email has not been updated successfully.",
          })
        );
      } else {
        await auth.currentUser.updateEmail(email);
        dispatch(
          setUser({
            loading: false,
            error: "",
          })
        );
      }
    } catch (err) {
      dispatch(
        setUser({
          loading: false,
          error: "Email has not been updated successfully.",
        })
      );
    }
  };
};

const userSlice = createSlice({
  name: "set-user-data",
  initialState: userInitialState,
  reducers: {
    setUser(state: any, action: userType) {
      return { ...state, ...action.payload };
    },
  },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
