import React, { useState } from 'react';
import { Button, Menu, MenuItem } from '@material-ui/core';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import CreateOutlinedIcon from '@material-ui/icons/CreateOutlined';
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';

import { useDispatch } from 'react-redux';

export default function MenuComponent({
  icon = <MoreHorizIcon />,
  editPath,
  editAction,
  deletePath,
}) {
  const [anchorEl, setAnchorEl] = useState(null);
  const dispatch = useDispatch();
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
        className="elevation-z0"
      >
        {icon}
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {editPath && (
          <Link
            to={{
              pathname: editPath,
            }}
          >
            <MenuItem className="mb-3 text-primary" onClick={handleClose}>
              <span className="">
                <CreateOutlinedIcon />
              </span>
              <span className="pl-3 ">Edit Data</span>
            </MenuItem>
          </Link>
        )}
        {editAction && (
          <MenuItem
            className="mb-3 text-primary"
            onClick={() => {
              editAction();
              handleClose();
            }}
          >
            <span className="">
              <CreateOutlinedIcon />
            </span>
            <span className="pl-3 ">Edit Data</span>
          </MenuItem>
        )}
        {deletePath && (
          <MenuItem
            className=""
            onClick={() => {
              deletePath();
              handleClose();
            }}
          >
            <span className="text-error">
              <DeleteOutlineOutlinedIcon />
            </span>
            <span className="pl-3 text-error">Hapus Data</span>
          </MenuItem>
        )}
      </Menu>
    </div>
  );
}
