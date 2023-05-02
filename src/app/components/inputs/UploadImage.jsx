import 'cropperjs/dist/cropper.css';

import { Button } from '@material-ui/core';
import { AddPhotoAlternateOutlined } from '@material-ui/icons';
import React, { useState } from 'react';
import { useRef } from 'react';
import { Card } from 'react-bootstrap';
import Swal from 'sweetalert2';

import ModalCrop from '../modals/ModalCrop';

const UploadImage = ({
    uploadFoto,
    maxSize,
    label,
    preview,
    required,
    aspectRatio,
    maxHeight,
    note,
    formatIcon
}) => {
    const [FileName, setFileName] = useState(null);
    const [FilePath, setFilePath] = useState(null);
    let fileInput = useRef();

    const getExtension = (filename) => {
        var parts = filename.split('.');
        return parts[parts.length - 1];
    };

    const checkImage = (filename) => {
        var ext = getExtension(filename);
        if(formatIcon){
            switch (ext.toLowerCase()) {
                case 'svg':
                case 'webp':
                    return true;
                default:
                    return false;
            }
        } else {
            switch (ext.toLowerCase()) {
                case 'jpg':
                case 'png':
                case 'webp':
                case 'jpeg':
                    return true;
                default:
                    return false;
            }
        }
    };

    const kbConverter = (size) => {
        return size * 1024;
    };

    const handleImageChange = (e) => {
        let files = e.target.files || e.dataTransfer.files;

        if (!files.length) return;
        if (checkImage(e.target.files[0].name)) {
            let file = files[0];
            let reader = new FileReader();
            if (maxSize && kbConverter(maxSize) < file.size) {
                fileInput.current.value = '';
                setFileName('');
                uploadFoto('', '');
                Swal.fire({
                    title: 'Oopss!',
                    text: 'Ukuran file terlalu besar',
                    imageUrl: '/assets/images/icons/ic_error.svg',
                    imageWidth: 92,
                    imageHeight: 92,
                    confirmButtonText: 'Ok',
                    confirmButtonColor: '#0083E2'
                });
                return;
            }
            reader.readAsDataURL(file);
            const initFile = URL.createObjectURL(file);
            setFileName(file.name);
            reader.onloadend = () => {
                // if (noCrop) {
                    uploadFoto(reader.result, initFile);
                // } else {
                //     setFilePath(initFile);
                // }
            };
        } else {
            Swal.fire({
                title: 'Oopss!',
                text: 'Format file tidak didukung',
                imageUrl: '/assets/images/icons/ic_error.svg',
                imageWidth: 92,
                imageHeight: 92,
                confirmButtonText: 'Ok',
                confirmButtonColor: '#0083E2'
            });
        }
    };
    return (
        <>
            {label && (
                <label className="mb-2">
                    {label}
                    {required ? <span className="text-danger"> *</span> : null}
                </label>
            )}
            <Card className="card-input-image position-relative shadow-none">
                {preview && (
                    <div className="h-full w-full position-absolute">
                        <img
                            src={preview}
                            alt="preview foto"
                            className="preview h-full w-full"
                        />
                    </div>
                )}
                <div
                    className={`w-full h-full p-5 position-absolute d-flex align-items-center justify-content-center flex-column ${
                        preview ? 'has-preview' : null
                    }`}
                >
                    <AddPhotoAlternateOutlined
                        fontSize="large"
                        color="primary"
                    />
                    <p className="m-0 text-center mt-2">
                        {FileName
                            ? FileName
                            : 'Seret foto ke area ini atau tekan tombol unggah dibawah ini. Pastikan foto memiliki kualitas yang baik.'}
                    </p>
                    <Button
                        variant="contained"
                        color="primary"
                        className="mt-3 text-white text-capitalize"
                        disableElevation
                    >
                        Unggah Foto
                    </Button>
                </div>
                <input
                    type="file"
                    name="foto"
                    className="cursor-pointer"
                    onChange={handleImageChange}
                    ref={fileInput}
                    accept={formatIcon ? "image/svg+xml, image/webp" : "image/webp, image/jpg, image/jpeg, image/png"}
                    id="input-file"
                />
            </Card>
            {note && (
                <ul className="pl-3 mt-4 mb-0">
                    {note?.map((item, i) => (
                        <li key={i + 1} className="text-muted">
                            {item}
                        </li>
                    ))}
                </ul>
            )}
            {FilePath?.length > 0 ? (
                <ModalCrop
                    handleClose={() => {
                        setFilePath('');
                        fileInput.current.value = '';
                    }}
                    open={true}
                    filePath={FilePath}
                    handleSave={(data) => {
                        uploadFoto(data, data);
                        setFilePath(null);
                    }}
                    handleUpload={() => fileInput.current?.click()}
                    aspectRatio={aspectRatio || 1 / 1}
                    maxHeight={maxHeight}
                />
            ) : null}
        </>
    );
};

export default UploadImage;