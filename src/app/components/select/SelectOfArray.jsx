import React from "react";
import {
  Select,
  FormControl,
  MenuItem,
  InputLabel,
  Icon,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";

export default function SelectOfArray({
  dataSelect = [],
  state = "",
  required = false,
  setState = "",
  size = "small",
  label = "",
  width = "171px",
  name = "",
  index,
  scaleY = "1",
  menuItemFontSize = "text-14",
  onChange,
}) {
  const handleChange = (id, e) => {
    const newArray = state.map((arr, index) => {
      if (id == index) {
        return {
          ...arr,
          [name]: e.target.value,
        };
      } else {
        return arr;
      }
    });
    setState(newArray);
  };

  const useStyles = makeStyles((theme) => ({
    root: {
      width: "100%",
      "& .MuiOutlinedInput-root": {
        backgroundColor: "#fbfbfb ",
        height: "42px",
      },
      "& .MuiOutlinedInput-notchedOutline": {
        borderColor: "#e6e9ed",
        borderWidth: "1px",
      },
      "& .MuiSelect-select": {
        fontWeight: "400",
        fontSize: "14px",
        color: "#0A0A0A",
      },
      "& .MuiInputLabel-outlined": {
        color: "#9196ab",
        fontSize: "14px",
        top: "10px",
        left: "14px",
        transform: "translate(0, 1px) scale(1)",
        '&[data-shrink="true"]': {
          top: "-6px",
          fontSize: "12px",
          fontWeight: "400",
          color: "#6B7280",
          transform: "translate(0, 0) scale(1)",
        },
      },
    },
  }));

  const classes = useStyles();

  return (
    <div>
      <FormControl
        size={size}
        variant="outlined"
        className={classes.root}
        style={{ width }}
        required={required}
        InputProps={{
          style: {
            borderRadius: 5,
            minHeight: 46,
          },
        }}
      >
        <InputLabel htmlFor="outlined-age-native-simple">
          <span style={{ color: "#555c64b7" }} className="my-auto bg-white">
            {label}
          </span>
        </InputLabel>
        <Select
          IconComponent={() => (
            <KeyboardArrowDownIcon size="medium" style={{ fontWeight: 700 }} />
          )}
          onChange={onChange ? onChange : (e) => handleChange(index, e)}
          value={state[index][name]}
          inputProps={{
            name,
            style: {
              borderRadius: 5,
              minHeight: 46,
            },
          }}
          size={size}
          className="bg-white"
          style={{
            transform: `scaleY(${scaleY})`,
            paddingRight: "16px",
          }}
        >
          {dataSelect.map((data) => (
            <MenuItem
              key={data.value}
              value={data.value}
              text={data.text}
              className={`${menuItemFontSize} "bg-white"`}
              style={{
                transform: `scaleY(${scaleY === "1.25" ? "0.92" : "1"})`,
              }}
            >
              {data.text}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
