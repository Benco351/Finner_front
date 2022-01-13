/// <reference types="react-scripts" />
/// <reference types="@welldone-software/why-did-you-render" />
declare module "@material-ui/lab/Alert";
declare module ".*mp3";
declare module "react-router-dom";
declare module "react-dom";
declare module "socket.io-client";
declare module "react-redux";
declare module "moment";
declare module "react-howler";
declare module "react-waypoint";
declare module "react-bootstrap";
declare module "react-firebase-hooks/auth";
declare module "*.jpg";
declare module "*.mp4";
declare module "*.png";
declare module "*.jpeg";
declare module "react-router-ga";

///Redux state

interface symbolsAndWords {
  symbols: boolean;
  words: boolean;
}
interface stateType {
  user: {
    email: string;
    token: string;
    loading: boolean;
    error: string;
    firstEntry: boolean;
  };
  snackbar: {
    snackbarOpen: boolean;
    snackbarType: "success" | "warning" | "danger" | "info";
    snackbarMessage: string;
  };
  userData: {
    currentSymbol: {
      symbol: string;
      show: boolean;
    };
    isMarketOpen: {
      marketIsOpen: boolean;
      tradingHours: boolean;
    };
    tradingHours: boolean;
    sound: boolean;
    latestNews: Tweet[];
    trendingSymbols: string[];
    symbolsAndPrices: any;
    time: number;
    error: string;
    firstEntry: boolean;
    loading: boolean;
  };
  watchLists: {
    loading: boolean;
    error: string;
    watchLists: list[];
    currentList: { title: string; words: string };
    filterOptions: symbolsAndWords;
  };
  watchListFeed: {
    loading: boolean;
    error: string;
    news: Tweet[];
  };
}

///User///
interface userType {
  payload: userObject;
}
interface userObject {
  email?: string;
  token?: string;
  loading?: boolean;
  error?: string;
  firstEntry?: boolean;
}
interface user {
  user: userObject;
}
interface getUserDataType {
  title: string;
  email: string;
  token: string;
}

///Articles///

interface articleType {
  date: Date;
  content: string;
  title: string;
  symbols: string[];
  words: string[];
  prices: string[];
  source: string;
  id: number;
  impact: number;
  hash_time: string;
}

///lists///
interface addListType {
  title: string;
  words: string[];
  email: string;
  token: string;
}
interface editListType {
  newTitle: string;
  oldTitle: string;
  words: string[];
  email: string;
  token: string;
}

////Articles watch-list////
interface addArticleType {
  title: string;
  email: string;
  token: string;
}

interface deleteArticleType {
  title: string;
  email: string;
  token: string;
}

interface actionListsType {
  payload: {
    watchLists?: list[];
    loading?: boolean;
    error?: string;
    currentList?: list;
  };
}

interface setSnackbarType {
  snackbarOpen: boolean;
  snackbarType: "error" | "warning" | "info" | "success";
  snackbarMessage: string;
}

interface symbolAndPrice {
  [key: string]: SymbolModel;
}
interface SymbolModel {
  percent: number;
  price: number;
  displayName?: string;
  market?: string;
}

///Watch list////
interface list {
  title: string;
  words: string[];
}
interface allListsType {
  allLists: list[];
}

//Tweet///
interface Tweet {
  name: string;
  text: string;
  symbols: string[];
  source: string;
  date: Date;
  screen_name: string;
  id_str: string;
  words: string[];
  id: number;
}

////currentList//

interface currentListObject {
  currentList: list;
}
interface currentUserObject {
  user: userObject;
}
interface newArticleObject {
  newArticle: articleType | Tweet;
}
interface symbolsAndPricesType {
  SymbolsAndPrices: symbolAndPrice;
}
interface newTweetObject {
  newTweet: Tweet;
}
interface articlesWatchListType {
  watchListArticles: articleType[];
}
interface articlesType {
  payload: articleType[];
}
interface articles {
  articles: latestArticles;
}
interface latestArticles {
  articles: articleType[];
  success: boolean;
}
interface ResponseGenerator {
  config?: any;
  data?: any;
  headers?: any;
  request?: any;
  status?: number;
  statusText?: string;
  email: ?string;
  password?: string;
  message: string;
  success: boolean;
  articles: articleType[];
  tweets: Tweet[];
  watchListFeed: (Tweet | articleType)[];
  symbolsAndPrices: any;
  trendingSymbols: any;
  isMarketOpen: any;
  counter: number;
}

////Users///

interface signUpAction {
  payload: singUp;
}

interface singUp {
  email: string;
  password: string;
}
interface loginAction {
  payload: singUp;
}

interface login {
  email: string;
  password: string;
}
interface resetPasswordAction {
  payload: email;
}
interface updatePasswordAction {
  payload: password;
}
interface email {
  email: string;
}
interface password {
  password: string;
}

///Market///
interface marketTimeType {
  marketIsOpen: boolean;
  tradingHours: boolean;
}

interface latestArticlesType {
  articles: (articleType | Tweet)[];
  success: boolean;
}

interface prices {
  name: string;
  price: string;
}
