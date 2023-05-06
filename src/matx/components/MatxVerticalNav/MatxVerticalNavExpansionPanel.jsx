import { Icon } from '@material-ui/core';
import TouchRipple from '@material-ui/core/ButtonBase';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import React, { useRef, useState } from 'react';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const useStyles = makeStyles(({ palette, ...theme }) => ({
  expandIcon: {
    transition: "transform 0.3s cubic-bezier(0, 0, 0.2, 1) 0ms",
    transform: "rotate(90deg)",
    },
    
  collapseIcon: {
    transition: "transform 0.3s cubic-bezier(0, 0, 0.2, 1) 0ms",
    transform: "rotate(0deg)",
    },
  
  "expansion-panel": {
    overflow: "hidden",
    transition: "max-height 0.3s cubic-bezier(0, 0, 0.2, 1)",
    },
  
  highlight: {
    background: palette.primary.main,
    },
  
  navItem: {
    "&.active": {
      background: palette.secondary.main,
      boxShadow: theme.shadows[3],
    },
    },
  
  compactNavItem: {
    width: 44,
    overflow: "hidden",
    justifyContent: "center !important",
    "& $itemText": {
      display: "none",
    },
    "& $itemIcon": {
      display: "none",
    },
  },
  itemIcon: {},
  itemText: {
    fontSize: "0.875rem",
    paddingLeft: "0.8rem",
  },
}));

const MatxVerticalNavExpansionPanel = ({ item, children, mode }) => {
    const [collapsed, setCollapsed] = useState(true);
    const classes = useStyles();
    const elementRef = useRef(null);
    const componentHeight = useRef(0);
    const { pathname } = useLocation();
    const { name, icon, iconText, badge } = item;

    useEffect(() => {
        if (!elementRef) return;

        calcaulateHeight(elementRef.current);

        // OPEN DROPDOWN IF CHILD IS ACTIVE
        for (let child of elementRef.current.children) {
            if (child.getAttribute('href') === pathname) {
                setCollapsed(false);
            }
        }
    }, [elementRef.current]);

    const handleClick = () => {
        componentHeight.current = 0;
        calcaulateHeight(elementRef.current);
        setCollapsed(!collapsed);
    };

    const calcaulateHeight = (node) => {
        if (node.name !== 'child') {
            for (let child of node.children) {
                calcaulateHeight(child);
            }
        }

        if (node.name === 'child') componentHeight.current += node.scrollHeight;
        else componentHeight.current += 44; //here 44 is node height
        return;
    };

    return (
      <div>
        <TouchRipple
          className={clsx({
            "flex justify-between h-44 border-radius-4 mb-2 w-full pr-4 has-submenu compactNavItem whitespace-pre overflow-hidden": true,
            [classes.navItem]: true,
            [classes.compactNavItem]: mode === "compact",
            open: !collapsed,
          })}
          onClick={handleClick}
        >
          <div className="flex items-center">
            {icon && (
              <Icon className="align-middle text-18 w-36 px-4">{icon}</Icon>
            )}
            {iconText && (
              <div className="w-4 h-4 rounded bg-white ml-5 mr-4"></div>
            )}
            <span
              className={clsx(
                "align-middle sidenavHoverShow",
                classes.itemText
              )}
            >
              {name}
            </span>
          </div>
          <div className="flex items-center">
            {badge && (
              <div
                className={clsx(
                  `rounded bg-${item.badge.color} px-1 py-1px`,
                  "sidenavHoverShow",
                  classes.itemIcon
                )}
              >
                {badge.value}
              </div>
            )}
            <div
              className={clsx({
                "item-arrow sidenavHoverShow": true,
                [classes.itemIcon]: true,
                [classes.collapseIcon]: collapsed,
                [classes.expandIcon]: !collapsed,
              })}
            >
              <Icon fontSize="small" className="align-middle">
                chevron_right
              </Icon>
            </div>
          </div>
        </TouchRipple>

        <div
          ref={elementRef}
          className={clsx(classes["expansion-panel"], "submenu")}
          style={
            collapsed
              ? { maxHeight: "0px" }
              : { maxHeight: componentHeight.current + "px" }
          }
        >
          {children}
        </div>
      </div>
    );
};

export default MatxVerticalNavExpansionPanel;
