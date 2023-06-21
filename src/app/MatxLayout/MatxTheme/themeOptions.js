import { red } from '@material-ui/core/colors';

const shadows = [
  "none",
  "0px 2px 1px -1px rgba(0, 0, 0, 0.06),0px 1px 1px 0px rgba(0, 0, 0, 0.042),0px 1px 3px 0px rgba(0, 0, 0, 0.036)",
  "0px 3px 1px -2px rgba(0, 0, 0, 0.06),0px 2px 2px 0px rgba(0, 0, 0, 0.042),0px 1px 5px 0px rgba(0, 0, 0, 0.036)",
  "0px 3px 3px -2px rgba(0, 0, 0, 0.06),0px 3px 4px 0px rgba(0, 0, 0, 0.042),0px 1px 8px 0px rgba(0, 0, 0, 0.036)",
  "0px 2px 4px -1px rgba(0, 0, 0, 0.06),0px 4px 5px 0px rgba(0, 0, 0, 0.042),0px 1px 10px 0px rgba(0, 0, 0, 0.036)",
  "0px 3px 5px -1px rgba(0, 0, 0, 0.06),0px 5px 8px 0px rgba(0, 0, 0, 0.042),0px 1px 14px 0px rgba(0, 0, 0, 0.036)",
  "0px 3px 5px -1px rgba(0, 0, 0, 0.06),0px 6px 10px 0px rgba(0, 0, 0, 0.042),0px 1px 18px 0px rgba(0, 0, 0, 0.036)",
  "0px 4px 5px -2px rgba(0, 0, 0, 0.06),0px 7px 10px 1px rgba(0, 0, 0, 0.042),0px 2px 16px 1px rgba(0, 0, 0, 0.036)",
  "0px 5px 5px -3px rgba(0, 0, 0, 0.06),0px 8px 10px 1px rgba(0, 0, 0, 0.042),0px 3px 14px 2px rgba(0, 0, 0, 0.036)",
  "0px 5px 6px -3px rgba(0, 0, 0, 0.06),0px 9px 12px 1px rgba(0, 0, 0, 0.042),0px 3px 16px 2px rgba(0, 0, 0, 0.036)",
  "0px 6px 6px -3px rgba(0, 0, 0, 0.06),0px 10px 14px 1px rgba(0, 0, 0, 0.042),0px 4px 18px 3px rgba(0, 0, 0, 0.036)",
  "0px 6px 7px -4px rgba(0, 0, 0, 0.06),0px 11px 15px 1px rgba(0, 0, 0, 0.042),0px 4px 20px 3px rgba(0, 0, 0, 0.036)",
  "0px 7px 8px -4px rgba(0, 0, 0, 0.06),0px 12px 17px 2px rgba(0, 0, 0, 0.042),0px 5px 22px 4px rgba(0, 0, 0, 0.036)",
  "0px 7px 8px -4px rgba(0, 0, 0, 0.06),0px 13px 19px 2px rgba(0, 0, 0, 0.042),0px 5px 24px 4px rgba(0, 0, 0, 0.036)",
  "0px 7px 9px -4px rgba(0, 0, 0, 0.06),0px 14px 21px 2px rgba(0, 0, 0, 0.042),0px 5px 26px 4px rgba(0, 0, 0, 0.036)",
  "0px 8px 9px -5px rgba(0, 0, 0, 0.06),0px 15px 22px 2px rgba(0, 0, 0, 0.042),0px 6px 28px 5px rgba(0, 0, 0, 0.036)",
  "0px 8px 10px -5px rgba(0, 0, 0, 0.06),0px 16px 24px 2px rgba(0, 0, 0, 0.042),0px 6px 30px 5px rgba(0, 0, 0, 0.036)",
  "0px 8px 11px -5px rgba(0, 0, 0, 0.06),0px 17px 26px 2px rgba(0, 0, 0, 0.042),0px 6px 32px 5px rgba(0, 0, 0, 0.036)",
  "0px 9px 11px -5px rgba(0, 0, 0, 0.06),0px 18px 28px 2px rgba(0, 0, 0, 0.042),0px 7px 34px 6px rgba(0, 0, 0, 0.036)",
  "0px 9px 12px -6px rgba(0, 0, 0, 0.06),0px 19px 29px 2px rgba(0, 0, 0, 0.042),0px 7px 36px 6px rgba(0, 0, 0, 0.036)",
  "0px 10px 13px -6px rgba(0, 0, 0, 0.06),0px 20px 31px 3px rgba(0, 0, 0, 0.042),0px 8px 38px 7px rgba(0, 0, 0, 0.036)",
  "0px 10px 13px -6px rgba(0, 0, 0, 0.06),0px 20px 31px 3px rgba(0, 0, 0, 0.042),0px 8px 38px 7px rgba(0, 0, 0, 0.036)",
  "0px 10px 13px -6px rgba(0, 0, 0, 0.06),0px 20px 31px 3px rgba(0, 0, 0, 0.042),0px 8px 38px 7px rgba(0, 0, 0, 0.036)",
  "0px 10px 13px -6px rgba(0, 0, 0, 0.06),0px 20px 31px 3px rgba(0, 0, 0, 0.042),0px 8px 38px 7px rgba(0, 0, 0, 0.036)",
  "0px 10px 13px -6px rgba(0, 0, 0, 0.06),0px 20px 31px 3px rgba(0, 0, 0, 0.042),0px 8px 38px 7px rgba(0, 0, 0, 0.036)",
];

const themeOptions = {
  typography: {
    fontSize: 14,
    body1: {
      fontSize: "14px",
    },
    fontFamily: "Poppins",
  },

  status: {
    danger: red[500],
  },
  shadows,
  overrides: {
    MuiTable: {
      root: {
        tableLayout: "fixed",
      },
    },

    MuiTableCell: {
      head: {
        fontSize: "13px",
        padding: "12px 0px",
      },
      root: {
        fontSize: "14px",
        whiteSpace: "pre-wrap",
        wordBreak: "break-all",
        padding: "12px 8px 12px 0px",
        borderBottom: "none",
      },
    },

    MuiAccordion: {
      root: {
        "&:before": {
          display: "none",
        },
      },
    },

    MuiButton: {
      root: {
        fontSize: "14px",
        textTransform: "none",
        fontWeight: "400",
        borderRadius: "0px",
      },
      contained: {
        boxShadow: shadows[8],
        borderRadius: "0px",
      },
    },
    MuiFab: {
      root: {
        boxShadow: shadows[12],
      },
    },
    MuiCard: {
      root: {
        borderRadius: "8px",
      },
    },
    MuiTooltip: {
      tooltip: {
        fontSize: "11px",
      },
    },
    MuiMenuItem: {
      root: {
        fontSize: "0.875rem",
      },
    },
    MuiExpansionPanel: {
      root: {
        "&:before": {
          display: "none",
        },
      },
    },
    MuiOutlinedInput: {
      root: {
        borderRadius: 0,
        backgroundColor: "#FBFBFB",
        "& $notchedOutline": {
          top: -1,
          borderColor: "#E6E9ED",
        },
        "&$focused $notchedOutline": {
          borderColor: "#1253FA",
        },
        "&:hover $notchedOutline": {
          borderColor: "#d4d4d4",
        },
      },
    },
    MuiFormLabel: {
      root: {
        color: "#494746",
      },
    },
    MuiStepIcon: {
      text: {
        fill: "rgb(255 255 255)",
      },
      root: {
        "&$active": {
          color: "#1253FA",
        },
        "&$completed": {
          color: "#1253FA",
        },
      },
    },
  },
};

export default themeOptions;
