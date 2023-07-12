import React, { useState, useLayoutEffect } from "react";
import {
  Button,
  TextField,
  Icon,
  InputAdornment,
  Grid,
  Popover,
  Typography,
  Card,
  Select,
  MenuItem,
} from "@material-ui/core";
import SimpleCard from "../../assets/components/cards/SimpleCard";
import TableUsers from "./components/TableUsers";
import { getAllUsers } from "../../redux/actions/UserActions";
import { useSelector } from "react-redux";
import { FilterList } from "@material-ui/icons";
import { useEffect } from "react";

// Start of Component
const Users = () => {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState({
    level: "",
    status: "",
  });
  const [state, setState] = useState({
    users: [],
  });
  const [openFilter, setOpenFilter] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const { profile_pict, fullname, users_type, name } = useSelector(
    ({ user }) => user
  );

  const getData = () => {
    var params = `?search=${search}`;
    if (filter.level != "") {
      params += `&level=${filter.level}`
    }
    if (filter.status != "") {
      params += `&status=${filter.status}`
    }

    getAllUsers(params).then((res) => {
      const data = res.data?.data;
      setState((prev) => ({
        ...prev,
        users: data,
      }));
    });
  };

  const handleClick = (event) => {
    setOpenFilter(true);
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setOpenFilter(false);
    setAnchorEl(null);
  };

  useLayoutEffect(() => {
    getData();
  }, []);

  const handleChange = (e) => {
    e.persist();
    console.log(e.target);
    setFilter((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  useEffect(() => {
    if (filter.level != '' || filter.status != '') {
      getData();
    }
  }, [filter]);

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
          <Button
            aria-describedby={"filter"}
            variant="outlined"
            color="default"
            className="px-5 py-2 mr-3"
            style={{ textTransform: "none", borderRadius: 5 }}
            onClick={handleClick}
          >
            <FilterList />
            <span className="karyawan-btn-span">Filter</span>
          </Button>
          <Popover
            id={"filter"}
            open={openFilter}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
          >
            <Card>
              <Select
                inputProps={{
                  style: {
                    paddingTop: 10,
                    paddingBottom: 10,
                    minHeight: 25,
                  },
                }}
                size="small"
                labelId="level"
                value={filter?.level}
                onChange={handleChange}
                variant="outlined"
                className="w-full"
                name="level"
                displayEmpty
              >
                <MenuItem value="">Semua</MenuItem>
                <MenuItem value={1}>Member</MenuItem>
                <MenuItem value={2}>Reseller</MenuItem>
              </Select>
              <Select
                inputProps={{
                  style: {
                    paddingTop: 10,
                    paddingBottom: 10,
                    minHeight: 25,
                  },
                }}
                size="small"
                labelId="status"
                value={filter?.status}
                onChange={handleChange}
                variant="outlined"
                className="w-full"
                name="status"
                displayEmpty
              >
                <MenuItem value="">Semua</MenuItem>
                <MenuItem value={'aktif'}>Aktif</MenuItem>
                <MenuItem value={'nonaktif'}>Nonaktif</MenuItem>
              </Select>
            </Card>
          </Popover>
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
              style: {
                borderRadius: 5,
                minHeight: 25,
                border: '1px solid #c6c6c6'
              }
            }}
          />
        </div>
        <TableUsers data={state.users} getData={getData} />
      </SimpleCard>
    </div>
  );
};

export default Users;
