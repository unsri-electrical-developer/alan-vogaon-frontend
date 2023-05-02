import { Button, Dialog, FormHelperText, Grid } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { ValidatorForm } from 'react-material-ui-form-validator';

import UploadImage from '../inputs/UploadImage';

const ModalUploadFoto = ({
    handleClose,
    open,
    handleSaveFoto,
    detail,
    noCrop,
    aspectRatio
}) => {
    const [params, setParams] = useState({
        foto: '',
        foto_preview: ''
    });
    const [error, setError] = useState(false);
    const handleChangeFoto = (file, path) => {
        setParams((pref) => ({
            ...pref,
            foto: file,
            foto_preview: path
        }));
        setError(false);
    };
    const handleSave = () => {
        if (params?.foto?.length <= 0) {
            setError(true);
            return false;
        }
        setError(false);
        handleSaveFoto(params);
    };
    useEffect(() => {
        if (detail) {
            setParams((pref) => ({
                ...pref,
                foto: '',
                foto_preview: detail?.img_preview,
                id: detail?.id
            }));
        }
    }, [detail]);
    return (
        <Dialog onClose={handleClose} open={open} maxWidth="sm" fullWidth>
            <div className={`p-5 bg-white`}>
                <Grid container spacing={2} alignItems="center">
                    <Grid item xs={12}>
                        <h5 className="fw-bold mb-5">
                            {params.id ? 'Edit' : 'Tambah'} Foto
                        </h5>
                        <ValidatorForm onSubmit={handleSave} className="w-full">
                            <Grid
                                container
                                spacing={2}
                                justifyContent="flex-end"
                            >
                                <Grid item xs={12}>
                                    <UploadImage
                                        uploadFoto={handleChangeFoto}
                                        label="Foto"
                                        preview={params?.foto_preview}
                                        required={true}
                                        noCrop={noCrop}
                                        aspectRatio={aspectRatio}
                                    />
                                    {error ? (
                                        <FormHelperText error={true}>
                                            Upload foto terlebih dahulu.
                                        </FormHelperText>
                                    ) : null}
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
                                            >
                                                Simpan
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

export default ModalUploadFoto;
