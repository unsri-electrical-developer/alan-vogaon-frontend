import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const useStyles = makeStyles(({ palette, ...theme }) => ({
    brand: {
        padding: '20px 18px 20px 24px',
        backgroundColor: '#fff',
        height: 64
    },
    hideOnCompact: {
        display: 'none'
    }
}));

const Brand = ({ children }) => {
    const classes = useStyles();
    const { settings } = useSelector((state) => state.layout);
    const leftSidebar = settings.layout1Settings.leftSidebar;
    const { mode } = leftSidebar;

    return (
        <div
            className={clsx('flex items-center justify-center', classes.brand)}
        >
            <div className="flex items-center justify-start">
                <Link to="/dashboard">
                    <img
                        src="/assets/images/logos/logo.webp"
                        alt="Vogaon"
                        height={20}
                    />
                </Link>
            </div>
            <div
                className={clsx({
                    sidenavHoverShow: true,
                    [classes.hideOnCompact]: mode === 'compact'
                })}
            >
                {children}
            </div>
        </div>
    );
};

export default Brand;
