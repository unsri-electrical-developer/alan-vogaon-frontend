import { Card, Grid, Icon } from '@material-ui/core';
import React from 'react';
import { useDispatch } from 'react-redux';

import PaymentMethodCard from './PaymentMethodCard';

const PaymentMethod = () => {
  const dispatch = useDispatch();

  React.useLayoutEffect(() => {
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
            <PaymentMethodCard isThereContent />
          </Grid>
          <Grid item xs={6} md={3}>
            <PaymentMethodCard />
          </Grid>
          <Grid item xs={6} md={3}>
            <PaymentMethodCard isThereContent />
          </Grid>
          <Grid item xs={6} md={3}>
            <PaymentMethodCard />
          </Grid>
        </Grid>
      </Card>
    </div>
  );
};

export default PaymentMethod;
