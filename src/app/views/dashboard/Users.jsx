import React, { useState, useLayoutEffect } from 'react'
import {
  Button,
  TextField,
  Icon,
  InputAdornment,
  Grid,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import AddIcon from "@material-ui/icons/Add";
import SimpleCard from '../../assets/components/cards/SimpleCard';
import TableUsers from './components/TableUsers';
import { getAllUsers } from '../../redux/actions/UserActions';
import { useSelector } from "react-redux";

// Start of Component
const Users = () => {
  const [search, setSearch] = useState('');
  const [state, setState] = useState({
    users: [],
  });

  const { profile_pict, fullname, users_type, name } = useSelector(
    ({ user }) => user
  );

  const getData = () => {
    const params = `?search=${search}`;
    getAllUsers(params).then((res) => {
      const data = res.data?.data;
      setState((prev) => ({
        ...prev,
        users: data,
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
        spacing={3}
        className="mb-4 mx-auto px-2"
        alignItems="center"
        justifyContent="space-between"
      >
        <Grid item xs={12} sm>
          <h1
            className="font-semibold text-25 my-auto"
            style={{ color: "#0A0A0A" }}
          >
            Users
          </h1>
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
            placeholder="Cari Pengguna"
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
        <TableUsers data={state.users} getData={getData} />
      </SimpleCard>
    </div>
  );
};

export default Users;
