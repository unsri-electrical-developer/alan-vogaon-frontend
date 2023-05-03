import { Card, Grid, Icon } from '@material-ui/core';
import React, { useLayoutEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { UploadImage } from '../../components';

const Sliders = () => {
  const dispatch = useDispatch();

  const [state, setState] = useState({
    preview1: '',
    preview2: '',
    preview3: '',
  });

  const handleChangePhoto1 = (file, path) => {
    setState({
      ...state,
      foto: file,
      preview1: path,
    });
  };
  const handleChangePhoto2 = (file, path) => {
    setState({
      ...state,
      foto: file,
      preview2: path,
    });
  };
  const handleChangePhoto3 = (file, path) => {
    setState({
      ...state,
      foto: file,
      preview3: path,
    });
  };

  useLayoutEffect(() => {
    console.log('uselayouteffect');
  }, []);

  return (
    <div className="analytics m-sm-30 mt-7 text-black">
      <h1 className="fw-600 m-0">Sliders/Banner</h1>
      <Card className="mt-5 py-10 px-10">
        <Grid container spacing={3}>
          <Grid item xs={11} md={6}>
            <h4 className="fw-600">Banner 1</h4>
            <UploadImage
              uploadFoto={handleChangePhoto1}
              label="Banner"
              preview={state.preview1}
              formatIcon={false}
            />
          </Grid>
          <Grid item xs={11} md={6}>
            <h4 className="fw-600">Banner 2</h4>
            <UploadImage
              uploadFoto={handleChangePhoto2}
              label="Banner"
              preview={state.preview2}
              formatIcon={false}
            />
          </Grid>
          <Grid item xs={11} md={6}>
            <h4 className="fw-600">Banner 3</h4>
            <UploadImage
              uploadFoto={handleChangePhoto3}
              label="Banner"
              preview={state.preview3}
              formatIcon={false}
            />
          </Grid>
        </Grid>
      </Card>
    </div>
  );
};

export default Sliders;
