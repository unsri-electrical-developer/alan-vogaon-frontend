/* eslint-disable react-hooks/exhaustive-deps */
import { Card, Grid, Icon } from "@material-ui/core";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  CardChartTotalData,
  CardChartTotalPenghargaan,
} from "../../components";
import {
  getChatDashboard,
  getDashboardData,
} from "../../redux/actions/AppActions";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { dashboard, loadingPie, pieData, loadingLine, lineData } = useSelector(
    ({ app }) => app
  );
  const getData = () => {
    dispatch(getDashboardData());
    dispatch(getChatDashboard("CHART_PIE"));
    dispatch(getChatDashboard("CHART_LINE"));
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="analytics m-sm-30 mt-7">
      <Grid container spacing={3} justifyContent="center">
        <Grid item xs={11} md={12}>
          <h3 className="fw-bold m-0">Dashboard</h3>
        </Grid>
        <Grid item xs={11} md={3}>
          <Card className="p-sm-24 bg-paper" elevation={0}>
            <div className="border-radius-circle bg-light-primary p-2 w-40 h-40 mb-6">
              <Icon className="text-primary" fontSize="24px">
                hotel
              </Icon>
            </div>
            <h1 className="text-black font-semibold text-40">
              {dashboard?.hotel}
            </h1>
            <p className="text-muted mb-0">Hotel</p>
          </Card>
        </Grid>
        <Grid item xs={11} md={3}>
          <Card className="p-sm-24 bg-paper" elevation={0}>
            <div className="border-radius-circle bg-light-purple p-2 w-40 h-40 mb-6">
              <Icon className="text-purple" fontSize="24px">
                corporate_fare
              </Icon>
            </div>
            <h1 className="text-black font-semibold text-40">
              {dashboard?.property}
            </h1>
            <p className="text-muted mb-0">Total Pengembangan Properti</p>
          </Card>
        </Grid>
        <Grid item xs={11} md={3}>
          <Card className="p-sm-24 bg-paper" elevation={0}>
            <div className="border-radius-circle bg-light-red p-2 w-40 h-40 mb-6">
              <Icon className="text-red" fontSize="24px">
                real_estate_agent
              </Icon>
            </div>
            <h1 className="text-black font-semibold text-40">
              {dashboard?.asset}
            </h1>
            <p className="text-muted mb-0">Total Aset & Investasi Property</p>
          </Card>
        </Grid>
        <Grid item xs={11} md={3}>
          <Card className="p-sm-24 bg-paper" elevation={0}>
            <div className="border-radius-circle bg-light-orange p-2 w-40 h-40 mb-6">
              <Icon className="text-orange" fontSize="24px">
                home_work
              </Icon>
            </div>
            <h1 className="text-black font-semibold text-40">
              {dashboard?.portfolio}
            </h1>
            <p className="text-muted mb-0">Total Portofolio</p>
          </Card>
        </Grid>
        <Grid item xs={11} md={6}>
          <CardChartTotalData chart={pieData} loading={loadingPie} />
        </Grid>
        <Grid item xs={11} md={6}>
          <CardChartTotalPenghargaan chart={lineData} loading={loadingLine} />
        </Grid>
      </Grid>
    </div>
  );
};

export default Dashboard;
