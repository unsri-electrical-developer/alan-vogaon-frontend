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
import { getAllGamesList, getAllCategories } from "../../redux/actions/GamesActions";
import React, { useState, useLayoutEffect, useEffect } from "react";

const theme = createTheme({
  palette: {
    primary: {
      main: '#1253FA',
    },
  },
});

const GamesListGames = () => {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");

  const [state, setState] = useState({
    listGames: [],
    categories_filter: [],
  });

  const getData = () => {
    const params = `?search=${search}&category_code=${filter}`;

    getAllGamesList(params).then((res) => {
      const data = res.data?.data;
      setState((prev) => ({
        ...prev,
        listGames: data,
      }));
    });
  };



  useEffect(() => {
    getData();
  }, [filter]);

  useLayoutEffect(() => {
    getData();
    // getDataCategories();
  }, []);

  const handleFilter = (e) => {
    setFilter(e.target.value);
  };

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
          <h1
            className="font-semibold text-25 my-auto"
            style={{ color: "#0A0A0A" }}
          >
            List Games
          </h1>
        </Grid>
        <Grid
          item
          xs={12}
          sm
          className="d-flex mr-8"
          style={{ justifyContent: "flex-end" }}
        >
          <Link to="/games/listGames/add">
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
          className="mt-2 mb-7 d-flex items-center "
          style={{ justifyContent: "flex-end" }}
        >
          <TextField
            size="small"
            variant="outlined"
            className="w-250"
            placeholder="Cari Games"
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

          <div className="ml-3">
            <ListGamesFilter
              value={filter}
              label="Kategori"
              name="kategori"
              width="240px"
              handleChange={handleFilter}
              search
            />
          </div>
        </div>
        <TableGamesListGames data={state.listGames} getData={getData} />
      </SimpleCard>
    </div>
  );
};

export default GamesListGames;
