import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, TextField, Grid, Card, Icon } from '@material-ui/core';
import Swal from 'sweetalert2';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import FaqDummyData from './FaqDummyData';

const Faq = () => {
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
          <h1 className="fw-600 text-25 text-black">FAQ</h1>
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
        <Card className="py-15">
          <div className="mx-8 px-4 mt-5 mb-8">
            {FaqDummyData.length > 0 &&
              FaqDummyData.map((data) => {
                return (
                  <Grid
                    container
                    className="mt-2"
                    spacing={5}
                    justifyContent="center"
                    alignItems="center"
                    key={data.id}
                  >
                    <Grid item xs={12} sm={5}>
                      <h1 className="mb-5 fw-500 text-15 text-black">
                        Pertanyaan
                      </h1>
                      <TextField
                        required={true}
                        size="small"
                        style={{
                          transform: 'scaleY(1.25)',
                        }}
                        inputProps={{
                          className: classes.input,
                        }}
                        value={data.pertanyaan}
                        name="jenis_bonus"
                        className={`${classes.outlined} border-radius-4 w-full`}
                        placeholder="Pertanyaan"
                        variant="outlined"
                        onChange={handleChange}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <h1 className="mb-5 fw-500 text-15 text-black">
                        Jawaban
                      </h1>
                      <TextField
                        required={true}
                        size="small"
                        style={{
                          transform: 'scaleY(1.25)',
                        }}
                        inputProps={{
                          className: classes.input,
                        }}
                        value={data.jawaban}
                        name="jenis_bonus"
                        className={`${classes.outlined} border-radius-4 w-full`}
                        placeholder="Jawaban"
                        variant="outlined"
                        onChange={handleChange}
                      />
                    </Grid>
                    <Grid item xs={12} sm={1} className="py-auto mt-3">
                      <div
                        className="border-radius-circle bg-error w-40 h-40"
                        style={{ padding: '5.5px' }}
                      >
                        <Icon className="" fontSize="large">
                          delete-outline-icon
                        </Icon>
                      </div>
                    </Grid>
                  </Grid>
                );
              })}
            <Grid
              container
              className="mt-2"
              spacing={5}
              justifyContent="center"
              alignItems="center"
            >
              <Grid item xs={12} sm={5}>
                <h1 className="mb-5 fw-500 text-15 text-black">Pertanyaan</h1>
                <TextField
                  required={true}
                  size="small"
                  style={{
                    transform: 'scaleY(1.25)',
                  }}
                  inputProps={{
                    className: classes.input,
                  }}
                  name="jenis_bonus"
                  className={`${classes.outlined} border-radius-4 w-full`}
                  placeholder="Pertanyaan"
                  variant="outlined"
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <h1 className="mb-5 fw-500 text-15 text-black">Jawaban</h1>
                <TextField
                  required={true}
                  size="small"
                  style={{
                    transform: 'scaleY(1.25)',
                  }}
                  inputProps={{
                    className: classes.input,
                  }}
                  name="jenis_bonus"
                  className={`${classes.outlined} border-radius-4 w-full`}
                  placeholder="Jawaban"
                  variant="outlined"
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={1} className="py-auto mt-3 text-white">
                <div
                  className="border-radius-circle bg-primary w-40 h-40"
                  style={{ padding: '5.5px' }}
                >
                  <Icon className="" fontSize="large">
                    add-icon
                  </Icon>
                </div>
              </Grid>
            </Grid>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Faq;
