import { Button, Card, CircularProgress, Grid, InputLabel } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator';
import { useHistory } from 'react-router-dom';
import Swal from 'sweetalert2';

import { UploadImage } from '../../components';
import { updAdmin2 } from '../../redux/actions/AdminActions';
import { getProfile } from '../../redux/actions/UserActions';

const EditProfile = () => {
    const history = useHistory();
    const [user, setUser] = useState({
        fullname: '',
        email: '',
        password: '',
        users_code: '',
        profile_pict_ori: '',
        profile_pict: '',
        profile_pict_preview: ''
    });
    const [submit, setSubmit] = useState(false);

    const getData = () => {
        getProfile()
            .then(({ data }) => {
                setUser((pref) => ({
                    ...pref,
                    fullname: data?.data?.fullname,
                    email: data?.data?.email,
                    profile_pict: '',
                    profile_pict_preview: data?.data?.profile_pict,
                    profile_pict_ori: data?.data?.profile_pict_ori || "default.png",
                    users_code: data?.data?.users_code
                }));
            })
            .catch((err) => {
                showAlert('Gagal mengambil data profile', false);
                setSubmit(true);
            });
    };

    useEffect(() => {
        getData();
    }, []);

    const handleChangeProfile = (file, path) => {
        setUser((pref) => ({
            ...pref,
            profile_pict: file,
            profile_pict_preview: path
        }));
    };

    const handleChange = ({ target: { name, value } }) => {
        setUser((pref) => ({
            ...pref,
            [name]: value
        }));
    };

    const handleFormSubmit = () => {
        setSubmit(true);
        updAdmin2(user)
            .then(() => {
                setSubmit(false);
                showAlert('Profile berhasil diubah', 1);
            })
            .catch((err) => {
                let error = err?.response?.data;
                setSubmit(false);
                showAlert(
                    Array.isArray(error?.data)
                        ? error?.data[0]
                        : 'Gagal menyimpan perubahan, coba beberapa saat lagi',
                    false
                );
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
                history.push('/profile');
            }
        });
    };

    useEffect(() => {
        ValidatorForm.addValidationRule('isPasswordCorrect', (value) => {
            if (value.length > 0 && value.length < 8) {
                return false;
            }
            return true;
        });
    }, []);

    return (
        <div className="m-sm-30">
            <Grid container spacing={2} justifyContent="center">
                <Grid item xs={11} md={12}>
                    <h4 className="fw-bold">Edit Profile</h4>
                </Grid>
                <Grid item xs={11} md={12}>
                    <Card elevation={0} className="py-5 px-6 border-radius-0 ">
                        <ValidatorForm
                            onSubmit={handleFormSubmit}
                            className="w-full"
                        >
                            <Grid container spacing={4}>
                                <Grid item xs={12} md={6}>
                                    <UploadImage
                                        uploadFoto={handleChangeProfile}
                                        label="Foto Profile"
                                        preview={
                                            user?.profile_pict_preview
                                        }
                                        aspectRatio={1 / 1}
                                        note={[
                                            'Format PNG, WEBP dan JPG diperbolehkan',
                                            '*Ukuran foto 300 x 300 atau 1:1'
                                        ]}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Grid container spacing={4}>
                                        <Grid item xs={12} md={6}>
                                            <InputLabel
                                                htmlFor="fullname"
                                                className="mb-4"
                                            >
                                                Nama Lengkap{' '}
                                                <span className="text-danger">
                                                    *
                                                </span>
                                            </InputLabel>
                                            <TextValidator
                                                id="fullname"
                                                placeholder="Nama Lengkap"
                                                className="w-full"
                                                variant="outlined"
                                                onChange={handleChange}
                                                type="text"
                                                name="fullname"
                                                value={user.fullname || ''}
                                                validators={['required']}
                                                errorMessages={[
                                                    'Masukkan nama anda terlebih dahulu'
                                                ]}
                                            />
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                            <InputLabel
                                                htmlFor="email"
                                                className="mb-4"
                                            >
                                                Email{' '}
                                                <span className="text-danger">
                                                    *
                                                </span>
                                            </InputLabel>
                                            <TextValidator
                                                id="email"
                                                placeholder="Email"
                                                className="w-full"
                                                variant="outlined"
                                                onChange={handleChange}
                                                type="email"
                                                name="email"
                                                value={user.email || ''}
                                                validators={[
                                                    'required',
                                                    'isEmail'
                                                ]}
                                                errorMessages={[
                                                    'Masukkan email anda terlebih dahulu',
                                                    'email tidak valid'
                                                ]}
                                                disabled
                                            />
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                            <InputLabel
                                                htmlFor="password"
                                                className="mb-4"
                                            >
                                                Password
                                            </InputLabel>
                                            <TextValidator
                                                id="password"
                                                placeholder="Password"
                                                className="w-full"
                                                variant="outlined"
                                                onChange={handleChange}
                                                type="password"
                                                name="password"
                                                value={user.password || ''}
                                                validators={[
                                                    'isPasswordCorrect'
                                                ]}
                                                errorMessages={[
                                                    'Minimal panjang password 8 karakter'
                                                ]}
                                            />
                                            <p className="text-muted pl-3 mb-0 mt-2">
                                                Isi jika Anda ingin mengganti
                                                password Anda
                                            </p>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item xs={12} className="justify-end flex">
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        color="primary"
                                        className="text-white px-8"
                                        disabled={submit}
                                        disableElevation
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
                        </ValidatorForm>
                    </Card>
                </Grid>
            </Grid>
        </div>
    );
};

export default EditProfile;
