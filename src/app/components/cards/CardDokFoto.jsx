import { Button, ButtonGroup, Card } from '@material-ui/core';
import React, { Fragment } from 'react';

const CardDokFoto = ({
    editable,
    img,
    i,
    id,
    item,
    handleDelFoto,
    setDetailFoto,
    setOpenUpload
}) => {
    return (
        <Fragment>
            <Card elevation={0} className="position-relative card-img-doc">
                <img
                    src={img}
                    alt="gambar"
                    className="w-full radius-6 ratio-4-3 object-fit"
                />
                <div className="position-absolute bg-secondary text-white rounded-circle flex items-center justify-center number">
                    {i + 1}
                </div>
            </Card>
            {editable ? (
                <ButtonGroup
                    className="mt-4 w-full"
                    disableElevation
                    variant="contained"
                >
                    <Button
                        className="bg-error text-white w-50p"
                        onClick={() => handleDelFoto(id)}
                    >
                        Hapus
                    </Button>
                    <Button
                        color="secondary"
                        className="text-white w-50p"
                        onClick={() => {
                            setDetailFoto(item);
                            setOpenUpload(true);
                        }}
                    >
                        Edit
                    </Button>
                </ButtonGroup>
            ) : null}
        </Fragment>
    );
};

export default CardDokFoto;
