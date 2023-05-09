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
import MenuCategory from "./MenuCategory"

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
        <TableCell colSpan={10}>{item.category_name}</TableCell>
        <TableCell align="center" colSpan={1}>
          <MenuCategory
            item={item}
            // getData={getData}
            // setState={setState}
            editPath={`/games/category/edit/${item.category_code}`}
          />
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

const TableGamesCategory = ({ search, data, getData }) => {
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
              colSpan={10}
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

export default TableGamesCategory;
