import { Card, CircularProgress } from '@material-ui/core';
import { ArcElement, Chart as ChartJS, Legend, Tooltip } from 'chart.js';
import React from 'react';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const CardChartPendidikan = ({ loading, chart }) => {
    let data = {
        labels: chart?.labels || '',
        datasets: [
            {
                data: chart?.data || [],
                backgroundColor: chart?.backgroundColor || [
                    '#55B61F',
                    '#6FBD44',
                    '#8DCE6A',
                    '#B3E498',
                    '#D2F2C0',
                    '#DEF3D3',
                    '#ECFEE2'
                ],
                borderColor: chart?.backgroundColor || [
                    '#55B61F',
                    '#6FBD44',
                    '#8DCE6A',
                    '#B3E498',
                    '#D2F2C0',
                    'DEF3D3',
                    '#ECFEE2'
                ],
                borderWidth: 0
            }
        ]
    };
    return (
        <Card
            className="border-0 p-5 card-chart-pendidikan h-full"
            elevation={0}
        >
            <h5 className="fw-bold mb-3 w-full text-left">Pendidikan</h5>
            {loading ? (
                <div className="text-center">
                    <CircularProgress color="secondary" size={35} />
                </div>
            ) : chart === null || chart === undefined ? (
                <p className="text-center">data chart kosong.</p>
            ) : (
                <div className="container-chart">
                    <Doughnut
                        data={data}
                        options={{
                            plugins: {
                                legend: {
                                    position: 'bottom',
                                    align: 'start'
                                }
                            },
                            responsive: true
                        }}
                    />
                </div>
            )}
        </Card>
    );
};

export default CardChartPendidikan;
