import { Button, ButtonGroup, Grid, Icon } from "@material-ui/core";
import SimpleCard from "../../assets/components/cards/SimpleCard";
import React, { Component, Fragment, useEffect, useState } from "react";
import { connect } from "react-redux";

import Swal from "sweetalert2";
import { Link, useParams, useHistory } from "react-router-dom";
import { getDetailTopUp, getDetailUserTopup } from "../../redux/actions/Transaction/TransactionActions";
import { formatRupiah } from "../../../utlis/formatRupiah";
import { parse } from "date-fns";
import { useLayoutEffect } from "react";
import { TableCustom } from "../../components";

const DetailTopUp = ({ getDetailTopUp, detailTopup, getDetailUserTopup, detailUserTopup }) => {
  const { id } = useParams();
  // const getData = () => {
  //   getDetailTopUp(id);
  // };
  
  const getDataDetailUserTopUp = (code) => {
    getDetailUserTopup(code);
  };
  useEffect(() => {
    console.log(detailUserTopup);
  }, [detailUserTopup]);
  

  useEffect(() => {
    getDataDetailUserTopUp(id);
  }, [id]);
  const history = useHistory();

  // const nominal = detailTopup?.nominal
  //   ? formatRupiah(detailTopup?.nominal)
  //   : "";

  const tableHeadItems = [
    { name: "No", align: "center", colSpan: 1 },
    { name: "Waktu Transaksi", align: "center", colSpan: 3 },
    { name: "No. Transaksi", align: "center", colSpan: 4},
    { name: "Total Amount", align: "center", colSpan: 2 },
    { name: "Status", align: "center", colSpan: 2 },
    { name: "Aksi", align: "center", colSpan: 2 },
  ];

  const tableBodyItems = [
    { key: "created_at", align: "center", colSpan: 3 },
    { key: "transaction_code", align: "center", colSpan: 4},
    { key: "total_amount", align: "center", colSpan: 2, type: "topup"},
    { key: "status", align: "center", colSpan: 2, type: "status"},
  ];

  return detailUserTopup ? (
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
                <div>{detailUserTopup.data_user?.name}</div>
              </Grid>

              <Grid item sm={6} xs={12} className="mb-20px">
                <h5>User Code</h5>
                <div>{detailUserTopup.data_user?.users_code}</div>
                {/* <div>{formatRupiah(parseInt(detailTopup.total_amount))}</div> */}
              </Grid>
              <Grid item sm={6} xs={12}>
                <h5>Email</h5>
                <div>{detailUserTopup.data_user?.email}</div>
              </Grid>

              <Grid item sm={6} xs={12} className="mb-20px">
                <h5>Balance</h5>
                <div>{formatRupiah(parseInt(detailUserTopup.data_user?.users_balance))}</div>
              </Grid>
            </Grid>
          </Fragment>
        </div>
      </SimpleCard>
      <div className="mt-5">
        <SimpleCard loading={false} currency="" saldo="">
          <TableCustom
            tableHeadItems={tableHeadItems}
            data={detailUserTopup?.data_topup}
            customColumns={tableBodyItems}
            aksiSpan={2}
            detailLink={"/test"}
            id={"transaction_code"}
          />
        </SimpleCard>
      </div>
    </div>
  ) : (
    <div>wait</div>
  );
};

const mapStateToProps = (state) => {
  return {
    // detailTopup: state.transaction.detailTopup,
    detailUserTopup: state.transaction.detailUserTopup,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    // getDetailTopUp: (id) => dispatch(getDetailTopUp(id)),
    getDetailUserTopup: (params) => dispatch(getDetailUserTopup(params)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailTopUp);
