import {
  Button,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  InputLabel,
  MenuItem,
  Select,
} from "@material-ui/core";
import { KeyboardArrowDownRounded } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import Swal from "sweetalert2";

import { UploadImage } from "..";

const ModalFormIsi = ({ handleClose, open, handleSave, data, count }) => {
  const [submit, setSubmit] = useState(false);
  const [params, setParams] = useState({
    bantuan_isi_code: "",
    image: "",
    img_old: "",
    title: "",
    image_preview: "",
    order: "",
  });
  const handleChange = ({ target: { value, name } }) => {
    setParams((pref) => ({
      ...pref,
      [name]: value,
    }));
  };
  const cekParams = () => {
    if (params.title.length < 0) {
      showAlert("Isi judul terlebih dahulu", false);
      return false;
    } else {
      return true;
    }
  };
  const handleFormSubmit = () => {
    let cek = cekParams();
    if (!cek) return null;
    setSubmit(true);
    handleSave(params);
    setSubmit(false);
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
        bantuan_isi_code: data?.bantuan_isi_code,
        image: "",
        img_old: data?.img_old,
        title: data?.title,
        image_preview: data?.image,
        order: data?.order,
      }));
    } else {
      setParams((pref) => ({
        ...pref,
        order: count,
      }));
    }
  }, []);
  const handleChangeFoto = (file, path) => {
    setParams((pref) => ({
      ...pref,
      image: file,
      image_preview: path,
    }));
  };
  const orderData = Array.from(
    Array(count && !data ? count + 1 : count ? count : 1).keys()
  );

  return (
    <Dialog onClose={handleClose} open={open} maxWidth="sm" fullWidth>
      <DialogTitle>{params.idx ? "Edit" : "Tambah"} Isi Bantuan</DialogTitle>
      <DialogContent>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12}>
            <ValidatorForm onSubmit={handleFormSubmit} className="w-full">
              <Grid container spacing={2} justifyContent="flex-end">
                <Grid item xs={12}>
                  <InputLabel htmlFor="title" className="mb-4">
                    Judul <span className="text-danger">*</span>
                  </InputLabel>
                  <TextValidator
                    id="title"
                    placeholder="Judul"
                    className="w-full"
                    variant="outlined"
                    onChange={handleChange}
                    type="text"
                    name="title"
                    value={params.title || ""}
                    validators={["required"]}
                    errorMessages={["Masukkan Judul terlebih dahulu"]}
                  />
                </Grid>
                <Grid item xs={12}>
                  <InputLabel htmlFor="order" className="mb-4">
                    Urutan <span className="text-danger">*</span>
                  </InputLabel>
                  <Select
                    labelId="order"
                    value={params.order}
                    onChange={handleChange}
                    variant="outlined"
                    className="w-full"
                    name="order"
                    displayEmpty
                    IconComponent={KeyboardArrowDownRounded}
                  >
                    <MenuItem value="" selected disabled>
                      Urutan ke
                    </MenuItem>
                    {orderData?.map((item) => (
                      <MenuItem value={item} key={item + 1}>
                        Urutan ke {item + 1}
                      </MenuItem>
                    ))}
                  </Select>
                </Grid>
                <Grid item xs={12}>
                  <UploadImage
                    uploadFoto={handleChangeFoto}
                    label="Gambar"
                    preview={params?.image_preview}
                    aspectRatio={1 / 1}
                    noCrop={true}
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

export default ModalFormIsi;
