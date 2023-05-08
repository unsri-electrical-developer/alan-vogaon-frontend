import { Button, Card, Grid, Icon } from '@material-ui/core';
import React, { useLayoutEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import '../../../styles/css/DetailUser.css';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Link } from "react-router-dom";
import GeneralButton from './../../components/buttons/GeneralButton.jsx';
import {getDetailUser} from '../../redux/actions/UserActions';
import { useHistory, useParams} from 'react-router-dom';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1253FA',
    },
  },
});

const DetailUser = () => {
  const { id } = useParams();
  const history = useHistory();

  const [state, setState] = useState({
      data:[]
  });


  useLayoutEffect(() => {
    getDetailUser(id).then((res) => {
      let data = res.data?.data;
      setState((prev) => ({
        ...prev,
        ...data,
      }));
    });
  }, []);

  console.log(state.data)

  return (
    <div className="analytics m-sm-30 mt-7 text-black">
      <Grid
        container
        spacing={1}
        justifyContent="space-between"
        alignItems="center"
        className="my-4 d-flex items-center"
      >
        <Grid item xs={12} sm>
          <h1 className="fw-600 m-0">Detail User</h1>
        </Grid>
        <Grid
          item
          xs={12}
          sm
          className="d-flex mr-6 items-center"
          style={{ justifyContent: "flex-end" }}
        >
          <Link to="/users">
            <GeneralButton name="Back" variant="outlined" />
          </Link>
        </Grid>
      </Grid>

      <Card className="mt-5 py-10 px-10">
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <h1 className="text-muted text-14 font-medium mb-3 font-500 h4">
              Foto Profile
            </h1>
            <div
              className="w-full p-2 border-radius-5"
              style={{ height: "275px", border: "1px dashed #1253FA" }}
            >
              <div
                style={{
                  backgroundImage: `url(${state.users_profile_pic})`,
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "cover",
                  height: "100%",
                }}
                className="w-full"
              />
            </div>
          </Grid>
          <Grid item xs={12} sm={6}></Grid>
          <Grid item xs={12} sm={6}>
            <h1 className="text-muted text-14 font-medium mb-2 font-500 h4">
              Name
            </h1>
            <p className="text-16 font-medium" style={{ color: "#0A0A0A" }}>
              {state.name}
            </p>
          </Grid>
          <Grid item xs={12} sm={6}>
            <h1 className="text-muted text-14 font-medium mb-2 font-500 h4">
              No. Handphone
            </h1>
            <p className="text-16 font-medium" style={{ color: "#0A0A0A" }}>
              {state.no_telp}
            </p>
          </Grid>
          <Grid item xs={12} sm={6}>
            <h1 className="text-muted text-14 font-medium mb-2 font-500 h4">
              Email
            </h1>
            <p className="text-16 font-medium" style={{ color: "#0A0A0A" }}>
              {state.email}
            </p>
          </Grid>
          <Grid item xs={12} sm={6}>
            <h1 className="text-muted text-14 font-medium mb-2 font-500 h4">
              User ID
            </h1>
            <p className="text-16 font-medium" style={{ color: "#0A0A0A" }}>
              {state.users_code}
            </p>
          </Grid>
          <Grid item xs={12} sm={6}>
            <h1 className="text-muted text-14 font-medium mb-2 font-500 h4">
              Tanggal Daftar
            </h1>
            <p className="text-16 font-medium" style={{ color: "#0A0A0A" }}>
              {state.created_at}
            </p>
          </Grid>
        </Grid>
      </Card>
    </div>
  );
};

export default DetailUser;
