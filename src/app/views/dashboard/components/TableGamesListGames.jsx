import { useState } from "react";
import React from 'react';
// import MenuDenda from "./MenuDenda";
import {
  TablePagination,
  Table,
  TableCell,
  TableRow,
  TableBody,
    TableHead,
  Avatar
} from "@material-ui/core";
import IcDot from "./../../../assets/components/IcDot.svg"

const RenderTable = ({ data, state, search, getData }) => {
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
          <TableCell
            className="text-14 "
            style={{ color: "#0A0A0A" }}
            colSpan={5}
          >
            {item.nama_denda}
          </TableCell>
          <TableCell
            className="text-14 "
            style={{ color: "#0A0A0A" }}
            colSpan={4}
          >
            {item.nominal === null
              ? ""
              : item.nominal == undefined
              ? ""
              : `Rp ${item.nominal
                  .toString()
                  .replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.")}`}
          </TableCell>
          <TableCell className="pl-3" align="center" colSpan={2}>
            {/* <MenuDenda
              item={item}
              path={`/lainnya/denda/edit/${item.jenis_denda_code}`}
              getData={getData}
            /> */}
          </TableCell>
        </TableRow>
      ))
  ) : (
    <>
      <TableRow hover style={{ borderBottom: "1px #e6e5e5 solid" }}>
        {/* <TableCell colSpan={12} align="center">
        Data kosong
      </TableCell> */}
        <TableCell
          className="text-14 pl-3"
          align="center"
          style={{ color: "#0A0A0A" }}
          colSpan={1}
        >
          1
        </TableCell>
        <TableCell colSpan={5}>
          <div
            className=" z-100 text-14 d-flex items-center"
            style={{ gap: "16px" }}
          >
            <Avatar
              variant="square"
              src={`https://ui-avatars.com/api/?name=nurlestari&background=97CB72&color=ffffff`}
              width={"50px"}
            />
            Free Fire
          </div>
        </TableCell>
        <TableCell colSpan={5}>Mobile Game</TableCell>
        <TableCell align="center" colSpan={1}>
          <img src={IcDot} alt="eye" />
        </TableCell>
      </TableRow>

      <TableRow hover>
        {/* <TableCell colSpan={12} align="center">
        Data kosong
      </TableCell> */}
        <TableCell
          className="text-14 pl-3"
          align="center"
          style={{ color: "#0A0A0A" }}
          colSpan={1}
        >
          2
        </TableCell>
        <TableCell colSpan={5}>
          {" "}
          <div
            className=" z-100 text-14 d-flex items-center"
            style={{ gap: "16px" }}
          >
            <Avatar
              variant="square"
              src={`https://ui-avatars.com/api/?name=nurlestari&background=97CB72&color=ffffff`}
              width={"50px"}
            />
            Free Fire
          </div>
        </TableCell>
        <TableCell colSpan={5}>Entertainment</TableCell>
        <TableCell align="center" colSpan={1}>
          <img src={IcDot} alt="eye" />
        </TableCell>
      </TableRow>
    </>
  );
};

const TableGamesListGames = ({ search, data, getData }) => {
  const [state, setState] = useState({
    page: 0,
    rowsPerPage: 10,
  });

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
              colSpan={5}
              className="font-medium text-15"
              style={{ color: "#0a0a0a" }}
            >
              Games
            </TableCell>
            <TableCell
              colSpan={5}
              className="font-medium text-15"
              style={{ color: "#0a0a0a" }}
            >
              Kategori
            </TableCell>
            <TableCell
              colSpan={1}
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
    </div>
  );
};

export default TableGamesListGames;
