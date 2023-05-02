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

import { UploadImage } from "..";

const ModalFormFitur = ({ handleClose, open, handleSave, data }) => {
  const [submit, setSubmit] = useState(false);
  const [params, setParams] = useState({
    name: "",
    icon: "",
    icon_preview: "",
    idx: "",
  });
  const handleChange = ({ target: { value, name } }) => {
    setParams((pref) => ({
      ...pref,
      [name]: value,
    }));
  };
  const cekParams = () => {
    if (params.icon.length <= 0 && params?.idx === undefined) {
      showAlert("Upload Icon terlebih dahulu", false);
      return false;
    } else if (params.name.length < 0) {
      showAlert("Isi input nama terlebih dahulu", false);
      return false;
    } else {
      return true;
    }
  };
  const handleFormSubmit = () => {
    let cek = cekParams();
    if (!cek) return null;
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
        icon: "",
        icon_preview: data?.icon,
        name: data?.name,
      }));
    }
  }, [data]);
  const handleChangeFoto = (file, path) => {
    setParams((pref) => ({
      ...pref,
      icon: file,
      icon_preview: path,
    }));
  };

  return (
    <Dialog onClose={handleClose} open={open} maxWidth="sm" fullWidth>
      <DialogTitle>{params.idx ? "Edit" : "Tambah"} Fitur</DialogTitle>
      <DialogContent>
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
                  <UploadImage
                    uploadFoto={handleChangeFoto}
                    label="Icon"
                    preview={params?.icon_preview}
                    required={true}
                    aspectRatio={1 / 1}
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

export default ModalFormFitur;
