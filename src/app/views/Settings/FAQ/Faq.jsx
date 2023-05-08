import React, { useEffect, useLayoutEffect, useState } from 'react';
import { Button, TextField, Grid, Card, Icon } from '@material-ui/core';
import Swal from 'sweetalert2';
import { useDispatch, useSelector } from 'react-redux';
import { getFaq, addFaq } from '../../../redux/actions/Settings';

const Faq = () => {
  const dispatch = useDispatch();
  const { dataFaq } = useSelector((state) => state.faq);

  const [state, setState] = useState({});

  const getData = () => {
    dispatch(getFaq());
  };

  useLayoutEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (dataFaq.length > 0) {
      let spread = dataFaq.map((data) => ({
        [`pertanyaan${data.id}`]: data.pertanyaan,
        [`jawaban${data.id}`]: data.jawaban,
      }));

      let obj = {
        pertanyaanNew: '',
        jawabanNew: '',
      };

      spread.forEach((data) => {
        obj = {
          ...obj,
          ...data,
        };
      });

      setState((prev) => ({
        ...prev,
        ...obj,
      }));
    }
  }, [dataFaq]);

  const handleChange = (e) => {
    e.persist();
    setState((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = () => {
    let arr = Object.entries(state);
    let faq = [];

    let pertanyaan = arr.filter((data) => data[0].includes('pertanyaan'));
    let jawaban = arr.filter((data) => data[0].includes('jawaban'));

    pertanyaan.forEach((pertanyaan) => {
      jawaban.forEach((jawaban) => {
        if (
          pertanyaan[0].replace(/[^0-9]/g, '') ===
          jawaban[0].replace(/[^0-9]/g, '')
        ) {
          console.log(pertanyaan);
          console.log(jawaban);
          faq.push({
            pertanyaan: pertanyaan[1],
            jawaban: jawaban[1],
          });
        } else if (
          pertanyaan[0].includes('New') &&
          jawaban[0].includes('New')
        ) {
          console.log(pertanyaan);
          faq.push({
            pertanyaan: pertanyaan[1],
            jawaban: jawaban[1],
          });
        }
      });
    });
    console.log(faq);
    addFaq({ faq: faq.reverse() }).then((res) => {
      Swal.fire('Success!', 'Data FAQ berhasil ditambah', 'success');
      getData();
      setState({});
    });
  };

  const handleAdd = () => {
    if (state.pertanyaanNew && state.jawabanNew) {
      let arr = Object.entries(state);
      let faq = [...dataFaq];
      var highest_id = dataFaq.length > 0 ? dataFaq.slice(-1)[0].id : 1;

      let pertanyaan = arr.filter((data) => data[0].includes('pertanyaan'));
      let jawaban = arr.filter((data) => data[0].includes('jawaban'));

      pertanyaan.forEach((pertanyaan) => {
        jawaban.forEach((jawaban) => {
          if (pertanyaan[0].includes('New') && jawaban[0].includes('New')) {
            console.log(highest_id);
            faq.push({
              id: highest_id + 1,
              pertanyaan: pertanyaan[1],
              jawaban: jawaban[1],
            });
          }
        });
      });
      console.log(faq);
      dispatch({
        type: 'GET_FAQ',
        payload: faq,
      });
    } else {
      Swal.fire('Oopss!', 'Pertanyaan dan jawaban harus diisi dahulu', 'error');
    }
  };

  const handleDelete = (id) => {
    let faq = [];

    dataFaq.forEach((data) => {
      if (data.id !== id) {
        faq.push(data);
      }
    });
    setState({});

    console.log(faq);
    dispatch({
      type: 'GET_FAQ',
      payload: faq,
    });
  };

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
            {dataFaq.length > 0 &&
              dataFaq.map((data) => {
                return (
                  <Grid
                    container
                    className="mt-3"
                    spacing={4}
                    justifyContent="center"
                    alignItems="flex-end"
                    key={data.id}
                  >
                    <Grid item xs={12} sm={5}>
                      <h3 className="mb-5 fw-500 text-15 text-black">
                        Pertanyaan
                      </h3>
                      <TextField
                        size="small"
                        value={
                          state.hasOwnProperty(`pertanyaan${data.id}`)
                            ? state[`pertanyaan${data.id}`]
                            : ''
                        }
                        name={`pertanyaan${data.id}`}
                        className={`border-radius-4 w-full`}
                        placeholder="Pertanyaan"
                        variant="outlined"
                        onChange={handleChange}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <h3 className="mb-5 fw-500 text-15 text-black">
                        Jawaban
                      </h3>
                      <TextField
                        size="small"
                        value={
                          state.hasOwnProperty(`jawaban${data.id}`)
                            ? state[`jawaban${data.id}`]
                            : ''
                        }
                        name={`jawaban${data.id}`}
                        className={`border-radius-4 w-full`}
                        placeholder="Jawaban"
                        variant="outlined"
                        onChange={handleChange}
                      />
                    </Grid>
                    <Grid item xs={12} sm={1} className="py-auto mt-3">
                      <div
                        className="border-radius-circle bg-error w-35 h-35"
                        style={{ padding: '8.7px' }}
                        onClick={() => handleDelete(data.id)}
                      >
                        <Icon className="" fontSize="medium">
                          delete-outline-icon
                        </Icon>
                      </div>
                    </Grid>
                  </Grid>
                );
              })}
            <Grid
              container
              className="mt-3"
              spacing={4}
              justifyContent="center"
              alignItems="flex-end"
            >
              <Grid item xs={12} sm={5}>
                <h3 className="mb-5 fw-500 text-15 text-black">Pertanyaan</h3>
                <TextField
                  size="small"
                  name="pertanyaanNew"
                  className={`border-radius-4 w-full`}
                  placeholder="Pertanyaan"
                  variant="outlined"
                  value={
                    state.hasOwnProperty(`pertanyaanNew`)
                      ? state[`pertanyaanNew`]
                      : ''
                  }
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <h3 className="mb-5 fw-500 text-15 text-black">Jawaban</h3>
                <TextField
                  size="small"
                  name="jawabanNew"
                  className={`border-radius-4 w-full`}
                  placeholder="Jawaban"
                  variant="outlined"
                  value={
                    state.hasOwnProperty(`jawabanNew`)
                      ? state[`jawabanNew`]
                      : ''
                  }
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={1} className="py-auto mt-5 text-white">
                <div
                  className="border-radius-circle bg-primary w-35 h-35"
                  style={{ padding: '8.7px' }}
                  onClick={handleAdd}
                >
                  <Icon className="" fontSize="medium">
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
