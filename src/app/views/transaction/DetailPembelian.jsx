import { Button, ButtonGroup, Grid, Icon } from "@material-ui/core";
import SimpleCard from "../../assets/components/cards/SimpleCard";
import React, { Component, Fragment, useEffect, useState } from "react";
import { connect } from "react-redux";

import Swal from "sweetalert2";
import { Link, useParams, useHistory } from "react-router-dom";
// import {
//   editPembelian,
//   getDetailPembelian,
// } from "app/redux/actions/gaji/PembelianAction";
// import { formatRupiah } from "app/utils/globalFunction";

const DetailPembelian = () =>
  // { getDetailPembelian, detailPembelian }
  {
    const { id } = useParams();
    //   const getData = () => {
    //     getDetailPembelian(id);
    //   };

    //   useEffect(() => {
    //     getData();
    //   }, [id]);

    const detailPembelian = true;
    return detailPembelian ? (
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
            <Button>Back</Button>
          </div>
        </div>
        <SimpleCard loading={false} currency="" saldo="">
          <div className="simple-card-content">
            <Fragment>
              <Grid container spacing={2}>
                <Grid item sm={6} xs={12}>
                  <h5>Nama Pengguna</h5>
                  {/* <div>{detailPembelian?.name}</div> */}
                </Grid>
                <Grid item sm={6} xs={12}>
                  <h5>Nama Produk</h5>
                  {/* <div>{detailPembelian?.name}</div> */}
                </Grid>
                <Grid item sm={6} xs={12} className="mb-20px">
                  <h5>Harga</h5>
                  {/* <div>{detailPembelian?.periode}</div> */}
                </Grid>
                <Grid item sm={6} xs={12} className="mb-20px">
                  <h5>Metode Pembayaran</h5>
                  {/* <div>{detailPembelian?.periode}</div> */}
                </Grid>
                <Grid item sm={6} xs={12} className="mb-20px">
                  <h5>Referensi</h5>
                  {/* <div>{detailPembelian?.periode}</div> */}
                </Grid>
                <Grid item sm={6} xs={12}>
                  <h5>No.Transaksi</h5>
                  <div style={{ color: "#72BE42" }}>
                    {/* {formatRupiah(detailPembelian?.tunjangan)} */}
                  </div>
                </Grid>

                <Grid item sm={6} xs={12} className="mb-20px">
                  <h5>Waktu Transaksi</h5>
                  {/* <div>{detailPembelian?.izin} Hari</div> */}
                </Grid>
                <Grid item sm={6} xs={12}>
                  <h5>Status</h5>
                  {/* <div>{detailPembelian?.tidak_hadir} Hari</div> */}
                </Grid>
              </Grid>
            </Fragment>
          </div>
        </SimpleCard>
      </div>
    ) : (
      <div>wait</div>
    );
  };

const mapStateToProps = (state) => {
  return {
    // detailPembelian: state.gaji.detailPembelian,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    // getDetailPembelian: (code) => dispatch(getDetailPembelian(code)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailPembelian);
