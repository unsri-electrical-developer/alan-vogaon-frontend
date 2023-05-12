import { Button, Card, Grid, Icon, TextField } from "@material-ui/core";
import React, { useLayoutEffect, useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Link } from "react-router-dom";
import GeneralButton from "../../components/buttons/GeneralButton.jsx";
import { getDetailGamesList} from "../../redux/actions/GamesActions";
import { useHistory, useParams } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import DeleteIcon from "@mui/icons-material/DeleteOutlineOutlined";
import EditIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import TableDetailListGames from './components/TableDetailListGames';
import { delGamesList } from "../../redux/actions/GamesActions";
import Swal from "sweetalert2";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1253FA",
    },
  },
});
  
const DetailListGames = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const { id } = useParams();
  const history = useHistory();

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Hapus",
      text: "Apakah kamu yakin",
      showCancelButton: true,
      confirmButtonText: "Yakin",
      cancelButtonText: "Batal",
      icon: "warning",
    }).then((res) => {
      if (res.isConfirmed) {
        delGamesList(id)
          .then((res) => {
            if (res.data.code == 0) {
              console.log(res);
              Swal.fire({
                title: "Berhasil",
                text: "Data berhasil dihapus",
                timer: 2000,
                icon: "success",
              });
            }
            handleClose();
            history.push('/games/ListGames');
          })
          .catch((err) => {
            console.log("err", err);
            Swal.fire({
              title: "gagal",
              text: "Data Gagal dihapus",
              timer: 2000,
              icon: "error",
            });
            handleClose();
            history.push("/games/ListGames");

          });
      }
    });
  };

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

  return (
    <div className="analytics m-sm-30 mt-7 text-black">
      <Grid
        container
        spacing={1}
        justifyContent="space-between"
        alignItems="center"
        className="my-4 d-flex items-center"
      >
        <Grid item xs={6}>
          <h1 className="fw-600 m-0">Detail Game</h1>
        </Grid>

        <Grid item xs={6}>
          <div style={{ display: "flex", justifyContent: "flex-end" }}>

            <div style={{ marginRight: "10px" }}>
              <GeneralButton
                icon={<DeleteIcon />}
                name="Delete"
                variant="outlined"
                color = "error"
                data={() => handleDelete(state.data.code)}
              />
            </div>

            <Link to={`/games/listGames/edit/${state.data.code}`}>
              <GeneralButton
                icon={<EditIcon />}
                name="Edit"
                variant="outlined"
              />
            </Link>
          </div>
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
                  backgroundSize: "contained",
                  backgroundPosition: "center",
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
