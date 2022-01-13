import { createSlice, Dispatch } from "@reduxjs/toolkit";
import { serverUrl } from "../../assets/text/urls";

import axios from "axios";

const news: Tweet[] = [];
interface watchListNews {
  loading: boolean;
  error: string;
  news: Tweet[];
}

interface action {
  payload: {
    loading?: boolean;
    error?: string;
    news?: Tweet[];
  };
}

const watchListFeed: watchListNews = {
  loading: false,
  error: "",
  news,
};

export const getWatchListHandler = ({
  token,
  watchListSearch,
  currentList,
}: {
  token: string;
  watchListSearch: { words: boolean; symbols: boolean };
  currentList: list;
}) => {
  return async (dispatch: Dispatch) => {
    dispatch(setWatchListNews({ loading: true, error: "" }));
    try {
      const getWatchList = async () => {
        return await axios.post(`${serverUrl}/watch-list/news`, {
          token,
          watchListSearch,
          currentList: currentList.words,
        });
      };
      const response: any = await getWatchList();
      console.log(response);
      dispatch(
        setWatchListNews({
          loading: false,
          error: "",
          news: response.data.news,
        })
      );
    } catch (error: any) {
      let errorMsg;
      if (error.response) errorMsg = error.response;
      else if (error.request) errorMsg = error.request;
      else if (error.message) errorMsg = error.message;
      dispatch(
        setWatchListNews({
          loading: false,
          error: errorMsg,
        })
      );
    }
  };
};

const watchListNewsSlice = createSlice({
  name: "set_watch_list",
  initialState: watchListFeed,
  reducers: {
    setWatchListNews(state: any, action: action) {
      const newData = action.payload;
      return { ...state, ...newData };
    },
  },
});

export const { setWatchListNews } = watchListNewsSlice.actions;
export default watchListNewsSlice.reducer;
