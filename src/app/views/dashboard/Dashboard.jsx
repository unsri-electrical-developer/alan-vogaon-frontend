/* eslint-disable react-hooks/exhaustive-deps */
import { Card, Grid, Icon } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SimpleCard from "../../assets/components/cards/SimpleCard";
import { formatRupiah } from "../../../utlis/formatRupiah";
import ic_topup from "../../assets/components/ic_topup.svg";

import {
  CardChartTotalData,
  CardChartTotalPenghargaan,
  SelectText,
} from "../../components";
import CardChartUsia from "../../components/cards/CardChartUsia";

// import {
//   getChatDashboard,
//   getDashboardData,
// } from '../../redux/actions/AppActions';

import {
  getDashboard,
  getGrafikPendaftaran,
  getGrafikPendapatan,
  getGrafikPenjualan,
} from "../../redux/actions/Dashboard/DashboardAction";

const Dashboard = () => {
  const dispatch = useDispatch();
  const {
    dataDashboard,
    dataGrafikPendaftaran,
    dataGrafikPendapatan,
    dataGrafikPenjualan,
  } = useSelector((state) => state.dashboard);
  const [tahunPenjualan, setTahunPenjualan] = useState("");
  const [bulanPenjualan, setBulanPenjualan] = useState("");
  const [tahunPendaftaran, setTahunPendaftaran] = useState("");
  const [tahunPendapatan, setTahunPendapatan] = useState("");
  const getData = () => {
    dispatch(getDashboard());

    dispatch(getGrafikPendapatan(""));

    dispatch(getGrafikPendaftaran(""));
  };

  const GetDataPenjualan = () => {
    let params = `?tahun=${tahunPenjualan}&bulan=${bulanPenjualan}`;

    dispatch(getGrafikPenjualan(params));
  };
  const GetDataPendapatan = () => {
    let params = `?tahun=${tahunPendapatan}`;

    dispatch(getGrafikPendapatan(params));
  };
  const GetDataPendaftaran = () => {
    let params = `?tahun=${tahunPendaftaran}`;

    dispatch(getGrafikPendaftaran(params));
  };

  useEffect(() => {
    getData();
    GetDataPendaftaran();
    GetDataPendapatan();
    GetDataPenjualan();
  }, []);

  useEffect(() => {
    GetDataPenjualan();
  }, [tahunPenjualan, bulanPenjualan]);

  useEffect(() => {
    GetDataPendapatan();
  }, [tahunPendapatan]);

  useEffect(() => {
    GetDataPendaftaran();
  }, [tahunPendaftaran]);

  const totalpembelianPrice = dataDashboard?.total_pembelian?.nilai
    ? formatRupiah(dataDashboard?.total_pembelian.nilai)
    : "Rp 0.000";

  const totalPembelianPercent =
    dataDashboard?.total_pembelian?.naik_turun === "naik"
      ? "#51AF77"
      : "#D55454";

  const JumlahPendaftarPercent =
    dataDashboard?.jumlah_pendaftar?.naik_turun === "naik"
      ? "#51AF77"
      : "#D55454";

  const JumlahTransaksiPercent =
    dataDashboard?.jumlah_transaksi?.naik_turun === "naik"
      ? "#51AF77"
      : "#D55454";

  const chartData = [1, 2, 3, 4, 5, 5];

  const bulan = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "Mei",
    "Jun",
    "Jul",
    "Agu",
    "Sep",
    "Okt",
    "Nov",
    "Des",
  ];

  const bulanFull = [
    "Januari",
    "Februari",
    "Maret",

    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
  ];

  const chartPendaftarn = {
    label: bulan,
    data: dataGrafikPendaftaran,
  };
  const chartPendapatan = {
    label: bulan,
    data: dataGrafikPendapatan,
  };

  const tahun = [2021, 2022, 2023, 2024, 2025];

  const filterPendapatan = () => {
    return (
      <SelectText
        dataSelect={tahun}
        state={tahunPendapatan}
        setState={setTahunPendapatan}
        label="Tahun"
        name="Tahun"
        width="120px"
      />
    );
  };

  const filterPendaftaran = () => {
    return (
      <SelectText
        dataSelect={tahun}
        state={tahunPendaftaran}
        setState={setTahunPendaftaran}
        label="Tahun"
        name="Tahun"
        width="120px"
      />
    );
  };

  const filterPenjualan = () => {
    return (
      <Grid container spacing={3} justifyContent="flex-end">
        <SelectText
          dataSelect={tahun}
          state={tahunPenjualan}
          setState={setTahunPenjualan}
          label="Tahun"
          name="Tahun"
          width="120px"
        />
        <div className="mx-5" />
        <SelectText
          dataSelect={bulanFull}
          state={bulanPenjualan}
          setState={setBulanPenjualan}
          label="Bulan"
          name="Bulan"
          width="120px"
        />
        <div className="mx-4" />
      </Grid>
    );
  };
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
                <div style={{ paddingLeft: "15px" }}>
                  <h1>{totalpembelianPrice}</h1>
                  <h5 style={{ color: totalPembelianPercent }}>
                    {dataDashboard?.total_pembelian?.percent}%
                  </h5>
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
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "flex-start",
                      gap: "5px",
                    }}
                  >
                    <h1>
                      {dataDashboard?.jumlah_pendaftar?.nilai
                        ? dataDashboard?.jumlah_pendaftar?.nilai
                        : "0"}
                    </h1>
                    <h5 style={{ color: JumlahPendaftarPercent }}>
                      {dataDashboard?.jumlah_pendaftar?.percent}%
                    </h5>
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
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "flex-start",
                      gap: "5px",
                    }}
                  >
                    <h1>
                      {dataDashboard?.jumlah_transaksi?.nilai
                        ? dataDashboard?.jumlah_transaksi?.nilai
                        : "0"}
                    </h1>
                    <h5 style={{ color: JumlahTransaksiPercent }}>
                      {dataDashboard?.jumlah_transaksi?.percent}%
                    </h5>
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
        {/* dataGrafikPendaftaran, dataGrafikPendapatan, dataGrafikPenjualan, */}
        <Grid item xs={11} md={6}>
          <CardChartTotalPenghargaan
            chart={chartPendapatan}
            title="Statistik Pendapatan"
            filter={filterPendapatan()}
          />
        </Grid>
        <Grid item xs={11} md={6}>
          <CardChartTotalPenghargaan
            chart={chartPendaftarn}
            title="Statistik Pendaftaran"
            borderColor="#F4AD10"
            filter={filterPendaftaran()}
            number
          />
        </Grid>
        <Grid item xs={22} md={12}>
          <CardChartUsia filter={filterPenjualan()} />
        </Grid>
      </Grid>
    </div>
  );
};

export default Dashboard;
