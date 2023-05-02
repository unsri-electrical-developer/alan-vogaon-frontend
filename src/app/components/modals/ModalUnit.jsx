import { Button, Dialog, DialogContent, DialogTitle, Grid, InputLabel, Tooltip } from '@material-ui/core';
import { InfoOutlined } from '@material-ui/icons';
import React, { useEffect, useState } from 'react';
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator';
import Swal from 'sweetalert2';

import { UploadImage } from '..';

const ModalUnit = ({ handleClose, open, handleSave, data, judul }) => {
    const [params, setParams] = useState({
        img: '',
        img_preview: '',
        title_id: "",
        title_en: "",
        desc_id: "",
        desc_en: "",
        idx: ''
    });
    const handleChange = ({ target: { value, name } }) => {
        setParams((pref) => ({
            ...pref,
            [name]: value
        }));
    };
    const cekParams = () => {
        if (params.img.length <= 0 && !params?.idx) {
            showAlert('Upload Foto terlebih dahulu', false);
            return false;
        } else {
            return true;
        }
    };
    const handleFormSubmit = () => {
        let cek = cekParams();
        if (!cek) return;
        handleSave(params);
    };
    const showAlert = (text, success) => {
        Swal.fire({
            title: success ? 'Berhasil' : 'Oopss!',
            text: text,
            imageUrl: `/assets/images/bg_imgs/${
                success ? 'ic_success' : 'ic_error'
            }.svg`,
            imageWidth: 92,
            imageHeight: 92,
            confirmButtonText: 'Ok',
            confirmButtonColor: '#0083E2'
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
                img: "",
                img_preview: data?.img,
                title_id: data?.title_id,
                title_en: data?.title_en,
                desc_id: data?.desc_id,
                desc_en: data?.desc_en,
                idx: data?.idx,
            }));
        } else {
            setParams({
              img: '',
              img_preview: '',
              title_id: "",
              title_en: "",
              desc_id: "",
              desc_en: "",
              idx: ''
          });
        }
    }, [data, open]);
    const handleChangeFoto = (file, path) => {
        setParams((pref) => ({
            ...pref,
            img: file,
            img_preview: path
        }));
    };
    

    return (
        <Dialog onClose={handleClose} open={open} maxWidth="md" fullWidth className='border-radius-0'>
            <DialogTitle>{params.idx ? 'Edit' : 'Tambah'} {judul || "Unit"}</DialogTitle>
            <DialogContent className='pb-6'>
                <ValidatorForm
                    onSubmit={handleFormSubmit}
                    className="w-full"
                >
                    <Grid
                        container
                        spacing={2}
                    >
                        <Grid item xs={12} md={6}>
                            <InputLabel
                                htmlFor="title_id"
                                className="mb-4"
                            >
                                Judul [ID]{' '}
                                <span className="text-danger">*</span>
                                <Tooltip title="Teks Akan ditampilkan saat pengguna menggunakan bahasa Indonesia pada website" placement='top-start' arrow>
                                    <InfoOutlined fontSize='small' color='action'></InfoOutlined>
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
                                value={params.title_id || ''}
                                validators={['required']}
                                errorMessages={[
                                    'Masukkan Judul terlebih dahulu'
                                ]}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <InputLabel
                                htmlFor="title_en"
                                className="mb-4"
                            >
                                Judul [EN]{' '}
                                <span className="text-danger">*</span>
                                <Tooltip title="Teks Akan ditampilkan saat pengguna menggunakan bahasa Inggris pada website" placement='top-start' arrow>
                                    <InfoOutlined fontSize='small' color='action'></InfoOutlined>
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
                                value={params.title_en || ''}
                                validators={['required']}
                                errorMessages={[
                                    'Masukkan Judul terlebih dahulu'
                                ]}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <InputLabel
                                htmlFor="desc_id"
                                className="mb-4"
                            >
                                Deskripsi [ID]{' '}
                                <span className="text-danger">*</span>
                                <Tooltip title="Teks Akan ditampilkan saat pengguna menggunakan bahasa Indonesia pada website" placement='top-start' arrow>
                                    <InfoOutlined fontSize='small' color='action'></InfoOutlined>
                                </Tooltip>
                            </InputLabel>
                            <TextValidator
                                id="desc_id"
                                placeholder="Deskripsi"
                                className="w-full"
                                variant="outlined"
                                onChange={handleChange}
                                type="text"
                                name="desc_id"
                                value={params.desc_id || ''}
                                validators={['required']}
                                errorMessages={[
                                    'Masukkan Deskripsi terlebih dahulu'
                                ]}
                                multiline
                                maxRows={16}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <InputLabel
                                htmlFor="desc_en"
                                className="mb-4"
                            >
                                Deskripsi [EN]{' '}
                                <span className="text-danger">*</span>
                                <Tooltip title="Teks Akan ditampilkan saat pengguna menggunakan bahasa Inggris pada website" placement='top-start' arrow>
                                    <InfoOutlined fontSize='small' color='action'></InfoOutlined>
                                </Tooltip>
                            </InputLabel>
                            <TextValidator
                                id="desc_en"
                                placeholder="Deskripsi"
                                className="w-full"
                                variant="outlined"
                                onChange={handleChange}
                                type="text"
                                name="desc_en"
                                value={params.desc_en || ''}
                                validators={['required']}
                                errorMessages={[
                                    'Masukkan Deskripsi terlebih dahulu'
                                ]}
                                multiline
                                maxRows={16}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <UploadImage
                                uploadFoto={handleChangeFoto}
                                label="Unggah Foto"
                                preview={params?.img_preview}
                                required={true}
                                noCrop
                                note={[
                                    "Format PNG, WEBP dan JPG diperbolehkan",
                                    "*Ukuran foto 1440 x 748"
                                ]}
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
                                        color="primary"
                                        className="text-primary w-full radius-6 text-capitalize py-2"
                                        disableElevation
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
                                    >
                                        Simpan
                                    </Button>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </ValidatorForm>
            </DialogContent>
        </Dialog>
    );
};

export default ModalUnit;
