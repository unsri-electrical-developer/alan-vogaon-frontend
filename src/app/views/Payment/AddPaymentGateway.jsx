import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, TextField, Grid, Card } from '@material-ui/core';
import Swal from 'sweetalert2';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

const AddPaymentGateway = () => {
  const dispatch = useDispatch();

  const [state, setState] = useState({
    jenis_bonus: '',
    scaleY: '0.85',
  });

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
          <h1 className="font-semibold text-25" style={{ color: '#0A0A0A' }}>
            Add Payment Gateway
          </h1>
        </Grid>
        <Grid
          item
          xs={12}
          sm
          className="d-flex mr-4"
          style={{ justifyContent: 'flex-end' }}
        >
          <Button
            variant="contained"
            color="primary"
            className="px-15 py-3"
            onClick={handleSubmit}
          >
            <span className="">Simpan</span>
          </Button>
        </Grid>
      </Grid>
      <div className="my-8">
        <Card className="py-15">
          <div className="mx-8 px-10 mt-5 mb-8">
            <Grid
              container
              spacing={3}
              alignItems="center"
              justifyContent="space-between"
              className="mb-8"
            >
              <Grid
                container
                className="mt-2"
                spacing={5}
                justifyContent="center"
                alignItems="center"
              >
                <Grid item xs={12} sm>
                  <h1 className="mb-5 font-semimedium text-14 text-black">
                    Payment Gateway
                  </h1>
                  <TextField
                    required={true}
                    size="small"
                    inputProps={{
                      className: classes.input,
                    }}
                    style={{
                      transform: 'scaleY(1.25)',
                    }}
                    value={state.jenis_bonus}
                    name="jenis_bonus"
                    className={`${classes.outlined} border-radius-5 w-full`}
                    placeholder="Payment Gateway"
                    variant="outlined"
                    onChange={handleChange}
                  />
                </Grid>
              </Grid>
            </Grid>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default AddPaymentGateway;
