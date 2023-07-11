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
} from "@material-ui/core";
import Aksieye from "../../../assets/components/icons/Aksieye.svg";
import { Link } from "react-router-dom";
import ModalEditPin from "../../../components/modals/ModalEditPin";

const RenderTable = ({ data, state, handleModalEditPin }) => {
  const handleNumbering = () => {
    if (state.rowsPerPage === 5) {
      return state.page * 5;
    } else if (state.rowsPerPage === 10) {
      return state.page * 10;
    } else if (state.rowsPerPage === 25) {
      return state.page * 25;
    }
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
          <TableCell style={{ color: "#0A0A0A" }} colSpan={3}>
            <div
              className=" z-100 text-14 d-flex items-center"
              style={{ gap: "16px" }}
            >
              <Avatar
                variant="square"
                // src={`https://ui-avatars.com/api/?name=nurlestari&background=97CB72&color=ffffff`}
                src={item.users_profile_pic}
                width={"50px"}
                style={{ borderRadius: "5px" }}
              />
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
          <TableCell align="center" colSpan={2}>
            <Link
              to={{
                pathname: `/users/${item.users_code}`,
              }}
            >
              <img src={Aksieye} alt="eye" />
            </Link>
            {item.isSuspend ? (
              <Button
                size="small"
                color="primary"
                variant="contained"
                disableElevation
                className="text-white ml-2 border-6"
                onClick={() => handleModalEditPin(item)}
              >
                Ganti PIN
              </Button>
            ) : (
              ""
            )}
          </TableCell>
        </TableRow>
      ))
  ) : (
    <>
      <TableCell colSpan={12} align="center">
        Data kosong
      </TableCell>
    </>
  );
};

const TableTransactionUserSaldo = ({ search, data, getData }) => {
  const [state, setState] = useState({
    page: 0,
    rowsPerPage: 10,
    showEditPin: false,
  });
  const [usersToPin, setUsersToPin] = useState({});

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
    setUsersToPin(item)
    setState({ ...state, showEditPin: !state.showEditPin });
  };

  const handleCloseModalEditPin = (item) => {
    getData();
    setState({ ...state, showEditPin: false });
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
              colSpan={3}
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

      <ModalEditPin handleClose={handleCloseModalEditPin} open={state.showEditPin} data={usersToPin} />
    </div>
  );
};

export default TableTransactionUserSaldo;
