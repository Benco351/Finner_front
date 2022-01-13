import { SymbolOverview } from "react-tradingview-embed";

export const TradingViewApp = (props: { stock: string }) => {
  const { stock } = props;
  return (
    <>
      {/* <SymbolOverview
        widgetPropsAny={{
          symbols: [["Tesla", `${stock}|12M`]],
          chartOnly: false,
          width: "100%",
          locale: "en",
          colorTheme: "dark",
          gridLineColor: "rgba(42, 46, 57, 0)",
          fontColor: "#787b86",
          isTransparent: false,
          autosize: true,
          showFloatingTooltip: true,
          scalePosition: "no",
          scaleMode: "Normal",
          fontFamily: "Arial, sans-serif",
          noTimeScale: false,
          chartType: "bars",
          upColor: "#26a69a",
          downColor: "#ef5350",
          newProp: true,
        }}
      /> */}
      <div>1</div>
    </>
  );
};
