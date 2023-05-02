import { AppBar, Toolbar } from "@material-ui/core";
import { makeStyles, ThemeProvider, useTheme } from "@material-ui/core/styles";
import clsx from "clsx";
import React from "react";
import { useSelector } from "react-redux";

const useStyles = makeStyles(({ palette, ...theme }) => ({
  footer: {
    minHeight: "var(--topbar-height)",
    "@media (max-width:499px)": {
      display: "table",
      width: "100%",
      minHeight: "auto",
      padding: "1rem 0",
      "& .container": {
        flexDirection: "column !important",
        "& a": {
          margin: "0 0 16px !important",
        },
      },
    },
  },
  appbar: {
    zIndex: 96,
    backgroundColor: palette.background.default,
  },
}));

const Footer = () => {
  const classes = useStyles();
  const theme = useTheme();
  const { settings } = useSelector(({ layout }) => layout);
  const date = new Date();

  const footerTheme = settings.themes[settings.footer.theme] || theme;

  return (
    <ThemeProvider theme={footerTheme}>
      <AppBar elevation={0} position="static" className={classes.appbar}>
        <Toolbar className={clsx("flex items-center", classes.footer)}>
          <div className="flex items-center container w-full">
            <span className="m-auto"></span>
            <p className="m-0">
              &copy; {date.getFullYear()}{" "}
              <a
                href="https://www.wikarealty.co.id/"
                target="_blank"
                className="text-primary fw-bold"
                rel="noopener noreferrer"
              >
                Wika Realty.
              </a>{" "}
              All rights reserved.
            </p>
          </div>
        </Toolbar>
      </AppBar>
    </ThemeProvider>
  );
};

export default Footer;
