import { Button, Card, Grid, Icon, TextField } from "@material-ui/core";
import React, { useLayoutEffect, useState } from "react";
import { useDispatch } from "react-redux";
import "../../../styles/css/DetailUser.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Link } from "react-router-dom";
import GeneralButton from "../../components/buttons/GeneralButton.jsx";
import { getDetailGamesList} from "../../redux/actions/GamesActions";
import { useHistory, useParams } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { UploadImage } from "../../components";
import DeleteIcon from "@mui/icons-material/DeleteOutlineOutlined";
import EditIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import TableDetailListGames from './components/TableDetailListGames';

const theme = createTheme({
  palette: {
    primary: {
      main: "#1253FA",
    },
  },
});

const DetailListGames = () => {
  const { id } = useParams();
  console.log(id);
  const history = useHistory();

  const [state, setState] = useState({
    data: [],
    games_item: []
  });

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
  
  console.log(state.data);
  useLayoutEffect(() => {
    getDetailGamesList(id).then((res) => {
      let data = res.data?.data;
      console.log(data);
      setState((prev) => ({
        ...prev,
        data: data,
        games_item: data.games_item
      }));
    console.log(state.data);

    });
  }, []);

  // const renderInput = () => {
  //   const isLastInput = (index) => inputList.length - 1 !== index;

  //   return (
  //     <>
  //       {inputList?.map((item, index) => (
  //         <Grid container justifyContent="space-between" spacing={1}>
  //           <Grid item xs={6} sm={5}>
  //             <h5 className="font-semibold text-13">Produk</h5>
  //             <TextField
  //               required={true}
  //               size="small"
  //               inputProps={{
  //                 className: classes.input,
  //               }}
  //               style={{
  //                 transform: "scaleY(1.25)",
  //                 marginTop: "10px",
  //                 marginBottom: "10px",
  //               }}
  //               // value={state.jenis_bonus}
  //               name="game"
  //               className={`${classes.outlined} border-radius-5 w-full`}
  //               placeholder="Produk"
  //               variant="outlined"
  //               // onChange={handleChange}
  //             />
  //           </Grid>

  //           <Grid Grid item xs={6} sm={5}>
  //             <h5 className="font-semibold text-13">Harga</h5>
  //             <TextField
  //               required={true}
  //               size="small"
  //               inputProps={{
  //                 className: classes.input,
  //               }}
  //               style={{
  //                 transform: "scaleY(1.25)",
  //                 marginTop: "10px",
  //                 marginBottom: "10px",
  //               }}
  //               // value={state.jenis_bonus}
  //               name="game"
  //               className={`${classes.outlined} border-radius-5 w-full`}
  //               placeholder="Harga"
  //               variant="outlined"
  //               // onChange={handleChange}
  //             />
  //           </Grid>

  //           {isLastInput(index) ? (
  //             <div className="delete-button  mt-5">
  //               <Button onClick={() => handleRemoveInput(index)}>
  //                 <img src={ic_bin} alt="del" />
  //               </Button>
  //             </div>
  //           ) : (
  //             <div className="add-button mt-5">
  //               <Button onClick={() => handleAddInput()} fullWidth>
  //                 <img src={ic_plus} alt="add" />
  //               </Button>
  //             </div>
  //           )}
  //         </Grid>
  //       ))}
  //     </>
  //   );
  // };

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
          <h1 className="fw-600 m-0">Detail Game</h1>
        </Grid>
        <Grid
          item
          xs={12}
          sm
          className="d-flex mr-6 items-center"
          style={{ justifyContent: "flex-end" }}
        >
          <Link to="/users">
            <GeneralButton
              icon={<DeleteIcon />}
              name="Delete"
              variant="outlined"
            />
          </Link>
        </Grid>
        <Grid
          item
          xs={12}
          sm
          className="d-flex mr-6 items-center"
          style={{ justifyContent: "flex-end" }}
        >
          <Link to="/users">
            <GeneralButton icon={<EditIcon />} name="Edit" variant="outlined" />
          </Link>
        </Grid>
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
              Foto Game
            </h1>
            <div
              className="w-full p-2 border-radius-5"
              style={{ height: "275px", border: "1px dashed #1253FA" }}
            >
              <div
                style={{
                  backgroundImage: `url(${state.data.img})`,
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "cover",
                  height: "100%",
                }}
                className="w-full"
              />
            </div>
          </Grid>

          <Grid container className="mt-2" spacing={5}>
            <Grid item xs={12} sm={6}>
              <h1 className="text-muted text-14 font-medium mb-2 font-500 h4">
                Nama Game
              </h1>
              <p className="text-16 font-medium" style={{ color: "#0A0A0A" }}>
                {state.data.title}
              </p>
            </Grid>

            <Grid item xs={12} sm={6}>
              <h1 className="text-muted text-14 font-medium mb-2 font-500 h4">
                Kategori
              </h1>
              <p className="text-16 font-medium" style={{ color: "#0A0A0A" }}>
                {state.data.category?.category_name}
              </p>
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
          <TableDetailListGames data={state.games_item} />
        </div>
      </Card>
    </div>
  );
};

export default DetailListGames;
