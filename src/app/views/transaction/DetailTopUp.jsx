import { Button, ButtonGroup, Grid, Icon } from "@material-ui/core";
import SimpleCard from "../../assets/components/cards/SimpleCard";
import React, { Component, Fragment, useEffect, useState } from "react";
import { connect } from "react-redux";

import Swal from "sweetalert2";
import { Link, useParams, useHistory } from "react-router-dom";
import { getDetailTopUp } from "../../redux/actions/Transaction/TransactionActions";
import { formatRupiah } from "../../../utlis/formatRupiah";

const DetailTopUp = ({ getDetailTopUp, detailTopup }) => {
  const { id } = useParams();
  const getData = () => {
    getDetailTopUp(id);
  };

  useEffect(() => {
    getData();
  }, [id]);
  const history = useHistory();

  const nominal = detailTopup?.nominal
    ? formatRupiah(detailTopup?.nominal)
    : "";

  return detailTopup ? (
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
          <Button onClick={() => history.push("/transaction")}>Back</Button>
        </div>
      </div>
      <SimpleCard loading={false} currency="" saldo="">
        <div className="simple-card-content">
          <Fragment>
            <Grid container spacing={2}>
              <Grid item sm={6} xs={12}>
                <h5>Nama Pengguna</h5>
                <div>{detailTopup?.nama}</div>
              </Grid>
              <Grid item sm={6} xs={12} className="mb-20px">
                <h5>Referensi</h5>
                <div>{detailTopup?.referensi}</div>
              </Grid>

              <Grid item sm={6} xs={12} className="mb-20px">
                <h5>Nominal Top Up</h5>
                {/* <div>{formatRupiah(detailTopup?.nominal)}</div> */}
                <div>{nominal}</div>
              </Grid>
              <Grid item sm={6} xs={12}>
                <h5>No.Transaksi</h5>
                <div>{detailTopup?.no_transaksi}</div>
              </Grid>

              <Grid item sm={6} xs={12} className="mb-20px">
                <h5>Waktu Transaksi</h5>
                <div>{detailTopup?.waktu_transaksi}</div>
              </Grid>
              <Grid item sm={6} xs={12}>
                <h5>Status</h5>
                <div
                  style={
                    detailTopup?.status === "Selesai"
                      ? { color: "#72BE42" }
                      : { color: "#e63535" }
                  }
                >
                  {detailTopup?.status}
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
    detailTopup: state.transaction.detailTopup,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getDetailTopUp: (id) => dispatch(getDetailTopUp(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailTopUp);
