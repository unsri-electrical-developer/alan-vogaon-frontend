import { Dialog } from '@material-ui/core';
import React from 'react';

const ModalImagePreview = ({ handleClose, open, image, icon }) => {
    return (
        <Dialog onClose={handleClose} open={open} maxWidth="xs" fullWidth>
            <div
                className={`p-5 flex items-center justify-center ${
                    icon ? 'bg-light-gray' : ''
                }`}
            >
                <img src={image} alt="preview" className="max-w-full w-auto" />
            </div>
        </Dialog>
    );
};

export default ModalImagePreview;
