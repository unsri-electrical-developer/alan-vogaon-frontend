import { Button, ButtonGroup, Grid, Icon, FormControl, InputLabel, Select, MenuItem } from "@material-ui/core";
import SimpleCard from "../../assets/components/cards/SimpleCard";
import React, { Component, Fragment, useEffect, useState } from "react";
import { connect } from "react-redux";

import Swal from "sweetalert2";
import { Link, useParams, useHistory } from "react-router-dom";
import { getDetailPembelian, updateStatusPembelian } from "../../redux/actions/Transaction/TransactionActions";
import { formatRupiah } from "../../../utlis/formatRupiah";
import TableDetailListPembelian from "../../components/sections/TableDetailListPembelian";
import { da } from "date-fns/locale";
import { sum } from "lodash";
import SelectOfArray from "../../components/select/SelectOfArray";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import GeneralButton from "../../components/buttons/GeneralButton.jsx";

const DetailPembelian = ({ getDetailPembelian, detailPembelian }) => {
  const { id } = useParams();
  const getData = () => {
    getDetailPembelian(id);
  };

  const [state, setState] = useState({
    page: 0,
    rowsPerPage: 10,
    totalPembelian: 0,
  });


  const setPage = (page) => {
    setState({ ...state, page });
  };

  const setRowsPerPage = (event) => {
    setState({ ...state, rowsPerPage: event.target.value });
  };

  const setTotalPembelian = (totalPembelian) => {
    setState({ ...state, totalPembelian });
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const [selectedOption, setSelectedOption] = useState('');

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };
  
  useEffect(() => {
    getData();
  }, [id]);

  useEffect(() => {
    setSelectedOption(detailPembelian?.status);
  }, [detailPembelian])

  // updatePaymentMethod(state.pm_code, obj)
  // .then((res) => {
  //   getData();
  //   setState((prev) => ({
  //     ...prev,
  //     content: false,
  //   }));
  //   Swal.fire(
  //     "Berhasil!",
  //     "Data Payment Method berhasil disimpan",
  //     "success"
  //   );
  // })
  // .catch((err) => {
  //   Swal.fire("Gagal!", "System Under Maintenance !", "error");
  // });
  
  const handleSubmit = () => { 
    const body = {
      kode_transaksi: detailPembelian?.transaction_code,
      status: selectedOption,
    }
    updateStatusPembelian(body).then((res) => {
      Swal.fire(
        "Berhasil!",
        "Status Pembelian berhasil diperbarui",
        "success"
      );
    })
  }

  const tableHeadItems = [
    { name: "No", align: "center", colSpan: 1 },
    { name: "Nama Produk", align: "left", colSpan: 4 },
    { name: "Harga", align: "center", colSpan: 3 },
    { name: "UserID", align: "center", colSpan: 3 },
    { name: "Asal Produk", align: "center", colSpan: 3 },
    { name: "Status Produk", align: "center", colSpan: 3 },
  ];

  const tableBodyItems = [
    { key: "games_title", align: "left", colSpan: 4 },
    { key: "price", align: "center", colSpan: 3, type: "price"},
    { key: "userid", align: "center", colSpan: 3 },
    { key: "from", align: "center", colSpan: 3 },
    { key: "status", align: "center", colSpan: 3 },
  ];

  const nominal = detailPembelian?.totalPembelianTransaksi
    ? formatRupiah(detailPembelian?.totalPembelianTransaksi)
    : "";

  const listOfStatus = ['success', 'processing', 'pending', 'waiting']
  let dataSelectStatus = [];
  listOfStatus.map((item, index) => {
    dataSelectStatus.push({
      text: item,
      value: item,
    })
  })

  // let chek = detailPembelian.status == "sprocessing" ? "oke" : "tidak";
  // console.log(chek)

  // const [DataStatus, setDataStatus] = useState({
  //   status: detailPembelian?.status,
  // });

  // console.log(dataSelectStatus)

  const history = useHistory();
  const a = true;
  return a ? (
    <div className="m-sm-30">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "25px",
        }}
      >
        <h1 className="mb-20px header-detail">Riwayat Pembelian </h1>
        <div className="back-button">
          <Button onClick={() => history.push("/transaction")}>Back</Button>
        </div>
      </div>
      <div className="mb-20px">
        <SimpleCard loading={false} currency="" saldo="">
          <div className="simple-card-content">
            <Fragment>
              <Grid container spacing={2}>
                <Grid item sm={6} xs={12}>
                  <h5>Nama Pengguna</h5>
                  <div>{detailPembelian?.name}</div>
                </Grid>
                <Grid item sm={6} xs={12} className="mb-20px">
                  <h5>Email Pengguna</h5>
                  <div>{detailPembelian?.email}</div>
                </Grid>
                <Grid item sm={6} xs={12} className="mb-20px">
                  <h5>Total Pembelian</h5>
                  <div>{nominal}</div>
                </Grid>
                <Grid item sm={6} xs={12} className="mb-20px">
                  <h5>Metode Pembayaran</h5>
                  <div>{detailPembelian?.payment_method}</div>
                </Grid>
                <Grid item sm={6} xs={12} className="mb-20px">
                  <h5>Referensi</h5>
                  <div>{detailPembelian?.no_reference}</div>
                </Grid>
                <Grid item sm={6} xs={12}>
                  <h5>No.Transaksi</h5>
                  <div>{detailPembelian?.transaction_code} </div>
                </Grid>

                <Grid item sm={6} xs={12} className="mb-20px">
                  <h5>Waktu Transaksi</h5>
                  <div>{detailPembelian?.tanggal} </div>
                </Grid>
                <Grid item sm={6} xs={12}>
                  <h5>Status</h5>
                  {/* <div
                    style={
                      detailPembelian?.status == "processing" ? { color: "#1253FA" }
                      : detailPembelian?.status == "waiting" || detailPembelian?.status == "pending"  ? { color: "#DF8838" }
                      : detailPembelian?.status == "success" ? { color: "#51AF77" }
                      : { color: "#0A0A0A" }
                    }
                  >
                    {detailPembelian?.status}
                  </div> */}
                  <FormControl
                    size="small"
                    variant="outlined"
                    className="form-control d-inline"
                    required={true}
                    InputProps={{
                      style: {
                        borderRadius: 5,
                        minHeight: 46,
                      },
                    }}
                  >
                    <Select
                      IconComponent={() => (
                        <KeyboardArrowDownIcon size="medium" style={{ fontWeight: 700 }} />
                      )}
                      onChange={handleChange}
                      value={selectedOption}
                      size="small"
                      className="bg-white"
                      style={{
                        paddingRight: "2px",
                        width: "150px",
                      }}
                    >
                      {dataSelectStatus.map((data, index) => (
                        <MenuItem
                          key={index}
                          value={data.value}
                          text={data.text}
                          className={`"text-14 bg-white"`}
                          style={{
                            transform: `scaleY(${1 === "1.25" ? "0.92" : "1"})`,
                          }}
                        >
                          {data.text}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                    <div className="d-inline back-button">
                      <Button onClick={handleSubmit} className="d-inline ml-3" >Update</Button>
                    </div>
                </Grid>
              </Grid>
            </Fragment>
          </div>
        </SimpleCard>
      </div>
      {/* <div className="mb-20px">
        <SimpleCard loading={false} currency="" saldo="">
          <div className="py-4 px-8">
            <div className="mx-8 mb-8 bg-white">
              <Grid
                container
                spacing={5}
                alignItems="center"
              >
                
                <div className="flex items-start mt-10 text-left">
                  <h3 className="fw-500 text-18 text-black font-bold">
                    Pembelian Produk
                  </h3>
                </div>
                <TableDetailListPembelian
                tableHeadItems={tableHeadItems}
                customColumns={tableBodyItems}
                data={detailPembelian.product_list}
                >
                  
                </TableDetailListPembelian>
              </Grid>
            </div>
          </div>
        </SimpleCard>
      </div> */}
      
    </div>
  ) : (
    <div>wait</div>
  );
};

const mapStateToProps = (state) => {
  return {
    detailPembelian: state.transaction.detailPembelian,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getDetailPembelian: (id) => dispatch(getDetailPembelian(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailPembelian);
