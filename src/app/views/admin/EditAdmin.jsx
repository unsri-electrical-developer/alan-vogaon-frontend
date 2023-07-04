import {
  Card,
  Grid,
  TextField,
  InputAdornment,
  IconButton,
} from "@material-ui/core";
import React, { useLayoutEffect, useState } from "react";
import "../../../styles/css/DetailUser.css";

import Swal from "sweetalert2";
import { useHistory, useParams } from "react-router-dom";
import GeneralButton from "../../components/buttons/GeneralButton.jsx";
import UploadImageWithButton from "../../components/inputs/UploadImageWithButton";

import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import {
  getDetailCrudAdmin,
  updateCrudAdmin,
} from "../../redux/actions/CrudAdminActions";

const EditAdmin = () => {
  const { id } = useParams();
  const history = useHistory();

  const [state, setState] = useState({
    name: "",
    email: "",
    password: "",
    konfirmasi_password: "",
    showPassword: false,
    img: "",
  });

  useLayoutEffect(() => {
    getDetailCrudAdmin(id).then((res) => {
      const data = res.data.data;
      console.log(data);

      setState((prev) => ({
        ...prev,
        name: data.name,
        email: data.email,
        img: data.admin_profile_pic,
      }));
    });
  }, []);

  const handleChange = (e) => {
    e.persist();
    setState((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = () => {
    try {
      if (!state.name || !state.email) {
        throw new Error("Lengkapi semua inputan !");
      }

      if (state.password !== state.konfirmasi_password) {
        throw new Error("Password dan konfirmasi password tidak sama");
      }

      const data = {
        id,
        name: state.name,
        email: state.email,
        password: state.password,
        img: state.img,
      };

      if (state.password == "") {
        delete data.password;
      }

      updateCrudAdmin(data)
        .then((res) => {
          Swal.fire("Success!", "Data berhasil disimpan", "success");
          history.push("/admin");
        })
        .catch((err) => {
          console.log(err);
          Swal.fire("Error!", "Data gagal disimpan !", "error");
        });
    } catch (e) {
      Swal.fire("Oopss!", e.message, "error");
    }
  };

  const handleChangePhoto = (img, path, id) => {
    setState((prev) => ({
      ...prev,
      img,
      path,
    }));
  };

  return (
    <div className="analytics m-sm-30 mt-7 text-black">
      <div className="d-flex justify-content-between">
        <h1 className="fw-600 m-0">Edit Admin</h1>
        <GeneralButton variant="contained" name="Save" data={handleSubmit} />
      </div>
      <Card className="mt-5 py-10 px-10">
        <div className="mt-5 mb-8">
          <Grid container className="mt-2" spacing={2}>
            <Grid item xs={12} sm={6}>
              <h1
                className="mb-5 font-semimedium text-14"
                style={{ color: "#0a0a0a" }}
              >
                Nama
              </h1>
              <TextField
                required={true}
                size="small"
                value={state.name}
                name="name"
                className={`w-full`}
                InputProps={{
                  style: {
                    borderRadius: 5,
                    minHeight: 46,
                  },
                }}
                placeholder="Nama"
                variant="outlined"
                onChange={handleChange}
                type="text"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <h1
                className="mb-5 font-semimedium text-14"
                style={{ color: "#0a0a0a" }}
              >
                Email
              </h1>
              <TextField
                required={true}
                size="small"
                value={state.email}
                name="email"
                className={`w-full`}
                InputProps={{
                  style: {
                    borderRadius: 5,
                    minHeight: 46,
                  },
                }}
                placeholder="Email"
                variant="outlined"
                onChange={handleChange}
                type="text"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <h1
                className="mb-5 font-semimedium text-14"
                style={{ color: "#0a0a0a" }}
              >
                Password
              </h1>
              <TextField
                required={true}
                size="small"
                value={state.password}
                name="password"
                className={`w-full`}
                InputProps={{
                  style: {
                    borderRadius: 5,
                    minHeight: 46,
                  },
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() =>
                          setState({
                            ...state,
                            showPassword: !state.showPassword,
                          })
                        }
                        edge="end"
                      >
                        {state.showPassword ? (
                          <VisibilityOffIcon />
                        ) : (
                          <VisibilityIcon />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                placeholder="Password"
                variant="outlined"
                onChange={handleChange}
                type={state.showPassword ? "text" : "password"}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <h1
                className="mb-5 font-semimedium text-14"
                style={{ color: "#0a0a0a" }}
              >
                Konfirmasi Password
              </h1>
              <TextField
                required={true}
                size="small"
                value={state.konfirmasi_password}
                name="konfirmasi_password"
                className={`w-full`}
                InputProps={{
                  style: {
                    borderRadius: 5,
                    minHeight: 46,
                  },
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() =>
                          setState({
                            ...state,
                            showPassword: !state.showPassword,
                          })
                        }
                        edge="end"
                      >
                        {state.showPassword ? (
                          <VisibilityOffIcon />
                        ) : (
                          <VisibilityIcon />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                placeholder="Konfirmasi Password"
                variant="outlined"
                onChange={handleChange}
                type={state.showPassword ? "text" : "password"}
              />
            </Grid>
          </Grid>
        </div>
      </Card>
    </div>
  );
};

export default EditAdmin;