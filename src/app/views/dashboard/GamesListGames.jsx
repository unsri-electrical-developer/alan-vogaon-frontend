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
            List Games
          </h1>
        </Grid>

        <Grid
          item
          xs={12}
          sm
          className="d-flex mr-8"
          style={{ justifyContent: 'flex-end' }}
        >
          <Link to="/games/listGames/add">
            <ThemeProvider theme={theme}>
              <Button variant="contained" className="px-13 py-3">
                <AddIcon />
                <span
                  className="karyawan-btn-span"
                  style={{ textTransform: 'none' }}
                >
                  Add
                </span>
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
