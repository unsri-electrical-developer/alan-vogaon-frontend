import { useState } from "react";
import { Button, Menu, MenuItem } from "@material-ui/core";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import CreateOutlinedIcon from "@material-ui/icons/CreateOutlined";
import DeleteOutlineOutlinedIcon from "@material-ui/icons/DeleteOutlineOutlined";
import VisibilityOutlinedIcon from "@material-ui/icons/VisibilityOutlined";
// import { deleteLokasiAbsensi } from 'app/redux/actions/AbsenAction';
import { useDispatch } from "react-redux";
import React from "react";

export default function MenuCategory({
  item,
  editPath,
  detailPath,
  setState,
  getData,
}) {
  const [anchorEl, setAnchorEl] = useState(null);
  const dispatch = useDispatch();
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDelete = (params) => {
    // try {
    //   dispatch(deleteLokasiAbsensi(params));
    //   getData();
    //   handleClose();
    //   setState((prev) => ({
    //     ...prev,
    //     searchTgl: new Date(),
    //   }));
    //   Swal.fire('Success!', 'Data Lokasi Absensi berhasil disimpan', 'success');
    // } catch (e) {
    //   Swal.fire('Oopss!', 'Data Lokasi Absensi gagal disimpan', 'error');
    // }
  };

  return (
    <div>
      <Button
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
        className="elevation-z0"
      >
        <MoreHorizIcon />
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <Link
          to={{
            pathname: detailPath,
          }}
        >
          <MenuItem className="mb-3" onClick={handleClose}>
            <span className="">
              <VisibilityOutlinedIcon />
            </span>
            <span className="pl-3 ">Lihat Detail</span>
          </MenuItem>
        </Link>
              
        <Link
          to={{
            pathname: editPath,
          }}
        >
          <MenuItem className="mb-3" onClick={handleClose}>
            <span className="">
              <CreateOutlinedIcon style={{ color: "#1253FA" }} />
            </span>
            <span className="pl-3" style={{ color: "#1253FA" }}>
              Edit Data
            </span>
          </MenuItem>
        </Link>

        <MenuItem
          className=""
          onClick={() => handleDelete(item.lokasi_absensi_code)}
        >
          <span className="text-red">
            <DeleteOutlineOutlinedIcon />
          </span>
          <span className="pl-3 text-red">Hapus Data</span>
        </MenuItem>
      </Menu>
    </div>
  );
}
