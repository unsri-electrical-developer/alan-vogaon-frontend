import {
  Button,
  Card,
  CircularProgress,
  Grid,
  IconButton,
  InputAdornment,
} from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import clsx from 'clsx';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

import {
  LOGIN_ERROR,
  loginWithEmailAndPassword,
} from '../../redux/actions/LoginActions';

const useStyles = makeStyles(({ palette, ...theme }) =>
  createStyles({
    logo: {
      maxWidth: 188,
      marginBottom: 30,
    },
    containerForm: {
      padding: '1rem',
      [theme.breakpoints.up('md')]: {
        padding: '1rem 3rem',
      },
    },
    bgPage: {
      backgroundImage: "url('/assets/images/illustrations/bg-page.webp')",
      backgroundRepeat: 'repeat',
    },
  })
);

const SignIn = () => {
  const [loading, setLoading] = useState(false);
  const [userInfo, setUserInfo] = useState({});
  const [passType, setPassType] = useState('password');

  const dispatch = useDispatch();
  const classes = useStyles();

  const handleChange = ({ target: { name, value } }) => {
    let temp = { ...userInfo };
    temp[name] = value;
    setUserInfo(temp);
  };

  const handleFormSubmit = () => {
    setLoading(true);
    dispatch(loginWithEmailAndPassword(userInfo)).then(async (res) => {
      console.log(res);
      await setLoading(false);
      if (res.type === LOGIN_ERROR) {
        let error = res?.payload?.data;
        Swal.fire({
          title: 'Oopss!',
          text:
            error?.code === 2 ? error?.message : 'email or password incorrect',
          imageUrl: '/assets/images/icons/ic_error.svg',
          imageWidth: 92,
          imageHeight: 92,
          timer: 2000,
          confirmButtonText: 'OK',
        });
      } else {
        window.location.href = '/dashboard';
      }
    });
  };

  useEffect(() => {
    localStorage.clear();
  }, []);

  return (
    <div className={classes.bgPage}>
      <Grid container justifyContent="center">
        <Grid
          item
          md={5}
          xs={11}
          className={clsx(
            'h-full-screen flex flex-column items-start justify-center',
            classes.containerForm
          )}
        >
          <Card
            className="px-8 py-12 rounded-0 border w-full flex items-center flex-column"
            elevation={0}
          >
            <Link to="/home">
              <img
                src="/assets/images/logos/logo.webp"
                alt="Vogaon"
                className={classes.logo}
              />
            </Link>
            <ValidatorForm onSubmit={handleFormSubmit} className="w-full">
              <TextValidator
                placeholder="Email"
                className="mb-6 w-full"
                variant="outlined"
                onChange={handleChange}
                type="email"
                name="email"
                value={userInfo.email || ''}
                validators={['required', 'isEmail']}
                errorMessages={[
                  'Masukkan email terlebih dahulu',
                  'Format email tidak valid',
                ]}
              />
              <TextValidator
                placeholder="Password"
                className="mb-3 w-full"
                variant="outlined"
                onChange={handleChange}
                name="password"
                type={passType}
                value={userInfo.password || ''}
                validators={['required']}
                errorMessages={['Masukkan password terlebih dahulu']}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        size="medium"
                        aria-label="toggle password visibility"
                        onClick={() =>
                          setPassType((type) =>
                            type === 'password' ? 'text' : 'password'
                          )
                        }
                      >
                        {passType === 'password' ? (
                          <Visibility fontSize="small" />
                        ) : (
                          <VisibilityOff fontSize="small" />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <Button
                variant="contained"
                color="primary"
                disabled={loading}
                type="submit"
                className="text-white w-full mt-3 radius-none"
                size="large"
                disableElevation
              >
                {loading ? (
                  <CircularProgress size={24} color="primary" />
                ) : (
                  'Masuk'
                )}
              </Button>
            </ValidatorForm>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default SignIn;
