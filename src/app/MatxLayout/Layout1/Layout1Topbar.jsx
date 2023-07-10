import {
  Avatar,
  Hidden,
  Icon,
  IconButton,
  MenuItem,
  Switch,
  useMediaQuery,
} from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { ArrowDropDownRounded } from "@material-ui/icons";
import clsx from "clsx";
import { merge } from "lodash";
import React, { useEffect, useLayoutEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { MatxMenu } from "../../../matx";
import { setLayoutSettings } from "../../redux/actions/LayoutActions";
import apiAuthService from "../../services/apiAuthService";
import { setMaintenanceMode } from "../../redux/actions/AppActions";
import { useState } from "react";
import { getGeneralInfo } from "../../redux/actions/Settings";

const useStyles = makeStyles(({ palette, ...theme }) => ({
  topbar: {
    top: 0,
    zIndex: 999,
    transition: "all 0.3s ease",
    background: "#fff",
    // boxShadow: '0px 4px 12px rgb(0,0,0,0.07)',
    "& .topbar-hold": {
      background: "#fff",
      height: 80,
      paddingLeft: 18,
      paddingRight: 20,
      [theme.breakpoints.down("sm")]: {
        paddingLeft: 16,
        paddingRight: 16,
      },
      [theme.breakpoints.down("xs")]: {
        paddingLeft: 14,
        paddingRight: 16,
      },
    },
    "& .fixed": {
      height: 64,
    },
  },
  menuItem: {
    display: "flex",
    alignItems: "center",
    minWidth: 185,
  },
}));

const Layout1Topbar = () => {
  const theme = useTheme();
  const classes = useStyles();
  const dispatch = useDispatch();
  const { settings } = useSelector(({ layout }) => layout);
  const { profile_pict, fullname, users_type, name } = useSelector(
    ({ user }) => user
  );
  const [maintenance, setMaintenance] = useState(0);

  const isMdScreen = useMediaQuery(theme.breakpoints.down("md"));
  const fixed = settings?.layout1Settings?.topbar?.fixed;
  // const leftSidebar = settings.layout1Settings.leftSidebar;

  const updateSidebarMode = (sidebarSettings) => {
    dispatch(
      setLayoutSettings(
        merge({}, settings, {
          layout1Settings: {
            leftSidebar: {
              ...sidebarSettings,
            },
          },
        })
      )
    );
  };

  const handleSignOut = () => {
    const token = localStorage.getItem("jwt_token");
    apiAuthService.logout(token).then(() => {
      window.location.href = "/login";
    });
  };

  const handleSidebarToggle = () => {
    let { layout1Settings } = settings;
    let mode;

    if (isMdScreen) {
      mode = layout1Settings.leftSidebar.mode === "close" ? "mobile" : "close";
    } else {
      mode = layout1Settings.leftSidebar.mode === "full" ? "compact" : "full";
    }

    updateSidebarMode({ mode });
  };

  const handleMaintenanceMode = (e) => {
    setMaintenance(!maintenance);
    setMaintenanceMode({ status: !maintenance }).then((res) => {
      console.log(res);
    });
  };

  const getData = () => {
    dispatch(getGeneralInfo());
  };

  useLayoutEffect(() => {
    getData();
  }, []);

  const { dataGeneralInfo } = useSelector((state) => state.generalInfo);

  useEffect(() => {
    if (dataGeneralInfo.hasOwnProperty("about")) {
      const { about } = dataGeneralInfo;
      setMaintenance(about?.maintenance_mode);
    }
  }, [dataGeneralInfo]);

  return (
    <div className={classes.topbar}>
      <div className={clsx({ "topbar-hold": true, fixed: fixed })}>
        <div className="flex justify-between items-center h-full">
          <div className="flex">
            <div>
              <h5>
                <Switch
                  onChange={handleMaintenanceMode}
                  checked={maintenance}
                  color="primary"
                  size="small"
                />
                Maintenance
              </h5>
            </div>
            <Hidden lgUp>
              <IconButton onClick={handleSidebarToggle}>
                <Icon color="action">menu</Icon>
              </IconButton>
            </Hidden>
          </div>
          <div className="flex items-center gap-3">
            <div>
              <p className="font-semibold mb-0">{fullname}</p>
              <p className="text-15 text-muted mb-0 text-right">{name}</p>
            </div>
            <MatxMenu
              menuButton={
                <div className="flex items-center">
                  <Avatar className="admin" src={profile_pict} />
                  <ArrowDropDownRounded />
                </div>
              }
              isHeader={true}
            >
              <MenuItem>
                <Link
                  className={clsx(classes.menuItem, "popup-menu-item")}
                  to="/dashboard"
                >
                  <Icon color="primary"> home </Icon>
                  <span className="pl-4"> Dashboard </span>
                </Link>
              </MenuItem>
              <MenuItem>
                <Link
                  className={clsx(classes.menuItem, "popup-menu-item")}
                  to="/profile"
                >
                  <Icon color="primary"> person </Icon>
                  <span className="pl-4"> Profile </span>
                </Link>
              </MenuItem>
              <MenuItem
                onClick={handleSignOut}
                className={clsx(classes.menuItem, "popup-menu-item")}
              >
                <Icon color="error"> logout </Icon>
                <span className="pl-4"> Logout </span>
              </MenuItem>
            </MatxMenu>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout1Topbar;
