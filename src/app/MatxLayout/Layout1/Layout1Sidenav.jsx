import { makeStyles, useTheme } from '@material-ui/core/styles';
import React from 'react';
import { useSelector } from 'react-redux';

import { convertHexToRGB } from '../../../utils';
import Brand from '../SharedCompoents/Brand';
import Sidenav from '../SharedCompoents/Sidenav';

const useStyles = makeStyles(({ palette, ...theme }) => ({
    sidenav: ({ width, primaryRGB }) => ({
        position: 'fixed',
        top: 0,
        left: 0,
        height: '100vh',
        width: width,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'top',
        backgroundSize: 'cover',
        zIndex: 99,
        overflow: 'hidden',
        color: palette.text.primary,
        transition: 'all 250ms ease-in-out',
        backgroundColor: palette.background.paper,
        // boxShadow: '0px 4px 12px rgb(0,0,0,0.07)',
        '&:hover': {
            width: 'var(--sidenav-width)',
            '& .sidenavHoverShow': {
                display: 'block'
            },
            '& .compactNavItem': {
                width: '100%',
                maxWidth: '100%',
                '& .nav-bullet': {
                    display: 'block'
                },
                '& .nav-bullet-text': {
                    display: 'none'
                }
            }
        }
    }),
    hideOnCompact: {
        display: 'none'
    },
    userInfo: {}
}));

const Layout1Sidenav = () => {
    const theme = useTheme();
    const { settings } = useSelector((state) => state.layout);
    const leftSidebar = settings.layout1Settings.leftSidebar;
    const { mode } = leftSidebar;

    const getSidenavWidth = () => {
        switch (mode) {
            case 'compact':
                return 'var(--sidenav-compact-width)';
            default:
                return 'var(--sidenav-width)';
        }
    };

    const primaryRGB = convertHexToRGB(theme.palette.primary.main);
    const classes = useStyles({
        ...leftSidebar,
        width: getSidenavWidth(),
        primaryRGB
    });

    return (
        <div className={classes.sidenav}>
            <div className="flex-column relative h-full">
                <Brand />
                <Sidenav />
            </div>
        </div>
    );
};

export default Layout1Sidenav;
