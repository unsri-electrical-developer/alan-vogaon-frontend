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
import { delGamesList } from "../../../redux/actions/GamesActions";
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted';
export default function MenuCategory({
  item,
  editPath,
  detailPath,
  setState,
  getData,
  category,
  redeemPath,
  stateRedeem
}) {
  const [anchorEl, setAnchorEl] = useState(null);
  const dispatch = useDispatch();
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    getData();
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
        });
    }
  });
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
{ category === "VG" && (
  <Link
          to={{
            pathname: redeemPath,
            state: {  stateRedeem },
          }}
        >
          <MenuItem className="mb-3" onClick={() => handleClose}>
            <span className="">
              <FormatListBulletedIcon style={{ color: "#FF9C41" }} />
            </span>
            <span className="pl-3" style={{ color: "#FF9C41" }}>
              List Redeem Code
            </span>
          </MenuItem>
        </Link>
)}


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
          onClick={() => handleDelete(item.game_code)}
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
