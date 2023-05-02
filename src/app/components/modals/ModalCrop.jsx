import 'cropperjs/dist/cropper.css';

import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton } from '@material-ui/core';
import { CloseRounded } from '@material-ui/icons';
import React, { useState } from 'react';
import CropJS from 'react-cropper';

const ModalCrop = ({
    handleClose,
    open,
    filePath,
    handleSave,
    handleUpload,
    aspectRatio,
    maxHeight
}) => {
    const [cropper, setCropper] = useState(null);

    const saveImage = () => {
        if (typeof cropper !== 'undefined') {
            let option = { maxHeight: maxHeight || 600 };
            handleSave(cropper?.getCroppedCanvas(option)?.toDataURL());
        }
    };
    return (
        <Dialog onClose={handleClose} open={open} maxWidth="sm" fullWidth>
            <DialogTitle
                disableTypography
                className="flex items-center justify-between"
            >
                <h4 className="fw-bold m-0">Sesuaikan Gambar</h4>
                <IconButton size="small" onClick={handleClose}>
                    <CloseRounded />
                </IconButton>
            </DialogTitle>
            <DialogContent dividers>
                {filePath?.length > 0 ? (
                    <div className="w-full h-full position-relative">
                        <CropJS
                            style={{ height: 300, width: '100%' }}
                            src={filePath}
                            viewMode={1}
                            aspectRatio={aspectRatio}
                            background={false}
                            responsive={false}
                            autoCropArea={0}
                            checkOrientation={false}
                            guides={true}
                            onInitialized={(instance) => {
                                setCropper(instance);
                            }}
                            cropBoxMovable={true}
                            cropBoxResizable={false}
                        />
                    </div>
                ) : null}
            </DialogContent>
            <DialogActions className="px-6">
                <Button
                    variant="outlined"
                    color="primary"
                    disableElevation
                    className="fs-14"
                    onClick={handleUpload}
                >
                    Unggah Ulang
                </Button>
                <Button
                    variant="contained"
                    color="primary"
                    disableElevation
                    className="text-white fs-14"
                    onClick={saveImage}
                >
                    Simpan
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ModalCrop;
