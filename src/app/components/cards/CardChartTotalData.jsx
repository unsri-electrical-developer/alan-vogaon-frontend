import { Card, CircularProgress, Grid } from '@material-ui/core';
import { ArcElement, Chart as ChartJS, Legend, Tooltip } from 'chart.js';
import React from 'react';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);


const CardChartTotalData = ({ loading, chart }) => {
    let data = {
      labels: ['Hotel', 'Pengembangan Properti', 'Aset & Invetasi Properti', 'Portfolio'],
      datasets: [
        {
          label: '# of Votes',
          data: chart,
          backgroundColor: [
            '#0083E2',
            '#6428D5',
            '#FF6C6C',
            '#F8C06D',
          ],
          borderColor: [
            '#0083E2',
            '#6428D5',
            '#FF6C6C',
            '#F8C06D',
          ],
          hoverOffset: 10
        },
      ],
    };
    return (
        <Card
            className="border-0 p-5 card-chart-pendidikan h-full"
            elevation={0}
        >
            <h4 className="fw-bold mb-4 w-full text-left">Total Data</h4>
            {
                loading ?
                <div className="text-center">
                    <CircularProgress color="primary" size={35} />
                </div>
                : chart.length > 0 ?
                    <Grid container spacing={3}>
                        <Grid item xs={12} lg={6}>
                            <Doughnut data={data} options={{radius: "90%",plugins: {legend: {display: false}}}} />
                        </Grid>
                        <Grid item xs={12} lg={6} className="flex flex-column justify-evenly py-4">
                            <div className="flex gap-2 mb-4">
                                <div className="w-8 h-8 border-radius-circle bg-primary mt-1"></div>
                                <div className='flex-1'>
                                    <p className='mb-1 text-muted'>Hotel</p>
                                    <p className="m-0 font-semibold">{chart[0]}</p>
                                </div>
                            </div>
                            <div className="flex gap-2 mb-4">
                                <div className="w-8 h-8 border-radius-circle bg-purple mt-1"></div>
                                <div className='flex-1'>
                                    <p className='mb-1 text-muted'>Pengembangan Properti</p>
                                    <p className="m-0 font-semibold">{chart[1]}</p>
                                </div>
                            </div>
                            <div className="flex gap-2 mb-4">
                                <div className="w-8 h-8 border-radius-circle bg-red mt-1"></div>
                                <div className='flex-1'>
                                    <p className='mb-1 text-muted'>Aset & Invetasi Properti</p>
                                    <p className="m-0 font-semibold">{chart[2]}</p>
                                </div>
                            </div>
                            <div className="flex gap-2 mb-4">
                                <div className="w-8 h-8 border-radius-circle bg-orange mt-1"></div>
                                <div className='flex-1'>
                                    <p className='mb-1 text-muted'>Portfolio</p>
                                    <p className="m-0 font-semibold">{chart[3]}</p>
                                </div>
                            </div>
                        </Grid>
                    </Grid>
                : <p className="text-center text-muted">Data chart kosong</p>
            }
        </Card>
    );
};

export default CardChartTotalData;
