import { Button, CircularProgress, Dialog, Grid, InputLabel, Tooltip } from '@material-ui/core';
import { InfoOutlined } from '@material-ui/icons';
import React, { useEffect, useState } from 'react';
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator';
import Swal from 'sweetalert2';

import { UploadPdf } from '..';
import { addFileGCG, updFileGCG } from '../../redux/actions/GCGActions';

const ModalFileGCG = ({ handleClose, open, data = {}, isEdit }) => {
  const [submit, setSubmit] = useState(false);
  const [params, setParams] = useState({
    cgg_code: "",
    title_id: "",
    title_en: "",
    file_ori: "",
    file: "",
  });
  const handleChange = ({ target: { value, name } }) => {
    setParams((pref) => ({
      ...pref,
      [name]: value,
    }));
  };
  const handleFormSubmit = () => {
    setSubmit(true);
    if (isEdit) {
      updFileGCG(params)
        .then(() => {
          showAlert("Data berhasil disimpan", true);
          setSubmit(false);
        })
        .catch((err) => {
          let error = err?.response?.data;
          showAlert(
            Array.isArray(error?.data)
              ? error?.data[0]
              : "Gagal menyimpan data, coba beberapa saat lagi",
            false
          );
          setSubmit(false);
        });
    } else {
      addFileGCG(params)
        .then(() => {
          showAlert("Data berhasil disimpan", true);
          setSubmit(false);
        })
        .catch((err) => {
          let error = err?.response?.data;
          showAlert(
            Array.isArray(error?.data)
              ? error?.data[0]
              : "Gagal menyimpan data, coba beberapa saat lagi",
            false
          );
          setSubmit(false);
        });
    }
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
  const handleChangeFile = (file) => {
    setParams((pref) => ({
      ...pref,
      file,
    }));
  };
  useEffect(() => {
    if (isEdit) {
      setParams((pref) => ({
        ...pref,
        cgg_code: data?.cgg_code,
        title_id: data?.title_id,
        title_en: data?.title_en,
        file_ori: data?.file_ori,
      }));
    } else {
      setParams({
        cgg_code: "",
        title_id: "",
        title_en: "",
        file_ori: "",
      });
    }
  }, [isEdit, open]);

  return (
    <Dialog
      onClose={handleClose}
      open={open}
      maxWidth="md"
      fullWidth
      className="border-radius-0"
    >
      <div className="m-sm-30">
        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={11} md={12}>
            <h3 className="fw-bold m-0">
              {isEdit ? "Edit" : "Tambah"} Data
            </h3>
          </Grid>
          <Grid item xs={11} md={12}>
            <ValidatorForm onSubmit={handleFormSubmit} className="w-full">
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <InputLabel htmlFor="title_id" className="mb-4">
                    Judul [ID] <span className="text-danger">*</span>
                    <Tooltip
                      title="Teks Akan ditampilkan saat pengguna menggunakan bahasa Indonesia pada website"
                      placement="top-start"
                      arrow
                    >
                      <InfoOutlined
                        fontSize="small"
                        color="action"
                      ></InfoOutlined>
                    </Tooltip>
                  </InputLabel>
                  <TextValidator
                    id="title_id"
                    placeholder="Judul"
                    className="w-full"
                    variant="outlined"
                    onChange={handleChange}
                    type="text"
                    name="title_id"
                    value={params.title_id || ""}
                    validators={["required"]}
                    errorMessages={["Masukkan Judul terlebih dahulu"]}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <InputLabel htmlFor="title_en" className="mb-4">
                    Judul [EN] <span className="text-danger">*</span>
                    <Tooltip
                      title="Teks Akan ditampilkan saat pengguna menggunakan bahasa Inggris pada website"
                      placement="top-start"
                      arrow
                    >
                      <InfoOutlined
                        fontSize="small"
                        color="action"
                      ></InfoOutlined>
                    </Tooltip>
                  </InputLabel>
                  <TextValidator
                    id="title_en"
                    placeholder="Judul"
                    className="w-full"
                    variant="outlined"
                    onChange={handleChange}
                    type="text"
                    name="title_en"
                    value={params.title_en || ""}
                    validators={["required"]}
                    errorMessages={["Masukkan Judul terlebih dahulu"]}
                  />
                </Grid>
                <Grid item xs={6}>
                  <UploadPdf
                    uploadFile={handleChangeFile}
                    label="Unggah berkas"
                    preview={params?.file}
                    required={true}
                    note={["Format PDF diperbolehkan"]}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Grid
                    container
                    spacing={2}
                    justifyContent="flex-end"
                    className="flex-column-reverse flex-md-row"
                  >
                    <Grid item xs={12} md={2}>
                      <Button
                        color="primary"
                        className="text-primary w-full radius-6 text-capitalize py-2"
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
                        color="primary"
                        className="text-white w-full radius-6 text-capitalize py-2"
                        disableElevation
                        disabled={submit}
                      >
                        {submit ? (
                          <CircularProgress color="primary" size={25} />
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
      </div>
    </Dialog>
  );
};

export default ModalFileGCG;
