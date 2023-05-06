import { Card, Grid, Icon, TextField } from "@material-ui/core";
import React, { useLayoutEffect, useState } from "react";
import { useDispatch } from "react-redux";
import "../../../styles/css/DetailUser.css";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Button from '@mui/material/Button';
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1253FA",
    },
  },
});

const AddGamesCategory = () => {

  useLayoutEffect(() => {
    console.log("uselayouteffect");
  }, []);

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
      <h1 className="fw-600 m-0">Add Category</h1>
      <Grid
          item
          xs={12}
          sm
          className="d-flex mr-8"
          style={{ justifyContent: "flex-end" }}
        >
          <Link to="/users">
            <ThemeProvider theme={theme}>
              <Button variant="contained" className="px-14 py-3" style={{ textTransform: 'none' }}>
                <span className="karyawan-btn-span">
                  Save
                </span>
              </Button>
            </ThemeProvider>
          </Link>
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
                    // value={state.jenis_bonus}
                    name="kategori"
                    className={`${classes.outlined} border-radius-5 w-full`}
                    placeholder="Kategori"
                    variant="outlined"
                    // onChange={handleChange}
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
