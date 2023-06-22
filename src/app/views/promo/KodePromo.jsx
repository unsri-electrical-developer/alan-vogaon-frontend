import React, { useLayoutEffect } from "react";
import {
  Button,
  TextField,
  Icon,
  InputAdornment,
  Grid,
  Chip,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import AddIcon from "@material-ui/icons/Add";

import SimpleCard from "../../assets/components/cards/SimpleCard";
import { useDispatch, useSelector } from "react-redux";
import { delPromo, getPromo } from "../../redux/actions/PromoActions";
import { useState } from "react";
import {
  TablePagination,
  Table,
  TableCell,
  TableRow,
  TableBody,
  TableHead,
} from "@material-ui/core";
import Swal from "sweetalert2";
import MenuComponent from "../../components/Menu/MenuComponent";

const KodePromo = () => {
  const dispatch = useDispatch();

  const [search, setSearch] = React.useState("");

  const getData = () => {
    dispatch(getPromo(search));
  };
  const RenderTable = ({ data, state, getData }) => {
    const handleDelete = (id) => {
      try {
        Swal.fire({
          title: "Konfirmasi",
          text: "Anda yakin ingin menghapus Voucher ini?",
          icon: "warning",
          buttons: ["Batal", "Hapus"],
          showCancelButton: true,
          showConfirmButton: true,
          dangerMode: true,
        }).then(function (res) {
          console.log(res);
          if (res.isConfirmed) {
            delPromo(id).then(() => {
              Swal.fire("Success!", "Promo berhasil dihapus", "success");
              getData();
            });
          }
        });
      } catch (e) {
        Swal.fire("Error!", "Promo gagal dihapus", "error");
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
    return data?.filter(
      (item) =>
        item.vouchers_title.toLowerCase().includes(search.toLowerCase()) ||
        item.vouchers_redeem_code.toLowerCase().includes(search.toLowerCase())
    )?.length > 0 ? (
      data
        .filter(
          (item) =>
            item.vouchers_title.toLowerCase().includes(search.toLowerCase()) ||
            item.vouchers_redeem_code
              .toLowerCase()
              .includes(search.toLowerCase())
        )
        .slice(
          state.page * state.rowsPerPage,
          state.page * state.rowsPerPage + state.rowsPerPage
        )
        .map((item, index) => (
          <TableRow hover key={item.vouchers_code}>
            <TableCell
              align="center"
              className="text-14 pl-3 text-black"
              colSpan={1}
            >
              {index + 1 + handleNumbering()}
            </TableCell>
            <TableCell className="text-14 text-black" colSpan={5}>
              {item.vouchers_title}
            </TableCell>
            <TableCell className="text-14 text-black" colSpan={4}>
              {item.vouchers_redeem_code}
            </TableCell>
            <TableCell className="text-14 text-black" colSpan={2}>
              {item.isActive ? (
                <Chip className="text-white" label="Aktif" color="primary" />
              ) : (
                <Chip className="text-white" label="Non-aktif" color="error" />
              )}
            </TableCell>
            <TableCell className="pl-3" align="center" colSpan={1}>
              <MenuComponent
                editPath={`kode_promo/edit/${item.vouchers_code}`}
                deletePath={() => handleDelete(item.vouchers_code)}
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

  useLayoutEffect(() => {
    getData();
  }, []);

  const { promo } = useSelector((state) => state.promo);

  return (
    <div className="m-sm-30">
      <Grid
        container
        spacing={3}
        className="mb-4 mx-auto px-2"
        alignItems="center"
        justifyContent="space-between"
      >
        <Grid item xs={12} sm>
          <h1 className="text-black fw-600 text-25 my-auto">Kode Promo</h1>
        </Grid>
        <Grid item xs={12} sm className="d-flex mr-8 justify-end">
          <Link to="/kode_promo/add">
            <Button
              variant="contained"
              color="primary"
              className="px-14 py-3 text-white border-radius-4 fw-500"
            >
              <AddIcon /> <span className="ml-2">Add</span>
            </Button>
          </Link>
        </Grid>
      </Grid>
      <SimpleCard title="">
        <div className="mt-2 mb-4 d-flex items-center justify-end pt-5">
          <TextField
            size="small"
            variant="outlined"
            className={`w-250`}
            placeholder="Cari Nama/Kode Promo"
            name="search"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Icon>search</Icon>
                </InputAdornment>
              ),
              style: {
                borderRadius: 5,
                minHeight: 46,
                backgroundColor: '#FFFFFF'
              },
            }}
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              handleChangePage(e, 0);
            }}
          />
        </div>
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
                <TableCell
                  colSpan={5}
                  className="font-medium text-15 text-black"
                >
                  Nama Promo
                </TableCell>
                <TableCell
                  colSpan={4}
                  className="font-medium text-15 text-black"
                >
                  Kode Promo
                </TableCell>
                <TableCell
                  colSpan={2}
                  className="font-medium text-15 text-black"
                >
                  Status
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
                data={promo}
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
            count={promo?.length ? promo?.length : 0}
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
      </SimpleCard>
    </div>
  );
};

export default KodePromo;
