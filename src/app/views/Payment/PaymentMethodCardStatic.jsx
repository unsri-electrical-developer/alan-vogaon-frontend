import React from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import { Card, Grid, Switch } from "@material-ui/core";
import { useDispatch } from "react-redux";

const PaymentMethodCardStatic = ({
  data = {},
  handleSwitch,
  checked = false
}) => {
  const dispatch = useDispatch();
  const useStyles = makeStyles({
    dialog: {
      // height: 'fit-content',
      scrollbarColor: "transparent",
      scrollbarWidth: "0px",
      minWidth: "800px",
      maxWidth: "1200px,",
      // overflow: 'hidden',
    },
    backDrop: {
      backgroundColor: "rgba(0, 0, 0, 0.2)",
    },
  });
  const AntSwitch = withStyles((theme) => ({
    root: {
      width: 38,
      height: 19,
      padding: 0,
      display: "flex",
    },
    switchBase: {
      padding: 2,
      color: theme.palette.grey[500],
      "&$checked": {
        transform: "translateX(19.5px)",
        color: theme.palette.common.white,
        "& + $track": {
          opacity: 1,
          backgroundColor: theme.palette.primary.main,
          borderColor: theme.palette.primary.main,
        },
      },
    },
    thumb: {
      width: 15,
      height: 15,
      boxShadow: "none",
    },
    track: {
      border: `1px solid ${theme.palette.grey[500]}`,
      borderRadius: 16 / 2,
      opacity: 1,
      backgroundColor: theme.palette.common.white,
    },
    checked: {},
  }))(Switch);

  const [state, setState] = React.useState({
    checked: data.status || checked || false,
    pm_logo: data.pm_logo || "",
    pm_code: data.pm_code || "",
    from: data.from || "",
    pm_title: data.pm_title || "",
    path: "",
    content: false,
    noContent: false,
  });

  const handleChecked = (pm_code) => {
    handleSwitch(pm_code, !state.checked);
    setState((prev) => ({
      ...prev,
      checked: !state.checked,
    }));
  }

  return (
    <Card className="p-5 shadow-none h-125 bg-blue-gray border-radius-5 d-flex justify-center items-center">
      <Grid
        container
        spacing={2}
        className="d-flex justify-between items-between"
      >
        <Grid
          item
          xs={6}
          className="text-17 fw-500 d-flex text-black justify-start items-start"
        >
          {data.pm_title}
        </Grid>
        <Grid item xs={6} className="d-flex justify-end items-end">
          <div className="m-0 p-0 w-full">
            <img
              src={state.pm_logo}
              alt="preview foto"
              className="preview w-full h-35"
              style={{
                objectFit: "cover",
                objectPosition: "center",
              }}
            />
          </div>
        </Grid>
        <Grid item xs={6} className="d-flex justify-start items-start">
          <AntSwitch
            checked={state.checked}
            onChange={() => handleChecked(data.pm_code)}
            name="checked"
          />
        </Grid>
      </Grid>
    </Card>
  );
};

export default PaymentMethodCardStatic;
