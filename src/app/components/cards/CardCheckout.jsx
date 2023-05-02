import { Grid } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import React from 'react';

import { formatRupiah } from '../../../utlis/formatRupiah';

const useStyles = makeStyles(({ palette, ...theme }) =>
    createStyles({
        btnMin: {
            width: 35,
            height: 35,
            border: '1px solid #BDBDBD',
            '&:hover': {
                background: palette.grey[100]
            }
        },
        btnAdd: {
            width: 35,
            height: 35,
            background: palette.secondary.main,
            '&:hover': {
                background: palette.secondary.dark
            }
        }
    })
);
const CardCheckout = ({ img, name, subname, qty, price }) => {
    const classes = useStyles();
    return (
        <Grid container spacing={4} className="card-keranjang">
            <Grid item xs={4} md={2} className={classes.containerImg}>
                <img src={img} alt="produk" className="w-full img-produk" />
            </Grid>
            <Grid item xs={8} md={10}>
                <Grid container spacing={2} className="h-full">
                    <Grid item xs={12} md={10}>
                        <div className="h-full flex items-start flex-column justify-between">
                            <div>
                                <h5 className="fw-bold m-0 mb-1">{name}</h5>
                                <p className="m-0 mb-0">{subname}</p>
                            </div>
                            <div>
                                <p className="fw-light mb-0 mt-1">
                                    Total: {qty} item
                                </p>
                            </div>
                        </div>
                    </Grid>
                    <Grid
                        item
                        xs={9}
                        md={2}
                        className="d-flex align-items-center"
                    >
                        <h5 className="fw-bold mt-1 mb-0">
                            {formatRupiah(price, 'Rp')}
                        </h5>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default CardCheckout;
