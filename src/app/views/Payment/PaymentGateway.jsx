import {
  Card,
  Button,
  Grid,
  TablePagination,
  Table,
  TableCell,
  TableRow,
  TableBody,
  TableHead,
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import AddIcon from '@material-ui/icons/Add';

import React, { useLayoutEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import TablePaymentGateway from './TablePaymentGateway';
import { dataPaymentGateway } from './DataDummyPayment';

const PaymentGateway = () => {
  const dispatch = useDispatch();
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);

  const [state, setState] = useState({
    preview1: '',
    preview2: '',
    preview3: '',
  });

  useLayoutEffect(() => {
    console.log('uselayouteffect');
  }, []);

  return (
    <div className="analytics m-sm-30 mt-7 text-black">
      <Grid
        container
        spacing={3}
        className="mb-4 mx-auto px-2"
        alignItems="center"
        justifyContent="space-between"
      >
        <Grid item xs={12} sm>
          <h1 className="font-semibold text-25 my-auto text-black">
            Payment Gateway
          </h1>
        </Grid>
        <Grid
          item
          xs={12}
          sm
          className="d-flex mr-8"
          style={{ justifyContent: 'flex-end' }}
        >
          <Link to="/payment_gateway/add">
            <Button
              variant="contained"
              color="primary"
              className="rounded-lg text-white px-8 py-3"
            >
              <AddIcon /> <span className="karyawan-btn-span">Tambah</span>
            </Button>
          </Link>
        </Grid>
      </Grid>
      <Card className="mt-5 py-10 px-10">
        <div className="w-full overflow-auto bg-white mt-3">
          <Table className="buku-kas-table">
            <TableHead>
              <TableRow>
                <TableCell
                  className="text-black font-medium text-15 pl-5"
                  colSpan={1}
                >
                  No
                </TableCell>
                <TableCell
                  className="text-black font-medium text-15 pl-5"
                  colSpan={5}
                >
                  Payment Gateway
                </TableCell>
                <TableCell
                  align="center"
                  className="text-black font-medium text-15 "
                  colSpan={2}
                >
                  Aksi
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TablePaymentGateway
                data={dataPaymentGateway}
                page={page}
                rowsPerPage={rowsPerPage}
              />
            </TableBody>
          </Table>

          <TablePagination
            className="px-5 my-7"
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={
              dataPaymentGateway.length > 0 ? dataPaymentGateway.length : 0
            }
            rowsPerPage={rowsPerPage}
            labelRowsPerPage={'From'}
            page={page}
            backIconButtonProps={{
              'aria-label': 'Previous page',
            }}
            nextIconButtonProps={{
              'aria-label': 'Next page',
            }}
            backIconButtonText="Previous page"
            nextIconButtonText="Next page"
            onPageChange={(event, newPage) => setPage(newPage)}
            onRowsPerPageChange={(e) => setRowsPerPage(e.target.value)}
          />
        </div>
      </Card>
    </div>
  );
};

export default PaymentGateway;
