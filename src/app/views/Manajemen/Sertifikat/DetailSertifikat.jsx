import { Button, Card, CircularProgress, Grid, Tooltip } from '@material-ui/core';
import { InfoOutlined } from '@material-ui/icons';
import React, { useEffect, useState } from 'react';
import { useCallback } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';

import { BackdropLoading } from '../../../components';
import { delSertifikat, getDetailSertifikat } from '../../../redux/actions/SertifikatActions';

const DetailSertifikat = () => {
    const { id } = useParams();
    const history = useHistory();
    const [loading, setLoading] = useState(false);
    const [showLoading, setShowLoading] = useState(false);
    const [params, setParams] = useState({
        c_code:"",
        year:"",
        title_id:"",
        title_en:"",
        desc_id:"",
        desc_en:"",
        img:"",
    });
    const showAlert = useCallback((text, success) => {
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
        }).then(res => {
            if(res.isConfirmed && success){
                history.goBack();
            }
        })
    }, [history]);
    const getData = useCallback(() => {
        setLoading(true);
        getDetailSertifikat(id)
            .then((res) => {
                let data = res.data?.data;
                if (Object.keys(data).length > 0) {
                    setParams((pref) => ({
                        ...pref,
                        c_code: data?.c_code,
                        year: data?.year,
                        title_id: data?.title_id,
                        title_en: data?.title_en,
                        desc_id: data?.desc_id,
                        desc_en: data?.desc_en,
                        img: data?.img,
                    }));
                } else {
                    showAlert(
                        'Gagal mengambil detail data sertifikat, coba beberapa saat lagi',
                        false
                    );
                }
                setLoading(false);
            })
            .catch((err) => {
                let error = err?.response?.data;
                showAlert(
                    Array.isArray(error?.data)
                        ? error?.data[0]
                        : 'Gagal mengambil detail data sertifikat, coba beberapa saat lagi',
                    false
                );
                setLoading(false);
            });
    }, [id, showAlert]);
    useEffect(() => {
        setParams((pref) => ({
            ...pref,
            c_code: id
        }));
        getData();
    }, [getData, id]);

    const handleDelete = (code, nama) => {
        Swal.fire({
            title: 'Konfirmasi Hapus',
            text: 'Apakah anda yakin ingin menghapus data ' + nama,
            imageUrl: `/assets/images/icons/ic_delete.svg`,
            imageWidth: 92,
            imageHeight: 92,
            confirmButtonText: 'Hapus',
            confirmButtonColor: '#FD6D5D',
            showCancelButton: true,
            cancelButtonText: 'Batal',
            cancelButtonColor: '#0083E2',
            reverseButtons: true
        }).then((res) => {
            if (res.isConfirmed) {
                sendDelete(code);
            }
        });
    };

    const sendDelete = (code) => {
        setShowLoading(true);
        delSertifikat(code)
            .then(() => {
                setShowLoading(false);
                showAlert('Berhasil menghapus data', true);
            })
            .catch((err) => {
                let error = err?.response?.data;
                setShowLoading(false);
                showAlert(
                    Array.isArray(error?.data)
                        ? error?.data[0]
                        : 'Gagal menghapus data, coba beberapa saat lagi',
                    false
                );
            });
    };
    return (
        <div className="m-sm-30">
            <Grid container spacing={4} justifyContent="center">
                <Grid item xs={11} md={9}>
                    <h3 className="fw-bold m-0">Detail Sertifikat & Penghargaan</h3>
                </Grid>
                <Grid item xs={11} md={3}>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <Link to={`/sertifikat_penghargaan/edit/${id}`} className="btn btn-outline-primary flex items-center border-radius-0 w-full">
                                <img
                                    src="/assets/images/icons/ic_action_edit.svg"
                                    alt="icon edit"
                                />
                                <span className="pl-4">
                                    {' '}
                                    Edit{' '}
                                </span>
                            </Link>
                        </Grid>
                        <Grid item xs={6}>
                            <Button onClick={() => handleDelete(params.c_code, params.title_id)} variant="outlined" className='btn-outline-danger border-danger text-danger w-full'>
                                <img
                                    src="/assets/images/icons/ic_action_delete.svg"
                                    alt="icon delete"
                                />
                                <span className="pl-4">
                                    {' '}
                                    Delete{' '}
                                </span>
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={11} md={12}>
                    <Card elevation={0} className="py-5 px-6 border-radius-0 ">
                        {loading ? (
                            <div className="text-center">
                                <CircularProgress color="primary" size={35} />
                            </div>
                        ) : (
                            <Grid container spacing={2}>
                                <Grid item xs={12} md={4}>
                                    <p className="mb-3 font-semibold text-16">Foto</p>
                                    <img src={params.img} alt={params.name} className="w-full" />
                                </Grid>
                                <Grid item xs={12}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12} md={6}>
                                            <div className="mb-3 font-semibold text-16 d-flex items-center gap-1"><span>Judul [ID]</span>
                                                <Tooltip title="Teks Akan ditampilkan saat pengguna menggunakan bahasa Indonesia pada website" placement='top-start' arrow>
                                                    <InfoOutlined fontSize='default'></InfoOutlined>
                                                </Tooltip>
                                            </div>
                                            <p>{params.title_id}</p>
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                            <div className="mb-3 font-semibold text-16 d-flex items-center gap-1"><span>Judul [EN]</span>
                                                <Tooltip title="Teks Akan ditampilkan saat pengguna menggunakan bahasa Inggris pada website" placement='top-start' arrow>
                                                    <InfoOutlined fontSize='default'></InfoOutlined>
                                                </Tooltip>
                                            </div>
                                            <p>{params.title_en}</p>
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                            <div className="mb-3 font-semibold text-16 d-flex items-center gap-1"><span>Jabatan [ID]</span>
                                                <Tooltip title="Teks Akan ditampilkan saat pengguna menggunakan bahasa Indonesia pada website" placement='top-start' arrow>
                                                    <InfoOutlined fontSize='default'></InfoOutlined>
                                                </Tooltip>
                                            </div>
                                            <p>{params.desc_id}</p>
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                            <div className="mb-3 font-semibold text-16 d-flex items-center gap-1"><span>Deskripsi [ID]</span>
                                                <Tooltip title="Teks Akan ditampilkan saat pengguna menggunakan bahasa Indonesia pada website" placement='top-start' arrow>
                                                    <InfoOutlined fontSize='default'></InfoOutlined>
                                                </Tooltip>
                                            </div>
                                            <p className='whitespace-pre-wrap'>{params.about_id}</p>
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                            <p className="mb-3 font-semibold text-16">Tahun</p>
                                            <p>{params.year}</p>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        )}
                    </Card>
                </Grid>
            </Grid>
            <BackdropLoading open={showLoading} />
        </div>
    );
};

export default DetailSertifikat;
