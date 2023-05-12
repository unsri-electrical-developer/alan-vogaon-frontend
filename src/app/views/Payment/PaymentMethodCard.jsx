import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Card, Dialog, Grid, Icon, Switch } from '@material-ui/core';
import { useDispatch } from 'react-redux';

import MoreVertIcon from '@material-ui/icons/MoreVert';
import UploadImageWithButton from '../../components/inputs/UploadImageWithButton';

const PaymentMethodCard = ({ isThereContent, preview = '' }) => {
  const dispatch = useDispatch();

  const AntSwitch = withStyles((theme) => ({
    root: {
      width: 45,
      height: 25,
      padding: 0,
      display: 'flex',
    },
    switchBase: {
      padding: 2,
      color: theme.palette.grey[500],
      '&$checked': {
        transform: 'translateX(21px)',
        color: theme.palette.common.white,
        '& + $track': {
          opacity: 1,
          backgroundColor: theme.palette.primary.main,
          borderColor: theme.palette.primary.main,
        },
      },
    },
    thumb: {
      width: 20,
      height: 20,
      boxShadow: 'none',
    },
    track: {
      border: `1px solid ${theme.palette.grey[500]}`,
      borderRadius: 30 / 2,
      opacity: 1,
      backgroundColor: theme.palette.common.white,
    },
    checked: {},
  }))(Switch);

  const [contentDialog, setContentDialog] = React.useState(false);
  const [noContentDialog, setNoContentDialog] = React.useState(false);
  const openContent = () => {
    console.log('buka ajgg');
    setContentDialog(true);
  };
  const openNoContent = () => {
    console.log('buka ajg');
    setNoContentDialog(true);
  };

  const [dialog, setDialog] = React.useState({
    content: false,
    noContent: true,
  });

  const [state, setState] = React.useState({
    checked: false,
    file: preview,
    path: '',
  });

  const getData = () => {
    console.log('get data');
  };

  React.useLayoutEffect(() => {
    getData();
  }, []);

  const handleChangePhoto = (file, path, id) => {
    console.log(id);
    setState((prev) => ({
      ...prev,
      file,
      path,
    }));
  };

  return isThereContent ? (
    <Card className="h-150 bg-blue-gray border-radius-5 border-blue-1">
      <Grid
        container
        spacing={3}
        className="d-flex justify-center items-center"
      >
        <Grid
          item
          xs={6}
          className="text-22 fw-500 d-flex text-black justify-center items-center"
        >
          BCA
        </Grid>
        <Grid item xs={6} className="d-flex justify-center items-center">
          <div className="h-full w-full position-absolute">
            <img
              src={state.file}
              alt="preview foto"
              className="preview h-full w-full"
            />
          </div>
        </Grid>
        <Grid item xs={6} className="d-flex justify-center items-center">
          <AntSwitch
            checked={state.checked}
            onChange={(e) => {
              console.log(contentDialog);
              console.log(noContentDialog);
              setState((prev) => ({
                ...prev,
                checked: e.target.checked,
              }));
            }}
            name="checked"
          />
        </Grid>
        <Grid item xs={6} className="d-flex justify-center items-center">
          <button
            className="m-0 p-0 border-none bg-transparent"
            onClick={openContent}
          >
            <MoreVertIcon
              className="fw-700 bg-white text-black"
              fontSize="large"
            />
          </button>
        </Grid>
      </Grid>
      <Dialog
        aria-labelledby="max-width-dialog-title"
        maxWidth="md"
        open={contentDialog}
        onClose={() => setContentDialog(false)}
      >
        <Card className="">THERE CONTENT</Card>
      </Dialog>
    </Card>
  ) : (
    <Card className="h-150 bg-blue-gray border-radius-5 border-blue-1 d-flex justify-center items-center">
      <button
        className="border-none border-radius-circle bg-primary w-45 h-45 d-flex justify-center items-center"
        onClick={openNoContent}
        onDoubleClick={() =>
          /* setNoContentDialog(true) */ console.log('buka anjinggg')
        }
      >
        <Icon className="text-white fw-700" fontSize="large">
          add-icon
        </Icon>
      </button>
      <Dialog
        aria-labelledby="max-width-dialog-title"
        maxWidth="md"
        open={noContentDialog}
        onClose={() => setNoContentDialog(false)}
      >
        <Card className="p-20">
          <Grid container spacing={2}>
            <Grid item xs={12} className="text-20 fw-500">
              Add Payment Method
            </Grid>
            <Grid item xs={6}>
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
          <Grid container spacing={2}>
            <Grid item xs={12} className="text-20 fw-500">
              Add Payment Method
            </Grid>
            <Grid item xs={6}>
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
        </Card>
      </Dialog>
    </Card>
  );
};

export default PaymentMethodCard;
