import React from 'react';
import AddIcon from "@material-ui/icons/Add";
import Button from '@mui/material/Button';


export default function GeneralButton(props){
    return (
      <Button
        variant={props.variant}
        color={props.color}
        className="px-13 py-3"
        style={{ textTransform: "none" }}
        onClick={props.data}
      >
        {props.icon}
        <span className="karyawan-btn-span">{props.name}</span>
      </Button>
    );
}