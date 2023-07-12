import {
  Button,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  InputLabel,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import Swal from "sweetalert2";
import { changeUserPassword } from "../../redux/actions/UserActions";

const ModalEditPassword = ({ handleClose, open, data }) => {
  const [submit, setSubmit] = useState(false);
  const [params, setParams] = useState({
    password: "",
  });
  const handleChange = ({ target: { value, name } }) => {
    setParams((pref) => ({
      ...pref,
      [name]: value,
    }));
  };
  const handleFormSubmit = () => {
    setSubmit(true);
    const newParams = {
      password: params.password,
      users_code: data.users_code,
    };
    changeUserPassword(newParams)
      .then(() => {
        setSubmit(false);
        showAlert("Password berhasil diubah", true);
      })
      .catch((err) => {
        let error = err?.response?.data;
        showAlert(
          Array.isArray(error?.data)
            ? error?.data[0]
            : "Password gagal diubah, coba beberapa saat lagi",
          false
        );
        setSubmit(false);
      });
  };
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
        handleClose();
      }
    });
  };
  useEffect(() => {
    if (data) {
      setParams((pref) => ({
        ...pref,
        idx: data?.idx,
        ukuran: data?.ukuran,
        name: data?.name,
      }));
    }
  }, [data]);

  return (
    <Dialog onClose={handleClose} open={open} maxWidth="sm" fullWidth>
      <DialogTitle>Ganti Password user</DialogTitle>
      <DialogContent className="pb-6">
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12}>
            <ValidatorForm onSubmit={handleFormSubmit} className="w-full">
              <Grid container spacing={2} justifyContent="flex-end">
                <Grid item xs={12}>
                  <InputLabel htmlFor="name" className="mb-4">
                    Ganti Password <span className="text-danger">*</span>
                  </InputLabel>
                  <TextValidator
                    id="password"
                    placeholder="Input Password"
                    className="w-full"
                    variant="outlined"
                    onChange={handleChange}
                    type="text"
                    name="password"
                    value={params.password || ""}
                    validators={["required"]}
                    errorMessages={["Masukkan Password terlebih dahulu"]}
                  />
                </Grid>
                <Grid item xs={12} className="mt-4">
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    className="text-white w-full radius-6 text-capitalize py-2"
                    disableElevation
                    disabled={submit}
                  >
                    {submit ? (
                      <CircularProgress color="secondary" size={25} />
                    ) : (
                      "Ganti Password"
                    )}
                  </Button>
                </Grid>
              </Grid>
            </ValidatorForm>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};

export default ModalEditPassword;
