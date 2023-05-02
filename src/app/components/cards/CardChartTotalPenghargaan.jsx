import { Card, CircularProgress } from "@material-ui/core";
import {
  CategoryScale,
  Chart as ChartJS,
  Filler,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";
import React, { useEffect, useState } from "react";
import { useRef } from "react";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);
const options = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
  },
  scales: {
    y: {
      ticks: {
        callback: (val) => {
          return val % 1 === 0 ? val : null;
        },
        beginAtZero: true,
        min: 0,
      },
    },
  },
};

const CardChartTotalPenghargaan = ({ loading, chart }) => {
  const chartRef = useRef();
  const labels = chart?.label;
  const [data, setdata] = useState({
    datasets: [],
  });
  function createGradient(ctx, area) {
    const gradient = ctx.createLinearGradient(0, area.bottom, 0, area.top);
    gradient.addColorStop(0, "#FFFFFF");
    gradient.addColorStop(0.5, "#EFF7FD");
    gradient.addColorStop(1, "#D1E9FA");
    return gradient;
  }

  useEffect(() => {
    const refChart = chartRef.current;

    if (!refChart) {
      return;
    }

    if (labels.length > 0) {
      const chartData = {
        labels,
        datasets: [
          {
            fill: true,
            label: "Penghargaan",
            data: chart?.data,
            borderColor: "rgb(53, 162, 235)",
            backgroundColor: createGradient(refChart?.ctx, refChart?.chartArea),
            lineTension: 0.5,
          },
        ],
      };
      setdata(chartData);
    } else {
      setdata([]);
    }
  }, [labels, chart.data]);
  return (
    <Card className="border-0 p-5 card-chart-pendidikan h-full" elevation={0}>
      <h4 className="fw-bold mb-4 w-full text-left">Total Penghargaan</h4>
      {loading ? (
        <div className="text-center">
          <CircularProgress color="primary" size={35} />
        </div>
      ) : chart?.data?.length > 0 ? (
        <Line ref={chartRef} options={options} data={data} />
      ) : (
        <p className="text-center text-muted">Data chart kosong</p>
      )}
    </Card>
  );
};

export default CardChartTotalPenghargaan;
