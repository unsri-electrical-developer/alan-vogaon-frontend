const textLight = {
  primary: "rgba(52, 49, 76, 1)",
  secondary: "rgba(52, 49, 76, 0.54)",
  disabled: "rgba(52, 49, 76, 0.38)",
  hint: "rgba(52, 49, 76, 0.38)",
  default: "#494746",
};
const secondaryColor = {
  light: "#FBDD51",
  main: "#FCF6EC",
  dark: "#F9CD00",
  contrastText: textLight.primary,
};

export const themeColors = {
  whitePurple: {
    palette: {
      type: "light",
      primary: {
        main: "#1253FA",
        contrastText: textLight.primary,
        light: "#F1F9FF",
      },
      secondary: {
        main: "#6FBD44",
        contrastText: textLight.secondary,
        light: "#B2E496",
      },
      text: textLight,
    },
  },
  whiteBlue: {
    palette: {
      type: "light",
      primary: {
        main: "#ffffff",
        contrastText: textLight.primary,
      },
      secondary: {
        main: "#1253FA",
        contrastText: textLight.primary,
      },
      text: textLight,
    },
  },
  slateDark1: {
    palette: {
      type: "dark",
      primary: {
        main: "#222A45",
        contrastText: "#ffffff",
      },
      secondary: {
        main: "#FCF6EC",
        contrastText: textLight.primary,
      },
      background: {
        paper: "#222A45",
        default: "#1a2038",
      },
    },
  },
  slateDark2: {
    palette: {
      type: "dark",
      primary: {
        main: "#1a2038",
        contrastText: "#ffffff",
      },
      secondary: {
        main: "#FCF6EC",
        contrastText: textLight.primary,
      },
      background: {
        paper: "#222A45",
        default: "#1a2038",
      },
    },
  },
  purple1: {
    palette: {
      type: "light",
      primary: {
        main: "#1253FA",
        contrastText: "#ffffff",
      },
      secondary: secondaryColor,
      text: textLight,
    },
  },
  purple2: {
    palette: {
      type: "light",
      primary: {
        main: "#6a75c9",
        contrastText: "#ffffff",
      },
      secondary: {
        main: "#ff9e43",
        contrastText: textLight.primary,
      },
      text: textLight,
    },
  },
  purpleDark1: {
    palette: {
      type: "dark",
      primary: {
        main: "#1253FA",
        contrastText: "#ffffff",
      },
      secondary: {
        main: "#ff9e43",
        contrastText: textLight.primary,
      },
      background: {
        paper: "#222A45",
        default: "#1a2038",
      },
    },
  },
  purpleDark2: {
    palette: {
      type: "dark",
      primary: {
        main: "#6a75c9",
        contrastText: "#ffffff",
      },
      secondary: {
        main: "#ff9e43",
        contrastText: textLight.primary,
      },
      background: {
        paper: "#222A45",
        default: "#1a2038",
      },
    },
  },
  blue: {
    palette: {
      type: "light",
      primary: {
        main: "#1253FA",
        contrastText: "#ffffff",
      },
      secondary: {
        main: "#FF9E43",
        contrastText: textLight.primary,
      },
      text: textLight,
    },
  },
  blueDark: {
    palette: {
      type: "dark",
      primary: {
        main: "#1253FA",
        contrastText: "#ffffff",
      },
      secondary: {
        main: "#FF4F30",
        contrastText: textLight.primary,
      },
      background: {
        paper: "#222A45",
        default: "#1a2038",
      },
    },
  },
  red: {
    palette: {
      type: "dark",
      primary: {
        main: "#e53935",
        contrastText: "#ffffff",
      },
      secondary: {
        main: "#FFAF38",
        contrastText: textLight.primary,
      },
    },
  },
};
