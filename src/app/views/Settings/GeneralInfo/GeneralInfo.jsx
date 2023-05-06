import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, TextField, Grid, Card } from '@material-ui/core';
import Swal from 'sweetalert2';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import RichTextEditor from '../../../../matx/components/RichTextEditor';

const GeneralInfo = () => {
  const dispatch = useDispatch();

  const [state, setState] = useState({
    jenis_bonus: '',
    content: '',
  });

  const handleContentChange = (e) => {
    setState((prev) => ({
      ...prev,
      content: e.target.value,
    }));
  };

  const handleChange = (e) => {
    e.persist();
    setState((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const history = useHistory();

  const handleSubmit = () => {
    try {
      //   dispatch(
      //     addJenisBonus({
      //       jenis: state.jenis_bonus,
      //     })
      //   );
      setTimeout(() => {
        history.push('/lainnya/bonus');
        Swal.fire('Success!', 'Data Jenis Bonus berhasil disimpan', 'success');
      }, 2000);
    } catch (e) {
      Swal.fire('Oopss!', 'Data Jenis Bonus gagal disimpan', 'error');
    }
  };

  const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      alignItems: 'center',
      width: '100%',
      flexWrap: 'wrap',
      '& > *': {
        margin: theme.spacing(0.5),
      },
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        border: '1px solid #e6e9ed',
      },
    },
    input: {
      transform: 'scaleY(0.88)',
      marginBlock: 'auto',
    },
  }));
  const classes = useStyles();
  return (
    <div className="m-sm-30">
      <Grid
        container
        spacing={3}
        className="my-8 mx-auto px-2"
        justifyContent="space-between"
        alignItems="center"
      >
        <Grid item xs={12} sm>
          <h1 className="fw-600 text-25 text-black">General Information</h1>
        </Grid>
        <Grid item xs={12} sm className="d-flex mr-4 justify-end">
          <Button
            variant="contained"
            color="primary"
            className="px-15 py-3 text-white fw-500 border-radius-4"
            onClick={handleSubmit}
          >
            <span className="">Save</span>
          </Button>
        </Grid>
      </Grid>
      <div className="my-8">
        <Card className="py-8 bg-white">
          <div className="mx-8 px-10 mb-8 bg-white">
            <Grid
              container
              spacing={5}
              justifyContent="center"
              alignItems="center"
            >
              <Grid item xs={12} sm={12}>
                <h3 className="mb-5 fw-500 text-15 text-black">
                  Tentang Vogaon
                </h3>
                <RichTextEditor
                  content=""
                  placeholder=""
                  handleContentChange={handleContentChange}
                />
              </Grid>
            </Grid>
          </div>
        </Card>
      </div>
      <div className="my-8">
        <Card className="py-8 bg-white">
          <div className="mx-8 px-10 mb-8 bg-white">
            <Grid
              container
              spacing={5}
              justifyContent="center"
              alignItems="center"
            >
              <Grid item xs={12} sm={12}>
                <h3 className="mb-1 fw-500 text-20 text-black">Contact</h3>
              </Grid>
              <Grid item xs={12} sm={6}>
                <h3 className="mb-5 fw-500 text-15 text-black">Whatsapp</h3>
                <TextField
                  required={true}
                  size="small"
                  style={{
                    transform: 'scaleY(1.25)',
                  }}
                  inputProps={{
                    className: classes.input,
                  }}
                  value={state.jenis_bonus}
                  name="jenis_bonus"
                  className={`${classes.outlined} border-radius-4 w-full`}
                  placeholder="Whatsapp"
                  variant="outlined"
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <h3 className="mb-5 fw-500 text-15 text-black">Telegram</h3>
                <TextField
                  required={true}
                  size="small"
                  style={{
                    transform: 'scaleY(1.25)',
                  }}
                  inputProps={{
                    className: classes.input,
                  }}
                  value={state.jenis_bonus}
                  name="jenis_bonus"
                  className={`${classes.outlined} border-radius-4 w-full`}
                  placeholder="Telegram"
                  variant="outlined"
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <h3 className="mb-5 fw-500 text-15 text-black">Email</h3>
                <TextField
                  required={true}
                  size="small"
                  style={{
                    transform: 'scaleY(1.25)',
                  }}
                  inputProps={{
                    className: classes.input,
                  }}
                  value={state.jenis_bonus}
                  name="jenis_bonus"
                  className={`${classes.outlined} border-radius-4 w-full`}
                  placeholder="Email"
                  variant="outlined"
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <h3 className="mb-5 fw-500 text-15 text-black">Telepon</h3>
                <TextField
                  required={true}
                  size="small"
                  style={{
                    transform: 'scaleY(1.25)',
                  }}
                  inputProps={{
                    className: classes.input,
                  }}
                  value={state.jenis_bonus}
                  name="jenis_bonus"
                  className={`${classes.outlined} border-radius-4 w-full`}
                  placeholder="Telepon"
                  variant="outlined"
                  onChange={handleChange}
                />
              </Grid>
            </Grid>
          </div>
        </Card>
      </div>
      <div className="my-8">
        <Card className="py-8 bg-white">
          <div className="mx-8 px-10 mb-8 bg-white">
            <Grid container spacing={5} alignItems="center">
              <Grid item xs={12} sm={12}>
                <h3 className="mb-1 fw-500 text-20 text-black">Social Media</h3>
              </Grid>
              <Grid item xs={12} sm={6}>
                <h3 className="mb-5 fw-500 text-15 text-black">Instagram</h3>
                <TextField
                  required={true}
                  size="small"
                  style={{
                    transform: 'scaleY(1.25)',
                  }}
                  inputProps={{
                    className: classes.input,
                  }}
                  value={state.jenis_bonus}
                  name="jenis_bonus"
                  className={`${classes.outlined} border-radius-4 w-full`}
                  placeholder="Instagram"
                  variant="outlined"
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <h3 className="mb-5 fw-500 text-15 text-black">Facebook</h3>
                <TextField
                  required={true}
                  size="small"
                  style={{
                    transform: 'scaleY(1.25)',
                  }}
                  inputProps={{
                    className: classes.input,
                  }}
                  value={state.jenis_bonus}
                  name="jenis_bonus"
                  className={`${classes.outlined} border-radius-4 w-full`}
                  placeholder="Facebook"
                  variant="outlined"
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <h3 className="mb-5 fw-500 text-15 text-black">TikTok</h3>
                <TextField
                  required={true}
                  size="small"
                  style={{
                    transform: 'scaleY(1.25)',
                  }}
                  inputProps={{
                    className: classes.input,
                  }}
                  value={state.jenis_bonus}
                  name="jenis_bonus"
                  className={`${classes.outlined} border-radius-4 w-full`}
                  placeholder="TikTok"
                  variant="outlined"
                  onChange={handleChange}
                />
              </Grid>
            </Grid>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default GeneralInfo;
