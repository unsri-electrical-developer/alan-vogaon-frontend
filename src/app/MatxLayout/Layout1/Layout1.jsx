import { makeStyles, ThemeProvider, useTheme } from '@material-ui/core/styles';
import clsx from 'clsx';
import React, { useContext } from 'react';
import Scrollbar from 'react-perfect-scrollbar';
import { useSelector } from 'react-redux';
import { renderRoutes } from 'react-router-config';

import { MatxSuspense } from '../../../matx';
import AppContext from '../../appContext';
import SidenavTheme from '../MatxTheme/SidenavTheme/SidenavTheme';
import Footer from '../SharedCompoents/Footer';
import SecondarySidebar from '../SharedCompoents/SecondarySidebar/SecondarySidebar';
import Layout1Sidenav from './Layout1Sidenav';
import Layout1Topbar from './Layout1Topbar';

const useStyles = makeStyles(({ palette, ...theme }) => ({
    contentWrap: ({ width, secondarySidebar }) => ({
        verticalAlign: 'top',
        marginLeft: width,
        transition: 'all 0.3s ease',
        [theme.breakpoints.up('md')]: {
            marginRight: secondarySidebar.open ? 50 : 0
        }
    })
}));

const Layout1 = () => {
    const { settings } = useSelector((state) => state.layout);
    const { layout1Settings, secondarySidebar } = settings;
    const {
        leftSidebar: { mode: sidenavMode, show: showSidenav }
    } = layout1Settings;
    const { routes } = useContext(AppContext);

    const getSidenavWidth = () => {
        switch (sidenavMode) {
            case 'full':
                return 'var(--sidenav-width)';
            case 'compact':
                return 'var(--sidenav-compact-width)';
            default:
                return '0px';
        }
    };

    const sidenavWidth = getSidenavWidth();
    const classes = useStyles({ width: sidenavWidth, secondarySidebar });
    const theme = useTheme();

    const topbarTheme = settings.themes[layout1Settings.topbar.theme];
    const layoutClasses = `theme-${theme.palette.type} flex`;

    return (
        <div className={layoutClasses}>
            {showSidenav && sidenavMode !== 'close' && (
                <SidenavTheme>
                    <Layout1Sidenav />
                </SidenavTheme>
            )}

            <div
                className={clsx(
                    'flex-grow flex-column relative overflow-hidden h-full-screen',
                    classes.contentWrap
                )}
            >
                {layout1Settings.topbar.show && layout1Settings.topbar.fixed && (
                    <ThemeProvider theme={topbarTheme}>
                        <Layout1Topbar fixed={true} className="elevation-z8" />
                    </ThemeProvider>
                )}

                {settings.perfectScrollbar && (
                    <Scrollbar className="flex-grow flex-column relative h-full">
                        {layout1Settings.topbar.show &&
                            !layout1Settings.topbar.fixed && (
                                <ThemeProvider theme={topbarTheme}>
                                    <Layout1Topbar />
                                </ThemeProvider>
                            )}
                        <div className="relative flex-grow">
                            <MatxSuspense>{renderRoutes(routes)}</MatxSuspense>
                        </div>
                        {settings.footer.show && !settings.footer.fixed && (
                            <Footer />
                        )}
                    </Scrollbar>
                )}

                {!settings.perfectScrollbar && (
                    <div className="flex-grow flex-column relative h-full scroll-y">
                        {layout1Settings.topbar.show &&
                            !layout1Settings.topbar.fixed && (
                                <ThemeProvider theme={topbarTheme}>
                                    <Layout1Topbar />
                                </ThemeProvider>
                            )}
                        <div className="relative flex-grow">
                            <MatxSuspense>{renderRoutes(routes)}</MatxSuspense>
                        </div>
                        {settings.footer.show && !settings.footer.fixed && (
                            <Footer />
                        )}
                    </div>
                )}

                {settings.footer.show && settings.footer.fixed && <Footer />}
            </div>
            {settings.secondarySidebar.show && <SecondarySidebar />}
        </div>
    );
};

export default Layout1;