import React from 'react';
import {
  TextField,
  Icon,
  InputAdornment,
  Grid,
  Button,
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import AddIcon from '@material-ui/icons/Add';
import SimpleCard from '../../assets/components/cards/SimpleCard';
import TableGamesListGames from './components/TableGamesListGames';
import { createTheme, ThemeProvider } from '@mui/material/styles';
// import Button from "@mui/material/Button";
import ListGamesFilter from './components/ListGamesFilter';
import GeneralButton from './../../components/buttons/GeneralButton.jsx';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1253FA',
    },
  },
});

const GamesListGames = () => {
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
<<<<<<< HEAD
                <h1 className="fw-600 m-0">List Games</h1>
=======
          <h1
            className="font-semibold text-25 my-auto"
            style={{ color: '#0A0A0A' }}
          >
            List Games
          </h1>
>>>>>>> 644d4876a6cfbc45b0fec54c183b668b5fe21da0
        </Grid>
        <Grid
          item
          xs={12}
          sm
<<<<<<< HEAD
          className="d-flex mr-6 items-center"
=======
          className="d-flex mr-8"
>>>>>>> 644d4876a6cfbc45b0fec54c183b668b5fe21da0
          style={{ justifyContent: 'flex-end' }}
        >
          <Link to="/games/listGames/add">
            <ThemeProvider theme={theme}>
<<<<<<< HEAD
            <GeneralButton name="Add" icon={<AddIcon/>} variant="contained"/>
=======
              <Button variant="contained" className="px-13 py-3">
                <AddIcon />
                <span
                  className="karyawan-btn-span"
                  style={{ textTransform: 'none' }}
                >
                  Add
                </span>
              </Button>
>>>>>>> 644d4876a6cfbc45b0fec54c183b668b5fe21da0
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
          {/* <ListGamesFilter
            dataSelect={this.state.list_unit_kerja}
            state={this.state}
            setState={this.setState.bind(this)}
            label="Unit Kerja"
            name="unit_kerja"
            width="240px"
          /> */}
        </div>
        <TableGamesListGames />
      </SimpleCard>
    </div>
  );
};

export default GamesListGames;
