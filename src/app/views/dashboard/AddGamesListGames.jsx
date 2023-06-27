import { Card, Grid, Icon, TextField, Button } from "@material-ui/core";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import "../../../styles/css/DetailUser.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";

import AddIcon from "@material-ui/icons/Add";
import { Link } from "react-router-dom";
import { UploadImage } from "../../components";
import SimpleCard from "../../assets/components/cards/SimpleCard";
import ic_plus from "../../assets/components/icons/ic_plus.svg";
import ic_bin from "../../assets/components/icons/ic_bin.svg";
import { addGamesList } from "../../redux/actions/GamesActions";
import Swal from "sweetalert2";
import { useHistory } from "react-router-dom";
import GeneralButton from "../../components/buttons/GeneralButton.jsx";
import ListGamesFilter from "./components/ListGamesFilter";
import SelectOfArray from "../../components/select/SelectOfArray";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1253FA",
    },
  },
});

const AddGamesListGames = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const goToTop = () => {
    global.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const [state, setState] = useState({
    foto: "",
    foto2: "",
    title: "",
    kode_game: "",
    game_description: "",
    field_description: "",
    field_img: "",
  });

  const [category, setCategory] = useState("");

  const handleCategory = (e) => {
    setCategory(e.target.value);
  };

  const handleChange = (e) => {
    e.persist();
    setState((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = () => {
    try {
      fieldList.forEach((obj) => {
        if (!obj.nama && !obj.tipe) {
          throw new Error("data isian Field tidak lengkap");
        }
      });

      productList.forEach((obj) => {
        if (
          !obj.nama &&
          !obj.status_produk &&
          !obj.asal_produk &&
          !obj.denomination_id &&
          !obj.harga_member &&
          !obj.harga_non_member
        ) {
          throw new Error("data isian Product tidak lengkap");
        }
      });

      if (
        !state.foto &&
        !state.foto2 &&
        !state.title &&
        !state.category_code &&
        !state.kode_game &&
        !state.game_description &&
        !state.field_description &&
        !state.field_img
      ) {
        throw new Error("data isian Game tidak lengkap");
      }

      console.log("state", state);
      addGamesList({
        img: state.foto,
        field_img: state.foto2,
        title: state.title,
        category_code: category,
        kode_game: state.kode_game,
        game_description: state.game_description,
        field_description: state.field_description,
        fieldList,
        productList,
      })
        .then((res) => {
          if (res.code == 2 || res.code == 1) {
            throw new Error(res.message);
          }

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
                history.push("/games/listGames");
                Swal.fire(
                  "Success!",
                  "List Games berhasil disimpan",
                  "success"
                );
              }, 4000);
              timerInterval = setInterval(() => {
                b.textContent = Swal.getTimerLeft();
              }, 1000);
            },
          });
        })
        .catch((e) => {
          Swal.fire("Oopss!", e.message, "error");
        });
    } catch (e) {
      Swal.fire("Oopss!", e.message, "error");
    }
  };

  // FIELDS
  const [fieldList, setFieldList] = useState([
    {
      nama: "",
      tipe: "",
    },
  ]);

  const renderFields = () => {
    const isLastInput = (index) => fieldList.length - 1 !== index;
    const onlyOne = () => fieldList.length == 1;

    return (
      <>
        {fieldList?.map((item, index) => (
          <Grid
            container
            justifyContent="space-between"
            spacing={2}
            style={{
              marginBottom: "30px",
            }}
          >
            <Grid item sm={5}>
              <h1
                className="mb-5 font-semimedium text-14"
                style={{ color: "#0a0a0a" }}
              >
                Nama
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
                value={fieldList[index].nama}
                name="nama"
                placeholder="Nama"
                className="w-full"
                variant="outlined"
                onChange={handleFieldChange(index, "nama")}
              />
            </Grid>
            <Grid item sm={5}>
              <h1
                className="mb-5 font-semimedium text-14"
                style={{ color: "#0a0a0a" }}
              >
                Tipe
              </h1>
              <SelectOfArray
                dataSelect={[
                  {
                    text: "String",
                    value: "string",
                  },
                  {
                    text: "Number",
                    value: "number",
                  },
                ]}
                state={fieldList}
                setState={setFieldList}
                size="small"
                label="Tipe"
                width="100%"
                name="tipe"
                index={index}
                menuItemFontSize="text-14"
              />
            </Grid>

            {onlyOne() ? (
              <Grid item className="mt-10" sm={2}>
                <div
                  className="border-radius-circle bg-primary text-white w-35 h-35"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  onClick={handleAddField}
                >
                  <Icon fontSize="medium">add-icon</Icon>
                </div>
              </Grid>
            ) : isLastInput(index) ? (
              <Grid item className="mt-10" sm={2}>
                <div
                  className="border-radius-circle bg-error w-35 h-35"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  onClick={() => handleRemoveField(index)}
                >
                  <Icon fontSize="medium">delete-outline-icon</Icon>
                </div>
              </Grid>
            ) : (
              <Grid
                item
                className="mt-10"
                sm={2}
                container
                justifyContent="start"
              >
                <Grid item className="mr-2">
                  <div
                    className="border-radius-circle bg-primary w-35 h-35 text-white"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                    onClick={handleAddField}
                  >
                    <Icon fontSize="medium">add-icon</Icon>
                  </div>
                </Grid>
                <Grid item>
                  <div
                    className="border-radius-circle bg-error w-35 h-35"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                    onClick={() => handleRemoveField(index)}
                  >
                    <Icon fontSize="medium">delete-outline-icon</Icon>
                  </div>
                </Grid>
              </Grid>
            )}
          </Grid>
        ))}
      </>
    );
  };

  const handleFieldChange = (index, name) => (e) => {
    const updatedField = [...fieldList];

    updatedField[index][name] = e.target.value;

    setFieldList(updatedField);
  };

  const handleAddField = () => {
    setFieldList((prev) => [
      ...prev,
      {
        nama: "",
        tipe: "",
      },
    ]);
  };

  const handleRemoveField = (index) => {
    const updatedField = [...fieldList];
    updatedField.splice(index, 1);
    setFieldList(updatedField);
  };

  // PRODUK
  const [productList, setProductList] = useState([
    {
      nama: "",
      status_produk: "",
      asal_produk: "",
      denomination_id: "",
      harga_member: "",
      harga_non_member: "",
    },
  ]);

  const renderProduct = () => {
    const isLastInput = (index) => productList.length - 1 !== index;
    const onlyOne = () => productList.length == 1;

    return (
      <>
        {productList?.map((item, index) => (
          <Grid
            container
            justifyContent="space-between"
            spacing={2}
            style={{
              marginBottom: "100px",
            }}
          >
            <Grid item xs={12} container justifyContent="space-between">
              <Grid item>
                <h3
                  className="text-20 font-medium mb-5"
                  style={{ color: "#0A0A0A" }}
                >
                  Product {index + 1}
                </h3>
              </Grid>
              {onlyOne() ? (
                <Grid item className="mt-5">
                  <Button
                    variant="contained"
                    className="bg-primary text-white border-radius-4 p-2"
                    onClick={() => handleAddProduct()}
                    fullWidth
                  >
                    <Icon className="mr-1" fontSize="medium">
                      add-icon
                    </Icon>
                    Add Product
                  </Button>
                </Grid>
              ) : isLastInput(index) ? (
                <Grid item className="mt-5">
                  <Button
                    variant="outlined"
                    onClick={() => handleRemoveProduct(index)}
                    fullWidth
                    className="border-error border-radius-4 p-2 text-error"
                  >
                    <Icon className="mr-1" fontSize="medium">
                      delete-outline-icon
                    </Icon>
                    Delete
                  </Button>
                </Grid>
              ) : (
                <Grid item container justifyContent="flex-end" spacing={2}>
                  <Grid item className="mt-5">
                    <Button
                      variant="contained"
                      className="bg-primary text-white border-radius-4 p-2"
                      onClick={() => handleAddProduct()}
                      fullWidth
                    >
                      <Icon className="mr-1" fontSize="medium">
                        add-icon
                      </Icon>
                      Add Product
                    </Button>
                  </Grid>
                  <Grid item className="mt-5">
                    <Button
                      variant="outlined"
                      onClick={() => handleRemoveProduct(index)}
                      fullWidth
                      className="border-error border-radius-4 p-2 text-error"
                    >
                      <Icon className="mr-1" fontSize="medium">
                        delete-outline-icon
                      </Icon>
                      Delete
                    </Button>
                  </Grid>
                </Grid>
              )}
            </Grid>
            <Grid item sm={6}>
              <h1
                className="mb-5 font-semimedium text-14"
                style={{ color: "#0a0a0a" }}
              >
                Nama
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
                value={productList[index].nama}
                name="nama"
                placeholder="Nama"
                className="w-full"
                variant="outlined"
                onChange={handleProductChange(index, "nama")}
              />
            </Grid>
            <Grid item sm={6}>
              <h1
                className="mb-5 font-semimedium text-14"
                style={{ color: "#0a0a0a" }}
              >
                Status Produk
              </h1>
              <SelectOfArray
                dataSelect={[
                  {
                    text: "Aktif",
                    value: "1",
                  },
                  {
                    text: "Tidak Aktif",
                    value: "0",
                  },
                ]}
                state={productList}
                setState={setProductList}
                size="small"
                label="Status Produk"
                width="100%"
                name="status_produk"
                index={index}
                menuItemFontSize="text-14"
              />
            </Grid>
            <Grid item sm={6}>
              <h1
                className="mb-5 font-semimedium text-14"
                style={{ color: "#0a0a0a" }}
              >
                Asal Produk
              </h1>
              <SelectOfArray
                dataSelect={[
                  {
                    text: "Unipin",
                    value: "unipin",
                  },
                  {
                    text: "Apigames",
                    value: "apigames",
                  },
                  {
                    text: "Digiflazz",
                    value: "digiflazz",
                  },
                ]}
                state={productList}
                setState={setProductList}
                size="small"
                label="Asal Produk"
                width="100%"
                name="asal_produk"
                index={index}
                menuItemFontSize="text-14"
              />
            </Grid>

            {productList[index]?.asal_produk?.toLowerCase() === "unipin" ? (
              <Grid item sm={6}>
                <h1
                  className="mb-5 font-semimedium text-14"
                  style={{ color: "#0a0a0a" }}
                >
                  Denomination ID
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
                  value={productList[index].denomination_id}
                  name="denomination_id"
                  placeholder="Denomination ID"
                  className="w-full"
                  variant="outlined"
                  onChange={handleProductChange(index, "denomination_id")}
                />
              </Grid>
            ) : (
              <Grid item sm={6}></Grid>
            )}

            <Grid item sm={6}>
              <h1
                className="mb-5 font-semimedium text-14"
                style={{ color: "#0a0a0a" }}
              >
                Harga Member
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
                value={productList[index].harga_member}
                name="harga_member"
                placeholder="Harga Member"
                className="w-full"
                variant="outlined"
                onChange={handleProductChange(index, "harga_member")}
              />
            </Grid>
            <Grid item sm={6}>
              <h1
                className="mb-5 font-semimedium text-14"
                style={{ color: "#0a0a0a" }}
              >
                Harga Non Member
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
                value={productList[index].harga_non_member}
                name="harga_non_member"
                placeholder="Harga Non Member"
                className="w-full"
                variant="outlined"
                onChange={handleProductChange(index, "harga_non_member")}
              />
            </Grid>
          </Grid>
        ))}
      </>
    );
  };

  const handleProductChange = (index, name) => (e) => {
    const updatedField = [...productList];

    updatedField[index][name] = e.target.value;

    setProductList(updatedField);
  };

  const handleAddProduct = () => {
    setProductList((prev) => [
      ...prev,
      {
        asal_produk: "",
        tipe: "",
      },
    ]);
  };

  const handleRemoveProduct = (index) => {
    const updatedField = [...productList];
    updatedField.splice(index, 1);
    setProductList(updatedField);
  };

  const handleChangePhoto1 = (file, path) => {
    setState({
      ...state,
      foto: file,
      preview: path,
    });
  };
  
  const handleChangePhoto2 = (file, path) => {
    setState({
      ...state,
      foto2: file,
      preview2: path,
    });
  };

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
        <ThemeProvider theme={theme}>
          <GeneralButton variant="contained" name="Save" data={handleSubmit} />
        </ThemeProvider>
      </Grid>
      <Card className="mt-5 py-10 px-10">
        <div className="mx-8 mt-5 mb-8">
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
              preview={state.preview}
              formatIcon={false}
            />
          </Grid>
          <Grid container className="mt-2" spacing={2}>
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
                InputProps={{
                  style: {
                    borderRadius: 5,
                    minHeight: 46,
                  },
                }}
                value={state.title}
                name="title"
                placeholder="Games"
                className="w-full"
                variant="outlined"
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <h1
                className="mb-5 font-semimedium text-14"
                style={{ color: "#0a0a0a" }}
              >
                Kategori
              </h1>
              <ListGamesFilter
                value={category}
                label="Kategori"
                name="category"
                handleChange={handleCategory}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <h1
                className="mb-5 font-semimedium text-14"
                style={{ color: "#0a0a0a" }}
              >
                Kode Game
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
                value={state.kode_game}
                name="kode_game"
                placeholder="Kode Game"
                variant="outlined"
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <h1
                className="mb-5 font-semimedium text-14"
                style={{ color: "#0a0a0a" }}
              >
                Field Deskripsi
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
                value={state.field_description}
                name="field_description"
                placeholder="Field Deskripsi"
                variant="outlined"
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <h1
                className="mb-5 font-semimedium text-14"
                style={{ color: "#0a0a0a" }}
              >
                Game Deskripsi
              </h1>
              <TextField
                required={true}
                size="small"
                multiline
                rows={10}
                InputProps={{
                  style: {
                    borderRadius: 5,
                    minHeight: 46,
                  },
                }}
                className="w-full mt-2"
                value={state.game_description}
                name="game_description"
                placeholder="Game Deskripsi"
                variant="outlined"
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <h1
                className="font-semimedium text-14"
                style={{ color: "#0a0a0a" }}
              >
                Foto
              </h1>
              <UploadImage
                uploadFoto={handleChangePhoto2}
                label="Banner"
                preview={state.preview2}
                formatIcon={false}
              />
            </Grid>
          </Grid>
        </div>
      </Card>

      {/* FIELDS */}
      <Card className="mt-5 py-10 px-10">
        <div className="mx-8 mt-5 mb-8">
          <Grid item xs={12} sm={6}>
            <h3
              className="text-20 font-medium mb-5"
              style={{ color: "#0A0A0A" }}
            >
              Fields
            </h3>
          </Grid>
          {renderFields()}
        </div>
      </Card>

      {/* PRODUK */}
      <Card className="mt-5 py-10 px-10">
        <div className="mx-8 mt-5 mb-8">{renderProduct()}</div>
        {/* <Grid container justifyContent="space-between">
          <Grid item></Grid>
          <Grid item>
            <button
              className="mx-8 mb-8 border-radius-circle bg-primary text-white w-35 h-35"
              style={{ marginTop: "25px", padding: "8.7px" }}
              onClick={goToTop}
            >
              <Icon className="mr-1" fontSize="medium">
                <KeyboardArrowUpIcon />
              </Icon>
            </button>
          </Grid>
        </Grid> */}
      </Card>
    </div>
  );
};

export default AddGamesListGames;
