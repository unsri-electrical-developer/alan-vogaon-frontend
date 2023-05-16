import { Card, Grid, Icon } from '@material-ui/core';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import PaymentMethodCard from './PaymentMethodCard';
import { getPaymentMethod } from '../../redux/actions/Payment/PaymentMethodActions';

const PaymentMethod = () => {
  const dispatch = useDispatch();
  const { dataPaymentMethod } = useSelector((state) => state.payment);

  console.log(dataPaymentMethod);

  const getData = () => {
    dispatch(getPaymentMethod());
  };

  React.useLayoutEffect(() => {
    getData();
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
        {dataPaymentMethod.length > 0 ? (
          <Grid container spacing={3}>
            {dataPaymentMethod.map((data) => (
              <Grid item xs={6} md={3} key={data}>
                <PaymentMethodCard
                  isThereContent
                  data={data}
                  getData={getData}
                />
              </Grid>
            ))}
            <Grid item xs={6} md={3}>
              <PaymentMethodCard getData={getData} />
            </Grid>
          </Grid>
        ) : (
          <Grid container spacing={8}>
            <Grid
              item
              xs={12}
              className="d-flex justify-center my-25 text-20 items-center"
            >
              Data Payment Method Kosong
            </Grid>
          </Grid>
        )}
      </Card>
    </div>
  );
};

export default PaymentMethod;
