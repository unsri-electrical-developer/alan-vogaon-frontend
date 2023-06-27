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
import { formatRupiah } from "../../../utlis/formatRupiah";

const RenderTable = ({
  data,
  state,
  customColumns,
  TotalColspan = 18,
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
  return data?.length > 0 ? (
    data.map((item, index) => (
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
              className="text-14 pl-2"
              style={{ color: "#0A0A0A" }}
              colSpan={column.colSpan}
              align={column.align}
              key={index}
              
            >
              {column.type === "price" && item[column.key]
            ? `Rp ${item[column.key]
                .toString()
                .replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.")}`
            : column.type === "date" && item[column.key]
            ? new Date(item[column.key]).toLocaleDateString("en-US")
            : item[column.key]}
            </TableCell>
          ))}
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

const TableDetailListPembelian = ({
  data,
  tableHeadItems,
  customColumns,
}) => {
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

  const setRowsPerPage = (event) => {
    setState({
      ...state,
      rowsPerPage: event.target.value,
    });
  };

  const tableHead = tableHeadItems?.map((item, index) => (
    <TableCell key={index} align={item.align} colSpan={item.colSpan} style={{backgroundColor: "#ebf0f4"}}>
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
            customColumns={customColumns}
          />
        </TableBody>
      </Table>
    </div>
  );
};

export default TableDetailListPembelian;
