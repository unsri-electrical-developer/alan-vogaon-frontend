import {
  Button,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  MenuItem,
  Select,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import {
  ValidatorForm,
} from "react-material-ui-form-validator";
import Swal from "sweetalert2";
import { changeUserLevel } from "../../redux/actions/UserActions";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";

const ModalEditLevelUser = ({ handleClose, open, data }) => {
  const [submit, setSubmit] = useState(false);
  const [params, setParams] = useState({
    memberType: "",
  });
  const handleChange = ({ target: { value, name } }) => {
    setParams((pref) => ({
      ...pref,
      memberType: value,
    }));
  };
  const handleFormSubmit = () => {
    setSubmit(true);
    const newParams = {
      memberType: params.memberType,
      users_code: data.users_code,
    };
    changeUserLevel(newParams)
      .then(() => {
        setSubmit(false);
        showAlert("Level berhasil diubah", true);
      })
      .catch((err) => {
        let error = err?.response?.data;
        showAlert(
          Array.isArray(error?.data)
            ? error?.data[0]
            : "Level gagal diubah, coba beberapa saat lagi",
          false
        );
        setSubmit(false);
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
        handleClose();
      }
    });
  };
  useEffect(() => {
    if (data) {
      setParams((pref) => ({
        ...pref,
        idx: data?.idx,
        ukuran: data?.ukuran,
        name: data?.name,
        memberType: data?.memberType,
      }));
    }
  }, [data]);

  return (
    <Dialog onClose={handleClose} open={open} maxWidth="sm" fullWidth>
      <DialogTitle>Ganti Level User</DialogTitle>
      <DialogContent className="pb-6">
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12}>
            <ValidatorForm onSubmit={handleFormSubmit} className="w-full">
              <Grid container spacing={2} justifyContent="flex-end">
                <Grid item xs={12}>
                  <Select
                    IconComponent={() => (
                      <KeyboardArrowDownIcon
                        size="medium"
                        style={{ fontWeight: 700 }}
                      />
                    )}
                    onChange={handleChange}
                    value={params.memberType}
                    InputProps={{
                      style: {
                        borderRadius: 5,
                      },
                    }}
                    size={"md"}
                    className="bg-white w-full"
                    variant="outlined"
                  >
                    <MenuItem key={1} value={1} text={"Member"}>
                      Member
                    </MenuItem>
                    <MenuItem key={2} value={2} text={"Reseller"}>
                      Reseller
                    </MenuItem>
                  </Select>
                </Grid>
                <Grid item xs={12} className="mt-4">
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    className="text-white w-full radius-6 text-capitalize py-2"
                    disableElevation
                    disabled={submit}
                  >
                    {submit ? (
                      <CircularProgress color="secondary" size={25} />
                    ) : (
                      "Ganti Level"
                    )}
                  </Button>
                </Grid>
              </Grid>
            </ValidatorForm>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};

export default ModalEditLevelUser;
