import { IconButton } from '@material-ui/core';
import { Visibility } from '@material-ui/icons';
import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

import { ModalImagePreview } from '..';

const InputImage = ({ uploadFoto, placeholder, img_preview, icon }) => {
    let fileInput = React.createRef();
    const [preview, setPreview] = useState(null);
    const [openModal, setOpenModal] = useState(false);

    useEffect(() => {
        setPreview(img_preview);
    }, [img_preview]);

    const getExtension = (filename) => {
        var parts = filename.split('.');
        return parts[parts.length - 1];
    };

    const isImage = (filename) => {
        var ext = getExtension(filename);
        switch (ext.toLowerCase()) {
            case 'jpg':
            case 'png':
            case 'jpeg':
                return true;
            default:
                return false;
        }
    };

    const handleImageChange = (e) => {
        let files = e.target.files || e.dataTransfer.files;
        if (!files.length) return;
        if (isImage(e.target.files[0].name)) {
            let reader = new FileReader();
            reader.readAsDataURL(files[0]);
            const initFile = URL.createObjectURL(e.target.files[0]);
            reader.onloadend = () => {
                uploadFoto(reader.result, initFile);
                setPreview(initFile);
            };
        } else {
            Swal.fire({
                icon: 'warning',
                title: 'Invalid File Format',
                showConfirmButton: false,
                timer: 1500
            });
        }
    };

    const handleModal = () => {
        setOpenModal(!openModal);
    };

    return (
        <div className="_input-image relative flex items-center justify-between">
            <span className="placeholder">
                {!placeholder ? 'Image' : placeholder}
            </span>
            <input
                type="file"
                name="foto"
                onChange={handleImageChange}
                ref={fileInput}
                accept="image/png, image/jpeg, image/jpg"
                className="w-full"
            />
            {preview ? (
                <IconButton size="small" onClick={handleModal}>
                    <Visibility fontSize="small" />
                </IconButton>
            ) : (
                <div className="p-3"></div>
            )}
            {openModal && (
                <ModalImagePreview
                    open={openModal}
                    handleClose={handleModal}
                    image={preview}
                    icon
                />
            )}
        </div>
    );
};

export default InputImage;
