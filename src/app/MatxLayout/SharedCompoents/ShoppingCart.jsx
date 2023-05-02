import { Badge, Drawer, Icon, IconButton } from "@material-ui/core";
import { makeStyles, ThemeProvider, useTheme } from "@material-ui/core/styles";
import React, { useState } from "react";
import { useSelector } from "react-redux";

const useStyles = makeStyles(({ palette, ...theme }) => ({
  miniCart: {
    width: "var(--sidenav-width)",
    "& .cart__topbar": {
      height: "var(--topbar-height)",
    },
    "& .mini-cart__item": {
      transition: "background 300ms ease",
      "&:hover": {
        background: "rgba(0,0,0,0.01)",
      },
    },
  },
}));

function ShoppingCart({ container }) {
  const [panelOpen, setPanelOpen] = useState(false);

  const classes = useStyles();
  const theme = useTheme();
  const { cartList } = useSelector((state) => state.ecommerce);
  const { settings } = useSelector((state) => state.layout);

  function handleDrawerToggle() {
    setPanelOpen(!panelOpen);
  }

  const parentThemePalette = theme.palette;

  return (
    <ThemeProvider theme={settings.themes[settings.activeTheme]}>
      <IconButton
        onClick={handleDrawerToggle}
        style={{
          color:
            parentThemePalette.type === "light"
              ? parentThemePalette.text.secondary
              : parentThemePalette.text.primary,
        }}
      >
        <Badge color="secondary" badgeContent={cartList.length}>
          <Icon>shopping_cart</Icon>
        </Badge>
      </IconButton>

      <Drawer
        container={container}
        variant="temporary"
        anchor={"right"}
        open={panelOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
      >
        <div className={classes.miniCart}>
          <div className="cart__topbar elevation-z6 flex items-center p-1 mb-2 pl-4">
            <Icon color="primary">shopping_cart</Icon>
            <h5 className="ml-2 my-0 font-medium">Cart</h5>
          </div>

          {cartList.map((product) => (
            <div
              key={product.id}
              className="mini-cart__item flex items-center justify-between py-2 px-2"
            >
              <div className="flex flex-column mr-2">
                <IconButton size="small" onClick={() => {}}>
                  <Icon className="cursor-pointer">keyboard_arrow_up</Icon>
                </IconButton>
                <IconButton
                  disabled={!(product.amount - 1)}
                  size="small"
                  onClick={() => {}}
                >
                  <Icon className="cursor-pointer">keyboard_arrow_down</Icon>
                </IconButton>
              </div>
              <div className="mr-2">
                <img
                  className="w-80"
                  src={product.imgUrl}
                  alt={product.title}
                />
              </div>
              <div className="mr-2 text-center">
                <h6 className="m-0 mb-1">{product.title}</h6>
                <small className="text-muted">
                  ${product.price} x {product.amount}
                </small>
              </div>
              <IconButton size="small" onClick={() => {}}>
                <Icon fontSize="small">clear</Icon>
              </IconButton>
            </div>
          ))}
        </div>
      </Drawer>
    </ThemeProvider>
  );
}

export default ShoppingCart;
