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
    responsive: true,
    plugins: {
        legend: {
            position: 'bottom'
        }
    },
    maintainAspectRatio: false
};

const CardChartUsia = ({ loading, chart }) => {
    let labels = chart?.usia || '';

    let data = {
        labels,
        datasets: [
            {
                label: 'Jumlah Penduduk Pria',
                data: chart?.laki || [],
                backgroundColor: chart?.bgLaki || '#6FBD44'
            },
            {
                label: 'Jumlah Penduduk Wanita',
                data: chart?.perempuan || [],
                backgroundColor: chart?.bgWanita || '#108AEE'
            }
        ]
    };
    return (
        <Card className="border-0 py-4 px-5 mb-3" elevation={0}>
            <h5 className="fw-bold mb-3 text-left">
                Penduduk Berdasarkan Usia
            </h5>
            {loading ? (
                <div className="text-center">
                    <CircularProgress color="secondary" size={35} />
                </div>
            ) : chart === null || chart === undefined ? (
                <p className="text-center">data chart kosong.</p>
            ) : (
                <div className="h-200">
                    <Bar options={options} data={data} height={200} />
                </div>
            )}
        </Card>
    );
};

export default CardChartUsia;
