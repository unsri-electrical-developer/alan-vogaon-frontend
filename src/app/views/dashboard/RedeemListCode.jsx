import { Card, Grid, Icon, TextField, Button } from "@material-ui/core";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import "../../../styles/css/DetailUser.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { makeStyles } from "@material-ui/core/styles";
import { addGamesList } from "../../redux/actions/GamesActions";
import Swal from "sweetalert2";
import { useHistory } from "react-router-dom";
import GeneralButton from "../../components/buttons/GeneralButton.jsx";

import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";

import AddIcon from "@material-ui/icons/Add";
import { Link } from "react-router-dom";
import { UploadImage } from "../../components";
import SimpleCard from "../../assets/components/cards/SimpleCard";
import ic_plus from "../../assets/components/icons/ic_plus.svg";
import ic_bin from "../../assets/components/icons/ic_bin.svg";


import SelectOfArray from "../../components/select/SelectOfArray";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1253FA",
    },
  },
});

const RedeemListCode = () => {
  const dispatch = useDispatch();
  const history = useHistory();
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
      marginBlock: "auto",
    },
  }));
  const classes = useStyles();
 

  



  const handleSubmit = () => {
    try {
      fieldList.forEach((obj) => {
        if (!obj.nama && !obj.tipe) {
          throw new Error("data isian Field tidak lengkap");
        }
      });

    
      

      addGamesList({
        
        fieldList,
        // games_item: inputList,
      }).then((res) => {
        if (res.code == 2) {
          throw new Error(res.message);
        }
      });

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
      Swal.fire("Oopss!", e.message, "error");
    }
  };

  // FIELDS
  const [fieldList, setFieldList] = useState([
    {
      detail_product_code: "",
      redeem_code: "",
      status: "",
    },
  ]);

  const [fieldList2, setFieldList2] = useState([
    {
          detail_product_code: "",
      redeem_code: "",
      status: "",
    },
  ]);

    const handleFieldChange = (state,setState, index, name) => (e) => {
  const updatedField = [...state];
  updatedField[index][name] = e.target.value;
  setState(updatedField);
};

const handleAddField = (setStateFunction) => {
  setStateFunction((prev) => [
    ...prev,
    {
       detail_product_code: "",
      redeem_code: "",
      status: "",
    },
  ]);
};

const handleRemoveField = (state,setState, index) => {
  const updatedField = [...state];
  updatedField.splice(index, 1);
  setState(updatedField);
};

  const renderFields = (array,setState) => {
    const isLastInput = (index) => array?.length - 1 !== index;
    const onlyOne = () => array?.length == 1;

    return (
      <>
        {array?.map((item, index) => (
             <div
            style={{
              marginBottom: "30px",
              display: "flex",
              gap: "30px",
            }}
          >
          <Grid
            container
            justifyContent="space-between"
            spacing={2}
           
          >
            <Grid item sm={4}   >
              <h1
                className="mb-5 font-semimedium text-14"
                style={{ color: "#0a0a0a" }}
              >
                Detail Product Code
              </h1>
              <TextField
                required={true}
                size="small"
                inputProps={{
                  className: classes.input,
                }}
                value={array[index].nama}
                name="detail_product_code"
                className={`${classes.outlined} border-radius-5 w-full`}
                placeholder="Detail Product Code"
                variant="outlined"
                onChange={handleFieldChange(array,setState,index, "nama")}
              />
            </Grid>
            <Grid item sm={4}>
              <h1
                className="mb-5 font-semimedium text-14"
                style={{ color: "#0a0a0a" }}
              >
                Redeem Code
              </h1>
              <TextField
                required={true}
                size="small"
                inputProps={{
                  className: classes.input,
                }}
                value={array[index].tipe}
                name="redeem_code"
                className={`${classes.outlined} border-radius-5 w-full`}
                placeholder="Redeem Code"
                variant="outlined"
                onChange={handleFieldChange(array,setState,index, "tipe")}
              />
            </Grid>
             <Grid item sm={4}>
              <h1
                className="mb-5 font-semimedium text-14"
                style={{ color: "#0a0a0a" }}
              >
                Status
              </h1>
              <TextField
                required={true}
                size="small"
                inputProps={{
                  className: classes.input,
                }}
                value={array[index].tipe}
                name="status"
                className={`${classes.outlined} border-radius-5 w-full`}
                placeholder="Status"
                variant="outlined"
                onChange={handleFieldChange(array,setState,index, "tipe")}
              />
            </Grid>

            
          </Grid>
          {onlyOne() ? (
              <Grid item className="mt-8" sm={1}>
                <div
                  className="border-radius-circle bg-primary text-white w-35 h-35"
                  style={{ display: "flex", alignItems: "center", justifyContent: "center" }}
                  onClick={() =>handleAddField(setState)}
                >
                  <Icon  fontSize="medium">
                    add-icon
                  </Icon>
                </div>
              </Grid>
            ) : isLastInput(index) ? (
              <Grid item className="mt-10" sm={1}>
                <div
                  className="border-radius-circle bg-error w-35 h-35"
                  style={{ display: "flex", alignItems: "center", justifyContent: "center" }}
                  onClick={() => handleRemoveField(array,setState,index)}
                >
                  <Icon  fontSize="medium">
                    delete-outline-icon
                  </Icon>
                </div>
              </Grid>
            ) : (
              <Grid item className="mt-8" sm={1}>
                <div
                  className="border-radius-circle bg-primary w-35 h-35 text-white"
                  style={{ display: "flex", alignItems: "center", justifyContent: "center" }}
                  onClick={() =>handleAddField(setState)}
                >
                  <Icon  fontSize="medium">
                    add-icon
                  </Icon>
                </div>
              </Grid>
            )}
          </div>
        ))}
      </>
    );
  };





 

 

  

  return (
    <div className="analytics m-sm-30 mt-7 text-black">
      <Grid
        container
        xs={12}
        sm
        className="d-flex mr-8"
        style={{ justifyContent: "space-between" }}
      >
              <h2 className="fw-600 m-0">List Redeem Code</h2>

        <ThemeProvider theme={theme}>
          <GeneralButton variant="contained" name="Save" data={handleSubmit} />
        </ThemeProvider>
      </Grid>
      

      <Card className="mt-5 py-10 px-10">
        <div className="mx-8 mt-5 mb-8">
          
            <h1
              className="text-22 font-bold mb-8"
              style={{ color: "#0A0A0A" }}
            >
              Product 1
            </h1>
          {renderFields(fieldList,setFieldList)}
        </div>
      </Card>

      
      <Card className="mt-5 py-10 px-10">
        <div className="mx-8 mt-5 mb-8">
          
            <h1
              className="text-22 font-bold mb-8"
              style={{ color: "#0A0A0A" }}
            >
              Product 2
            </h1>
          {renderFields(fieldList2,setFieldList2)}
        </div>
      </Card>





    </div>
  );
};

export default RedeemListCode;
