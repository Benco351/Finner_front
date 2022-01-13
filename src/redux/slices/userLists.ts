import { createSlice, Dispatch } from "@reduxjs/toolkit";
import { setSnackBar } from "./snackbar";
import { serverUrl } from "../../assets/text/urls";
import axios from "axios";
import { axiosError } from "../../helpers/axiosError";
const words: string[] = [];
const lists: list[] = [];
const currentList = { title: "", words: words } as list;

interface props {
  loading?: boolean;
  error?: string;
  watchLists?: list[];
  currentList?: list;
  watchListSearch?: {
    symbols: boolean;
    words: boolean;
  };
}

const initialUserData: props = {
  loading: false,
  error: "",
  watchLists: lists,
  currentList,
  watchListSearch: {
    symbols: true,
    words: true,
  },
};
interface listResponse {
  data: { watchLists: list[] };
}

export const addListHandler = ({
  title,
  email,
  token,
}: {
  title: string;
  email: string;
  token: string;
}) => {
  return async (dispatch: Dispatch) => {
    dispatch(setLists({ loading: true, error: "" }));
    try {
      const addList = async () => {
        return await axios.post(`${serverUrl}/watch-list/list`, {
          title,
          email,
          token,
        });
      };
      const { data }: listResponse = await addList();
      const updatedLists: list[] = data.watchLists;
      dispatch(
        setLists({
          loading: false,
          error: "",
          watchLists: updatedLists,
          currentList: updatedLists[updatedLists.length - 1],
        })
      );
      dispatch(
        setSnackBar({
          snackbarOpen: true,
          snackbarType: "success",
          snackbarMessage: `${title} list was added successfully`,
        })
      );
    } catch (err) {
      const errorMsg = axiosError(err);
      dispatch(
        setSnackBar({
          snackbarOpen: true,
          snackbarType: "error",
          snackbarMessage: "Internal server error",
        })
      );
      dispatch(
        setLists({
          loading: false,
          error: "There was an error adding the list.",
        })
      );
    }
  };
};

export const deleteListHandler = ({
  title,
  email,
  token,
}: {
  title: string;
  email: string;
  token: string;
}) => {
  return async (dispatch: Dispatch) => {
    dispatch(setLists({ loading: true, error: "" }));
    try {
      const deleteList = async () => {
        return await axios.delete(`${serverUrl}/watch-list/list`, {
          data: {
            title: title,
            email: email,
            token: token,
          },
        });
      };
      const { data }: listResponse = await deleteList();
      const updatedLists: list[] = data.watchLists;
      dispatch(
        setLists({
          loading: false,
          error: "",
          watchLists: updatedLists,
          currentList: updatedLists[0],
        })
      );
      dispatch(
        setSnackBar({
          snackbarOpen: true,
          snackbarType: "success",
          snackbarMessage: `${title} list was deleted successfully`,
        })
      );
    } catch (err) {
      dispatch(
        setLists({
          loading: false,
          error: "There was an error deleting the list.",
        })
      );
      dispatch(
        setSnackBar({
          snackbarOpen: true,
          snackbarType: "error",
          snackbarMessage: `Internal server error`,
        })
      );
    }
  };
};

export const editListHandler = ({
  oldTitle,
  newTitle,
  words,
  email,
  token,
}: {
  oldTitle: string;
  newTitle: string;
  words: string[];
  email: string;
  token: string;
}) => {
  return async (dispatch: Dispatch) => {
    dispatch(setLists({ loading: true, error: "" }));
    try {
      const editList = async () => {
        console.log(oldTitle, newTitle, words, email, token);
        return await axios.patch(`${serverUrl}/watch-list/list`, {
          oldTitle,
          newTitle,
          email,
          updatedWords: words,
          token,
        });
      };
      const { data }: listResponse = await editList();
      const updatedLists: list[] = data.watchLists;
      const currentList = updatedLists.filter(
        (list) => list.title === newTitle
      );
      dispatch(
        setLists({
          loading: false,
          error: "",
          watchLists: updatedLists,
          currentList: currentList[0],
        })
      );
      dispatch(
        setSnackBar({
          snackbarOpen: true,
          snackbarType: "success",
          snackbarMessage: `${newTitle} list was edited successfully`,
        })
      );
    } catch (err) {
      const errorMsg = axiosError(err);
      console.log(errorMsg);
      console.log(err);
      dispatch(
        setLists({
          loading: false,
          error: "There was an error editing the list.",
        })
      );
      dispatch(
        setSnackBar({
          snackbarOpen: true,
          snackbarType: "error",
          snackbarMessage: `Internal server error`,
        })
      );
    }
  };
};

const userListsSlice = createSlice({
  name: "set-user-data",
  initialState: initialUserData,
  reducers: {
    setLists(state, action: { payload: props }) {
      return { ...state, ...action.payload };
    },
  },
});

export const { setLists } = userListsSlice.actions;
export default userListsSlice.reducer;
