import { Button, ButtonGroup, Grid, Icon } from "@material-ui/core";
import SimpleCard from "../../assets/components/cards/SimpleCard";
import React, { Component, Fragment, useEffect, useState } from "react";
import { connect } from "react-redux";

import Swal from "sweetalert2";
import { Link, useParams, useHistory } from "react-router-dom";
// import {
//   editTopUp,
//   getDetailTopUp,
// } from "app/redux/actions/gaji/TopUpAction";
// import { formatRupiah } from "app/utils/globalFunction";

const DetailTopUp = () =>
  // { getDetailTopUp, detailTopUp }
  {
    const { id } = useParams();
    //   const getData = () => {
    //     getDetailTopUp(id);
    //   };

    //   useEffect(() => {
    //     getData();
    //   }, [id]);

    const detailTopUp = true;
    return detailTopUp ? (
      <div className="m-sm-30">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "25px",
          }}
        >
          <h1 className="mb-20px header-detail">Riwayat Top Up </h1>
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
                <Grid item sm={6} xs={12} className="mb-20px">
                  <h5>Referensi</h5>
                  {/* <div>{detailPembelian?.periode}</div> */}
                </Grid>

                <Grid item sm={6} xs={12} className="mb-20px">
                  <h5>Nominal Top Up</h5>
                  {/* <div>{detailPembelian?.gaji_pokok}</div> */}
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
    // detailTopUp: state.gaji.detailTopUp,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    // getDetailTopUp: (code) => dispatch(getDetailTopUp(code)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailTopUp);
