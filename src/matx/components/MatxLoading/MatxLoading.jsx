import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';

const useStyles = makeStyles((theme) => ({
    loading: {
        position: 'fixed',
        left: 0,
        right: 0,
        top: 'calc(50% - 20px)',
        margin: 'auto',
        height: '40px',
        width: '40px',
        '& img': {
            position: 'absolute',
            height: '25px',
            width: 'auto',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            margin: 'auto'
        }
    }
}));

const Loading = (props) => {
    const classes = useStyles();

    return (
        <div className={classes.loading}>
            <img src="/assets/images/logos/logo_circle.png" alt="" />
            <CircularProgress />
        </div>
    );
};

export default Loading;
