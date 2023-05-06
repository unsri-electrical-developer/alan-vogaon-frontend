import React from 'react';
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
// import Button from '@mui/material/Button'

const theme = createTheme({
  palette: {
    primary: {
      main: '#1253FA',
    },
  },
});

const GamesCategory = () => {
  return (
    <div className="m-sm-30">
      <Grid
        container
        spacing={3}
        className="mb-4 mx-auto px-2"
        alignItems="center"
        justifyContent="space-between"
      >
        <Grid item xs={12} sm>
          <h1
            className="font-semibold text-25 my-auto"
            style={{ color: '#0A0A0A' }}
          >
            Games Category
          </h1>
        </Grid>
        <Grid
          item
          xs={12}
          sm
          className="d-flex mr-8"
          style={{ justifyContent: 'flex-end' }}
        >
          <Link to="/games/category/add">
            <ThemeProvider theme={theme}>
              <Button
                variant="contained"
                className="px-13 py-3"
                style={{ textTransform: 'none' }}
              >
                <AddIcon />
                <span className="karyawan-btn-span">Add</span>
              </Button>
            </ThemeProvider>
          </Link>
        </Grid>
      </Grid>
      <SimpleCard title="">
        <div
          className="mt-2 mb-7 d-flex items-center"
          style={{ justifyContent: 'flex-end' }}
        >
          <TextField
            size="small"
            variant="outlined"
            className="w-250"
            placeholder="Cari Kategori"
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
        <TableGamesCategory />
      </SimpleCard>
    </div>
  );
};

export default GamesCategory;
