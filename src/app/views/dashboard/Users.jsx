import React from 'react'
import {
  Button,
  TextField,
  Icon,
  InputAdornment,
  Grid,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import AddIcon from "@material-ui/icons/Add";
import  SimpleCard   from '../../assets/components/cards/SimpleCard';
import TableUsers from './components/TableUsers';
const Users = () => {

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
            <Grid
            item
            xs={12}
            sm
            className="d-flex mr-8"
            style={{ justifyContent: "flex-end" }}
            >
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
            <TableUsers />
        </SimpleCard>
        </div>
    );
};

export default Users;
