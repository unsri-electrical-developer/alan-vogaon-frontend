import { Button, Card, CircularProgress, Grid, InputLabel, Tooltip } from '@material-ui/core';
import { InfoOutlined } from '@material-ui/icons';
import React, { useState } from 'react';
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator';
import { useHistory } from 'react-router-dom';
import Swal from 'sweetalert2';

import { UploadImage } from '../../../components';
import { addSertifikat } from '../../../redux/actions/SertifikatActions';

const TambahSertifikat = () => {
    const history = useHistory();
    const [submit, setSubmit] = useState(false);
    const [params, setParams] = useState({
        year:"",
        title_id:"",
        title_en:"",
        desc_id:"",
        desc_en:"",
        img:"",
        img_preview: ''
    });
    const handleChange = ({ target: { value, name } }) => {
        setParams((pref) => ({
            ...pref,
            [name]: value
        }));
    };
    const handleFormSubmit = () => {
        setSubmit(true);
        addSertifikat(params)
            .then(() => {
                showAlert('Data berhasil disimpan', true);
                setSubmit(false);
            })
            .catch((err) => {
                let error = err?.response?.data;
                showAlert(
                    Array.isArray(error?.data)
                        ? error?.data[0]
                        : 'Gagal menyimpan data, coba beberapa saat lagi',
                    false
                );
                setSubmit(false);
            });
    };
    const showAlert = (text, success) => {
        Swal.fire({
            title: success ? 'Berhasil' : 'Oopss!',
            text: text,
            imageUrl: `/assets/images/icons/${
                success ? 'ic_success' : 'ic_error'
            }.svg`,
            imageWidth: 92,
            imageHeight: 92,
            confirmButtonText: 'Ok',
            confirmButtonColor: '#0083E2'
        }).then((res) => {
            if (res.isConfirmed && success) {
                history.goBack();
            }
        });
    };
    const handleChangeFoto = (file, path) => {
        setParams((pref) => ({
            ...pref,
            img: file,
            img_preview: path
        }));
    };
    return (
        <div className="m-sm-30">
            <Grid container spacing={4} justifyContent="center">
                <Grid item xs={11} md={12}>
                    <h3 className="fw-bold m-0">Tambah Sertifikat & Penghargaan</h3>
                </Grid>
                <Grid item xs={11} md={12}>
                    <Card elevation={0} className="py-5 px-6 border-radius-0 ">
                        <ValidatorForm
                            onSubmit={handleFormSubmit}
                            className="w-full"
                        >
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <UploadImage
                                        uploadFoto={handleChangeFoto}
                                        label="Unggah Foto"
                                        preview={
                                            params?.img_preview
                                        }
                                        required={true}
                                        aspectRatio={488/366}
                                        noCrop={true}
                                        note={[
                                            'Format PNG, WEBP dan JPG diperbolehkan',
                                            '*Ukuran foto 488 x 366'
                                        ]}
                                    />
                                </Grid>
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
                                        Kategori [ID]{' '}
                                        <span className="text-danger">*</span>
                                        <Tooltip title="Teks Akan ditampilkan saat pengguna menggunakan bahasa Indonesia pada website" placement='top-start' arrow>
                                            <InfoOutlined fontSize='small' color='action'></InfoOutlined>
                                        </Tooltip>
                                    </InputLabel>
                                    <TextValidator
                                        id="desc_id"
                                        placeholder="Kategori"
                                        className="w-full"
                                        variant="outlined"
                                        onChange={handleChange}
                                        type="text"
                                        name="desc_id"
                                        value={params.desc_id || ''}
                                        validators={['required']}
                                        errorMessages={[
                                            'Masukkan Kategori terlebih dahulu'
                                        ]}
                                    />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <InputLabel
                                        htmlFor="desc_en"
                                        className="mb-4"
                                    >
                                        Kategori [EN]{' '}
                                        <span className="text-danger">*</span>
                                        <Tooltip title="Teks Akan ditampilkan saat pengguna menggunakan bahasa Inggris pada website" placement='top-start' arrow>
                                            <InfoOutlined fontSize='small' color='action'></InfoOutlined>
                                        </Tooltip>
                                    </InputLabel>
                                    <TextValidator
                                        id="desc_en"
                                        placeholder="Kategori"
                                        className="w-full"
                                        variant="outlined"
                                        onChange={handleChange}
                                        type="text"
                                        name="desc_en"
                                        value={params.desc_en || ''}
                                        validators={['required']}
                                        errorMessages={[
                                            'Masukkan Kategori terlebih dahulu'
                                        ]}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <InputLabel htmlFor="year" className="mb-4">
                                        Tahun{' '}
                                        <span className="text-danger">*</span>
                                    </InputLabel>
                                    <TextValidator
                                        id="year"
                                        placeholder="Tahun"
                                        className="w-full"
                                        variant="outlined"
                                        onChange={handleChange}
                                        type="number"
                                        name="year"
                                        value={params.year || ''}
                                        validators={['required']}
                                        errorMessages={[
                                            'Masukkan Tahun terlebih dahulu'
                                        ]}
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
                                                onClick={() => history.goBack()}
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
                                                    <CircularProgress
                                                        color="primary"
                                                        size={25}
                                                    />
                                                ) : (
                                                    'Simpan'
                                                )}
                                            </Button>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </ValidatorForm>
                    </Card>
                </Grid>
            </Grid>
        </div>
    );
};

export default TambahSertifikat;
