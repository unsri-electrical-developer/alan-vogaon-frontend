import { Card, Grid, Icon, TextField, Button } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import "../../../styles/css/DetailUser.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";
// import Button from '@mui/material/Button';
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { UploadImage } from "../../components";
import SimpleCard from "../../assets/components/cards/SimpleCard";
import ic_plus from "../../assets/components/icons/ic_plus.svg";
import ic_bin from "../../assets/components/icons/ic_bin.svg";
import { editGamesList, getDetailGamesList } from "../../redux/actions/GamesActions";
import Swal from "sweetalert2";
import { useHistory, useParams } from "react-router-dom";
import GeneralButton from "../../components/buttons/GeneralButton.jsx";
import ListGamesFilter from "./components/ListGamesFilter";

const theme = createTheme({
palette: {
    primary: {
    main: "#1253FA",
    },
},
});

const EditListGames = () => {
    const { id } = useParams();
    console.log(id);
    const dispatch = useDispatch();

    const history = useHistory();

    const [state, setState] = useState({
        foto: "",
        title: "",
        games_item: "",
    });

    const [category, setCategory] = useState("");

    // handler
    const handleCategory = (e) => {
        setCategory(e.target.value);
        console.log(category);
    };

    const handleChange = (e) => {
        e.persist();
        setState((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.value,
        }));

        console.log(state);
    };

    // submit
    const handleSubmit = () => {
        try {
        dispatch(
            editGamesList({
            id:id,
            img: state.foto,
            title: state.title,
            category_code: category,
            games_item: inputList,
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
                history.push("/games/listGames");
                Swal.fire("Success!", "List Games berhasil disimpan", "success");
            }, 4000);
            timerInterval = setInterval(() => {
                b.textContent = Swal.getTimerLeft();
            }, 1000);
            },
        });
        } catch (e) {
        Swal.fire("Oopss!", "Data List Games gagal disimpan", "error");
        }
    };

    const [inputList, setInputList] = useState([
        {
        title: "",
        price: "",
        },
        {
        title: "",
        price: "",
        },
    ]);
    
  // taking data
    useEffect(() => {
        getDetailGamesList(id).then((res) => {
            let data = res.data?.data;
            console.log(data);
            setState((prev) => ({
                ...prev,
                title: data.title,
                foto: data.img,
                games_item: data.games_item,
            }));
            setCategory(data.category?.category_code);
            setInputList(data?.games_item);
        });
    }, []);

  // table input

    const handleInputChange = (index, field) => (e) => {
        const updatedList = [...inputList];

        updatedList[index][field] = e.target.value;

        setInputList(updatedList);

        console.log(inputList);
    };

    const handleAddInput = () => {
        setInputList([
        ...inputList,
        {
            title: "",
            price: "",
        },
        ]);
    };

  const handleRemoveInput = (index) => {
        console.log(index);
        const updatedList = [...inputList];
        updatedList.splice(index, 1);
        setInputList(updatedList);
    };

    const renderInput = () => {
        const isLastInput = (index) => inputList.length - 1 !== index;
        const onlyOne = () => inputList.length == 1;
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
                    name="title"
                    className={`${classes.outlined} border-radius-5 w-full`}
                    placeholder="Produk"
                    variant="outlined"
                    onChange={handleInputChange(index, "title")}
                    value={item.title}
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
                    name="price"
                    className={`${classes.outlined} border-radius-5 w-full`}
                    placeholder="Harga"
                    variant="outlined"
                    onChange={handleInputChange(index, "price")}
                    value={item.price}
                  />
                </Grid>

                {isLastInput(index) ? (
                  <>
                    {index}
                    <div className=" mt-5">
                      <Button onClick={() => handleRemoveInput(index)}>
                        <img src={ic_bin} alt="del" />
                      </Button>
                    </div>
                    <div className="mt-5">
                      <Button>
                        <img
                          src={ic_plus}
                          alt="add"
                          style={{ display: "none" }}
                        />
                      </Button>
                    </div>
                  </>
                ) : (
                  <>
                    {index}

                    <div className="ml-3 mr-0 mt-5">
                      <Button onClick={() => handleRemoveInput(index)}>
                        <img src={ic_bin} alt="del" />
                      </Button>
                    </div>
                    <div className="mt-5">
                      <Button onClick={() => handleAddInput()} fullWidth>
                        <img src={ic_plus} alt="add" />
                      </Button>
                    </div>
                  </>
                )}
              </Grid>
            ))}
          </>
        );
  };

  // end of tableInput

  const handleChangePhoto1 = (file, path) => {
    setState({
      ...state,
      foto: file,
      preview: path,
    });
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
      <h1 className="fw-600 m-0">Edit Games</h1>
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
              preview={state.foto}
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
                value={state.title}
                name="title"
                className={`${classes.outlined} border-radius-5 w-full`}
                placeholder="Games"
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
                // search
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
          </Grid>
          <div className="mt-5">{renderInput()}</div>
        </div>
      </Card>
    </div>
  );
};

export default EditListGames;
