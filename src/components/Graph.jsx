import { Chart } from "react-google-charts";
import { useHistoryFetch } from "./useHistoryFetch";

function Graph({ from, to }) {
  const { ratios, isLoading } = useHistoryFetch(from, to);

  if (isLoading) {
    return <div>Waiting for Data</div>;
  }

  if (!ratios || ratios.length === 0) {
    return <div>No data available</div>;
  }

  return (
    <Chart
      width={"100%"}
      height={"250px"}
      chartType="LineChart"
      loader={<div>Loading Chart</div>}
      data={ratios}
      options={{
        colors: ["#8FDB97"],
        curveType: "function",
        legend: "none",
        lineWidth: 2,
        chartArea: { width: "80%", height: "80%" },
        animation: { startup: true, duration: 1000, easing: "out" },
        titleTextStyle: {
          color: "#232323",
          fontName: "Consolas,monaco,monospace",
          bold: true,
          fontSize: 16,
        },
        hAxis: {
          format: "MMM, YY",
          textStyle: {
            color: "#232323",
            fontName: "Consolas,monaco,monospace",
            fontSize: 12,
          },
        },
        vAxis: {
          textPosition: "in",
          textStyle: {
            color: "#232323",
            fontName: "Consolas,monaco,monospace",
            fontSize: 12,
          },
        },
      }}
    />
  );
}

export default Graph;
