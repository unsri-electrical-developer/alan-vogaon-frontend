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

const ModalFormSpek = ({ handleClose, open, handleSave, data }) => {
  const [submit, setSubmit] = useState(false);
  const [params, setParams] = useState({
    name: "",
    ukuran: "",
    idx: "",
  });
  const handleChange = ({ target: { value, name } }) => {
    setParams((pref) => ({
      ...pref,
      [name]: value,
    }));
  };
  const handleFormSubmit = () => {
    setSubmit(true);
    handleSave(params)
      .then(() => {
        setSubmit(false);
        showAlert("status desa berhasil diubah", true);
      })
      .catch((err) => {
        let error = err?.response?.data;
        showAlert(
          Array.isArray(error?.data)
            ? error?.data[0]
            : "status desa gagal diubah, coba beberapa saat lagi",
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
      <DialogTitle>{params.idx ? "Edit" : "Tambah"} Fitur</DialogTitle>
      <DialogContent className="pb-6">
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12}>
            <ValidatorForm onSubmit={handleFormSubmit} className="w-full">
              <Grid container spacing={2} justifyContent="flex-end">
                <Grid item xs={12}>
                  <InputLabel htmlFor="name" className="mb-4">
                    Nama <span className="text-danger">*</span>
                  </InputLabel>
                  <TextValidator
                    id="name"
                    placeholder="Nama"
                    className="w-full"
                    variant="outlined"
                    onChange={handleChange}
                    type="text"
                    name="name"
                    value={params.name || ""}
                    validators={["required"]}
                    errorMessages={["Masukkan Nama terlebih dahulu"]}
                  />
                </Grid>
                <Grid item xs={12}>
                  <InputLabel htmlFor="ukuran" className="mb-4">
                    Ukuran <span className="text-danger">*</span>
                  </InputLabel>
                  <TextValidator
                    id="ukuran"
                    placeholder="Ukuran"
                    className="w-full"
                    variant="outlined"
                    onChange={handleChange}
                    type="text"
                    name="ukuran"
                    value={params.ukuran || ""}
                    validators={["required"]}
                    errorMessages={["Masukkan Ukuran terlebih dahulu"]}
                  />
                </Grid>
                <Grid item xs={12} className="mt-4">
                  <Grid
                    container
                    spacing={2}
                    justifyContent="flex-end"
                    className="flex-column-reverse flex-md-row"
                  >
                    <Grid item xs={12} md={2}>
                      <Button
                        color="secondary"
                        className="text-secondary w-full radius-6 text-capitalize py-2"
                        disableElevation
                        disabled={submit}
                        onClick={handleClose}
                      >
                        Batal
                      </Button>
                    </Grid>
                    <Grid item xs={12} md={2}>
                      <Button
                        type="submit"
                        variant="contained"
                        color="secondary"
                        className="text-white w-full radius-6 text-capitalize py-2"
                        disableElevation
                        disabled={submit}
                      >
                        {submit ? (
                          <CircularProgress color="secondary" size={25} />
                        ) : (
                          "Simpan"
                        )}
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </ValidatorForm>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};

export default ModalFormSpek;
