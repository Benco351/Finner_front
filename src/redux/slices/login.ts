import axios from "axios";
import { createSlice, Dispatch } from "@reduxjs/toolkit";
import { setLists } from "./userLists";
import { setWatchListNews } from "./watchListNews";
import { serverUrl } from "../../assets/text/urls";
import { setUser } from "./user";

interface props {
  currentSymbol?: {
    symbol: string;
    show: boolean;
  };
  isMarketOpen?: {
    marketIsOpen: boolean;
    tradingHours: boolean;
  };
  sound?: any;
  latestNews?: Tweet[] | Tweet;
  trendingSymbols?: string[];
  symbolsAndPrices?: symbolAndPrice;

  error?: string;
  firstEntry?: boolean;
  loading?: boolean;
}

const userDataInitialState: props = {
  currentSymbol: {
    symbol: "TSLA",
    show: true,
  },
  isMarketOpen: {
    marketIsOpen: true,
    tradingHours: true,
  },
  sound: null,
  latestNews: [],
  trendingSymbols: [],
  symbolsAndPrices: {},
  error: "",
  firstEntry: true,
  loading: false,
};

export const getUserData = (email: string, token: string) => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(
        setUserData({
          loading: true,
          error: "",
          firstEntry: false,
        })
      );
      dispatch(setUser({ firstEntry: false, email, token }));
      const { data } = await axios.post(`${serverUrl}/login-data`, {
        email,
        token,
      });
      dispatch(
        setLists({ watchLists: data.lists, currentList: data.lists[0] })
      );
      dispatch(setWatchListNews({ news: data.watchlistNews }));
      dispatch(
        setUserData({
          isMarketOpen: {
            marketIsOpen: data.marketTimes.marketIsOpen,
            tradingHours: data.marketTimes.tradingHours,
          },
          latestNews: data.latestSocial,
          trendingSymbols: data.trendingSymbols,
          symbolsAndPrices: { ...data.symbolsAndPrices },
          loading: false,
          error: "",
        })
      );
    } catch (err) {
      dispatch(
        setUserData({
          loading: false,
          error: "Internal server error",
        })
      );
    }
  };
};

const userDataSlice = createSlice({
  name: "set-user-data",
  initialState: userDataInitialState,
  reducers: {
    setUserData(state: any, action: { payload: props }) {
      return {
        ...state,
        ...action.payload,
        latestNews: [action.payload.latestNews, ...state.latestNews],
      };
    },
  },
});

export const { setUserData } = userDataSlice.actions;
export default userDataSlice.reducer;
