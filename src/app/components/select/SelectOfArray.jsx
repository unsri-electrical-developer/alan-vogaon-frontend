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
  onChange
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
    input: {
      transform: "scaleY(0.88)",
    },
  }));

  const handleClasses = () => {
    if (scaleY === "1.25") {
      return classes.input;
    } else {
      return "";
    }
  };

  const classes = useStyles();
  return (
    <div>
      <FormControl
        size={size}
        variant="outlined"
        className="bg-white rounded-lg"
        style={{ width }}
        required={required}
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
            className: handleClasses(),
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
