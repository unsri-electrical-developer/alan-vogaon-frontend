import { Card, CircularProgress, Grid } from "@material-ui/core";
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from "chart.js";
import React from "react";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  indexAxis: "y",

  plugins: {
    legend: {
      position: "bottom",
    },
  },
  maintainAspectRatio: false,
};

const CardChartUsia = ({ loading, chart, filter }) => {
  let labels = chart?.label || ["Lords Mobile", "Stardew Valley 7 Online"];

  let data = {
    labels,
    datasets: [
      {
        label: "Jumlah Penjualan",
        // data: chart?.laki || ["aasdas", "asdasd"],
        // backgroundColor: chart?.bgLaki || "#6FBD44",
        data: [15000, 20000],
        backgroundColor: "#1253FA",
      },
      //   {
      //     label: "Jumlah Penduduk Wanita",
      //     // data: chart?.perempuan || ["aasdas", "asdasd"],
      //     // backgroundColor: chart?.bgWanita || "#108AEE",
      //     data: [1, 2, 3, 4, 5, 6, 7],
      //     backgroundColor: "#108AEE",
      //   },
    ],
  };
  return (
    <Card className="border-0 py-4 px-5 mb-3" elevation={0}>
      <Grid
        container
        spacing={3}
        justifyContent="space-between"
        className="mb-3 mt-3"
      >
        <Grid item sm={6} xs={12} md={8} spacing={3}>
          <h5 className="fw-bold mb-3 text-left">Statistik Penjualan Game</h5>
        </Grid>
        <Grid item sm={6} xs={12} md={4} spacing={3}>
          {filter}
        </Grid>
      </Grid>
      {loading ? (
        <div className="text-center">
          <CircularProgress color="secondary" size={35} />
        </div>
      ) : (
        // : chart === null || chart === undefined ? (
        //     <p className="text-center">data chart kosong.</p>
        // )
        <div className="h-200">
          <Bar options={options} data={data} height={200} />
        </div>
      )}
    </Card>
  );
};

export default CardChartUsia;
