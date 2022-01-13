import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
interface Props {
  days: number;
  data: any;
}
const Chart = (props: Props) => {
  const { days, data } = props;
  const dataByDays = data.slice(-days);
  return (
    <ResponsiveContainer width="95%" height={190}>
      <LineChart
        data={dataByDays}
        margin={{ top: 5, right: 30, left: -15, bottom: 5 }}
      >
        <Line
          type="monotone"
          dataKey="price"
          stroke={
            dataByDays[0]?.price < dataByDays[dataByDays?.length - 1]?.price
              ? "var(--green-color)"
              : "var(--red-color)"
          }
          dot={false}
        />

        <XAxis dataKey="name" />
        <CartesianGrid stroke="var(--main-color-dark)" />
        <YAxis
          type="number"
          domain={["auto", "auto"]}
          allowDataOverflow={true}
        />
        <Tooltip
          contentStyle={{
            width: 120,
            color: "rgb(161,161,161)",
            backgroundColor: "var(--main-color-regular-inner)",
            borderRadius: "10px",
          }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default Chart;
