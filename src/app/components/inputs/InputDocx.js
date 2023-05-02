import { IconButton } from '@material-ui/core';
import { Visibility } from '@material-ui/icons';
import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

const InputDocx = ({ uploadFoto, placeholder, img_preview }) => {
    let fileInput = React.createRef();
    const [preview, setPreview] = useState(null);

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
            case 'doc':
            case 'docx':
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
        window.open(img_preview, '_blank');
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
                accept=".doc, .docx"
                className="w-full"
            />
            {preview ? (
                <IconButton size="small" onClick={handleModal}>
                    <Visibility fontSize="small" />
                </IconButton>
            ) : (
                <div className="p-3"></div>
            )}
        </div>
    );
};

export default InputDocx;
