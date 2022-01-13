export const isPr = (feed: any): feed is articleType => {
  return "title" in feed;
};
export const isTweet = (feed: any): feed is Tweet => {
  return "text" in feed;
};
