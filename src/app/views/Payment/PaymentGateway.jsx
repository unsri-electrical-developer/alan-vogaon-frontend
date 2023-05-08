import React, { useLayoutEffect } from 'react';
import {
  Button,
  TextField,
  Icon,
  InputAdornment,
  Grid,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import AddIcon from '@material-ui/icons/Add';

import SimpleCard from '../../assets/components/cards/SimpleCard';
import TablePaymentGateway from './TablePaymentGateway';
// import { dataPaymentGateway } from './DataDummyPayment';
import { useDispatch, useSelector } from 'react-redux';
import { getPaymentGateway } from '../../redux/actions/Payment/PaymentGatewayActions';

const PaymentGateway = () => {
  const dispatch = useDispatch();
  const { dataPaymentGateway } = useSelector((state) => state.payment);
  console.log(dataPaymentGateway);

  const getData = () => {
    dispatch(getPaymentGateway());
  };

  useLayoutEffect(() => {
    getData();
  }, []);

  const useStyles = makeStyles((theme) => ({
    root: {
      '& .MuiFilledInput-root': {
        background: 'white',
      },
    },
  }));

  const classes = useStyles();

  return (
    <div className="m-sm-30">
      <Grid
        container
        spacing={3}
        className="mb-4 mx-auto px-2"
        alignItems="center"
        justifyContent="space-between"
      >
        <Grid item xs={12} sm>
          <h1 className="text-black fw-600 text-25 my-auto">Payment Gateway</h1>
        </Grid>
        <Grid item xs={12} sm className="d-flex mr-8 justify-end">
          <Link to="/payment_gateway/add">
            <Button
              variant="contained"
              color="primary"
              className="px-14 py-3 text-white border-radius-4 fw-500"
            >
              <AddIcon /> <span className="ml-2">Add</span>
            </Button>
          </Link>
        </Grid>
      </Grid>
      <SimpleCard title="">
        <div className="mt-2 mb-4 d-flex items-center justify-end pt-5">
          <TextField
            size="small"
            variant="outlined"
            className={`w-250 border-radius-4`}
            placeholder="Cari Kategori"
            name="search"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Icon>search</Icon>
                </InputAdornment>
              ),
            }}
          />
        </div>
        <TablePaymentGateway data={dataPaymentGateway} getData={getData} />
      </SimpleCard>
    </div>
  );
};

export default PaymentGateway;
