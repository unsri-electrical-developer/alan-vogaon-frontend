import { Button, ButtonGroup, Grid, Icon, Card, Dialog, TextField } from "@material-ui/core";
import SimpleCard from "../../assets/components/cards/SimpleCard";
import React, { Component, Fragment, useEffect, useState } from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";

import Swal from "sweetalert2";
import { Link, useParams, useHistory } from "react-router-dom";
import { getDetailTopUp, getDetailUserTopup, updateUserSaldo } from "../../redux/actions/Transaction/TransactionActions";
import { formatRupiah } from "../../../utlis/formatRupiah";
import { parse } from "date-fns";
import { useLayoutEffect } from "react";
import { TableCustom } from "../../components";
import SelectWithTextAndValue from "../../components/select/SelectWithTextAndValue";

const DetailTopUp = ({ getDetailUserTopup, detailUserTopup, userSaldo }) => {
  const { id } = useParams();

  const useStyles = makeStyles({
    dialog: {
      // height: 'fit-content',
      scrollbarColor: "transparent",
      scrollbarWidth: "0px",
      minWidth: "800px",
      maxWidth: "1200px,",
      // overflow: 'hidden',
    },
    backDrop: {
      backgroundColor: "rgba(0, 0, 0, 0.2)",
    },
  });
  const classes = useStyles();
  
  const [state, setState] = React.useState({
    users_code: "",
    action: "",
    nominal: 0,
    new_saldo: 0,
    test:"",
  });

  useEffect(() => {
    if (state.action === "TAMBAH" && state.nominal !== 0 && state.nominal !== "") {
      setState({ ...state, new_saldo: parseInt(detailUserTopup.data_user?.users_balance) + parseInt(state.nominal) }); 
    } else if (state.action === "KURANG" && state.nominal !== 0 && state.nominal !== "") {
      setState({ ...state, new_saldo: parseInt(detailUserTopup.data_user?.users_balance) - parseInt(state.nominal) });
    }
    console.log(state);
  }, [state.action, state.nominal]);

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  
  const [onHoverFieldInfo, setOnHoverFieldInfo] = useState(false);
  
  useEffect(() => {
    if (onHoverFieldInfo) {
      document.body.style.cursor = "pointer";
    } else {
      document.body.style.cursor = "default";
    }
  }, [onHoverFieldInfo]);

  const handleOnHoverFieldInfo = () => {
    setOnHoverFieldInfo(true);
  };
  
  const handleOnLeaveFieldInfo = () => {
    setOnHoverFieldInfo(false);
  };

  // const handleSubmit = () => {
  //   if (state.action === "" || state.nominal === 0 || state.nominal === "") {
  //     Swal.fire({
  //       icon: "error",
  //       title: "Gagal",
  //       text: "Harap isi semua inputan!",
  //     });
  //   } else {
  //     Swal.fire({
  //       icon: "success",
  //       title: "Berhasil",
  //       text: "Saldo user berhasil ditambahkan!",
  //     });
  //   }
  // };

  const handleSubmit = () => {
    let obj = {
      users_code: state.users_code,
      action: state.action,
      nominal: state.nominal,
    };
    try {
      if (
        state.users_code == "" ||
        state.action == "" ||
        state.nominal == ""
      ) {
        Swal.fire("Gagal!", "Harap isi semua inputan !", "warning");
        return;
      }

      console.log("obj", obj);
      updateUserSaldo(obj)
        .then((res) => {
          console.log(res);
          setState((prev) => ({
            action: "", 
            nominal: "",
            new_saldo: 0,
          }));
          getDataDetailUserTopUp(state.users_code);
          setOpen(false);
          Swal.fire(
            "Berhasil!",
            "Saldo user berhasil ditambahkan!",
            "success"
          );
        })
        .catch((err) => {
          console.log(err);
          Swal.fire("Gagal!", "System Under Maintenance !", "error");
        });      
    } catch (e) {
      console.log(e);
      Swal.fire("Gagal!", "Saldo user gagal diperbarui", "error");
    }
  };
  
  const getDataDetailUserTopUp = (code) => {
    getDetailUserTopup(code);
  };

  useEffect(() => {
    setState((prev) => ({
      ...prev,
      users_code: detailUserTopup.data_user?.users_code,
    }));
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
                <div>
                  {formatRupiah(parseInt(detailUserTopup.data_user?.users_balance))} 
                  <span className="mx-2 border-radius-circle bg-primary w-20 h-20 text-white"
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "1rem",
                          padding: "5px 0 0 0"
                        }}
                        onMouseEnter={handleOnHoverFieldInfo}
                        onMouseLeave={handleOnLeaveFieldInfo}
                        >
                      <span onClick={handleClickOpen}>
                        <Icon style={{fontSize: "15px", fontWeight: "700"}}>add-icon</Icon>
                      </span>
                  </span>
                </div>
              </Grid>
            </Grid>
          </Fragment>
        </div>
      </SimpleCard>
      {open && (
        <>
        {/* ======== START ADD MODAL ======== */}
        <Dialog
          classes={{
            paper: classes.dialog,
          }}
          BackdropProps={{
            classes: {
              root: classes.backDrop,
            },
          }}
          open={open}
          onClose={handleClose}
          scroll="body"
        >
          <Card className="p-5">
            <Grid container spacing={4}>
              <Grid item xs={12} className="text-17 text-black fw-600">
                Form Tambah/Kurang Saldo
              </Grid>
            </Grid>
            <Grid container spacing={4}>
              <Grid item xs={12} md={12}>
                <h1 className="mb-5 fw-500 text-13 text-black">Saldo user saat ini</h1>
                <TextField
                  size="small"
                  name="pm_title"
                  className={`border-radius-4 w-full`}
                  placeholder="Saldo user saat ini"
                  variant="outlined"
                  disabled={true}
                  style={{color: "#000"}}
                  value={formatRupiah(parseInt(detailUserTopup.data_user?.users_balance))}
                />
              </Grid>
              <Grid item xs={12} md={12}>
              <h1 className="mb-5 fw-500 text-13 text-black">
                ACTION
              </h1>
              <SelectWithTextAndValue
                dataSelect={[{ text: "TAMBAH SALDO", value: "TAMBAH" }, { text: "KURANGI SALDO", value: "KURANG" }]}
                state={state}
                setState={setState}
                // onChange={(e) => setState({ ...state, action: e.target.value })}
                name="action"  // <== name of state
                width="100%"
                scaleY="1"
                menuItemFontSize="text-14"
              />
            </Grid>
              <Grid item xs={12} md={6}>
                <h1 className="mb-5 fw-500 text-13 text-black">Nominal</h1>
                <TextField
                  required={true}
                  size="small"
                  name="pm_title"
                  type="number"
                  className={`border-radius-4 w-full`}
                  onChange={(e) => setState({ ...state, nominal: e.target.value })}
                  placeholder="Nominal"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <h1 className="mb-5 fw-500 text-13 text-black">Saldo akan menjadi:</h1>
                <TextField
                  size="small"
                  name="new_saldo"
                  value={formatRupiah(parseInt(state.new_saldo))}
                  disabled={true}
                  className={`border-radius-4 w-full`}
                  placeholder="Saldo"
                  variant="outlined"
                />
              </Grid>
            </Grid>
            <div className="d-flex items-center justify-start gap-11 mt-20">
              <Button
                variant="outlined"
                color="primary"
                className="w-140 py-2 px-30 text-14 border-radius-4 text-center fw-500"
                onClick={handleClose}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                color="primary"
                className="w-140 border-radius-4 py-2 px-30 text-14 text-center fw-500 text-white"
                type="submit"
                onClick={handleSubmit}
              >
                Save
              </Button>
            </div>
          </Card>
        </Dialog>
      {/* ======== END ADD MODAL ======== */}
        </>
      )}
      
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
