import {
  Button,
  Grid,
  Icon,
  InputAdornment,
  TextField,
} from "@material-ui/core";
import SimpleCard from "../../assets/components/cards/SimpleCard";
import React, { Fragment, useEffect, useState } from "react";
import { connect } from "react-redux";
import Swal from "sweetalert2";
import {
  getRiwayatPembelian,
  getTotalPembelian,
  getRiwayatTopUp,
  getDetailTopUp,
  getTotalTopUp,
} from "../../redux/actions/Transaction/TransactionActions";
import { Link } from "react-router-dom";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import { TableCustom, DatePickerComponent } from "../../components";
import ic_money from "../../assets/components/ic_money.svg";
import ic_topup from "../../assets/components/ic_topup.svg";
import { formatRupiah } from "../../../utlis/formatRupiah";

const Transaction = ({
  dataRiwayatPembelian,
  totalPembelian,
  getRiwayatPembelian,
  getTotalPembelian,
  getRiwayatTopUp,
  getTotalTopUp,
  dataRiwayatTopup,
  totalTopup,
}) => {
  const [state, setState] = useState({
    loading: true,
    search: "",
    searchTgl: 0,
    page: 0,
    rowsPerPage: 10,
    selectedItem: "",
    nameClick: "",
    tambahAbsensi: false,
    editAbsensi: false,

    aksiClick: false,

    dataLanguage: [
      {
        label: "Indonesia",
        value: "ind",
      },
      {
        label: "English",
        value: "eng",
      },
    ],
    bahasa: "",
  });

  const setPage = (page) => {
    setState({ ...state, page });
  };

  const setRowsPerPage = (event) => {
    setState({ ...state, rowsPerPage: event.target.value });
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [pengajuan, setPengajuan] = useState(true);
  const [open, setOpen] = useState(false);
  const [pembelian, setPembelian] = useState(false);

  const getData = () => {
    var dateFormat = JSON.stringify(searchTgl);
    dateFormat = dateFormat.slice(1, 8);
    dateFormat = dateFormat.split("-").reverse().join("-");
    dateFormat = `?bulan_tahun=${dateFormat}`;

    let params =
      search === ""
        ? dateFormat
        : `?search=${search}&${dateFormat.slice(1, 20)}`;
    getRiwayatPembelian(params);
  };

  const getDataTotal = () => {
    getTotalPembelian();
  };
  const getDataTopUp = () => {
    var dateFormat = JSON.stringify(searchTgl);
    dateFormat = dateFormat.slice(1, 8);
    dateFormat = dateFormat.split("-").reverse().join("-");
    dateFormat = `?bulan_tahun=${dateFormat}`;

    let params =
      search === ""
        ? dateFormat
        : `?search=${search}&${dateFormat.slice(1, 20)}`;

    getRiwayatTopUp(params);
  };

  const getDataTotalTopUp = () => {
    getTotalTopUp();
  };
  // useEffect(() => {
  //   pembelian ? getData() : getDataTopUp();
  // }, [search]);

  useEffect(() => {
    setSearch("");
    setSearchTgl(new Date());
  }, [pembelian]);

  useEffect(() => {
    getData();
    getDataTotal();
    getDataTopUp();
    getDataTotalTopUp();
  }, []);

  const submitSearch = (e) => {
    if (e.keyCode == 13) {
      pembelian ? getData() : getDataTopUp();
    }
  };

  const handleStatus = (e) => {
    setStatus(e.target.value);
  };

  useEffect(() => {
    pembelian ? getData() : getDataTopUp();
  }, [searchTgl]);

  const [searchTgl, setSearchTgl] = useState(new Date());

  const handleDateChange = (date) => {
    setSearchTgl(date);
  };

  const tableHeadItems = [
    { name: "No", align: "center", colSpan: 1 },
    { name: "Nama Pengguna", align: "", colSpan: 4 },
    { name: "Nominal Top Up", align: "center", colSpan: 3 },
    { name: "No. Transaksi", align: "center", colSpan: 3 },
    { name: "Waktu Transaksi", align: "center", colSpan: 3 },
    { name: "Aksi", align: "center", colSpan: 4 },
  ];

  const tableBodyItems = [
    { key: "nama", align: "", colSpan: 4 },
    { key: "nominal", align: "center", colSpan: 3, type: "price" },
    { key: "no_transaksi", align: "center", colSpan: 3 },
    { key: "waktu_transaksi", align: "center", colSpan: 3 },
  ];

  const tableHeadItems2 = [
    { name: "No", align: "center", colSpan: 1 },
    { name: "Nama Pengguna", align: "", colSpan: 4 },
    { name: "Harga", align: "center", colSpan: 3 },
    { name: "Waktu Transaksi", align: "center", colSpan: 3 },
    { name: "Status", align: "center", colSpan: 3 },
    { name: "Aksi", align: "center", colSpan: 3 },
  ];

  const tableBodyItems2 = [
    { key: "name", align: "", colSpan: 4 },
    { key: "total_amount", align: "center", colSpan: 3, type: "price" },
    { key: "waktu_transaksi", align: "center", colSpan: 3 },
    { key: "status", align: "center", colSpan: 3 },
  ];

  return (
    <div className="m-sm-30">
      <Grid container spacing={1} justify="space-between" className="my-4 mb-8">
        <h1 className="mt-4 font-semibold text-25 mx-2 ">Transaction</h1>
      </Grid>

      <div style={{ marginBottom: "30px" }}>
        <Grid container spacing={4} justify="space-between">
          <Grid item sm={6} xs={12} spacing={3}>
            <SimpleCard loading={false} heightInput={150}>
              <div className="mt-4 riwayat-gaji-card">
                <Grid container spacing={2} alignItems="flex-start">
                  <h3>{pembelian ? "Total Saldo" : "Total Top Up Saldo"}</h3>
                </Grid>

                <Grid container spacing={2} alignItems="flex-start">
                  <div className="money-icon">
                    <img src={pembelian ? ic_money : ic_topup} />
                  </div>
                  <div style={{ paddingLeft: "15px" }}>
                    <h1>
                      {/* {formatRupiah(TotalGaji())} */}{" "}
                      {pembelian
                        ? totalPembelian?.jumlah_pembelian || "Rp 0.000"
                        : totalTopup?.jumlah_pendapatan || "Rp 0.000"}
                    </h1>
                    {pembelian ? (
                      <h5
                        style={
                          totalPembelian?.grafik_pendapatan === "naik"
                            ? { color: "#51AF77" }
                            : { color: "#D55454" }
                        }
                      >
                        {totalPembelian?.persentase}%
                      </h5>
                    ) : (
                      <h5
                        style={
                          totalTopup?.grafik_pendapatan === "naik"
                            ? { color: "#51AF77" }
                            : { color: "#D55454" }
                        }
                      >
                        {totalTopup?.persentase}%
                      </h5>
                    )}
                  </div>
                </Grid>
              </div>
            </SimpleCard>
          </Grid>
          <Grid item sm={6} xs={12} spacing={3}>
            <SimpleCard loading={false} heightInput={150}>
              <div className="mt-4 riwayat-gaji-card">
                <Grid container spacing={2} alignItems="flex-start">
                  <h3>Jumlah Pendapatan</h3>
                </Grid>

                <Grid container spacing={2} alignItems="flex-start">
                  <div className="money-icon">
                    <img src={pembelian ? ic_money : ic_topup} />
                  </div>
                  <div style={{ paddingLeft: "15px" }}>
                    <h1>
                      {/* {formatRupiah(TotalGaji())} */}{" "}
                      {totalPembelian?.jumlah_pembelian
                        ? formatRupiah(totalPembelian?.jumlah_pembelian)
                        : "Rp 0.000"}
                    </h1>
                    <h5
                      style={
                        totalPembelian?.grafik_pendapatan === "naik"
                          ? { color: "#51AF77" }
                          : { color: "#D55454" }
                      }
                    >
                      {totalPembelian?.persentase}%
                    </h5>
                  </div>
                </Grid>
              </div>
            </SimpleCard>
          </Grid>
        </Grid>
      </div>
      <SimpleCard loading={false} currency="" saldo="">
        <Fragment>
          <div
            className="d-flex items-center py-4 "
            style={{ justifyContent: "space-between" }}
          >
            <Grid item sm={12} xs={12}>
              <div
                className="flex items-center "
                style={{
                  gap: "24px",
                  width: "max-content",
                }}
              >
                <div
                  className={
                    !pembelian ? "lembur-button-active" : "lembur-button"
                  }
                  onClick={() => {
                    setPembelian(false);
                  }}
                >
                  Riwayat Top Up Saldo
                </div>
                <div
                  className={
                    pembelian ? "lembur-button-active" : "lembur-button"
                  }
                  onClick={() => {
                    setPembelian(true);
                  }}
                >
                  Riwayat Pembelian
                </div>
              </div>
            </Grid>
            <Grid
              container
              spacing={3}
              xs={12}
              sm={8}
              className="d-flex align-items-end"
            >
              <Grid item sm={7} xs={12}>
                <TextField
                  size="medium"
                  variant="outlined"
                  color="primary"
                  className="background-white"
                  placeholder="Cari Transaksi"
                  onChange={(e) => setSearch(e.target.value)}
                  value={search}
                  onKeyDown={submitSearch}
                  name="search"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Icon>search</Icon>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item sm={5} xs={12}>
                <DatePickerComponent
                  date={searchTgl}
                  handleDate={handleDateChange}
                  name="tanggal"
                  search
                  tipe="MMMM yyyy"
                />
              </Grid>
            </Grid>
          </div>
        </Fragment>
        <TableCustom
          tableHeadItems={pembelian ? tableHeadItems2 : tableHeadItems}
          data={pembelian ? dataRiwayatPembelian : dataRiwayatTopup}
          customColumns={pembelian ? tableBodyItems2 : tableBodyItems}
          aksiSpan={pembelian ? 3 : 4}
          detailLink={
            pembelian
              ? "/transaction/payment/detail"
              : "/transaction/topup/detail"
          }
          id={pembelian ? "transaction_code" : "no_transaksi"}
        />
      </SimpleCard>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    dataRiwayatPembelian: state.transaction.dataRiwayatPembelian,
    totalPembelian: state.transaction.totalPembelian,
    dataRiwayatTopup: state.transaction.dataRiwayatTopup,
    totalTopUp: state.transaction.totalTopUp,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getRiwayatPembelian: (params) => dispatch(getRiwayatPembelian(params)),
    getTotalPembelian: () => dispatch(getTotalPembelian()),
    getRiwayatTopUp: (params) => dispatch(getRiwayatTopUp(params)),
    getTotalTopUp: () => dispatch(getTotalTopUp()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Transaction);
