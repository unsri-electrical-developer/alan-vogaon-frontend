import { IconButton } from '@material-ui/core';
import { DeleteRounded, EditRounded } from '@material-ui/icons';
import React from 'react';

const CardActionImg = ({ img, idx, handleUpd, handleDel }) => {
    return (
        <div className="position-relative flex items-center justify-center card-action-img">
            <img src={img} alt={`Foto ${idx}`} className="w-full radius-6" />
            <div className="flex items-center justify-center position-absolute container-action d-none w-full h-full radius-6">
                <IconButton className="mr-1" onClick={handleUpd}>
                    <EditRounded color="secondary" />
                </IconButton>
                <IconButton className="ml-1" onClick={handleDel}>
                    <DeleteRounded className="text-danger" />
                </IconButton>
            </div>
            <div
                className="rounded-circle text-white position-absolute flex items-center justify-center bg-secondary "
                style={{
                    height: 35,
                    width: 35,
                    top: 25,
                    right: 25
                }}
            >
                {idx + 1}
            </div>
        </div>
    );
};

export default CardActionImg;
