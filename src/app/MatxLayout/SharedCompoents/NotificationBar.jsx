import {
  Badge,
  Button,
  Card,
  Drawer,
  Icon,
  IconButton,
} from "@material-ui/core";
import { makeStyles, ThemeProvider } from "@material-ui/core/styles";
import clsx from "clsx";
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const useStyles = makeStyles(({ palette, ...theme }) => ({
  notification: {
    width: "var(--sidenav-width)",
    "& .notification__topbar": {
      height: "var(--topbar-height)",
    },
  },
  notificationCard: {
    "&:hover": {
      "& .delete-button": {
        cursor: "pointer",
        display: "unset",
        right: 0,
        marginTop: 6,
        top: 0,
        zIndex: 2,
      },
      "& .card__topbar__time": {
        display: "none",
      },
    },
    "& .delete-button": {
      display: "none",
      position: "absolute",
      right: 0,
      marginTop: 9,
    },
    "& .card__topbar__button": {
      borderRadius: 15,
      opacity: 0.9,
    },
  },
}));

const NotificationBar = ({ container }) => {
  const [panelOpen, setPanelOpen] = React.useState(false);

  const classes = useStyles();
  const { settings } = useSelector((state) => state.layout);
  const notifcationList = useSelector((state) => state.notifications);

  const handleDrawerToggle = () => {
    setPanelOpen(!panelOpen);
  };

  const handleDeleteNotification = (id) => {};

  const handleClearNotification = () => {};

  return (
    <ThemeProvider theme={settings.themes[settings.activeTheme]}>
      <IconButton
        onClick={handleDrawerToggle}
        style={{
          color: "#fff",
        }}
      >
        <Badge color="secondary" badgeContent={notifcationList?.length}>
          <Icon>notifications</Icon>
        </Badge>
      </IconButton>

      <Drawer
        width={"100px"}
        container={container}
        variant="temporary"
        anchor={"right"}
        open={panelOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
      >
        <div className={classes.notification}>
          <div className="notification__topbar elevation-z6 flex items-center p-4 mb-4">
            <Icon color="primary">notifications</Icon>
            <h5 className="ml-2 my-0 font-medium">Notifications</h5>
          </div>

          {notifcationList.map((notification) => (
            <div
              key={notification.id}
              className={clsx("relative", classes.notificationCard)}
            >
              <IconButton
                size="small"
                className="delete-button bg-light-gray mr-6"
                onClick={() =>
                  handleDeleteNotification(notification.notification_code)
                }
              >
                <Icon className="text-muted" fontSize="small">
                  clear
                </Icon>
              </IconButton>
              <Link
                to={`${notification.notification_link}`}
                onClick={handleDrawerToggle}
              >
                <Card className="mx-4 mb-6" elevation={3}>
                  <div className="card__topbar flex items-center justify-between p-2 bg-light-gray">
                    <div className="flex items-center">
                      <div className="card__topbar__button flex items-center justify-between h-24 w-24 overflow-hidden">
                        <Icon
                          className="card__topbar__icon"
                          fontSize="small"
                          color="primary"
                        >
                          send
                        </Icon>
                      </div>
                      <span className="ml-4 font-medium text-muted">
                        {notification.notification_title}
                      </span>
                    </div>
                    {/* <small className="card__topbar__time text-muted">
                                            {getTimeDifference(
                                                new Date(notification.timestamp)
                                            )}{' '}
                                            ago
                                        </small> */}
                  </div>
                  <div className="px-4 pt-2 pb-4">
                    {/* <p className="m-0">
                                            {notification.title}
                                        </p> */}
                    <small className="text-muted">
                      {notification.notification_desc}
                    </small>
                  </div>
                </Card>
              </Link>
            </div>
          ))}
          {!!notifcationList.length && (
            <div className="text-center">
              <Button onClick={handleClearNotification}>
                Clear Notifications
              </Button>
            </div>
          )}
        </div>
      </Drawer>
    </ThemeProvider>
  );
};

export default NotificationBar;
