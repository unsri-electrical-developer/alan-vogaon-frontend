import {
  Button,
  ButtonGroup,
  Grid,
  Icon,
  InputAdornment,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
} from "@material-ui/core";
import SimpleCard from "../../assets/components/cards/SimpleCard";
import React, {
  Component,
  Fragment,
  useEffect,
  useState,
  useLayoutEffect,
} from "react";
import { connect } from "react-redux";
import Swal from "sweetalert2";
// import {
//   getRiwayatGaji,
//   delRiwayatGaji,
//   addRiwayatGajiBayar,
// } from "app/redux/actions/gaji/RiwayatGajiAction";
import { Link } from "react-router-dom";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import { TableCustom, DatePickerComponent } from "../../components";
import ic_money from "../../assets/components/ic_money.svg";
import ic_topup from "../../assets/components/ic_topup.svg";

import { formatRupiah } from "../../../utlis/formatRupiah";

const Transaction = () =>
  //     {
  //   dataRiwayatGaji,
  //   getRiwayatGaji,
  //   delRiwayatGaji,
  //   addRiwayatGajiBayar,
  // }
  {
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

    //   const getData = () => {
    //     let params = `?search=${search}&status=${status}`;

    //     getRiwayatGaji(params);
    //   };

    //   useEffect(() => {
    //     getData();
    //   }, [status]);

    //   useLayoutEffect(() => {
    //     getData();
    //   }, []);

    //   const submitSearch = (e) => {
    //     if (e.keyCode == 13) {
    //       getData();
    //     }
    //   };

    const handleStatus = (e) => {
      setStatus(e.target.value);
    };

    //   const dataFilter = dataRiwayatGaji.filter(
    //     (item) => typeof item === "object" && item !== null
    //   );

    //   const TotalGaji = () => {
    //     let total = 0;
    //     dataFilter?.map((item) => {
    //       total += Number(item?.total_gaji);
    //     });
    //     return total;
    //   };

    //   const pengurangan = () => {
    //     let total = 0;
    //     dataFilter?.map((item) => {
    //       total += Number(item?.pengurangan);
    //     });
    //     return total;
    //   };

    //   const tambahan = () => {
    //     let total = 0;
    //     dataFilter?.map((item) => {
    //       total += Number(item?.tambahan);
    //     });
    //     return total;
    //   };
    const [searchTgl, setSearchTgl] = useState(new Date());

    const handleDateChange = (date) => {
      setSearchTgl(date);
    };
    const statusSearch = ["lunas", "belum lunas"];

    const tableHeadItems = [
      { name: "No", align: "center", colSpan: 1 },
      { name: "Nama Pengguna", align: "", colSpan: 4 },
      { name: "Nominal Top Up", align: "center", colSpan: 3 },
      { name: "No. Transaksi", align: "center", colSpan: 3 },
      { name: "Waktu Transaksi", align: "center", colSpan: 3 },
      { name: "Aksi", align: "center", colSpan: 4 },
    ];

    const tableBodyItems = [
      { key: "nama_pengguna", align: "", colSpan: 4 },
      { key: "nominal_topup", align: "center", colSpan: 3 },
      { key: "nomor_transaksi", align: "center", colSpan: 3 },
      { key: "waktu_transaksi", align: "center", colSpan: 3 },
    ];

    const tableContents = [
      {
        nama_pengguna: "maudy",
        nominal_topup: 100000,
        nomor_transaksi: 100,
        waktu_transaksi: "06/02/2022",
      },
    ];

    const tableHeadItems2 = [
      { name: "No", align: "center", colSpan: 1 },
      { name: "Nama Pengguna", align: "", colSpan: 4 },
      { name: "Nama Produk", align: "center", colSpan: 3 },
      { name: "Harga", align: "center", colSpan: 3 },
      { name: "Waktu Transaksi", align: "center", colSpan: 3 },
      { name: "Status", align: "center", colSpan: 3 },
      { name: "Aksi", align: "center", colSpan: 3 },
    ];

    const tableBodyItems2 = [
      { key: "nama_pengguna", align: "", colSpan: 4 },
      { key: "nama_produk", align: "center", colSpan: 3 },
      { key: "harga", align: "center", colSpan: 3 },
      { key: "waktu_transaksi", align: "center", colSpan: 3 },
      { key: "status", align: "center", colSpan: 3 },
    ];

    const tableContents2 = [
      {
        nama_pengguna: "maudy",
        nama_produk: "pubg",
        harga: 100000,
        waktu_transaksi: "06/02/2022",
        status: "Selesai",
      },
    ];

    return (
      <div className="m-sm-30">
        <Grid
          container
          spacing={1}
          justify="space-between"
          className="my-4 mb-8"
        >
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
                        {formatRupiah(12000000)}
                      </h1>
                      <h5>45%</h5>
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
                        {formatRupiah(120000)}
                      </h1>
                      <h5>45%</h5>
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
                    // onKeyDown={submitSearch}
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
            data={pembelian ? tableContents2 : tableContents}
            customColumns={pembelian ? tableBodyItems2 : tableBodyItems}
            aksiSpan={pembelian ? 3 : 4}
            detailLink={
              pembelian
                ? "/transaction/payment/detail"
                : "/transaction/topup/detail"
            }
            id={pembelian ? "nama_produk" : "nama_pengguna"}
          />
        </SimpleCard>
      </div>
    );
  };

const mapStateToProps = (state) => {
  return {
    // dataRiwayatGaji: state.gaji.dataRiwayatGaji,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    // getRiwayatGaji: (params) => dispatch(getRiwayatGaji(params)),
    // delRiwayatGaji: (params) => dispatch(delRiwayatGaji(params)),
    // addRiwayatGajiBayar: (params) => dispatch(addRiwayatGajiBayar(params)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Transaction);
