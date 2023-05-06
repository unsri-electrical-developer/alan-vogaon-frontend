import { Card, Grid, Icon, TextField } from "@material-ui/core";
import React, { useLayoutEffect, useState } from "react";
import { useDispatch } from "react-redux";
import "../../../styles/css/DetailUser.css";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Button from '@mui/material/Button';
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { UploadImage } from '../../components';
import SimpleCard from '../../assets/components/cards/SimpleCard';
import ic_plus  from "../../assets/components/icons/ic_plus.svg";
import ic_bin  from "../../assets/components/icons/ic_bin.svg";


const theme = createTheme({
  palette: {
    primary: {
      main: "#1253FA",
    },
  },
});

const AddGamesCategory = () => {
    // table input
const [inputList, setInputList] = useState([
    {
      nama: "",
      harga: "",
    },
    {
      nama: "",
      harga: "",
    },
  ]);

  const handleInputChange = (index, field) => (e) => {
    const updatedList = [...inputList];

    updatedList[index][field] = e.target.value;

    setInputList(updatedList);
  };

  const handleAddInput = () => {
    setInputList([
      ...inputList,
      {
        nama: "",
        harga: "",
      },
    ]);
  };

  const handleRemoveInput = (index) => {
    const updatedList = [...inputList];
    updatedList.splice(index, 1);
    setInputList(updatedList);
  };

  const renderInput = () => {
    const isLastInput = (index) => inputList.length - 1 !== index;

    return (
      <>
        {inputList?.map((item, index) => (
          <Grid container justifyContent="space-between" spacing={1}>
            <Grid item xs={6} sm={5}>
              <h5 className="font-semibold text-13">Produk</h5>
              <TextField
                required={true}
                size="small"
                inputProps={{
                  className: classes.input,
                }}
                style={{
                  transform: "scaleY(1.25)",
                  marginTop: "10px",
                  marginBottom: "10px",
                }}
                // value={state.jenis_bonus}
                name="game"
                className={`${classes.outlined} border-radius-5 w-full`}
                placeholder="Produk"
                variant="outlined"
                // onChange={handleChange}
              />
            </Grid>

            <Grid Grid item xs={6} sm={5}>
              <h5 className="font-semibold text-13">Harga</h5>
              <TextField
                required={true}
                size="small"
                inputProps={{
                  className: classes.input,
                }}
                style={{
                  transform: "scaleY(1.25)",
                  marginTop: "10px",
                  marginBottom: "10px",
                }}
                // value={state.jenis_bonus}
                name="game"
                className={`${classes.outlined} border-radius-5 w-full`}
                placeholder="Harga"
                variant="outlined"
                // onChange={handleChange}
              />
            </Grid>

            {isLastInput(index) ? (
              <div className="delete-button  mt-5">
                <Button onClick={() => handleRemoveInput(index)}>
                  <img src={ic_bin} alt="del" />
                </Button>
              </div>
            ) : (
              <div className="add-button mt-5">
                <Button onClick={() => handleAddInput()} fullWidth>
                  <img src={ic_plus} alt="add" />
                </Button>
              </div>
            )}
          </Grid>
        ))}
      </>
    );
  };

    const [state, setState] = useState({
    preview: '',
  });

  const handleChangePhoto1 = (file, path) => {
    setState({
      ...state,
      foto: file,
      preview: path,
    });
  };

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
      <h1 className="fw-600 m-0">Add Games</h1>
      <Grid
        item
        xs={12}
        sm
        className="d-flex mr-8"
        style={{ justifyContent: "flex-end" }}
      >
        <Link to="/users">
          <ThemeProvider theme={theme}>
            <Button
              variant="contained"
              className="px-13 py-3"
              style={{ textTransform: "none" }}
            >
              <span className="karyawan-btn-span">Save</span>
            </Button>
          </ThemeProvider>
        </Link>
      </Grid>

      <Card className="mt-5 py-10 px-10">
        <div className="mx-8 px-10 mt-5 mb-8">
          <Grid item xs={12} sm={6}>
            <h3
              className="text-20 font-medium mb-5"
              style={{ color: "#0A0A0A" }}
            >
              Games
            </h3>
          </Grid>
          <Grid item xs={12} sm={6}>
            <h1
              className="font-semimedium text-14"
              style={{ color: "#0a0a0a" }}
            >
              Unggah Foto
            </h1>
            <UploadImage
              uploadFoto={handleChangePhoto1}
              label="Banner"
              preview={state.preview1}
              formatIcon={false}
            />
          </Grid>

          <Grid container className="mt-2" spacing={5}>
            <Grid item xs={12} sm={6}>
              <h1
                className="mb-5 font-semimedium text-14"
                style={{ color: "#0a0a0a" }}
              >
                Game
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
                name="game"
                className={`${classes.outlined} border-radius-5 w-full`}
                placeholder="Games"
                variant="outlined"
                // onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
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
                name="game"
                className={`${classes.outlined} border-radius-5 w-full`}
                placeholder="Kategori"
                variant="outlined"
                // onChange={handleChange}
              />
            </Grid>
          </Grid>
        </div>
      </Card>

      {/* Second card */}
      <Card className="mt-5 py-10 px-10">
        <div className="mx-8 px-10 mt-5 mb-8">
          <Grid item xs={12} sm={6}>
            <h3
              className="text-20 font-medium mb-5"
              style={{ color: "#0A0A0A" }}
            >
              Product
            </h3>
            <h1
              className="mb-5 font-semimedium text-14"
              style={{ color: "#0a0a0a" }}
            >
              Nama
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
              name="game"
              className={`${classes.outlined} border-radius-5 w-full`}
              placeholder="Nama"
              variant="outlined"
              // onChange={handleChange}
            />
          </Grid>
          <div className="mt-5">{renderInput()}</div>
        </div>
      </Card>
    </div>
  );
};

export default AddGamesCategory;
                