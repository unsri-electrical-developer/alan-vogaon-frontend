import { Button, ButtonGroup, Grid, Icon } from "@material-ui/core";
import SimpleCard from "../../assets/components/cards/SimpleCard";
import React, { Component, Fragment, useEffect, useState } from "react";
import { connect } from "react-redux";

import Swal from "sweetalert2";
import { Link, useParams, useHistory } from "react-router-dom";
import { getDetailPembelian } from "../../redux/actions/Transaction/TransactionActions";
import { formatRupiah } from "../../../utlis/formatRupiah";

const DetailPembelian = ({ getDetailPembelian, detailPembelian }) => {
  const { id } = useParams();
  const getData = () => {
    getDetailPembelian(id);
  };

  useEffect(() => {
    getData();
  }, [id]);

  const nominal = detailPembelian?.price
    ? formatRupiah(detailPembelian?.price)
    : "";
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
      <SimpleCard loading={false} currency="" saldo="">
        <div className="simple-card-content">
          <Fragment>
            <Grid container spacing={2}>
              <Grid item sm={6} xs={12}>
                <h5>Nama Pengguna</h5>
                <div>{detailPembelian?.name}</div>
              </Grid>
              <Grid item sm={6} xs={12}>
                <h5>Nama Produk</h5>
                <div>{detailPembelian?.nama_produk}</div>
              </Grid>
              <Grid item sm={6} xs={12} className="mb-20px">
                <h5>Harga</h5>
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
                <div>{nominal} </div>
              </Grid>

              <Grid item sm={6} xs={12} className="mb-20px">
                <h5>Waktu Transaksi</h5>
                <div>{detailPembelian?.tanggal} </div>
              </Grid>
              <Grid item sm={6} xs={12}>
                <h5>Status</h5>
                <div
                  style={
                    detailPembelian?.status === "done"
                      ? { color: "#72BE42" }
                      : { color: "#e63535" }
                  }
                >
                  {detailPembelian?.status}
                </div>
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
    detailPembelian: state.transaction.detailPembelian,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getDetailPembelian: (id) => dispatch(getDetailPembelian(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailPembelian);
