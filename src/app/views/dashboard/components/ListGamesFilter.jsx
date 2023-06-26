import {
  Select,
  FormControl,
  MenuItem,
  InputLabel,
  Icon,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import { getAllCategories } from "../../../redux/actions/GamesActions";
import React, { useState, useLayoutEffect, useEffect } from "react";

export default function ListGamesFilter({
  required = false,
  handleChange = "",
  size = "small",
  label = "",
  width,
  name = "",
  scaleY = "1",
  menuItemFontSize = "text-14",
  search = "",
  value = "",
}) {
  // for filter
  const [state, setState] = useState([]);

  const getDataCategories = () => {
    getAllCategories().then((res) => {
      const data = res.data?.data;
      setState(data);
    });
  };

  useEffect(() => {
    getDataCategories();
  }, []);

  const useStyles = makeStyles((theme) => ({
    root: {
      width: "100%",
      "& .MuiOutlinedInput-root": {
        backgroundColor: search ? "#ffffff" : "#fbfbfb ",
        height: search ? "38px" : "42px",
      },
      "& .MuiOutlinedInput-notchedOutline": {
        borderColor: search ? null : "#e6e9ed",
        borderWidth: search ? null : "1px",
      },
      "& .MuiSelect-select": {
        fontWeight: "400",
        fontSize: "14px",
        color: "#0A0A0A",
      },
      "& .MuiInputLabel-outlined": {
        color: "#9196ab",
        fontSize: search ? null : "14px",
        top: search ? "-7px" : "10px",
        left: search ? null : "14px",
        transform: search ? null : "translate(0, 0) scale(1)",
        '&[data-shrink="true"]': {
          top: search ? "null" : "-6px",
          fontSize: search ? null : "12px",
          fontWeight: search ? null : "400",
          color: "#6B7280",
          transform: search ? null : "translate(0, 0) scale(1)",
        },
      },
    },
  }));

  const classes = useStyles();

  const menuList = state?.map((state, index) => {
    const valueList = state?.category_code;
    const name = state?.category_name;
    return (
      <MenuItem key={index} text={name} value={valueList}>
        {name}
      </MenuItem>
    );
  });

  return (
    <div className="w-full">
      <FormControl
        variant="outlined"
        className={classes.root}
        InputLabelProps={{ classes: { root: classes.inputLabel } }}
        style={{ width: width }}
      >
        <InputLabel shrink={false}>{value ? null : label}</InputLabel>

        <Select
          value={value}
          onChange={handleChange}
          className=" w-full"
          IconComponent={KeyboardArrowDownIcon}
          variant="outlined"
        >
          {search && (
            <MenuItem key="semua" value="">
              Lihat Semua
            </MenuItem>
          )}
          {menuList}
        </Select>
      </FormControl>
    </div>
  );
}
