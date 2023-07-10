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
const FA = () => {
  const history = useHistory();
  // const { users_type } = useSelector(({ user }) => user);
  const [step, setStep] = useState(0);
  const [barcode, setFABarcode] = useState("");
  const [fa_secret, setFASecret] = useState("");
  const [fa_set, setFAStatus] = useState(0);
  const [submit, setSubmit] = useState(false);
  const [params, setParams] = useState({
    otp: "",
  });

  const getData = () => {
    getProfile()
      .then(({ data }) => {
        setFASecret(data?.data?.fa_secret);
        setFAStatus(data?.data?.fa_set);
        if (data?.data?.fa_set) {
          setStep(2);
        }
      })
      .catch((err) => {
        showAlert("Gagal mengambil data profile", false);
        // setSubmit(true);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    console.log(fa_secret);
    if (fa_secret != "") {
      getAuthFABarcode(fa_secret)
        .then(({ data }) => {
          console.log(data);
          setFABarcode(data?.data?.barcode);
        })
        .catch((err) => {
          showAlert("Gagal mengambil data FA, Refresh halaman anda", false);
          // setSubmit(true);
        });
    }
  }, [fa_secret]);

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
        setStep(step + 1);
        setSubmit(false);
      })
      .catch((err) => {
        console.log(err);
        showAlert("Gagal Menyambungkan, OTP yang anda masukkan salah !", false);
        setSubmit(false);
      });
  };

  const steps = ["Konfirmasi", "Sinkronisasi", "Hasil"];

  return (
    <div className="m-sm-30">
      <Grid container spacing={2} justifyContent="flex-start">
        <Grid item xs={11} md={12}>
          <h4 className="fw-bold">Set 2FA Authentication</h4>
        </Grid>
        <Grid item xs={11} md={12}>
          <Card elevation={0} className="py-5 px-6 border-radius-0 ">
            <Stepper activeStep={step} alternativeLabel>
              {steps.map((label, index) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
            {step == 0 && (
              <div className="w-full text-center">
                <p>
                  Keamanan akun Anda wajib ditingkatkan dengan menggunakan
                  keamanan ganda menggunakan sistem 'Google Authenticator'
                </p>
                <Button onClick={() => setStep(step + 1)} size="sm">
                  Lanjut
                </Button>
              </div>
            )}
            {step == 1 && (
              <Grid
                container
                spacing={2}
                justifyContent="center"
                className="text-center"
              >
                <Grid item xs={12} md={12}>
                  <h5>Pengaturan Keamanan Ganda untuk akun Anda</h5>
                  <p>
                    Silahkan pilih dan selesaikan salah satu panduan di bawah
                    ini:
                  </p>
                </Grid>
                <Grid item xs={12} md={6}>
                  <h5>MENGGUNAKAN KEY</h5>
                  <ul className="text-left">
                    <li>Install Aplikasi Google Authenticator</li>
                    <li>Masuk ke Aplikasi Google Authenticator</li>
                    <li>Klik tombol plus (+) di kanan bawah</li>
                    <li>Pilih "Enter setup key"</li>
                    <li>
                      Pada kolom Account Name isi dengan: VOGAON (email untuk
                      login)
                    </li>
                    <li>Pada kolom key isi dengan: {fa_secret}</li>
                    <li>Anda wajib menyimpan key di atas untuk backup</li>
                    <li>Pada type of key, pilih yang Time based</li>
                    <li>Terakhir klik tombol "Add"</li>
                    <li>
                      Setelah itu akan keluar nomor acak, silahkan masukkan kode
                      tersebut di bawah ini.
                    </li>
                  </ul>
                </Grid>
                <Grid item xs={12} md={6}>
                  <h5>MENGGUNAKAN QR</h5>
                  <ul className="text-left">
                    <li>
                      Install Aplikasi Google Authenticator atau Chrome
                      Extension google authenticator
                    </li>
                    <li>Masuk ke Aplikasi Google Authenticator</li>
                    <li>
                      Screenshoot/foto gambar QR di bawah ini untuk backup
                    </li>
                    <li>
                      Scan QR di bawah ini <br />
                      <div dangerouslySetInnerHTML={{ __html: barcode }}></div>
                    </li>
                    <li>
                      Setelah itu akan keluar nomor acak, silahkan masukkan kode
                      tersebut di isian "Kode Otp" di bawah ini.
                    </li>
                  </ul>
                </Grid>
                <Grid item xs={12} md={6}>
                  <ValidatorForm onSubmit={handleFormSubmit} className="w-full">
                    <InputLabel htmlFor="fullname" className="mb-4">
                      Kode OTP <span className="text-danger">*</span>
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
                      type="submit"
                      className="px-8 mt-2"
                      disabled={submit}
                      disableElevation
                      size="md"
                    >
                      {submit ? (
                        <CircularProgress color="primary" size={25} />
                      ) : (
                        "Lanjut"
                      )}
                    </Button>
                  </ValidatorForm>
                </Grid>
              </Grid>
            )}
            {step == 2 && (
              <div className="text-center">
                <h5 className="m-0">Keamanan Ganda berhasil diaktifkan</h5>
                <img
                  src="https://static.vecteezy.com/system/resources/previews/017/177/933/original/round-check-mark-symbol-with-transparent-background-free-png.png"
                  alt="VOGAON"
                  width={400}
                />
              </div>
            )}
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default FA;
