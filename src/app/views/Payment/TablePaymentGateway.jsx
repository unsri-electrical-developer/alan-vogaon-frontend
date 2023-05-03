import { TableCell, TableRow, Button } from '@material-ui/core';
import React from 'react';

const TablePaymentGateway = ({ data, page, rowsPerPage, getData }) => {
  const handleNumbering = () => {
    if (rowsPerPage === 5) {
      return page * 5;
    } else if (rowsPerPage === 10) {
      return page * 10;
    } else if (rowsPerPage === 25) {
      return page * 25;
    }
  };

  return data?.length > 0 ? (
    data
      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
      .map((item, index) => (
        <TableRow hover key={index}>
          <TableCell className="pl-5 text-14 text-black" colSpan={1}>
            {index + 1 + handleNumbering()}
          </TableCell>
          <TableCell className="pl-5 text-14 text-black" colSpan={5}>
            {item}
          </TableCell>
          <TableCell className="text-14 text-black" align="center" colSpan={2}>
            <Button className="karyawan-aksi-dot elevation-z0">
              {/* <MenuPtkp
                item={item}
                editPath={`/pajak/ketentuan/edit/${item.ketentuan_pajak_code}`}
                isPajak={true}
              /> */}
            </Button>
          </TableCell>
        </TableRow>
      ))
  ) : (
    <TableRow hover>
      <TableCell
        className="font-medium text-12 line-height-28 text-body"
        colSpan={8}
        align="center"
      >
        Data kosong
      </TableCell>
    </TableRow>
  );
};

export default TablePaymentGateway;
