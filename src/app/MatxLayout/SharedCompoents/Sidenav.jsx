import { makeStyles } from "@material-ui/core/styles";
import React, { Fragment } from "react";
import Scrollbar from "react-perfect-scrollbar";
import { useDispatch, useSelector } from "react-redux";

import { MatxVerticalNav } from "../../../matx";
import { navigations } from "../../navigations";
import { setLayoutSettings } from "../../redux/actions/LayoutActions";

const useStyles = makeStyles(({ palette, ...theme }) => ({
  scrollable: {
    paddingLeft: 20,
    paddingRight: 20,
  },
  sidenavMobileOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    width: "100vw",
    background: "transparent",
    zIndex: -1,
    [theme.breakpoints.up("lg")]: {
      display: "none",
    },
  },
}));

const Sidenav = ({ children }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { settings } = useSelector((state) => state.layout);

  const updateSidebarMode = (sidebarSettings) => {
    let activeLayoutSettingsName = settings.activeLayout + "Settings";
    let activeLayoutSettings = settings[activeLayoutSettingsName];

    dispatch(
      setLayoutSettings({
        ...settings,
        [activeLayoutSettingsName]: {
          ...activeLayoutSettings,
          leftSidebar: {
            ...activeLayoutSettings.leftSidebar,
            ...sidebarSettings,
          },
        },
      })
    );
  };

  return (
    <Fragment>
      <Scrollbar options={{ suppressScrollX: true }} className="relative pt-4">
        {children}
        <MatxVerticalNav navigation={navigations} />
      </Scrollbar>

      <div
        onClick={() => updateSidebarMode({ mode: "close" })}
        className={classes.sidenavMobileOverlay}
      />
    </Fragment>
  );
};

export default Sidenav;
