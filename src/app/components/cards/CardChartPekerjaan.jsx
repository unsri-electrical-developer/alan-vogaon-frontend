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
    }
};

const CardChartPekerjaan = ({ loading, chart }) => {
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
            <h5 className="fw-bold mb-3 text-left">Pekerjaan</h5>
            {loading ? (
                <div className="text-center">
                    <CircularProgress color="secondary" size={35} />
                </div>
            ) : chart === null || chart === undefined ? (
                <p className="text-center">data chart kosong.</p>
            ) : (
                <Bar options={options} data={data} />
            )}
        </Card>
    );
};

export default CardChartPekerjaan;
