import {
    Button,
    Card,
    CircularProgress,
    Grid,
    Icon,
    IconButton,
    InputAdornment,
    MenuItem,
    Select,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    TextField,
} from '@material-ui/core';
import { AddRounded, FilterListRounded, MoreHoriz } from '@material-ui/icons';
import clsx from 'clsx';
import React, { useEffect, useState } from 'react';
import { useCallback } from 'react';
import { Form } from 'react-bootstrap';
import { ValidatorForm } from 'react-material-ui-form-validator';
import ScrollBar from 'react-perfect-scrollbar';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import Swal from 'sweetalert2';

import { MatxMenu } from '../../../../matx';
import { BackdropLoading, TablePagination } from '../../../components';
import { delSertifikat, getSertifikat } from '../../../redux/actions/SertifikatActions';

const Sertifikat = ({ location }) => {
    const history = useHistory();
    const dispatch = useDispatch();
    const [page, setPage] = useState('0');
    const [show, setShow] = useState('25');
    const [search, setSearch] = useState('');
    const [showLoading, setShowLoading] = useState(false);
    const [optionTahun, setOptionTahun] = useState([])
    const [filter, setFilter] = useState({
        tahun: ''
    });
    const { sertifikat, loadingSertifikat, sertifikatPagination, totalSertifikat } = useSelector(
        ({ sertifikat }) => sertifikat
    );

    const getData = useCallback((limit, page, search, year) => {
        dispatch(getSertifikat({limit, page, search, year}));
    }, [dispatch]);

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
        });
    };

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
                getData(show, page, search, filter.tahun);
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

    useEffect(() => {
        let params = new URLSearchParams(location?.search);
        let limit = params.get('limit') || '25';
        let cari = params.get('cari') || '';
        let hal = params.get('hal') ? params.get('hal') : '1';
        let tahun = params.get('tahun') || '';
        setShow(limit);
        setPage(hal);
        setSearch(cari);
        setFilter({
            tahun
        });
        getData(limit, hal, cari, tahun);
    }, [location.search, getData]);

    useEffect(() => {
      const year = new Date().getFullYear();
      for (let i = 0; i < 10; i++) {
        setOptionTahun(pref => ([...pref, {label: year - i, value: year - i}]))
      }
    }, [])
    
    const handleChange = ({ target: { value, name } }) => {
        setFilter((pref) => ({
            ...pref,
            [name]: value
        }));
    };

    return (
        <div className="m-sm-30">
            <Grid container spacing={4} justifyContent="center">
                <Grid item xs={11} md={10} className="flex items-center">
                    <h3 className="fw-bold m-0">Sertifikat & Penghargaan</h3>
                </Grid>
                <Grid item xs={5} md={2}>
                    <Link
                        to="/sertifikat_penghargaan/tambah"
                        className="btn btn-primary radius-6 text-white font-14 w-full border-radius-0"
                    >
                        <AddRounded /> Tambah
                    </Link>
                </Grid>
                <Grid item xs={11} md={12}>
                    <Card className="w-full pt-6 pb-4 border-radius-0" elevation={0}>
                        <Grid
                            container
                            spacing={2}
                            justifyContent="flex-end"
                            className="mb-2 px-4"
                        >
                            <Grid item xs={12} md={4}>
                                <form
                                    noValidate
                                    onSubmit={(e) => {
                                        e.preventDefault();
                                        history.push(
                                            `/sertifikat_penghargaan?hal=${page}&limit=${show}&cari=${search}&tahun=${filter?.tahun}`
                                        );
                                    }}
                                >
                                    <TextField
                                        value={search}
                                        placeholder="Cari berdasarkan judul"
                                        variant="outlined"
                                        onChange={({ target: { value } }) =>
                                            setSearch(value)
                                        }
                                        size="small"
                                        className="w-full"
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        size="small"
                                                        type="submit"
                                                    >
                                                        <Icon
                                                            size="small"
                                                            color="action"
                                                        >
                                                            search
                                                        </Icon>
                                                    </IconButton>
                                                </InputAdornment>
                                            )
                                        }}
                                    />
                                </form>
                            </Grid>
                            <Grid item xs={5} md={2}>
                                <MatxMenu
                                    menuButton={
                                        <Button className="border px-6 w-full">
                                            Filter{' '}
                                            <FilterListRounded className="ms-2" />
                                        </Button>
                                    }
                                    horizontalPosition="right"
                                    classBtn="w-full text-right"
                                    shouldCloseOnItemClick={false}
                                >
                                    <div
                                        className="px-7 py-4"
                                        style={{ maxWidth: 500 }}
                                    >
                                        <h5 className="mb-6 fw-bold">
                                            Filter Sertifikat & Penghargaan
                                        </h5>
                                        <ValidatorForm
                                            onSubmit={(e) => {
                                                e.preventDefault();
                                                history.push(
                                                    `/sertifikat_penghargaan?hal=${page}&limit=${show}&cari=${search}&tahun=${filter?.tahun}`
                                                );
                                            }}
                                            className="w-full"
                                        >
                                            <Grid container spacing={2}>
                                                <Grid item xs={12}>
                                                    <Select
                                                        SelectDisplayProps={{
                                                            style: {
                                                                paddingTop: 10,
                                                                paddingBottom: 10
                                                            }
                                                        }}
                                                        size="small"
                                                        labelId="tahun"
                                                        value={filter.tahun}
                                                        onChange={handleChange}
                                                        variant="outlined"
                                                        className="w-full"
                                                        name="tahun"
                                                        displayEmpty
                                                    >
                                                        <MenuItem
                                                            value=""
                                                            selected
                                                        >
                                                            Semua Tahun
                                                        </MenuItem>
                                                        {optionTahun?.map(
                                                            (item) => (
                                                                <MenuItem
                                                                    value={
                                                                        item.value
                                                                    }
                                                                    key={
                                                                        item.value
                                                                    }
                                                                >
                                                                    {item.label}
                                                                </MenuItem>
                                                            )
                                                        )}
                                                    </Select>
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <Button
                                                        type="submit"
                                                        variant="contained"
                                                        color="primary"
                                                        className="w-full text-white"
                                                        disableElevation
                                                    >
                                                        Filter
                                                    </Button>
                                                </Grid>
                                            </Grid>
                                        </ValidatorForm>
                                    </div>
                                </MatxMenu>
                            </Grid>
                        </Grid>
                        <ScrollBar className="flex-grow flex-column relative h-full">
                            <Table className={clsx('whitespace-pre min-w-750')}>
                                <TableHead>
                                    <TableRow>
                                        <TableCell
                                            align="center"
                                            className="w-90 border-b"
                                        >
                                            No
                                        </TableCell>
                                        <TableCell className='border-b'>Judul</TableCell>
                                        <TableCell className='border-b'>Kategori</TableCell>
                                        <TableCell className='border-b w-130' align="center">
                                            Tahun
                                        </TableCell>
                                        <TableCell className='border-b w-90' align="center">
                                            Aksi
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {loadingSertifikat ? (
                                        <TableRow hover>
                                            <TableCell
                                                className="px-0"
                                                align="center"
                                                colSpan={5}
                                            >
                                                <CircularProgress
                                                    size={25}
                                                    color="primary"
                                                />
                                            </TableCell>
                                        </TableRow>
                                    ) : sertifikat?.length <= 0 ? (
                                        <TableRow hover>
                                            <TableCell
                                                className="px-0"
                                                align="center"
                                                colSpan={5}
                                            >
                                                Data kosong.
                                            </TableCell>
                                        </TableRow>
                                    ) : (
                                        sertifikat?.map((item, i) => (
                                            <TableRow
                                                hover
                                                key={item.c_code}
                                            >
                                                <TableCell
                                                    className="px-0"
                                                    align="center"
                                                >
                                                    {show * (page - 1) +
                                                        (i + 1)}
                                                </TableCell>
                                                <TableCell className="px-0">
                                                    {item.title}
                                                </TableCell>
                                                <TableCell className="px-0">
                                                    {item.desc}
                                                </TableCell>
                                                <TableCell
                                                    className="px-0"
                                                    align="center"
                                                >{item.year}
                                                </TableCell>
                                                <TableCell
                                                    className="px-0"
                                                    align="center"
                                                >
                                                    <MatxMenu
                                                        menuButton={
                                                            <div className="flex items-center">
                                                                <IconButton size="small">
                                                                    <MoreHoriz />
                                                                </IconButton>
                                                            </div>
                                                        }
                                                        horizontalPosition="right"
                                                    >
                                                        <MenuItem>
                                                            <Link
                                                                to={`/sertifikat_penghargaan/detail/${item.c_code}`}
                                                                className="popup-menu-item"
                                                            >
                                                                <img
                                                                    src="/assets/images/icons/ic_action_detail.svg"
                                                                    alt="icon detail"
                                                                />
                                                                <span className="pl-4">
                                                                    {' '}
                                                                    Detail{' '}
                                                                </span>
                                                            </Link>
                                                        </MenuItem>
                                                        <MenuItem>
                                                            <Link
                                                                to={`/sertifikat_penghargaan/edit/${item.c_code}`}
                                                                className="popup-menu-item"
                                                            >
                                                                <img
                                                                    src="/assets/images/icons/ic_action_edit.svg"
                                                                    alt="icon edit"
                                                                />
                                                                <span className="pl-4">
                                                                    {' '}
                                                                    Edit{' '}
                                                                </span>
                                                            </Link>
                                                        </MenuItem>
                                                        <MenuItem>
                                                            <Link
                                                                to={
                                                                    '/sertifikat_penghargaan' +
                                                                    location?.search
                                                                }
                                                                onClick={() =>
                                                                    handleDelete(
                                                                        item.c_code,
                                                                        item.title
                                                                    )
                                                                }
                                                                className="popup-menu-item"
                                                            >
                                                                <img
                                                                    src="/assets/images/icons/ic_action_delete.svg"
                                                                    alt="icon hapus"
                                                                />
                                                                <span className="pl-4">
                                                                    {' '}
                                                                    Hapus{' '}
                                                                </span>
                                                            </Link>
                                                        </MenuItem>
                                                    </MatxMenu>
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    )}
                                </TableBody>
                            </Table>
                        </ScrollBar>
                        <Grid container spacing={2} className="mt-2 px-6">
                            <Grid item xs={12} className="flex justify-center justify-content-lg-between items-center">
                                {
                                    loadingSertifikat ?
                                        <p className='text-muted m-0 d-none d-lg-block'>Mengambil Data...</p>
                                    :
                                        <p className='text-muted m-0 d-none d-lg-block'>Menampilkan {parseInt(show) * (parseInt(page) - 1) + 1} sampai {parseInt(page) * parseInt(show)} dari {totalSertifikat} data</p>
                                }
                                <div className="d-flex justify-content-end container-pagination mt-4 flex-column flex-md-row items-center">
                                    <div className="d-flex align-items-center mb-3">
                                        <p className="m-0 mr-2">Tampilkan</p>
                                        <Form.Select
                                            aria-label="Tampilkan"
                                            className="font-14 border-radius-0"
                                            value={show}
                                            onChange={({ target: { value } }) =>
                                                history.push(
                                                    `/sertifikat_penghargaan?hal=${page}&limit=${value}&cari=${search}&tahun=${filter?.tahun}`
                                                )
                                            }
                                        >
                                            <option value="100">100</option>
                                            <option value="25">25</option>
                                            <option value="10">10</option>
                                            <option value="5">5</option>
                                        </Form.Select>
                                    </div>
                                    <TablePagination
                                        href="/sertifikat_penghargaan"
                                        page={page}
                                        params={`&limit=${show}&cari=${search}&tahun=${filter?.tahun}`}
                                        total={sertifikatPagination}
                                    />
                                </div>
                            </Grid>
                        </Grid>
                    </Card>
                </Grid>
            </Grid>
            <BackdropLoading open={showLoading} />
        </div>
    );
};

export default Sertifikat;
