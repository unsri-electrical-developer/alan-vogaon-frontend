import React, { useState, useEffect, useLayoutEffect } from "react";
import { Button, Grid, TextField, Card } from "@material-ui/core";

import {
  getDetailCategory,
  editCategory,
} from "../../redux/actions/GamesActions";
import { makeStyles } from "@material-ui/core/styles";
import Swal from "sweetalert2";
import { useParams, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import GeneralButton from "../../components/buttons/GeneralButton.jsx";
import { useDispatch } from "react-redux";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1253FA",
    },
  },
});

const EditGamesCategory = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const [state, setState] = useState({
    category_name: "",
    scaleY: "0.85",
  });

  useLayoutEffect(() => {
    getDetailCategory(id).then((res) => {
      let data = res.data?.data;
      setState((prev) => ({
        ...prev,
        ...data,
      }));
    });
  }, []);

  const handleChange = (e) => {
    e.persist();
    setState((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const history = useHistory();

  const handleSubmit = () => {
      try {
          console.log(state.category_name);
      dispatch(
        editCategory({
          category_code: id,
          category_name: state.category_name,
        })
      );
      setTimeout(() => {
        history.push("/games/category");
        Swal.fire("Success!", "Data Games Category berhasil disimpan", "success");
      }, 2000);
    } catch (e) {
      Swal.fire("Oopss!", "Data Games Category gagal disimpan", "error");
    }
  };

  const useStyles = makeStyles((theme) => ({
    root: {
      display: "flex",
      alignItems: "center",
      width: "100%",
      flexWrap: "wrap",
      "& > *": {
        margin: theme.spacing(0.5),
      },
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        border: "1px solid #e6e9ed",
      },
    },
    input: {
      transform: "scaleY(0.88)",
      marginBlock: "auto",
    },
  }));
    const classes = useStyles();
    
  return (
    <div className="analytics m-sm-30 mt-7 text-black">
    <h1 className="fw-600 m-0">Edit Category</h1>
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
                inputProps={{
                    className: classes.input,
                }}
                style={{
                    transform: "scaleY(1.25)",
                }}
                value={state.category_name}
                name="category_name"
                className={`${classes.outlined} border-radius-5 w-full`}
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

export default EditGamesCategory;

