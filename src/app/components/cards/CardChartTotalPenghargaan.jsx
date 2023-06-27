import { Card, CircularProgress, Grid } from "@material-ui/core";
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




const formatData = (value) => {
              if (value >= 1000000) {
                return (value / 1000000) + ' Jt';
              } else if (value >= 1000) {
                return (value / 1000) + ' Rb';
              } else {
                return value;
              }

            }



const CardChartTotalPenghargaan = ({
  loading,
  chart,
  title,
  borderColor = "#1253FA",
  number,
  filter,
}) => {
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

  function createGradient2(ctx, area) {
    const gradient = ctx.createLinearGradient(0, area.bottom, 0, area.top);
    gradient.addColorStop(0, "#FFFFFF");
    gradient.addColorStop(0.5, "rgba(251, 244, 229, 0.99)");
    gradient.addColorStop(1, "rgb(252, 238, 206)");
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
            data: chart?.data,
            borderColor: borderColor,
            backgroundColor: number
              ? createGradient2(refChart?.ctx, refChart?.chartArea)
              : createGradient(refChart?.ctx, refChart?.chartArea),
            lineTension: 0.5,
          },
        ],
      };
      setdata(chartData);
    } else {
      setdata([]);
    }
  }, [labels, chart.data]);

  const options = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
        titleFontSize: 0,
        bodyColor	: "black",
        bodyAlign : "center",
        bodyFont: {weight: "bold", size: 12},
        backgroundColor: "white",
        callbacks: {
                  labelColor: (tooltipItem, chart) => {
                    return {
                      borderColor: 'transparent',
                      backgroundColor: 'transparent'
                    };
                  },
                    label: function(context) {
                                let label = context.dataset.label || '';

                                

                  
                        
            if (label) {
                   label += ': ';
                }
                if (context.parsed.y !== null) {
                      label +=  number ? context.parsed.y+" Pengguna" : formatData(context.parsed.y);
                }
                        return label;
                    }
        }
    }
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
  return (
    <Card className="border-0 p-5 card-chart-pendidikan h-full" elevation={0}>
      <Grid
        container
        spacing={3}
        justifyContent="space-between"
        className="mb-3 mt-3"
      >
        <Grid item sm={6} xs={12} md={9} spacing={3}>
          <h4 className="fw-bold mb-4 w-full text-left">{title}</h4>
        </Grid>
        <Grid item sm={6} xs={12} md={3} spacing={3}>
          {filter}
        </Grid>
      </Grid>
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
