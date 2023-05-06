import { Card, Grid, Icon } from '@material-ui/core';
import React, { useLayoutEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { UploadImage } from '../../components';

const PaymentMethod = () => {
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
    <div className="m-sm-30 mt-7 text-black">
      <Grid
        container
        spacing={3}
        className="mb-4 mx-auto px-2"
        alignItems="center"
        justifyContent="space-between"
      >
        <Grid item xs={12} sm>
          <h1 className="text-black fw-600 text-25 my-4">Payment Method</h1>
        </Grid>
      </Grid>

      <Card className="mt-5 py-10 px-10">
        <Grid container spacing={3}>
          <Grid item xs={6} md={3}>
            <UploadImage
              uploadFoto={handleChangePhoto1}
              preview={state.preview1}
              formatIcon={false}
              type="mini"
            />
          </Grid>
          <Grid item xs={6} md={3}>
            <UploadImage
              uploadFoto={handleChangePhoto2}
              preview={state.preview2}
              formatIcon={false}
              type="mini"
            />
          </Grid>
          <Grid item xs={6} md={3}>
            <UploadImage
              uploadFoto={handleChangePhoto3}
              preview={state.preview3}
              formatIcon={false}
              type="mini"
            />
          </Grid>
          <Grid item xs={6} md={3}>
            <UploadImage
              uploadFoto={handleChangePhoto3}
              preview={state.preview3}
              formatIcon={false}
              type="mini"
            />
          </Grid>
        </Grid>
      </Card>
    </div>
  );
};

export default PaymentMethod;
