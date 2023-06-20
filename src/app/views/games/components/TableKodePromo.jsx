import { useState } from 'react';
import React from 'react';
import {
  TablePagination,
  Table,
  TableCell,
  TableRow,
  TableBody,
  TableHead,
} from '@material-ui/core';
import MenuComponent from '../../components/Menu/MenuComponent';
import { deletePaymentGateway } from '../../redux/actions/Payment/PaymentGatewayActions';
import Swal from 'sweetalert2';

const RenderTable = ({ data, state, search, getData }) => {
  const handleDelete = (id) => {
    try {
      deletePaymentGateway(id).then(() => {
        Swal.fire(
          'Success!',
          'Data Payment Gateway berhasil dihapus',
          'success'
        );
        getData();
      });
    } catch (e) {
      Swal.fire('Error!', 'Data Payment Gateway gagal dihapus', 'error');
    }
  };

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
        <TableRow hover key={item.pg_code}>
          <TableCell
            align="center"
            className="text-14 pl-3 text-black"
            colSpan={1}
          >
            {index + 1 + handleNumbering()}
          </TableCell>
          <TableCell className="text-14 text-black" colSpan={10}>
            {item.pg_name}
          </TableCell>
          <TableCell className="pl-3" align="center" colSpan={1}>
            <MenuComponent
              editPath={`payment_gateway/${item.pg_code}`}
              deletePath={() => handleDelete(item.pg_code)}
            />
          </TableCell>
        </TableRow>
      ))
  ) : (
    <TableRow hover>
      <TableCell
        className="font-medium text-12 line-height-28 text-body"
        colSpan={12}
        align="center"
      >
        Data kosong
      </TableCell>
    </TableRow>
  );
};

const TablePaymentGateway = ({ search, data, getData }) => {
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
    <div className="w-full overflow-auto bg-white">
      <Table className="buku-kas-table mt-10 border-y-black-1">
        <TableHead>
          <TableRow className="border-y-black-1">
            <TableCell
              colSpan={1}
              className="font-medium text-15 text-black"
              align="center"
            >
              No
            </TableCell>
            <TableCell colSpan={10} className="font-medium text-15 text-black">
              Payment Gateway
            </TableCell>
            <TableCell
              colSpan={1}
              className="font-medium text-15 text-black"
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
        className="px-10 my-7"
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={data?.length ? data?.length : 0}
        rowsPerPage={state.rowsPerPage}
        labelRowsPerPage={'From'}
        page={state.page}
        backIconButtonProps={{
          'aria-label': 'Previous page',
        }}
        nextIconButtonProps={{
          'aria-label': 'Next page',
        }}
        backIconButtonText="Previous page"
        nextIconButtonText="Next page"
        onPageChange={handleChangePage}
        onRowsPerPageChange={setRowsPerPage}
      />
    </div>
  );
};

export default TablePaymentGateway;
