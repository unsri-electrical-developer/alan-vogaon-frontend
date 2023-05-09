import { Card, Grid, Icon, TextField, Button } from '@material-ui/core';
import React, { useLayoutEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import '../../../styles/css/DetailUser.css';
import { createTheme, ThemeProvider } from '@mui/material/styles';
// import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import {addCategory} from '../../redux/actions/GamesActions';
import { useHistory } from 'react-router-dom';
import Swal from 'sweetalert2';
import GeneralButton from '../../components/buttons/GeneralButton.jsx';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1253FA',
    },
  },
});

const AddGamesCategory = () => {
  const dispatch = useDispatch();

  const [state, setState] = useState({
    category_name: '',
  });

  const handleChange = (e) => {
    e.persist();
    setState((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  useLayoutEffect(() => {
    console.log('uselayouteffect');
  }, []);

  const history = useHistory();

  const handleSubmit = () => {
    try {
      dispatch(
        addCategory({
          category_name: state.category_name,
        })
      );
      let timerInterval;
      Swal.fire({
        title: 'Sedang diproses...',
        html: 'tunggu dalam waktu <b></b> detik.',
        timer: 4000,
        timerProgressBar: true,
        didOpen: () => {
          Swal.showLoading();
          const b = Swal.getHtmlContainer().querySelector('b');
          setTimeout(() => {
            clearInterval(timerInterval);
            history.push('/games/category');
            Swal.fire(
              'Success!',
              'Kategori berhasil disimpan',
              'success'
            );
          }, 4000);
          timerInterval = setInterval(() => {
            b.textContent = Swal.getTimerLeft();
          }, 1000);
        },
      });
    } catch (e) {
      Swal.fire('Oopss!', 'Data Jenis Tunjangan gagal disimpan', 'error');
    }
  };

  const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      alignItems: 'center',
      width: '100%',
      flexWrap: 'wrap',
      '& > *': {
        margin: theme.spacing(0.5),
      },
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        border: '1px solid #e6e9ed',
      },
    },
    input: {
      transform: 'scaleY(0.88)',
      marginBlock: 'auto',
    },
  }));
  const classes = useStyles();

  return (
    <div className="analytics m-sm-30 mt-7 text-black">
      <h1 className="fw-600 m-0">Add Category</h1>
      <Grid
        item
        xs={12}
        sm
        className="d-flex mr-8"
        style={{ justifyContent: 'flex-end' }}
      >
     
        <ThemeProvider theme={theme}>
          <GeneralButton variant = "contained" name="Save" data={handleSubmit}/>
        </ThemeProvider>

      </Grid>
      <Card className="mt-5 py-10 px-10">
        <div className="mx-8 px-10 mt-5 mb-8">
          <Grid
            container
            spacing={3}
            alignItems="center"
            justifyContent="space-between"
            className="mb-8"
          >
            <Grid
              container
              className="mt-2"
              spacing={5}
              justifyContent="center"
              alignItems="center"
            >
              <Grid item xs={12} sm>
                <h1
                  className="mb-5 font-semimedium text-14"
                  style={{ color: '#0a0a0a' }}
                >
                  Kategori
                </h1>
                <TextField
                  required={true}
                  size="small"
                  inputProps={{
                    className: classes.input,
                  }}
                  style={{
                    transform: 'scaleY(1.25)',
                  }}
                  value={state.category_name}
                  name="category_name"
                  className={`${classes.outlined} border-radius-5 w-full`}
                  placeholder="Kategori"
                  variant="outlined"
                  onChange={handleChange}
                />
              </Grid>
            </Grid>
          </Grid>
        </div>
      </Card>
    </div>
  );
};

export default AddGamesCategory;
