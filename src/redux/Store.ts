import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/user";
import snackBarSlice from "./slices/snackbar";
import watchListSlice from "./slices/watchListNews";
import userDataSlice from "./slices/login";
import userListsSlice from "./slices/userLists";

const reducer = {
  user: userSlice,
  snackbar: snackBarSlice,
  userData: userDataSlice,
  watchLists: userListsSlice,
  watchListFeed: watchListSlice,
};

const store = configureStore({ reducer });

export default store;
