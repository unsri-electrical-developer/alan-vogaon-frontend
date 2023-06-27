import {
  Button,
  Card,
  CircularProgress,
  Grid,
  InputAdornment,
  IconButton,
  InputLabel,
  TextField,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import { useHistory } from "react-router-dom";
import Swal from "sweetalert2";
import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import { UploadImage } from "../../components";
import { updAdmin2 } from "../../redux/actions/AdminActions";
import { getProfile } from "../../redux/actions/UserActions";
import { useSelector } from "react-redux";
const EditProfile = () => {
  const history = useHistory();
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    users_code: "",
    profile_pict_ori: "",
    profile_pict: "",
    profile_pict_preview: "",
    peran: "",
  });
  const [submit, setSubmit] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
 const { name, admin_profile_pic, users_type, } = useSelector(
    ({ user }) => user
  );

  

  const getData = () => {
    getProfile()
      .then(({ data }) => {
        setUser((pref) => ({
          ...pref,
          name: data?.data?.name,
            email:data?.data?.email,
                      profile_pict: data?.data?.admin_profile_pic,
          profile_pict_preview: data?.data?.admin_profile_pic,
          profile_pict_ori: data?.data?.admin_profile_pic || "default.png",
          users_code: data?.data?.users_code,
        }));
      })
      .catch((err) => {
        showAlert("Gagal mengambil data profile", false);
        setSubmit(true);
      });

      setUser((pref) => ({
          ...pref,
          peran: users_type,
        }));
  };

  useEffect(() => {
    getData();
  }, []);

  const handleChangeProfile = (file, path) => {
    setUser((pref) => ({
      ...pref,
      profile_pict: file,
      profile_pict_preview: path,
    }));
  };

  const handleChange = ({ target: { name, value } }) => {
    setUser((pref) => ({
      ...pref,
      [name]: value,
    }));
  };

  const handleFormSubmit = () => {
    setSubmit(true);
    updAdmin2(user)
      .then(() => {
        setSubmit(false);
        showAlert("Profile berhasil diubah", 1);
      })
      .catch((err) => {
        let error = err?.response?.data;
        setSubmit(false);
        showAlert(
          Array.isArray(error?.data)
            ? error?.data[0]
            : "Gagal menyimpan perubahan, coba beberapa saat lagi",
          false
        );
      });
  };

  const showAlert = (text, success) => {
    Swal.fire({
      title: success ? "Berhasil" : "Oopss!",
      text: text,
      imageUrl: `/assets/images/icons/${
        success ? "ic_success" : "ic_error"
      }.svg`,
      imageWidth: 92,
      imageHeight: 92,
      confirmButtonText: "Ok",
      confirmButtonColor: "#0083E2",
    }).then((res) => {
      if (res.isConfirmed && success) {
        history.push("/profile");
      }
    });
  };

  useEffect(() => {
    ValidatorForm.addValidationRule("isPasswordCorrect", (value) => {
      if (value.length > 0 && value.length < 8) {
        return false;
      }
      return true;
    });
  }, []);

  return (
    <div className="m-sm-30">
      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={11} md={12}>
          <h4 className="fw-bold">Edit Profile</h4>
        </Grid>
        <Grid item xs={11} md={12}>
          <Card elevation={0} className="py-5 px-6 border-radius-0 ">
            <ValidatorForm onSubmit={handleFormSubmit} className="w-full">
              <Grid container spacing={4}>
                <Grid item xs={12} md={6}>
                  <UploadImage
                    uploadFoto={handleChangeProfile}
                    label="Foto Profile"
                    preview={user?.profile_pict_preview}
                    avatar
                    aspectRatio={1 / 1}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Grid container spacing={4}>
                    <Grid item xs={12} md={6}>
                      <InputLabel htmlFor="fullname" className="mb-4">
                        Nama Lengkap <span className="text-danger">*</span>
                      </InputLabel>
                      <TextValidator
                        id="fullname"
                        placeholder="Nama Lengkap"
                        className="w-full"
                        variant="outlined"
                        onChange={handleChange}
                        type="text"
                        name="name"
                        value={user.name || ""}
                        validators={["required"]}
                        errorMessages={["Masukkan nama anda terlebih dahulu"]}
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <InputLabel htmlFor="Peran" className="mb-4">
                        Peran <span className="text-danger">*</span>
                      </InputLabel>
                      <TextValidator
                        id="Peran"
                        placeholder="admin "
                        className="w-full"
                        variant="outlined"
                        onChange={handleChange}
                        type="text"
                        name="peran"
                        value={user.peran || ""}
                        validators={["required"]}
                        errorMessages={["Masukkan peran anda terlebih dahulu"]}
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <InputLabel htmlFor="email" className="mb-4">
                        Email <span className="text-danger">*</span>
                      </InputLabel>
                      <TextValidator
                        id="email"
                        placeholder="Email"
                        className="w-full"
                        variant="outlined"
                        onChange={handleChange}
                        type="email"
                        name="email"
                        value={user.email || ""}
                        validators={["required", "isEmail"]}
                        errorMessages={[
                          "Masukkan email anda terlebih dahulu",
                          "email tidak valid",
                        ]}
                        disabled
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <InputLabel htmlFor="password" className="mb-4">
                        Password
                      </InputLabel>
                      <TextField
                        id="password"
                        placeholder="Password"
                        className="w-full"
                        variant="outlined"
                        onChange={handleChange}
                        type={showPassword ? "text" : "password"}
                        name="password"
                        value={user.password || ""}
                        // errorMessages={["Minimal panjang password 8 karakter"]}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                aria-label="toggle password visibility"
                                onClick={() => setShowPassword(!showPassword)}
                                edge="end"
                              >
                                {showPassword ? (
                                  <VisibilityOffIcon />
                                ) : (
                                  <VisibilityIcon />
                                )}
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12} className="justify-end flex">
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    className="text-white px-8"
                    disabled={submit}
                    disableElevation
                  >
                    {submit ? (
                      <CircularProgress color="primary" size={25} />
                    ) : (
                      "Save"
                    )}
                  </Button>
                </Grid>
              </Grid>
            </ValidatorForm>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default EditProfile;
