import { useState } from "react";
import React from "react";
// import MenuDenda from "./MenuDenda";
import {
  TablePagination,
  Table,
  TableCell,
  TableRow,
  TableBody,
  TableHead,
  Avatar,
  Chip,
  Button,
  MenuItem,
  Menu,
  IconButton,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import ModalEditPin from "../../../components/modals/ModalEditPin";
import { MatxMenu } from "../../../../matx";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import {
  Block,
  DeleteOutline,
  Lock,
  LockOpen,
  Visibility,
} from "@material-ui/icons";
import { ModeEdit, Pin } from "@mui/icons-material";
import Swal from "sweetalert2";
import { changeUserStatus, deleteUser } from "../../../redux/actions/UserActions";
import ModalEditPassword from "../../../components/modals/ModalEditPassword";
import ModalEditLevelUser from "../../../components/modals/ModalEditLevelUser";

const RenderTable = ({
  data,
  state,
  handleModalEditPin,
  handleModalStatusUser,
  handleModalEditPassword,
  handleModalEditLevelUser,
  handleDeleteUser
}) => {
  const handleNumbering = () => {
    if (state.rowsPerPage === 5) {
      return state.page * 5;
    } else if (state.rowsPerPage === 10) {
      return state.page * 10;
    } else if (state.rowsPerPage === 25) {
      return state.page * 25;
    }
  };

  const [openMenu, setMenuOpen] = useState(false);
  const handleClose = () => {
    setMenuOpen(false);
  };

  return data?.length > 0 ? (
    data
      .slice(
        state.page * state.rowsPerPage,
        state.page * state.rowsPerPage + state.rowsPerPage
      )
      .map((item, index) => (
        <TableRow hover key={index}>
          <TableCell
            className="text-14 pl-3"
            align="center"
            style={{ color: "#0A0A0A" }}
            colSpan={1}
          >
            {index + 1 + handleNumbering()}
          </TableCell>
          <TableCell style={{ color: "#0A0A0A" }} colSpan={5}>
            <div
              className=" z-100 text-14 d-flex items-center"
              style={{ gap: "16px" }}
            >
              {/* <Avatar
                variant="square"
                // src={`https://ui-avatars.com/api/?name=nurlestari&background=97CB72&color=ffffff`}
                src={item.users_profile_pic}
                width={"50px"}
                style={{ borderRadius: "5px" }}
              /> */}
              <div>
                <p className="mb-0">{item.name}</p>
                {item.isSuspend ? (
                  <Chip
                    size="small"
                    className="text-white"
                    label={"Terkunci"}
                    style={{ backgroundColor: "#C2C2C2" }}
                  />
                ) : (
                  ""
                )}
                {item.memberType == 2 ? (
                  <Chip
                    size="small"
                    className="text-white"
                    label={"Reseller"}
                    style={{ backgroundColor: "#fbc02a" }}
                  />
                ) : (
                  <Chip
                    size="small"
                    className="text-white"
                    label={"Member"}
                    style={{ backgroundColor: "#66CCC7" }}
                  />
                )}
              </div>
            </div>
          </TableCell>
          <TableCell align="center" style={{ color: "#0A0A0A" }} colSpan={3}>
            {item.email}
          </TableCell>
          <TableCell align="center" colSpan={3}>
            {item.no_telp}
          </TableCell>
          <TableCell align="center" colSpan={3}>
            {item.created_at.slice(0, 10)}
          </TableCell>
          <TableCell
            align="center"
            colSpan={3}
            className={item.isActive ? "text-primary" : "text-danger"}
          >
            {item.isActive ? "Aktif" : "Nonaktif"}
          </TableCell>
          <TableCell align="center" colSpan={2}>
            <MatxMenu
              menuButton={
                <div className="flex items-center">
                  <IconButton size="small">
                    <MoreHorizIcon />
                  </IconButton>
                </div>
              }
              horizontalPosition="right"
            >
              <Link
                to={{
                  pathname: `/users/${item.users_code}`,
                }}
              >
                <MenuItem className="text-dark" onClick={handleClose}>
                  <Visibility />
                  <span className="pl-3">Lihat Detail</span>
                </MenuItem>
              </Link>

              {!item?.isSuspend ? (
                ""
              ) : (
                <MenuItem
                  className="text-primary"
                  onClick={() => {
                    handleModalEditPin(item);
                    handleClose();
                  }}
                >
                  <span className="">
                    <Pin />
                  </span>
                  <span className="pl-3 ">Reset Pin</span>
                </MenuItem>
              )}

              {item.isActive == 1 ? (
                <MenuItem
                  className="text-error"
                  onClick={() => {
                    handleModalStatusUser(item, 0);
                    handleClose();
                  }}
                >
                  <span className="">
                    <LockOpen />
                  </span>
                  <span className="pl-3 ">Nonaktifkan</span>
                </MenuItem>
              ) : (
                <MenuItem
                  className="text-primary"
                  onClick={() => {
                    handleModalStatusUser(item, 1);
                    handleClose();
                  }}
                >
                  <Block />
                  <span className="pl-3">Aktifkan</span>
                </MenuItem>
              )}

              <MenuItem
                className=""
                onClick={() => {
                  handleModalEditPassword(item);
                  handleClose();
                }}
              >
                <Lock />
                <span className="pl-3">Reset Password</span>
              </MenuItem>

              <MenuItem
                className="text-primary"
                onClick={() => {
                  handleModalEditLevelUser(item);
                  handleClose();
                }}
              >
                <ModeEdit />
                <span className="pl-3">Edit Level User</span>
              </MenuItem>

              <MenuItem
                className="text-error"
                onClick={() => {
                  handleDeleteUser(item);
                  handleClose();
                }}
              >
                <DeleteOutline />
                <span className="pl-3">Hapus Data</span>
              </MenuItem>
            </MatxMenu>
          </TableCell>
        </TableRow>
      ))
  ) : (
    <>
      <TableCell colSpan={15} align="center">
        Data kosong
      </TableCell>
    </>
  );
};

const TableUsers = ({ search, data, getData }) => {
  const [state, setState] = useState({
    page: 0,
    rowsPerPage: 10,
    showEditPin: false,
    showEditPassword: false,
    showEditLevelUser: false,
  });
  const [usersClicked, setUsersClicked] = useState({});

  const setPage = (page) => {
    setState({
      ...state,
      page,
    });
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const setRowsPerPage = (event) => {
    setState({
      ...state,
      rowsPerPage: event.target.value,
    });
  };

  const handleModalEditPin = (item) => {
    setUsersClicked(item);
    setState({ ...state, showEditPin: !state.showEditPin });
  };

  const handleModalEditPassword = (item) => {
    setUsersClicked(item);
    setState({
      ...state,
      showEditPassword: !state.showEditPassword,
    });
  };

  const handleModalEditLevelUser = (item) => {
    setUsersClicked(item);
    setState({
      ...state,
      showEditLevelUser: !state.showEditLevelUser,
    });
  };

  const handleModalStatusUser = (item, status) => {
    var newStatus = status == 0 ? "Menonaktifkan" : "Mengaktifkan";
    Swal.fire({
      icon: "question",
      title: `Anda yakin ingin ${newStatus} user ini ?`,
      showCancelButton: true,
      confirmButtonText: "Ya",
      cancelButtonText: "Batal",
    }).then((result) => {
      if (result.isConfirmed) {
        const newParams = {
          users_code: item.users_code,
          status: status,
        };
        changeUserStatus(newParams)
          .then(() => {
            Swal.fire("Berhasil!", "", "success");
            getData();
          })
          .catch((err) => {
            // let error = err?.response?.data;
            Swal.fire("Gagal !", "", "error");
          });
      }
    });
  };

  const handleDeleteUser = (item) => {
    Swal.fire({
      icon: "question",
      title: `Anda yakin ingin menghapus user ini ?`,
      showCancelButton: true,
      confirmButtonText: "Ya",
      cancelButtonText: "Batal",
      confirmButtonColor: '#f44336',
    }).then((result) => {
      if (result.isConfirmed) {
        deleteUser(item.users_code)
          .then(() => {
            Swal.fire("Berhasil!", "", "success");
            getData();
          })
          .catch((err) => {
            Swal.fire("Gagal !", "", "error");
          });
      }
    });
  };

  const handleCloseModal = (item) => {
    getData();
    setState({
      ...state,
      showEditPin: false,
      showEditPassword: false,
      showEditLevelUser: false,
    });
  };

  return (
    <div className="w-full overflow-auto bg-white izincuti-tabs-slide">
      <Table
        className="buku-kas-table"
        style={{
          borderTop: "1px #e6e5e5 solid",
          marginTop: "20px",
        }}
      >
        <TableHead>
          <TableRow style={{ borderBottom: "1px #e6e5e5 solid" }}>
            <TableCell
              colSpan={1}
              className="font-medium text-15"
              style={{ color: "#0a0a0a" }}
              align="center"
            >
              No
            </TableCell>
            <TableCell
              colSpan={3}
              className="font-medium text-15"
              style={{ color: "#0a0a0a" }}
            >
              Nama
            </TableCell>
            <TableCell
              colSpan={5}
              className="font-medium text-15"
              style={{ color: "#0a0a0a" }}
              align="center"
            >
              Email
            </TableCell>
            <TableCell
              colSpan={3}
              className="font-medium text-15"
              style={{ color: "#0a0a0a" }}
              align="center"
            >
              No. Handphone
            </TableCell>
            <TableCell
              colSpan={3}
              className="font-medium text-15"
              style={{ color: "#0a0a0a" }}
              align="center"
            >
              Tanggal Daftar
            </TableCell>
            <TableCell
              colSpan={3}
              className="font-medium text-15"
              style={{ color: "#0a0a0a" }}
              align="center"
            >
              Status
            </TableCell>
            <TableCell
              colSpan={2}
              className="font-medium text-15"
              style={{ color: "#0a0a0a" }}
              align="center"
            >
              Aksi
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <RenderTable
            data={data}
            state={state}
            getData={getData}
            search={search}
            handleModalEditPin={handleModalEditPin}
            handleModalStatusUser={handleModalStatusUser}
            handleModalEditPassword={handleModalEditPassword}
            handleModalEditLevelUser={handleModalEditLevelUser}
            handleDeleteUser={handleDeleteUser}
          />
        </TableBody>
      </Table>

      <TablePagination
        className="px-16 my-7"
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={data?.length ? data?.length : 0}
        rowsPerPage={state.rowsPerPage}
        labelRowsPerPage={"From"}
        page={state.page}
        backIconButtonProps={{
          "aria-label": "Previous page",
        }}
        nextIconButtonProps={{
          "aria-label": "Next page",
        }}
        backIconButtonText="Previous page"
        nextIconButtonText="Next page"
        onPageChange={handleChangePage}
        onRowsPerPageChange={setRowsPerPage}
      />

      <ModalEditPin
        handleClose={handleCloseModal}
        open={state.showEditPin}
        data={usersClicked}
      />

      <ModalEditPassword
        handleClose={handleCloseModal}
        open={state.showEditPassword}
        data={usersClicked}
      />

      <ModalEditLevelUser
        handleClose={handleCloseModal}
        open={state.showEditLevelUser}
        data={usersClicked}
      />
    </div>
  );
};

export default TableUsers;
