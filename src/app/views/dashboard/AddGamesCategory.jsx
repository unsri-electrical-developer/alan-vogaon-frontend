import { Card, Grid, Icon, TextField, Button } from "@material-ui/core";
import React, { useLayoutEffect, useState } from "react";
import { useDispatch } from "react-redux";
import "../../../styles/css/DetailUser.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";
// import Button from '@mui/material/Button';
import { Link } from "react-router-dom";
import { addCategory } from "../../redux/actions/GamesActions";
import { useHistory } from "react-router-dom";
import Swal from "sweetalert2";
import GeneralButton from "../../components/buttons/GeneralButton.jsx";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1253FA",
    },
  },
});

const AddGamesCategory = () => {
  const dispatch = useDispatch();

  const [state, setState] = useState({
    category_name: "",
  });

  const handleChange = (e) => {
    e.persist();
    setState((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  useLayoutEffect(() => {
    console.log("uselayouteffect");
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
        title: "Sedang diproses...",
        html: "tunggu dalam waktu <b></b> detik.",
        timer: 4000,
        timerProgressBar: true,
        didOpen: () => {
          Swal.showLoading();
          const b = Swal.getHtmlContainer().querySelector("b");
          setTimeout(() => {
            clearInterval(timerInterval);
            history.push("/games/category");
            Swal.fire("Success!", "Kategori berhasil disimpan", "success");
          }, 4000);
          timerInterval = setInterval(() => {
            b.textContent = Swal.getTimerLeft();
          }, 1000);
        },
      });
    } catch (e) {
      Swal.fire("Oopss!", "Data Kategory gagal disimpan", "error");
    }
  };

  return (
    <div className="analytics m-sm-30 mt-7 text-black">
      <h1 className="fw-600 m-0">Add Category</h1>
      <Grid
        item
        xs={12}
        sm
        className="d-flex mr-8"
        style={{ justifyContent: "flex-end" }}
      >
        <ThemeProvider theme={theme}>
          <GeneralButton variant="contained" name="Save" data={handleSubmit} />
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
                  style={{ color: "#0a0a0a" }}
                >
                  Kategori
                </h1>
                <TextField
                  required={true}
                  size="small"
                  InputProps={{
                    style: {
                      borderRadius: 5,
                      minHeight: 46,
                    },
                  }}
                  className="w-full"
                  value={state.category_name}
                  name="category_name"
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
