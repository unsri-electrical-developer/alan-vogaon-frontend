import {
  Card,
  Grid,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  InputLabel,
  CircularProgress,
} from "@material-ui/core";
import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import Swal from "sweetalert2";
import {
  getAuthFABarcode,
  getProfile,
  pairAuthFABarcode,
} from "../../redux/actions/UserActions";
// import { useSelector } from "react-redux";
import { useState } from "react";
import { Button } from "react-bootstrap";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import apiAuthService from "../../services/apiAuthService";
import { useSelector } from "react-redux";
const CheckFA = () => {
  const history = useHistory();
  const { fa_set } = useSelector(({ user }) => user);
  const [fa_secret, setFASecret] = useState("");
  const [submit, setSubmit] = useState(false);
  const [params, setParams] = useState({
    otp: "",
  });

  const getData = () => {
    getProfile()
      .then(({ data }) => {
        setFASecret(data?.data?.fa_secret);
        if (!data?.data?.fa_set) {
          window.location.href = "/";
        }
      })
      .catch((err) => {
        showAlert("Gagal mengambil data", false);
      });
  };

  useEffect(() => {
    if (!fa_set) {
      window.location.href = "/";
    }
    getData();
  }, []);

  const showAlert = (text, success) => {
    Swal.fire({
      title: success ? "Berhasil" : "Oopss!",
      text: text,
      imageUrl: `/assets/images/icons/${
        success ? "ic_success" : "ic_error"
      }.svg`,
      imageWidth: 92,
      imageHeight: 92,
      confirmButtonText: "Ok",
      confirmButtonColor: "#0083E2",
    }).then((res) => {
      if (res.isConfirmed && success) {
        history.push("/profile");
      }
    });
  };

  const handleChange = (e) => {
    e.persist();
    setParams((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleFormSubmit = () => {
    setSubmit(true);
    pairAuthFABarcode(params)
      .then(({ data }) => {
        localStorage.setItem("ss", true);

        window.location.href = "/";
        setSubmit(false);
      })
      .catch((err) => {
        showAlert("Gagal, OTP yang anda masukkan salah !", false);
        setSubmit(false);
      });
  };

  const handleSignOut = () => {
    const token = localStorage.getItem("jwt_token");
    apiAuthService.logout(token).then(() => {
      window.location.href = "/login";
    });
  };

  return (
    <div className="m-sm-30">
      <Grid container spacing={2} justifyContent="flex-start">
        <Grid item xs={11} md={12}>
          <h4 className="fw-bold">LOGIN ADMIN AREA</h4>
        </Grid>
        <Grid item xs={11} md={12}>
          <Card elevation={0} className="py-5 px-6 border-radius-0 ">
            <Grid item xs={12} md={6}>
              <ValidatorForm onSubmit={handleFormSubmit} className="w-full">
                <InputLabel htmlFor="fullname" className="mb-4">
                  Kode Google Authenticator{" "}
                  <span className="text-danger">*</span>
                </InputLabel>
                <TextValidator
                  id="fullname"
                  placeholder="Kode OTP"
                  className="w-full"
                  variant="outlined"
                  onChange={handleChange}
                  type="number"
                  name="otp"
                  value={params.otp || ""}
                  validators={["required"]}
                  errorMessages={["Masukkan OTP anda terlebih dahulu"]}
                />
                <Button
                  type="button"
                  className="px-8 mt-2 text-danger border-danger"
                  disabled={submit}
                  size="md"
                  onClick={handleSignOut}
                  variant="outlined"
                >
                  Batal
                </Button>
                <Button
                  type="submit"
                  className="px-8 mt-2 ml-5"
                  disabled={submit}
                  size="md"
                >
                  {submit ? (
                    <CircularProgress color="primary" size={25} />
                  ) : (
                    "Login"
                  )}
                </Button>
              </ValidatorForm>
            </Grid>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default CheckFA;
