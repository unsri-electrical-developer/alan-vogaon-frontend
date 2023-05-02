import { Button } from '@material-ui/core';
import React from 'react';
import { useSelector } from 'react-redux';

const NotFound = ({ history }) => {
    const user = useSelector(({ user }) => user);
    return (
        <div className="flex justify-center items-center h-full-screen w-full">
            <div className="flex-column justify-center items-center max-w-320">
                <img
                    className="mb-8 w-full"
                    src="/assets/images/illustrations/404.svg"
                    alt=""
                />
                <Button
                    className="capitalize text-white"
                    variant="contained"
                    color="primary"
                    onClick={() =>
                        history.push(
                            Object.keys(user).length > 0
                                ? '/dashboard'
                                : '/login'
                        )
                    }
                    disableElevation
                >
                    Kembali ke{' '}
                    {Object.keys(user).length > 0 ? 'Dashboard' : 'Login'}
                </Button>
            </div>
        </div>
    );
};

export default NotFound;
