import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import {
  Card,
  Dialog,
  Grid,
  Icon,
  Switch,
  Button,
  TextField,
} from '@material-ui/core';
import { useDispatch } from 'react-redux';

import MoreVertIcon from '@material-ui/icons/MoreVert';
import UploadImageWithButton from '../../components/inputs/UploadImageWithButton';

const PaymentMethodCard = ({ isThereContent, data = {}, getData }) => {
  const dispatch = useDispatch();
  const useStyles = makeStyles({
    dialog: {
      // height: 'fit-content',
      scrollbarColor: 'transparent',
      scrollbarWidth: '0px',
      minWidth: '650px',
      maxWidth: '1100px,',
      // overflow: 'hidden',
    },
    backDrop: {
      backgroundColor: 'rgba(0, 0, 0, 0.2)',
    },
  });
  const classes = useStyles();
  const AntSwitch = withStyles((theme) => ({
    root: {
      width: 30,
      height: 17,
      padding: 0,
      display: 'flex',
    },
    switchBase: {
      padding: 2,
      color: theme.palette.grey[500],
      '&$checked': {
        transform: 'translateX(21.5px)',
        color: theme.palette.common.white,
        '& + $track': {
          opacity: 1,
          backgroundColor: theme.palette.primary.main,
          borderColor: theme.palette.primary.main,
        },
      },
    },
    thumb: {
      width: 15,
      height: 15,
      boxShadow: 'none',
    },
    track: {
      border: `1px solid ${theme.palette.grey[500]}`,
      borderRadius: 16 / 2,
      opacity: 1,
      backgroundColor: theme.palette.common.white,
    },
    checked: {},
  }))(Switch);

  const [state, setState] = React.useState({
    checked: data.isActive,
    file: data.pm_logo,
    path: '',
    content: false,
    noContent: false,
  });

  const handleChangePhoto = (file, path, id) => {
    console.log(id);
    setState((prev) => ({
      ...prev,
      file,
      path,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // const data = new FormData(e.currentTarget);
    var data = e.target;
    console.log(data);

    var data = new FormData(e.currentTarget);
    console.log(data);

    let object = {};

    for (let [key, value] of data.entries()) {
      object = {
        ...object,
        [key]: value,
      };
    }

    console.log(object);

    var data = new FormData(e.target);
    console.log(data);
  };

  return isThereContent ? (
    <>
      <Card className="p-5 shadow-none h-130 bg-blue-gray border-radius-5 d-flex justify-center items-center">
        <Grid
          container
          spacing={2}
          className="d-flex justify-between items-between"
        >
          <Grid
            item
            xs={6}
            className="text-18 fw-500 d-flex text-black justify-start items-center"
          >
            {data.pm_title}
          </Grid>
          <Grid item xs={6} className="d-flex justify-end items-center">
            <div className="m-0 p-0 w-full">
              <img
                src={state.file}
                alt="preview foto"
                className="preview w-full h-40"
                style={{
                  objectFit: 'cover',
                  objectPosition: 'center',
                }}
              />
            </div>
          </Grid>
          <Grid item xs={6} className="d-flex justify-start items-center">
            <AntSwitch
              checked={state.checked}
              onChange={(e) => {
                console.log(state);
                setState((prev) => ({
                  ...prev,
                  checked: e.target.checked,
                }));
              }}
              name="checked"
            />
          </Grid>
          <Grid item xs={6} className="d-flex justify-end items-center">
            <Button
              className="m-0 p-0 border-none bg-transparent d-flex justify-end items-center"
              onClick={() =>
                setState((prev) => ({
                  ...prev,
                  content: true,
                }))
              }
            >
              <MoreVertIcon
                className="fw-700 bg-white text-black"
                fontSize="large"
              />
            </Button>
          </Grid>
        </Grid>
      </Card>
      <Dialog
        classes={{
          paper: classes.dialog,
        }}
        BackdropProps={{
          classes: {
            root: classes.backDrop,
          },
        }}
        open={state.content}
        onClose={() =>
          setState((prev) => ({
            ...prev,
            content: false,
          }))
        }
      >
        <Card className="p-5">
          <form onSubmit={handleSubmit}>
            <Grid container spacing={4}>
              <Grid item xs={12} className="text-17 text-black fw-600">
                Edit Payment Method
              </Grid>
              <Grid item xs={12} md={6}>
                <h1 className="mb-5 fw-500 text-13 text-black">Unggah Logo</h1>
                <UploadImageWithButton
                  minHeight="14.5rem"
                  maxHeight="15rem"
                  uploadFoto={handleChangePhoto}
                  preview={state.preview}
                  formatIcon={false}
                  state={{ index: 5, id: 5 }}
                  handleDelete={console.log}
                  getData={getData}
                />
              </Grid>
            </Grid>
            <Grid container spacing={4}>
              <Grid item xs={12} md={6}>
                <h1 className="mb-5 fw-500 text-13 text-black">Nama Metode</h1>
                <TextField
                  required={true}
                  size="small"
                  name="pm_title"
                  className={`border-radius-4 w-full`}
                  placeholder="Nama Metode"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <h1 className="mb-5 fw-500 text-13 text-black">
                  Payment Gateway
                </h1>
                <TextField
                  required={true}
                  size="small"
                  name="from"
                  className={`border-radius-4 w-full`}
                  placeholder="Payment Gateway"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <h1 className="mb-5 fw-500 text-13 text-black">
                  Kode Metode Pembayaran
                </h1>
                <TextField
                  required={true}
                  size="small"
                  name="pm_code"
                  className={`border-radius-4 w-full`}
                  placeholder="Kode Metode Pembayaran"
                  variant="outlined"
                />
              </Grid>
            </Grid>
            <div className="d-flex items-center justify-end gap-11 mt-20">
              <Button
                variant="outlined"
                color="primary"
                className="w-140 py-2 px-30 text-14 border-radius-4 text-center fw-500"
                onClick={() => {
                  setState((prev) => ({
                    ...prev,
                    content: false,
                  }));
                }}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                color="primary"
                className="w-140 border-radius-4 py-2 px-30 text-14 text-center fw-500 text-white"
                type="submit"
              >
                Save
              </Button>
            </div>
          </form>
        </Card>
      </Dialog>
    </>
  ) : (
    <Card className="h-130 bg-blue-gray border-radius-5 border-blue-1 d-flex justify-center items-center">
      <Button
        onClick={() =>
          setState((prev) => ({
            ...prev,
            noContent: true,
          }))
        }
      >
        <div className="d-flex justify-center items-center border-radius-circle bg-primary h-45 w-45 btn-hover-circle">
          <Icon className="text-white fw-700" fontSize="large">
            add-icon
          </Icon>
        </div>
      </Button>
      <Dialog
        classes={{
          paper: classes.dialog,
        }}
        BackdropProps={{
          classes: {
            root: classes.backDrop,
          },
        }}
        maxWidth="md"
        open={state.noContent}
        onClose={() =>
          setState((prev) => ({
            ...prev,
            noContent: false,
          }))
        }
      >
        <Card className="p-10">
          <form onSubmit={handleSubmit}>
            <Grid container spacing={4} className="mb-10">
              <Grid item xs={12} className="text-20 fw-600">
                Add Payment Method
              </Grid>
              <Grid item xs={6}>
                <h1 className="mb-5 fw-500 text-13 text-black">Unggah Logo</h1>
                <UploadImageWithButton
                  uploadFoto={handleChangePhoto}
                  preview={state.preview}
                  formatIcon={false}
                  state={{ index: 5, id: 5 }}
                  handleDelete={console.log}
                  getData={getData}
                />
              </Grid>
            </Grid>
            <Grid container spacing={4}>
              <Grid item xs={12} md={6}>
                <h1 className="mb-5 fw-500 text-13 text-black">Nama Metode</h1>
                <TextField
                  required={true}
                  size="small"
                  name="pm_title"
                  className={`border-radius-4 w-full`}
                  placeholder="Nama Metode"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <h1 className="mb-5 fw-500 text-13 text-black">
                  Payment Gateway
                </h1>
                <TextField
                  required={true}
                  size="small"
                  name="from"
                  className={`border-radius-4 w-full`}
                  placeholder="Payment Gateway"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <h1 className="mb-5 fw-500 text-13 text-black">
                  Kode Metode Pembayaran
                </h1>
                <TextField
                  required={true}
                  size="small"
                  name="pm_code"
                  className={`border-radius-4 w-full`}
                  placeholder="Kode Metode Pembayaran"
                  variant="outlined"
                />
              </Grid>
            </Grid>
            <div className="d-flex items-center justify-start gap-11 mt-20">
              <Button
                variant="outlined"
                color="primary"
                className="w-140 py-3 px-30 text-18 border-radius-4 text-center fw-500"
                onClick={() => {
                  setState((prev) => ({
                    ...prev,
                    noContent: false,
                  }));
                }}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                color="primary"
                className="w-140 border-radius-4 py-3 px-30 text-18 text-center fw-500 text-white"
                type="submit"
              >
                Save
              </Button>
            </div>
          </form>
        </Card>
      </Dialog>
    </Card>
  );
};

export default PaymentMethodCard;
