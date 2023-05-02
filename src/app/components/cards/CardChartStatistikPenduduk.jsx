import { Card, CircularProgress, Grid, MenuItem, Select } from '@material-ui/core';
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

const CardChartStatistikPenduduk = ({ loading, chart, type, handleChange }) => {
    return (
        <Card className="border-0 py-5 px-6 mb-3 radius-6" elevation={0}>
            <Grid container spacing={2} className="mb-6">
                <Grid item xs={12} md={9}>
                    <h5 className="text-left m-0">
                        Penduduk Berdasarkan Dusun
                    </h5>
                </Grid>
                <Grid item xs={12} md={3}>
                    <Select
                        SelectDisplayProps={{
                            style: {
                                paddingTop: 10,
                                paddingBottom: 10
                            }
                        }}
                        size="small"
                        labelId="type"
                        value={type}
                        onChange={handleChange}
                        variant="outlined"
                        className="w-full"
                        name="type"
                        displayEmpty
                    >
                        <MenuItem value="sakit">Riwayat Sakit</MenuItem>
                        <MenuItem value="disabilitas">Disabilitas</MenuItem>
                        <MenuItem value="status_kawin">
                            Status Perkawinan
                        </MenuItem>
                        <MenuItem value="goldar">Golongan Darah</MenuItem>
                        <MenuItem value="pekerjaan">Bekerja</MenuItem>
                    </Select>
                </Grid>
            </Grid>

            {loading ? (
                <div className="text-center">
                    <CircularProgress color="secondary" size={35} />
                </div>
            ) : chart === null || chart === undefined ? (
                <p className="text-center">data chart kosong.</p>
            ) : (
                <div className="chart-statistik-penduduk">
                    <Bar options={options} data={chart} height={450} />
                </div>
            )}
        </Card>
    );
};

export default CardChartStatistikPenduduk;
