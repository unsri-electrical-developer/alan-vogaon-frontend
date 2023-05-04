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
import { SimpleCard } from "../../../matx";
import React, {
  Component,
  Fragment,
  useEffect,
  useState,
  useLayoutEffect,
} from "react";
import { connect } from "react-redux";
import Swal from "sweetalert2";
// import { formatTanggal } from "app/utils/globalFunction";
// import {
//   getRiwayatGaji,
//   delRiwayatGaji,
//   addRiwayatGajiBayar,
// } from "app/redux/actions/gaji/RiwayatGajiAction";
// import AbsensiForm from "../absensi/AbsensiForm";
import { Link } from "react-router-dom";
// import { MatxMenu } from "matx";
// import Aksi from "../../../assets/component/Aksi.svg";
// import RenderTableRiwayatGaji from "./component/RenderTableRiwayatGaji";
// import { formatRupiah } from "app/utils/globalFunction";
// import { SelectText } from "app/components";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
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

    //   const handleBayar = (id) => {
    //     addRiwayatGajiBayar({
    //       gaji_code: [id],
    //     })
    //       .then((res) => {
    //         Swal.fire("Success!", "Gaji Berhasil Dibayar", "success");
    //         getData();
    //       })
    //       .catch((err) => {
    //         let error = err?.response?.data;
    //         Swal.fire(
    //           Array.isArray(error?.data)
    //             ? error?.data[0]
    //             : "Gagal Bayar, coba beberapa saat lagi",
    //           false
    //         );
    //       });
    //   };

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

    const statusSearch = ["lunas", "belum lunas"];

    return (
      <div className="m-sm-30">
        <Grid
          container
          spacing={1}
          justify="space-between"
          className="my-4 mb-8"
        >
          <h1 className="mt-4 font-semibold text-25 ">Riwayat Gaji</h1>

          <div className="tambah-button">
            <Link>
              <Button>
                <div style={{ marginLeft: "5px" }}>Tambah</div>
              </Button>
            </Link>
          </div>
        </Grid>

        <div style={{ marginBottom: "30px" }}>
          <SimpleCard
            loading={false}
            className="riwayat-gaji-card "
            currency=""
            saldo=""
            heightInput={200}
          >
            <Grid container spacing={4} justify="space-between">
              <div className="half-container px-8 py-3">
                <Grid item sm={12} xs={24} spacing={3}>
                  <h5>Total Gaji Karyawan</h5>

                  <Grid
                    container
                    spacing={2}
                    alignItems="center"
                    style={{
                      marginBlock: "5px",
                      marginBottom: "20px",
                    }}
                  >
                    <div className="money-icon">
                      <AttachMoneyIcon color="primary" />
                    </div>
                    <h1
                      style={{
                        margin: "0px",
                        marginLeft: "15px",
                      }}
                    >
                      {/* {formatRupiah(TotalGaji())} */}
                    </h1>
                  </Grid>

                  <Link className="tambah-button" to="/RiwayatGaji/Bayar">
                    <Button>Bayar Sekarang</Button>
                  </Link>
                </Grid>
              </div>
              <div className="half-container-right px-8 py-3">
                <div
                  style={{
                    borderLeft: "1px rgba(170, 170, 170, 0.808) solid",
                    position: "absolute",
                    left: "0",
                    height: "90%",
                  }}
                />
                <div className="green-gaji-card">
                  <Grid item sm={10} xs={20}>
                    <Grid
                      container
                      spacing={2}
                      alignItems="center"
                      style={{
                        marginBottom: "35px",
                      }}
                    >
                      <div className="up-arrow-icon">
                        <ArrowUpwardIcon color="primary" />
                      </div>
                      <h2
                        style={{
                          margin: "0px",
                          marginLeft: "5px",
                        }}
                      >
                        Tambahan
                      </h2>
                    </Grid>

                    <h5>Jumlah Tambahan</h5>
                    {/* <h3>{formatRupiah(tambahan())}</h3> */}
                  </Grid>
                </div>
                <div className="green-gaji-card">
                  <Grid item sm={10} xs={20}>
                    <Grid
                      container
                      spacing={2}
                      alignItems="center"
                      style={{
                        marginBottom: "35px",
                      }}
                    >
                      <div className="down-arrow-icon">
                        <ArrowDownwardIcon color="error" />
                      </div>
                      <h2
                        style={{
                          margin: "0px",
                          marginLeft: "5px",
                        }}
                      >
                        Pengurangan
                      </h2>
                    </Grid>

                    <h5>Jumlah Pengurangan</h5>
                    {/* <h3>{formatRupiah(pengurangan())}</h3> */}
                  </Grid>
                </div>
              </div>
            </Grid>
          </SimpleCard>
        </div>
        <SimpleCard loading={false} currency="" saldo="">
          <Fragment>
            <div
              className="d-flex items-center py-4 "
              style={{ justifyContent: "flex-end", gap: "20px" }}
            >
              <TextField
                size="small"
                variant="outlined"
                className="karyawan-top-search"
                placeholder="Cari Nama Karyawan"
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

              <Grid item xs={3} sm={2} className="d-flex align-items-end">
                {/* <SelectText
                  search
                  dataSelect={statusSearch}
                  label="Status"
                  handleChange={handleStatus}
                  value={status}
                /> */}
              </Grid>
            </div>
            <div className="w-full overflow-auto bg-white">
              <Table
                className="buku-kas-table"
                style={{
                  borderTop: "1px #e6e5e5 solid",
                  marginTop: "20px",
                }}
              >
                <TableHead>
                  <TableRow>
                    <TableCell colSpan={1}>No</TableCell>
                    <TableCell colSpan={1}>Nama</TableCell>
                    <TableCell align="center" colSpan={3}>
                      Periode
                    </TableCell>

                    <TableCell align="center" colSpan={2}>
                      Total Gaji
                    </TableCell>
                    <TableCell align="center" colSpan={2}>
                      Status
                    </TableCell>
                    <TableCell align="center" colSpan={1}>
                      Aksi
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {/* <RenderTableRiwayatGaji
                  state={state}
                  data={dataFilter}
                  tableName="riwayatGaji"
                  handleEdit={handleBayar}
                /> */}
                </TableBody>
              </Table>
              <TablePagination
                className="px-16"
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                // count={dataFilter?.length ? dataFilter?.length : 0}
                rowsPerPage={state.rowsPerPage}
                labelRowsPerPage={"From"}
                page={state.page}
                backIconButtonProps={{
                  "aria-label": "Previous page",
                }}
                nextIconButtonProps={{
                  "aria-label": "Next page",
                }}
                backIconButtonText="Previous page"
                nextIconButtonText="Next page"
                onChangePage={handleChangePage}
                onChangeRowsPerPage={setRowsPerPage}
              />
            </div>
          </Fragment>
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
