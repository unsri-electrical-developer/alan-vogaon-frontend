import React, { useState } from "react";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import { withStyles } from "@material-ui/core/styles";
import ic_calendar from "../../assets/components/ic_calendar.svg";

function DatePickerComponent({
  date,
  handleDate,
  name,
  datePickerName = "",
  style,
  // style = "text-field-modifier-long",

  format,
  tipe = "d MMMM yyyy",
  isDateFormat,
  slice = 11,
  search,
}) {
  const handleTanggal = (e) => {
    const event = new Date(e);
    let dateFormat = JSON.stringify(event);
    dateFormat = dateFormat.slice(1, slice);
    if (name) {
      handleDate(dateFormat, name);
    } else {
      handleDate(dateFormat);
    }
  };

  const formatedDate = new Date(Date.parse(date));

  const DatePicker = withStyles((theme) => ({
    root: {
      "& .MuiOutlinedInput-input": {
        padding: search ? "19px" : "15px",
        backgroundColor: search ? "#ffffff" : "#fbfbfb",
        borderColor: search ? null : "#e6e9ed",
        borderWidth: search ? null : "1px",
        borderRadius: "5px",

        color: search ? "#9196ab" : "#4a4b4c",
        fontWeight: "400",
        width: "100%",
      },

      "& .MuiOutlinedInput-notchedOutline": {
        borderColor: search ? null : "#e6e9ed",
        // backgroundColor: search ? "#ffffff" : "#f4e9e9",
        borderRadius: "5px",
      },
      "& .PrivateNotchedOutline-root-107": {
        borderWidth: search ? null : "1px",
        borderRadius: "5px",
      },
    },
  }))(KeyboardDatePicker);

  return (
    <>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <DatePicker
          autoOk
          variant="inline"
          inputVariant="outlined"
          InputProps={{
            disableUnderline: true,
          }}
          format={tipe}
          value={isDateFormat ? formatedDate : date}
          InputAdornmentProps={{ position: "end" }}
          onChange={handleTanggal}
          className={style}
          fullWidth
          keyboardIcon={
            <div>
              <img src={ic_calendar} />
            </div>
          }
          KeyboardButtonProps={{
            // Customize the icon button props if needed
            size: "small",
            style: {
              background: search ? "#ffffff" : "#ffffff",
              width: "55px",
              marginLeft: "-14px",
              height: "54px",
              borderRadius: "0px",
              marginRight: "-14px",
              borderRadius: "0px 5px 5px 0px",
            },
          }}
        />
      </MuiPickersUtilsProvider>
    </>
  );
}

export default DatePickerComponent;
