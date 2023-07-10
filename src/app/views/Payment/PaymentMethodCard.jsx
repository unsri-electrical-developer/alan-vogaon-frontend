import React from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import {
  Card,
  Dialog,
  Grid,
  Icon,
  Switch,
  Button,
  TextField,
} from "@material-ui/core";
import { useDispatch } from "react-redux";

import MoreVertIcon from "@material-ui/icons/MoreVert";
import UploadImageWithButton from "../../components/inputs/UploadImageWithButton";
import SelectWithTextAndValue from "../../components/select/SelectWithTextAndValue";
import MenuComponent from "../../components/Menu/MenuComponent";
import {
  addPaymentMethod,
  deletePaymentMethod,
  togglePaymentStatus,
  updatePaymentMethod,
} from "../../redux/actions/Payment/PaymentMethodActions";
import Swal from "sweetalert2";

const PaymentMethodCard = ({
  isThereContent,
  data = {},
  getData,
  dataPaymentGateway,
}) => {
  const dispatch = useDispatch();
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
  const AntSwitch = withStyles((theme) => ({
    root: {
      width: 38,
      height: 19,
      padding: 0,
      display: "flex",
    },
    switchBase: {
      padding: 2,
      color: theme.palette.grey[500],
      "&$checked": {
        transform: "translateX(19.5px)",
        color: theme.palette.common.white,
        "& + $track": {
          opacity: 1,
          backgroundColor: theme.palette.primary.main,
          borderColor: theme.palette.primary.main,
        },
      },
    },
    thumb: {
      width: 15,
      height: 15,
      boxShadow: "none",
    },
    track: {
      border: `1px solid ${theme.palette.grey[500]}`,
      borderRadius: 16 / 2,
      opacity: 1,
      backgroundColor: theme.palette.common.white,
    },
    checked: {},
  }))(Switch);

  const [state, setState] = React.useState({
    checked: Boolean(data.status) || data.status || false,
    pm_logo: data.pm_logo || "",
    pm_code: data.pm_code || "",
    from: data.from || "",
    pm_title: data.pm_title || "",
    min_order: data.min_order || 0,
    fee: data.fee || 0,
    path: "",
    content: false,
    noContent: false,
  });

  const handleChangePhoto = (pm_logo, path, id) => {
    setState((prev) => ({
      ...prev,
      pm_logo,
      path,
    }));
  };

  const handleChange = (e) => {
    e.persist();
    setState((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleDelete = (pm_code) => {
    try {
      Swal.fire({
        title: "Hapus Data ini ?",
        showCancelButton: true,
        confirmButtonText: "Hapus",
        confirmButtonColor: '#1253fa',
        icon: 'question'
      }).then((result) => {
        if (result.isConfirmed) {
          deletePaymentMethod(pm_code).then((res) => {
            getData();
            setState((prev) => ({
              ...prev,
              noContent: false,
            }));
            Swal.fire(
              "Berhasil!",
              "Data Payment Method berhasil dihapus",
              "success"
            );
          });
        }
      });
    } catch (e) {
      Swal.fire("Berhasil!", "Data Payment Method gagal dihapus", "success");
    }
  };

  const handleSubmit = (type) => {
    let obj = {
      pm_title: state.pm_title,
      pm_code: state.pm_code,
      pm_logo: state.pm_logo,
      from: state.from,
      min_order: state.min_order,
      fee: state.fee,
    };
    try {
      if (
        state.pm_title == "" ||
        state.pm_code == "" ||
        state.pm_logo == "" ||
        state.from == "" ||
        state.min_order == "" ||
        state.fee == ""
      ) {
        Swal.fire("Gagal!", "Harap isi semua inputan !", "warning");
        return;
      }
      if (type === "add") {
        addPaymentMethod(obj)
          .then((res) => {
            getData();
            setState((prev) => ({
              checked: false,
              pm_logo: "",
              pm_code: "",
              from: "",
              pm_title: "",
              path: "",
              min_order: 0,
              fee: 0,
              content: false,
              noContent: false,
            }));
            Swal.fire(
              "Berhasil!",
              "Data Payment Method berhasil disimpan",
              "success"
            );
          })
          .catch((err) => {
            Swal.fire("Gagal!", "System Under Maintenance !", "error");
          });
      } else if (type === "update") {
        updatePaymentMethod(state.pm_code, obj)
          .then((res) => {
            getData();
            setState((prev) => ({
              ...prev,
              content: false,
            }));
            Swal.fire(
              "Berhasil!",
              "Data Payment Method berhasil disimpan",
              "success"
            );
          })
          .catch((err) => {
            Swal.fire("Gagal!", "System Under Maintenance !", "error");
          });
      }
    } catch (e) {
      Swal.fire("Gagal!", "Data Payment Method gagal disimpan", "error");
    }
  };

  return isThereContent ? (
    <>
      <Card className="p-5 shadow-none h-125 bg-blue-gray border-radius-5 d-flex justify-center items-center">
        <Grid
          container
          spacing={2}
          className="d-flex justify-between items-between"
        >
          <Grid
            item
            xs={6}
            className="text-17 fw-500 d-flex text-black justify-start items-start"
          >
            {data.pm_title}
          </Grid>
          <Grid item xs={6} className="d-flex justify-end items-end">
            <div className="m-0 p-0 w-full">
              <img
                src={state.pm_logo}
                alt="preview foto"
                className="preview w-full h-35"
                style={{
                  objectFit: "cover",
                  objectPosition: "center",
                }}
              />
            </div>
          </Grid>
          <Grid item xs={6} className="d-flex justify-start items-start">
            <AntSwitch
              checked={state.checked}
              onChange={(e) => {
                setState((prev) => ({
                  ...prev,
                  checked: !state.checked,
                }));
                togglePaymentStatus(data.pm_code, {
                  status: state.checked ? 0 : 1,
                });
                getData();
              }}
              name="checked"
            />
          </Grid>
          <Grid item xs={6} className="d-flex justify-end items-end">
            <MenuComponent
              deletePath={() => {
                handleDelete(data.pm_code);
                getData();
              }}
              editAction={() =>
                setState((prev) => ({
                  ...prev,
                  content: true,
                }))
              }
              icon={
                <MoreVertIcon
                  className="fw-700 bg-white text-black"
                  fontSize="medium"
                />
              }
            />
          </Grid>
        </Grid>
      </Card>
      <Dialog
        classes={{
          paper: classes.dialog,
        }}
        BackdropProps={{
          classes: {
            root: classes.backDrop,
          },
        }}
        open={state.content}
        onClose={() =>
          setState((prev) => ({
            ...prev,
            content: false,
          }))
        }
      >
        <Card className="p-5">
          <Grid container spacing={4}>
            <Grid item xs={12} className="text-17 text-black fw-600">
              Edit Payment Method
            </Grid>
            <Grid item xs={12} md={6}>
              <h1 className="mb-5 fw-500 text-13 text-black">Unggah Logo</h1>
              <UploadImageWithButton
                minHeight="13.5rem"
                maxHeight="14rem"
                uploadFoto={handleChangePhoto}
                preview={state.pm_logo}
                formatIcon={false}
                state={{ index: 5, id: 5 }}
                getData={getData}
                autoCall={false}
                handleDelete={() => {
                  setState((prev) => ({
                    ...prev,
                    pm_logo: "",
                  }));
                }}
              />
            </Grid>
          </Grid>
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <h1 className="mb-5 fw-500 text-13 text-black">Nama Metode</h1>
              <TextField
                required={true}
                size="small"
                name="pm_title"
                value={state.pm_title}
                onChange={handleChange}
                className={`border-radius-4 w-full`}
                placeholder="Nama Metode"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <h1 className="mb-5 fw-500 text-13 text-black">
                Payment Gateway
              </h1>
              <SelectWithTextAndValue
                dataSelect={dataPaymentGateway.map((data) => ({
                  text: data.pg_name,
                  value: data.pg_code,
                }))}
                state={state}
                setState={setState}
                label="Payment Gateway"
                width="100%"
                name="from"
                scaleY="1"
                menuItemFontSize="text-14"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <h1 className="mb-5 fw-500 text-13 text-black">
                Kode Metode Pembayaran
              </h1>
              <TextField
                required={true}
                size="small"
                name="pm_code"
                value={state.pm_code}
                onChange={handleChange}
                className={`border-radius-4 w-full`}
                placeholder="Kode Metode Pembayaran"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <h1 className="mb-5 fw-500 text-13 text-black">Minimum Order</h1>
              <TextField
                required={true}
                size="small"
                name="min_order"
                value={state.min_order}
                onChange={handleChange}
                className={`border-radius-4 w-full`}
                placeholder="Rp10.000"
                variant="outlined"
                type="number"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <h1 className="mb-5 fw-500 text-13 text-black">Fee Transaksi</h1>
              <TextField
                required={true}
                size="small"
                name="fee"
                value={state.fee}
                onChange={handleChange}
                className={`border-radius-4 w-full`}
                placeholder="Rp10.000"
                variant="outlined"
                type="number"
              />
            </Grid>
          </Grid>
          <div className="d-flex items-center justify-end gap-11 mt-20">
            <Button
              variant="outlined"
              color="primary"
              className="w-140 py-2 px-30 text-14 border-radius-4 text-center fw-500"
              onClick={() => {
                setState((prev) => ({
                  ...prev,
                  pm_logo: data.pm_logo,
                  content: false,
                }));
              }}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              color="primary"
              className="w-140 border-radius-4 py-2 px-30 text-14 text-center fw-500 text-white"
              type="submit"
              onClick={() => handleSubmit("update")}
            >
              Save
            </Button>
          </div>
        </Card>
      </Dialog>
    </>
  ) : (
    <Card className="h-130 bg-blue-gray border-radius-5 border-blue-1 d-flex justify-center items-center">
      <Button
        onClick={() =>
          setState((prev) => ({
            ...prev,
            noContent: true,
          }))
        }
      >
        <div className="d-flex justify-center items-center border-radius-circle bg-primary h-45 w-45 btn-hover-circle">
          <Icon className="text-white fw-700" fontSize="large">
            add-icon
          </Icon>
        </div>
      </Button>
      <Dialog
        classes={{
          paper: classes.dialog,
        }}
        BackdropProps={{
          classes: {
            root: classes.backDrop,
          },
        }}
        open={state.noContent}
        onClose={() =>
          setState((prev) => ({
            ...prev,
            noContent: false,
          }))
        }
      >
        <Card className="p-5">
          <Grid container spacing={4}>
            <Grid item xs={12} className="text-17 text-black fw-600">
              Add Payment Method
            </Grid>
            <Grid item xs={12} md={6}>
              <h1 className="mb-5 fw-500 text-13 text-black">Unggah Logo</h1>
              <UploadImageWithButton
                minHeight="13.5rem"
                maxHeight="14rem"
                uploadFoto={handleChangePhoto}
                preview={state.pm_logo}
                formatIcon={false}
                state={{ index: 5, id: 5 }}
                getData={getData}
                autoCall={false}
                handleDelete={() => {
                  setState((prev) => ({
                    ...prev,
                    pm_logo: "",
                  }));
                }}
              />
            </Grid>
          </Grid>
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <h1 className="mb-5 fw-500 text-13 text-black">Nama Metode</h1>
              <TextField
                required={true}
                size="small"
                name="pm_title"
                value={state.pm_title}
                onChange={handleChange}
                className={`border-radius-4 w-full`}
                placeholder="Nama Metode"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <h1 className="mb-5 fw-500 text-13 text-black">
                Payment Gateway
              </h1>
              <SelectWithTextAndValue
                dataSelect={dataPaymentGateway.map((data) => ({
                  text: data.pg_name,
                  value: data.pg_code,
                }))}
                state={state}
                setState={setState}
                label="Payment Gateway"
                width="100%"
                name="from"
                scaleY="1"
                menuItemFontSize="text-14"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <h1 className="mb-5 fw-500 text-13 text-black">
                Kode Metode Pembayaran
              </h1>
              <TextField
                required={true}
                size="small"
                name="pm_code"
                value={state.pm_code}
                onChange={handleChange}
                className={`border-radius-4 w-full`}
                placeholder="Kode Metode Pembayaran"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <h1 className="mb-5 fw-500 text-13 text-black">Minimum Order</h1>
              <TextField
                required={true}
                size="small"
                name="min_order"
                value={state.min_order}
                onChange={handleChange}
                className={`border-radius-4 w-full`}
                placeholder="Rp10.000"
                variant="outlined"
                type="number"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <h1 className="mb-5 fw-500 text-13 text-black">Fee Transaksi</h1>
              <TextField
                required={true}
                size="small"
                name="fee"
                value={state.fee}
                onChange={handleChange}
                className={`border-radius-4 w-full`}
                placeholder="Rp10.000"
                variant="outlined"
                type="number"
              />
            </Grid>
          </Grid>
          <div className="d-flex items-center justify-start gap-11 mt-20">
            <Button
              variant="outlined"
              color="primary"
              className="w-140 py-2 px-30 text-14 border-radius-4 text-center fw-500"
              onClick={() => {
                setState((prev) => ({
                  ...prev,
                  noContent: false,
                }));
              }}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              color="primary"
              className="w-140 border-radius-4 py-2 px-30 text-14 text-center fw-500 text-white"
              type="submit"
              onClick={() => handleSubmit("add")}
            >
              Save
            </Button>
          </div>
        </Card>
      </Dialog>
    </Card>
  );
};

export default PaymentMethodCard;
