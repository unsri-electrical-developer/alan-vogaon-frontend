import { Card, CircularProgress, Grid } from '@material-ui/core';
import React, { Fragment, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { getProfile } from '../../redux/actions/UserActions';

const Profile = () => {
    const [user, setUser] = useState({
        users_code: '',
        profile_pic: '',
        email: '',
        id: '',
        name: '',
        role: ''
    });
    const [loading, setLoading] = useState(false);

    const getData = () => {
        setLoading(true);
        getProfile()
            .then(({ data }) => {
                setLoading(false);
                setUser((pref) => ({
                    ...pref,
                    users_code: data?.data?.users_code,
                    profile_pic: data?.data?.profile_pict,
                    email: data?.data?.email,
                    name: data?.data?.fullname,
                    role: data?.data?.users_type
                }));
            })
            .catch((err) => {
                setLoading(false);
            });
    };

    useEffect(() => {
        getData();
    }, []);

    return (
        <div className="m-sm-30">
            <Grid container spacing={2} justifyContent="center">
                <Grid item xs={11} md={12}>
                    <h4 className="fw-bold">Profile</h4>
                </Grid>
                {loading ? (
                    <Grid item xs={11} md={12} className="text-center">
                        <CircularProgress color="primary" size={35} />
                    </Grid>
                ) : (
                    <Fragment>
                        <Grid item xs={11} md={12}>
                            <Card
                                className="p-5 flex items-center justify-center flex-column"
                                elevation={0}
                            >
                                <Grid container spacing={2}>
                                    <Grid item xs={12} md={3}>
                                        <img
                                            className="img-profile radius-6 bg-light-gray w-full d-block object-fit-cover"
                                            src={user?.profile_pic}
                                            alt="profile"
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={7}>
                                        <table className="w-full">
                                            <tbody>
                                                <tr>
                                                    <td className="py-2">
                                                        Nama Lengkap
                                                    </td>
                                                    <th className="py-2">
                                                        : {user?.name}
                                                    </th>
                                                </tr>
                                                <tr>
                                                    <td className="py-2">
                                                        Email
                                                    </td>
                                                    <th className="py-2">
                                                        : {user?.email}
                                                    </th>
                                                </tr>
                                                <tr>
                                                    <td className="py-2">
                                                        Role
                                                    </td>
                                                    <th className="py-2 d-flex items-center">
                                                        :{' '}
                                                        <p className="ml-1 fw-normal font-12 px-3 py-1 m-0 rounded-pill bg-primary text-white text-center">
                                                            {user?.role === 'SA'
                                                                ? 'Super Admin'
                                                                : 'Admin Biasa'}
                                                        </p>
                                                    </th>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </Grid>
                                    <Grid item xs={12} md={2}>
                                        {/* <Link
                                            to="/profile/edit"
                                            className="btn btn-primary border-radius-0 text-white font-14 w-full"
                                        >
                                            Edit Profile
                                        </Link> */}
                                        <Link
                                            to="/profile/2fa"
                                            className="btn btn-primary border-radius-0 text-white font-14 w-full"
                                        >
                                            Set 2FA Auth
                                        </Link>
                                    </Grid>
                                </Grid>
                            </Card>
                        </Grid>
                    </Fragment>
                )}
            </Grid>
        </div>
    );
};

export default Profile;
