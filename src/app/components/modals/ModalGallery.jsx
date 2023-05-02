import { Button, Dialog, DialogContent, DialogTitle, Grid } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { ValidatorForm } from 'react-material-ui-form-validator';
import Swal from 'sweetalert2';

import { UploadImage } from '..';

const ModalGallery = ({ handleClose, open, handleSave, data }) => {
    const [params, setParams] = useState({
        img: '',
        img_preview: '',
        idx: ''
    });
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
                idx: data?.idx,
            }));
        } else {
            setParams({
              img: '',
              img_preview: "",
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
            <DialogTitle>{params.idx ? 'Edit' : 'Tambah'} Foto Galeri</DialogTitle>
            <DialogContent className='pb-6'>
                <ValidatorForm
                    onSubmit={handleFormSubmit}
                    className="w-full"
                >
                    <Grid
                        container
                        spacing={2}
                    >
                        <Grid item xs={12}>
                            <UploadImage
                                uploadFoto={handleChangeFoto}
                                label="Foto"
                                preview={params?.img_preview}
                                required={true}
                                noCrop
                                note={[
                                    "Format PNG, WEBP dan JPG diperbolehkan",
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

export default ModalGallery;
