import {
  Card,
  Grid,
  TextField,
  InputAdornment,
  Switch,
} from "@material-ui/core";
import React, { useLayoutEffect, useState } from "react";
import { useDispatch } from "react-redux";
import "../../../styles/css/DetailUser.css";

import { withStyles } from "@material-ui/core/styles";
import Swal from "sweetalert2";
import { useHistory } from "react-router-dom";
import GeneralButton from "../../components/buttons/GeneralButton.jsx";
import { DatePickerComponent } from "../../components";
import PaymentMethodCardStatic from "../Payment/PaymentMethodCardStatic";
import { getDetailPromo, updPromo } from "../../redux/actions/PromoActions";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";

const EditPromo = () => {
  const history = useHistory();
  const { id } = useParams();

  const [state, setState] = useState({
    vouchers_code: "",
    title: "",
    redeem_code: "",
    discount: 0,
    discount_max: 0,
    start: new Date(),
    end: new Date(),
    con_payment_method: false,
    newDataPaymentMethod: [],
  });

  const [payment_method, setPaymentMethod] = useState([]);

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

  const getData = () => {
    getDetailPromo(id).then((res) => {
      console.log(res);
      const response = res.data.data
      setState({
        ...state,
        vouchers_code: response.vouchers_code,
        title: response.vouchers_title,
        redeem_code: response.vouchers_redeem_code,
        discount: response.voucher_discount,
        discount_max: response.voucher_discount_max,
        start: response.voucher_start,
        end: response.voucher_end,
        con_payment_method: response.con_payment_method,
        newDataPaymentMethod: response.payment_method
      })
      setPaymentMethod(response.payment_method)
    });
  };

  const handleChange = (e) => {
    e.persist();
    setState((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = () => {
    try {
      if (
        !state.title ||
        !state.redeem_code ||
        !state.discount ||
        !state.discount_max ||
        !state.start ||
        !state.end
      ) {
        throw new Error("Lengkapi semua inputan !");
      }

      if (state.con_payment_method && payment_method.length == 0) {
        throw new Error("Pilih minimal 1 payment method yang diaktifkan !");
      }

      const params = {
        ...state,
        payment_method: payment_method,
      };

      updPromo(params)
        .then((res) => {
          Swal.fire("Success!", "Data berhasil diperbarui", "success");
          history.push("/kode_promo");
        })
        .catch((err) => {
          console.log(err);
          Swal.fire("Error!", "Data gagal diperbarui !", "error");
        });
    } catch (e) {
      Swal.fire("Oopss!", e.message, "error");
    }
  };

  const handleDateChangeStart = (date) => {
    setState((prevState) => ({
      ...prevState,
      start: date,
    }));
  };

  const handleDateChangeEnd = (date) => {
    setState((prevState) => ({
      ...prevState,
      end: date,
    }));
  };

  const handleSwitchChange = (pm_code, status) => {
    // console.log(pm_code, status);
    // if (status == 0 || status == false) {
    //   let newPM = payment_method.filter((item) => item.pm_code != pm_code);
    //   setPaymentMethod(newPM);
    // } 
    // else {
    //   let pm = {
    //     pm_code: pm_code,
    //     status: status,
    //   };
    //   payment_method.push(pm);
    // }
    status = status ? 1 : 0;
    payment_method.find((item) => item.pm_code == pm_code).status = status;
    console.log(payment_method);
  };

  useLayoutEffect(() => {
    getData();
  }, []);

  return (
    <div className="analytics m-sm-30 mt-7 text-black">
      <div className="d-flex justify-content-between">
        <h1 className="fw-600 m-0">Edit Kode Promo</h1>
        <GeneralButton variant="contained" name="Save" data={handleSubmit} />
      </div>
      <Card className="mt-5 py-10 px-10">
        <div className="mt-5 mb-8">
          <Grid container className="mt-2" spacing={2}>
            <Grid item xs={12} sm={6}>
              <h1
                className="mb-5 font-semimedium text-14"
                style={{ color: "#0a0a0a" }}
              >
                Nama Promo
              </h1>
              <TextField
                required={true}
                size="small"
                value={state.title}
                name="title"
                className={`w-full`}
                InputProps={{
                  style: {
                    borderRadius: 5,
                    minHeight: 46,
                  },
                }}
                placeholder="Nama Promo"
                variant="outlined"
                onChange={handleChange}
                type="text"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <h1
                className="mb-5 font-semimedium text-14"
                style={{ color: "#0a0a0a" }}
              >
                Kode Promo
              </h1>
              <TextField
                required={true}
                size="small"
                value={state.redeem_code}
                name="redeem_code"
                className={`w-full`}
                InputProps={{
                  style: {
                    borderRadius: 5,
                    minHeight: 46,
                  },
                }}
                placeholder="Kode Promo"
                variant="outlined"
                onChange={handleChange}
                type="text"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <h1
                className="mb-5 font-semimedium text-14"
                style={{ color: "#0a0a0a" }}
              >
                Discount (Nominal)
              </h1>
              <TextField
                required={true}
                size="small"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">Rp</InputAdornment>
                  ),
                  style: {
                    borderRadius: 5,
                    minHeight: 46,
                  },
                }}
                value={state.discount}
                name="discount"
                className={`w-full`}
                placeholder="0"
                variant="outlined"
                onChange={handleChange}
                type="number"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <h1
                className="mb-5 font-semimedium text-14"
                style={{ color: "#0a0a0a" }}
              >
                Maksimal Penggunaan
              </h1>
              <TextField
                required={true}
                size="small"
                value={state.discount_max}
                name="discount_max"
                className={`w-full`}
                placeholder="0"
                variant="outlined"
                onChange={handleChange}
                type="number"
                InputProps={{
                  style: {
                    borderRadius: 5,
                    minHeight: 46,
                  },
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <h1
                className="mb-5 font-semimedium text-14"
                style={{ color: "#0a0a0a" }}
              >
                Tanggal Mulai
              </h1>
              <DatePickerComponent
                date={state.start}
                handleDate={handleDateChangeStart}
                name="start"
                tipe="d MMMM yyyy"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <h1
                className="mb-5 font-semimedium text-14"
                style={{ color: "#0a0a0a" }}
              >
                Tanggal Selesai
              </h1>
              <DatePickerComponent
                date={state.end}
                handleDate={handleDateChangeEnd}
                name="end"
                tipe="d MMMM yyyy"
              />
            </Grid>
          </Grid>
        </div>
      </Card>
      <Card className="mt-5 py-10 px-10">
        <div className="d-flex justify-content-between">
          <h4 className="mb-5 font-semimedium" style={{ color: "#0a0a0a" }}>
            Payment Method
          </h4>
          <AntSwitch
            checked={state.con_payment_method}
            onChange={(e) => {
              setState((prev) => ({
                ...prev,
                con_payment_method: !state.con_payment_method,
              }));
            }}
            name="con_payment_method"
          />
        </div>
        <div className="mt-5 mb-8">
          {state.con_payment_method && (
            <Grid container className="mt-2" spacing={3}>
              {state?.newDataPaymentMethod.map((data) => (
                <Grid item xs={6} md={3} key={data.pm_code}>
                  <PaymentMethodCardStatic
                    data={data}
                    handleSwitch={handleSwitchChange}
                    checked={data?.status || false}
                  />
                </Grid>
              ))}
            </Grid>
          )}
        </div>
      </Card>
    </div>
  );
};

export default EditPromo;
