import React, { useLayoutEffect } from "react";
import {
  Button,
  TextField,
  Icon,
  InputAdornment,
  Grid,
  Avatar,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import AddIcon from "@material-ui/icons/Add";

import SimpleCard from "../../assets/components/cards/SimpleCard";
import { useDispatch, useSelector } from "react-redux";
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
import {
  delCrudAdmin,
  getCrudAdmin,
} from "../../redux/actions/CrudAdminActions";

import { formatTanggal } from "../../../utlis/formatTanggal";

const Admin = () => {
  const dispatch = useDispatch();

  const [search, setSearch] = React.useState("");

  const getData = () => {
    dispatch(getCrudAdmin(search));
  };
  const RenderTable = ({ data, state, getData }) => {
    const handleDelete = (id) => {
      try {
        Swal.fire({
          title: "Konfirmasi",
          text: "Anda yakin ingin menghapus Admin ini?",
          icon: "warning",
          buttons: ["Batal", "Hapus"],
          showCancelButton: true,
          showConfirmButton: true,
          dangerMode: true,
        }).then(function (res) {
          console.log(res);
          if (res.isConfirmed) {
            delCrudAdmin(id).then(() => {
              Swal.fire("Success!", "Admin berhasil dihapus", "success");
              getData();
            });
          }
        });
      } catch (e) {
        Swal.fire("Error!", "Admin gagal dihapus", "error");
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
          <TableRow hover key={item.vouchers_code}>
            <TableCell
              align="center"
              className="text-14 pl-3 text-black"
              colSpan={1}
            >
              {index + 1 + handleNumbering()}
            </TableCell>
            <TableCell className="text-14 text-black" colSpan={5}>
              <div
                className=" z-100 text-14 d-flex items-center"
                style={{ gap: "16px" }}
              >
                {item.name}
              </div>
            </TableCell>
            <TableCell className="text-14 text-black" colSpan={5}>
              {item.email}
            </TableCell>
            <TableCell className="text-14 text-black" colSpan={4}>
              <div
                className=" z-100 text-14 d-flex items-center"
                style={{ gap: "16px" }}
              >
                {item.role == "ADM" ? "ADMIN" : "OPERATOR"}
              </div>
            </TableCell>
            <TableCell className="text-14 text-black" colSpan={4}>
              {formatTanggal(item?.created_at)}
            </TableCell>
            <TableCell className="" align="center" colSpan={1}>
              <MenuComponent
                editPath={`admin/edit/${item.id}`}
                deletePath={() => handleDelete(item.id)}
              />
            </TableCell>
          </TableRow>
        ))
    ) : (
      <TableRow hover>
        <TableCell
          className="font-medium text-12 line-height-28 text-body"
          colSpan={16}
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

  const { admin } = useSelector((state) => state.crudAdmin);

  console.log(admin);

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
          <h1 className="text-black fw-600 text-25 my-auto">Admin</h1>
        </Grid>
        <Grid item xs={12} sm className="d-flex mr-8 justify-end">
          <Link to="/admin/add">
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
            placeholder="Cari Nama Admin"
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
                backgroundColor: "#FFFFFF",
              },
            }}
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              handleChangePage(e, 0);
            }}
            onKeyDown={(e) => {
              if (e.keyCode == 13) {
                getData();
              }
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
                  Nama Admin
                </TableCell>
                <TableCell
                  colSpan={5}
                  className="font-medium text-15 text-black"
                >
                  Email
                </TableCell>
                <TableCell
                  colSpan={4}
                  className="font-medium text-15 text-black"
                >
                  Role
                </TableCell>
                <TableCell
                  colSpan={4}
                  className="font-medium text-15 text-black"
                >
                  Dibuat Tanggal
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
                data={admin}
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
            count={admin?.length ? admin?.length : 0}
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

export default Admin;
