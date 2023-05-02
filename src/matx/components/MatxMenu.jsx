import Menu from '@material-ui/core/Menu';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import React, { Fragment } from 'react';

const useStyles = makeStyles(({ palette, theme }) =>
    createStyles({
        dropdown: {
            border: '1px solid #E5E5E5',
            borderRadius: 0
        },
        dropdownHeader: {
            border: '1px solid #E5E5E5',
            marginTop: 15,
            borderRadius: 0
        }
    })
);

const MatxMenu = (props) => {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const children = React.Children.toArray(props.children);
    let { shouldCloseOnItemClick = true, horizontalPosition = 'left' } = props;

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <Fragment>
            <div
                className={`inline-block ${props.classBtn}`}
                onClick={handleClick}
            >
                {props.menuButton}
            </div>
            <Menu
                elevation={0}
                getContentAnchorEl={null}
                anchorEl={anchorEl}
                open={!!anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: horizontalPosition
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: horizontalPosition
                }}
                classes={{
                    paper: props?.isHeader
                        ? classes.dropdownHeader
                        : classes.dropdown
                }}
            >
                {children.map((child, index) => (
                    <div
                        onClick={
                            shouldCloseOnItemClick ? handleClose : () => {}
                        }
                        key={index}
                    >
                        {child}
                    </div>
                ))}
            </Menu>
        </Fragment>
    );
};

export default MatxMenu;
