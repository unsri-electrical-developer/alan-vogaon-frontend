import { Button } from '@material-ui/core';
import { ArrowDownwardRounded, DescriptionRounded } from '@material-ui/icons';
import React, { useState } from 'react';
import { Card } from 'react-bootstrap';
import Swal from 'sweetalert2';

const UploadPdf = ({ uploadFile, maxSize, label, preview, note, required }) => {
    const [FileName, setFileName] = useState(null);
    let fileInput = React.createRef();

    const getExtension = (filename) => {
        var parts = filename.split('.');
        return parts[parts.length - 1];
    };

    const checkImage = (filename) => {
        var ext = getExtension(filename);
        switch (ext.toLowerCase()) {
            case 'pdf':
                return true;
            default:
                return false;
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
                uploadFile('', '');
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
                uploadFile(reader.result, initFile);
            };
        } else {
            Swal.fire({
                title: 'Oopss!',
                text: 'Format file tidak didukung',
                imageUrl: 'assets/images/icons/ic_error.svg',
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
                <div className="w-full h-full p-5 position-absolute d-flex align-items-center justify-content-center flex-column">
                    <div className="p-3 rounded-circle bg-primary flex items-center justify-center text-white">
                        {preview ? (
                            <DescriptionRounded fontSize="large" />
                        ) : (
                            <ArrowDownwardRounded fontSize="large" />
                        )}
                    </div>
                    <p className="m-0 text-center mt-3">
                        {FileName
                            ? FileName
                            : 'Anda dapat menarik dan meletakkan file disini untuk menambahkannya atau '}
                    </p>
                    {!FileName && (
                        <Button
                            variant="contained"
                            color="primary"
                            className="mt-3 text-white text-capitalize"
                            disableElevation
                        >
                            Unggah File
                        </Button>
                    )}
                </div>
                <input
                    type="file"
                    name="foto"
                    className="cursor-pointer"
                    onChange={handleImageChange}
                    ref={fileInput}
                    accept="application/pdf"
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
        </>
    );
};

export default UploadPdf;
