import { Card, Grid, Icon, TextField, Button } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import "../../../styles/css/DetailUser.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { makeStyles } from "@material-ui/core/styles";
import { addGamesList } from "../../redux/actions/GamesActions";
import Swal from "sweetalert2";
import { useHistory } from "react-router-dom";
import GeneralButton from "../../components/buttons/GeneralButton.jsx";
import { getGamesVoucher, addGamesVoucher,editGamesVoucher,getGameItems } from "../../redux/actions/GamesActions";
import { useParams  } from "react-router-dom";
import { useSelector } from 'react-redux';
import SelectOfArray from "../../components/select/SelectOfArray";


const theme = createTheme({
  palette: {
    primary: {
      main: "#1253FA",
    },
  },
});

const RedeemListCode = () => {
      const [fieldList, setFieldList] = useState();

      const { id } = useParams();
  const { gameVoucher } = useSelector((state) => state.game);

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

  const [gameItems, setGameItems] = useState();

  const getData = () => {
    dispatch(getGamesVoucher(id));
        



  };

const getDataItems = () => {
  const transformedData = {};

  getGameItems(id).then((res) => {
    const data = res.data?.data
      data.forEach((item) => {
        const key = item.code;
        transformedData[key] = [{
          redeem_code: "",
          voucher_status: "",
        },{
          redeem_code: "",
          voucher_status: "",
        }];
      });


    }
  ).then(() => {
    setFieldList(transformedData);
  });
};







  useEffect(() => {
                  getDataItems();

    getData();

    }, []);

    useEffect(() => {
        if (gameVoucher && Object.keys(gameVoucher).length > 0){
            setFieldList(gameVoucher);
        }


    }, [gameVoucher]);





 

  



  const handleSubmit = async () => {
    try {
      

    
    
if (gameVoucher){
    await dispatch(editGamesVoucher({
        data : fieldList,
    },id))
}else {
await dispatch(addGamesVoucher({
        data : fieldList,
      },id))
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

  
  const handleFieldChange = (state, setState, parentKey, childIndex, name) => (e) => {
  const updatedField = { ...state };
  updatedField[parentKey][childIndex] = {
    ...updatedField[parentKey][childIndex],
    [name]: e.target.value,
  };
  setState(updatedField);
};

const handleAddField = (setStateFunction, parentKey) => {
  setStateFunction((prev) => {
    const updatedField = { ...prev };
    updatedField[parentKey] = [
      ...updatedField[parentKey],
      {
        redeem_code: "",
        voucher_status: "",
      },
    ];
    return updatedField;
  });
};

const handleRemoveField = (setState, parentKey, childIndex) => {
  setState((prev) => {
    const updatedField = { ...prev };
    updatedField[parentKey].splice(childIndex, 1);
    return updatedField;
  });
};



 
const renderFields = (object, setState) => {
  return (
    <>
      {Object.entries(object)?.map(([key, group], groupIndex) => {
        const onlyOne = group.length === 1;
        
        return (
          <Card className="mt-5 py-10 px-10" key={groupIndex}>
            <div className="mx-8 mt-5 mb-8">
              <h1 className="text-22 font-bold mb-8" style={{ color: "#0A0A0A" }}>
                Product {groupIndex + 1}
              </h1>
              {group?.map((item, itemIndex) => {
                        const isLastGroup = itemIndex === group.length - 1;

                
                return (
                <div
                  style={{
                    marginBottom: "30px",
                    display: "flex",
                    gap: "30px",
                  }}
                  key={itemIndex}
                >
                  <Grid container justifyContent="space-between" spacing={2}>
                    <Grid item sm={5}>
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
                        value={item.redeem_code}
                        name="redeem_code"
                        className={`${classes.outlined} border-radius-5 w-full`}
                        placeholder="Redeem Code"
                        variant="outlined"
                        onChange={handleFieldChange(object, setState, key, itemIndex, "redeem_code")}
                      />
                      
                    </Grid>
                    <Grid item sm={5}>
                      <h1
                        className="mb-5 font-semimedium text-14"
                        style={{ color: "#0a0a0a" }}
                      >
                        Status
                      </h1>
                      <SelectOfArray
                        dataSelect={[
                          {
                            text: "Aktif",
                            value: "active",
                          },
                          {
                            text: "Tidak Aktif",
                            value: "inactive",
                          },
                        ]}
                        state={group}
                                                onChange={handleFieldChange(object, setState, key, itemIndex, "voucher_status")}

                        setState={setState}
                        size="small"
                        label="Status"
                        width="100%"
                        name="voucher_status"
                        index={itemIndex}
                        menuItemFontSize="text-14"
                      />
                    </Grid>
                    {onlyOne ? (
                      <Grid item className="mt-8" sm={2}>
                        <div
                          className="border-radius-circle bg-primary text-white w-35 h-35"
                          style={{ display: "flex", alignItems: "center", justifyContent: "center" }}
                          onClick={() => handleAddField(setState, key)}
                        >
                          <Icon fontSize="medium">add-icon</Icon>
                        </div>
                      </Grid>
                    ) : isLastGroup && itemIndex === group.length - 1 ? (
                      
                      <Grid item className="mt-8" sm={2}>
                        <div
                          className="border-radius-circle bg-primary w-35 h-35 text-white"
                          style={{ display: "flex", alignItems: "center", justifyContent: "center" }}
                          onClick={() => handleAddField(setState, key)}
                        >
                          <Icon fontSize="medium">add-icon</Icon>
                        </div>
                      </Grid>
                    ) : (
                      <Grid item className="mt-10" sm={2}>
                        <div
                          className="border-radius-circle bg-error w-35 h-35"
                          style={{ display: "flex", alignItems: "center", justifyContent: "center" }}
                          onClick={() => handleRemoveField( setState, key, itemIndex)}
                        >
                          <Icon fontSize="medium">delete-outline-icon</Icon>
                        </div>
                      </Grid>
                    )}
                  </Grid>
                </div>
              )})}
            </div>
          </Card>
        );
      })}
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
      

     
{fieldList !== undefined && Object.keys(fieldList).length > 0 && renderFields(fieldList, setFieldList)}
       

      
   




    </div>
  );
};

export default RedeemListCode;
