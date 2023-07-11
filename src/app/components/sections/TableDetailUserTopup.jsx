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
} from "@material-ui/core";
import IcDot from "./../../assets/components/icons/IcDot.svg";
import { Link } from "react-router-dom";
import Aksieye from "./../../assets/components/icons/Aksieye.svg";

const RenderTable = ({
  data,
  state,
  search,
  getData,
  customColumns,
  TotalColspan = 18,
  aksiSpan = 3,
  detailLink,
  id,
}) => {
  const handleNumbering = () => {
    if (state.rowsPerPage === 5) {
      return state.page * 5;
    } else if (state.rowsPerPage === 10) {
      return state.page * 10;
    } else if (state.rowsPerPage === 20) {
      return state.page * 20;
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
        <TableRow
          hover
          key={index}
          style={{
            borderTop: "1px #e6e5e5 solid",
            marginTop: "20px",
          }}
        >
          <TableCell
            className="text-14 pl-2 "
            align="center"
            style={{ color: "#0A0A0A" }}
            colSpan={1}
          >
            {index + 1 + handleNumbering()}
          </TableCell>
          {customColumns?.map((column, index) => (
            <TableCell
              key={index}
              className="text-14 pl-2"
              // style={{ color: "#0A0A0A" }}
              style={column.type === "topup" && item[column.key] > 0 ? {color: "#51AF77"} : column.type === "topup" && item[column.key] < 0 ? {color:"#D55454"} : column.type === "status" && item[column.key] == "processing" ? { color: "#1253FA" }
              : column.type === "status" && item[column.key] == "waiting" || column.type === "status" && item[column.key] == "pending"  ? { color: "#DF8838" }
              : column.type === "status" && item[column.key] == "success" ? { color: "#51AF77" }
              :   {color: "#0A0A0A" }}
              colSpan={column.colSpan}
              align={column.align}
            >
              {column.type === "price" || column.type === "topup"  && item[column.key]
                ? `Rp ${item[column.key]
                    .toString()
                    .replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.")}`
                : column.type === "date" && item[column.key]
                ? new Date(item[column.key]).toLocaleDateString("en-US")
                : column.type !== "pembelian" ? item[column.key] : null }

              {/* Nomor Transaksi */}
              <Link to={`${detailLink}/${item[id]}`}>
                {column.type === "pembelian" && item[column.key]}
              </Link>
            </TableCell>
          ))}
          <TableCell align="center" colSpan={aksiSpan} className="pl-2">
            <Link to={`${detailLink}/${item[id]}`}>
              <img src={Aksieye} alt="eye" />
            </Link>
          </TableCell>
        </TableRow>
      ))
  ) : (
    <>
      <TableRow
        hover
        style={{
          borderTop: "1px #e6e5e5 solid",
          marginTop: "20px",
        }}
      >
        <TableCell colSpan={TotalColspan} align="center">
          Data kosong
        </TableCell>
      </TableRow>
    </>
  );
};

const TableDetailUserTopup = ({
  search,
  data,
  getData,
  tableHeadItems,
  customColumns,
  TotalColspan,
  aksiSpan,
  detailLink,
  id,
}) => {
  const [state, setState] = useState({
    page: 0,
    rowsPerPage: 20,
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
  const tableHead = tableHeadItems?.map((item, index) => (
    <TableCell key={index} align={item.align} colSpan={item.colSpan}>
      <div className="table-head-font"> {item.name}</div>
    </TableCell>
  ));
  return (
    <div className="w-full overflow-auto bg-white izincuti-tabs-slide">
      <Table
        style={{
          borderTop: "1px #e6e5e5 solid",
          marginTop: "20px",
        }}
      >
        <TableHead>
          <TableRow>{tableHead}</TableRow>
        </TableHead>

        <TableBody>
          <RenderTable
            data={data}
            state={state}
            getData={getData}
            search={search}
            customColumns={customColumns}
            aksiSpan={aksiSpan}
            detailLink={detailLink}
            id={id}
          />
        </TableBody>
      </Table>
      <TablePagination
        className="px-16"
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
        onChangePage={handleChangePage}
        onChangeRowsPerPage={setRowsPerPage}
      />
    </div>
  );
};

export default TableDetailUserTopup;