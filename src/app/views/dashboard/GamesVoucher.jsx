import React, {useState,  useLayoutEffect} from 'react'

import {
  Button,
  TextField,
  Icon,
  InputAdornment,
  Grid,
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import AddIcon from '@material-ui/icons/Add';
import SimpleCard from '../../assets/components/cards/SimpleCard';
import TableGamesCategory from './components/TableGamesCategory';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import GeneralButton from '../../components/buttons/GeneralButton.jsx';
import {getAllGamesVoucher} from '../../redux/actions/GamesActions';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1253FA',
    },
  },
});

const GamesVoucher = () => {
   const [search, setSearch] = useState('');
    const [state, setState] = useState({
        categories:[],
    });

    const getData = () => {
      const params = `?search=${search}`;
      getAllGamesVoucher(params).then((res) => {
        const data = res.data?.data;
        setState((prev) => ({
          ...prev,
          categories: data,
        }));
      });
  };

  useLayoutEffect(() => {
    getData();
  }, []);

  return (
    <div className="m-sm-30">
      <Grid
        container
        spacing={1}
        justifyContent="space-between"
        alignItems="center"
        className="my-4 d-flex items-center"
      >
        <Grid item xs={12} sm>
          <h1 className="fw-600 m-0">Games Voucher</h1>
        </Grid>
        <Grid
          item
          xs={12}
          sm
          className="d-flex mr-8"
          style={{ justifyContent: "flex-end" }}
        >
          <Link to="/games/voucher/add">
            <ThemeProvider theme={theme}>
              <GeneralButton
                name="Add"
                icon={<AddIcon />}
                variant="contained"
              />
            </ThemeProvider>
          </Link>
        </Grid>
      </Grid>
      <SimpleCard title="">
        <div
          className="mt-2 mb-7 d-flex items-center"
          style={{ justifyContent: "flex-end" }}
        >
          <TextField
            size="small"
            variant="outlined"
            className="w-250"
            placeholder="Cari Kategori"
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => {
              if (e.keyCode == 13) {
                getData();
              }
            }}
            value={search}
            name="search"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Icon>search</Icon>
                </InputAdornment>
              ),
            }}
          />
        </div>
        <TableGamesCategory voucher={true} data={state.categories} getData={getData} />
      </SimpleCard>
    </div>
  );
};

export default GamesVoucher;
