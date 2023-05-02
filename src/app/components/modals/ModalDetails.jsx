import { Button, Dialog, DialogContent, DialogTitle, Grid, InputLabel, Tooltip } from '@material-ui/core';
import { InfoOutlined } from '@material-ui/icons';
import React, { useEffect, useState } from 'react';
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator';

const ModalDetails = ({ handleClose, open, handleSave, data }) => {
    const [params, setParams] = useState({
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
    useEffect(() => {
        if (data) {
            setParams((pref) => ({
                ...pref,
                title_id: data?.title_id,
                title_en: data?.title_en,
                desc_id: data?.desc_id,
                desc_en: data?.desc_en,
                idx: data?.idx,
            }));
        } else {
            setParams({
              title_id: "",
              title_en: "",
              desc_id: "",
              desc_en: "",
              idx: ''
          });
        }
    }, [data, open]);
    return (
        <Dialog onClose={handleClose} open={open} maxWidth="md" fullWidth className='border-radius-0'>
            <DialogTitle>{params.idx ? 'Edit' : 'Tambah'} Misi</DialogTitle>
            <DialogContent className='pb-6'>
                <ValidatorForm
                    onSubmit={() => handleSave(params)}
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

export default ModalDetails;
