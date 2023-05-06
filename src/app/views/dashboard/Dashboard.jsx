/* eslint-disable react-hooks/exhaustive-deps */
import { Card, Grid, Icon } from '@material-ui/core';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SimpleCard from '../../assets/components/cards/SimpleCard';
import { formatRupiah } from '../../../utlis/formatRupiah';
import ic_topup from '../../assets/components/ic_topup.svg';

import {
  CardChartTotalData,
  CardChartTotalPenghargaan,
} from '../../components';
import CardChartUsia from '../../components/cards/CardChartUsia';

import {
  getChatDashboard,
  getDashboardData,
} from '../../redux/actions/AppActions';

const Dashboard = () => {
  const dispatch = useDispatch();
  // const { dashboard, loadingPie, pieData, loadingLine, lineData } = useSelector(
  //   ({ app }) => app
  // );
  const getData = () => {
    dispatch(getDashboardData());
    dispatch(getChatDashboard('CHART_PIE'));
    dispatch(getChatDashboard('CHART_LINE'));
  };

  useEffect(() => {
    getData();
  }, []);

  const chartData = [1, 2, 3, 4, 5, 5];
  return (
    <div className="analytics m-sm-30 mt-7">
      <Grid container spacing={3} justifyContent="center">
        <Grid item xs={11} md={12}>
          <h3 className="fw-bold m-0">Dashboard</h3>
        </Grid>
        <Grid item sm={6} xs={12} md={6} spacing={3}>
          <SimpleCard loading={false} heightInput={150}>
            <div className="mt-4 riwayat-gaji-card">
              <Grid container spacing={2} alignItems="flex-start">
                <h3>Total Pembelian</h3>
              </Grid>

              <Grid container spacing={2} alignItems="flex-start">
                <div className="money-icon">
                  <img src={ic_topup} />
                </div>
                <div style={{ paddingLeft: '15px' }}>
                  <h1>
                    {/* {formatRupiah(TotalGaji())} */} {formatRupiah(120000)}
                  </h1>
                  <h5>45%</h5>
                </div>
              </Grid>
            </div>
          </SimpleCard>
        </Grid>
        <Grid item xs={11} md={3}>
          <SimpleCard loading={false} heightInput={150}>
            <div className="mt-4 riwayat-gaji-card">
              <Grid container spacing={2} alignItems="flex-start">
                <h3>Jumlah Pendaftar</h3>
              </Grid>

              <Grid container spacing={2} justifyContent="space-between">
                <div>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'flex-start',
                      gap: '5px',
                    }}
                  >
                    <h1>200</h1>
                    <h5>45%</h5>
                  </div>
                  Pendaftar Pada Bulan Ini
                </div>
                <div className="money-icon">
                  <img src={ic_topup} />
                </div>
              </Grid>
            </div>
          </SimpleCard>
        </Grid>
        <Grid item xs={11} md={3}>
          <SimpleCard loading={false} heightInput={150}>
            <div className="mt-4 riwayat-gaji-card">
              <Grid container spacing={2} alignItems="space-between">
                <h3>Jumlah Transaksi</h3>
              </Grid>

              <Grid container spacing={2} justifyContent="space-between">
                <div>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'flex-start',
                      gap: '5px',
                    }}
                  >
                    <h1>200</h1>
                    <h5>45%</h5>
                  </div>
                  Checkout Pada Bulan Ini
                </div>
                <div className="money-icon">
                  <img src={ic_topup} />
                </div>
              </Grid>
            </div>
          </SimpleCard>
        </Grid>
        <Grid item xs={11} md={6}>
          {/* <CardChartTotalPenghargaan chart={lineData} loading={loadingLine} /> */}
        </Grid>
        <Grid item xs={11} md={6}>
          {/* <CardChartTotalPenghargaan chart={lineData} loading={loadingLine} /> */}
        </Grid>
        <Grid item xs={22} md={12}>
          {/* <CardChartUsia loading={loadingLine} /> */}
        </Grid>
      </Grid>
    </div>
  );
};

export default Dashboard;
