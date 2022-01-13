export const getSymbols = (list: string[]) => {
  const symbols = list?.filter((word: string) => word.toUpperCase() === word);
  return symbols;
};
export const getKeywords = (list: string[]) => {
  const keywords = list?.filter((word: string) => word.toUpperCase() !== word);
  return keywords;
};
