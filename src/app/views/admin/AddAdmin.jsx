import {
  Card,
  Grid,
  TextField,
  InputAdornment,
  IconButton,
} from "@material-ui/core";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import "../../../styles/css/DetailUser.css";

import Swal from "sweetalert2";
import { useHistory } from "react-router-dom";
import GeneralButton from "../../components/buttons/GeneralButton.jsx";
import UploadImageWithButton from "../../components/inputs/UploadImageWithButton";

import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import { addCrudAdmin } from "../../redux/actions/CrudAdminActions";

const AddAdmin = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [state, setState] = useState({
    name: "",
    email: "",
    password: "",
    konfirmasi_password: "",
    showPassword: false,
    img: "",
  });

  const handleChange = (e) => {
    e.persist();
    setState((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = () => {
    try {
      if (
        !state.name ||
        !state.email ||
        !state.password ||
        !state.img ||
        !state.konfirmasi_password
      ) {
        throw new Error("Lengkapi semua inputan !");
      }

      if (state.password !== state.konfirmasi_password) {
        throw new Error("Password dan konfirmasi password tidak sama");
      }

      const data = {
        name: state.name,
        email: state.email,
        password: state.password,
        img: state.img,
      };

      addCrudAdmin(data)
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
        <h1 className="fw-600 m-0">Add Admin</h1>
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
                Foto Profil
              </h1>
              <UploadImageWithButton
                uploadFoto={handleChangePhoto}
                preview={state.img}
                formatIcon={false}
                state={{ index: 5, id: 5 }}
                autoCall={false}
                handleDelete={() => {
                  setState((prev) => ({
                    ...prev,
                    img: "",
                  }));
                }}
              />
            </Grid>
            <Grid item xs={6}></Grid>
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
          </Grid>
        </div>
      </Card>
    </div>
  );
};

export default AddAdmin;
