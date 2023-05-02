import { Card, CircularProgress } from '@material-ui/core';
import { BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title, Tooltip } from 'chart.js';
import React from 'react';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export const options = {
    indexAxis: 'y',
    responsive: true,
    plugins: {
        legend: {
            display: false
        }
    },
    maintainAspectRatio: false
};

const CardChartLaporan = ({ loading, chart }) => {
    const labels = chart?.labels || '';

    const data = {
        labels,
        datasets: [
            {
                label: 'Total',
                data: chart?.data || [],
                backgroundColor: chart?.backgroundColor || [
                    '#55B61F',
                    '#6FBD44',
                    '#8DCE6A',
                    '#B3E498',
                    '#D2F2C0'
                ],
                borderWidth: 0
            }
        ]
    };
    return (
        <Card className="border-0 py-4 px-5" elevation={0}>
            {loading ? (
                <div className="text-center">
                    <CircularProgress color="secondary" size={35} />
                </div>
            ) : chart === null || chart === undefined ? (
                <p className="text-center">data chart kosong.</p>
            ) : (
                <div className="h-600">
                    <Bar options={options} data={data} height={800} />
                </div>
            )}
        </Card>
    );
};

export default CardChartLaporan;
