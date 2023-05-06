import { Card, Grid, Icon } from '@material-ui/core';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { UploadImage } from '../../components';
import { getSliders } from '../../redux/actions/SlidersAction';

const Sliders = () => {
  const dispatch = useDispatch();
  const { dataSliders } = useSelector((state) => state.sliders);
  console.log(dataSliders);
  const getData = () => {
    dispatch(getSliders());
  };

  const [state, setState] = useState({});

  const handleChangePhoto = (file, path) => {
    setState({
      ...state,
      foto: file,
      preview1: path,
    });
  };

  useLayoutEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (dataSliders.length > 0) {
      let obj = {};
      for (let i = 1; i <= dataSliders.length; i++) {
        obj = {
          ...obj,
          [`preview${i}`]: dataSliders[i - 1].image,
        };
      }
      obj = {
        ...obj,
        [`preview${dataSliders.length + 1}`]: '',
      };

      console.log(obj);

      setState((prev) => ({
        ...prev,
        ...obj,
      }));
    }
  }, [dataSliders]);

  return (
    <div className="m-sm-30 mt-7 text-black">
      <Grid
        container
        spacing={3}
        className="mb-4 mx-auto px-2"
        alignItems="center"
        justifyContent="space-between"
      >
        <Grid item xs={12} sm>
          <h1 className="text-black fw-600 text-25 my-4">Sliders/Banner</h1>
        </Grid>
      </Grid>

      <Card className="mt-5 py-10 px-10">
        <Grid container spacing={3}>
          {dataSliders.length > 0 &&
            dataSliders.map((data, index) => (
              <Grid item xs={11} md={6} key={data.id}>
                <h4 className="fw-600">Banner {index + 1}</h4>
                <UploadImage
                  uploadFoto={handleChangePhoto}
                  preview={state[`preview${index + 1}`]}
                  formatIcon={false}
                />
              </Grid>
            ))}
          <Grid item xs={11} md={6}>
            <h4 className="fw-600">Banner {dataSliders.length + 1}</h4>
            <UploadImage
              uploadFoto={handleChangePhoto}
              preview={state[`preview${dataSliders.length + 1}`]}
              formatIcon={false}
            />
          </Grid>
        </Grid>
      </Card>
    </div>
  );
};

export default Sliders;
