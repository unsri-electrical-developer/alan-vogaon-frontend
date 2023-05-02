import { Backdrop, CircularProgress } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/styles';
import React from 'react';

const useStyles = makeStyles(({ palette, theme }) =>
    createStyles({
        backdrop: {
            zIndex: 999
        }
    })
);
const BackdropLoading = ({ open }) => {
    const classes = useStyles();
    return (
        <Backdrop
            open={open}
            classes={{
                root: classes.backdrop
            }}
        >
            <CircularProgress color="primary" />
        </Backdrop>
    );
};

export default BackdropLoading;
