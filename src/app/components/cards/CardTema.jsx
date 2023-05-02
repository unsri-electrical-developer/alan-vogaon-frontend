import { Button, Card } from '@material-ui/core';
import React from 'react';

const CardTema = ({ img, text_color, color, selected, code, handleSelect }) => {
    return (
        <Card
            elevation={3}
            className={`radius-6 card-tema ${selected ? 'active' : ''}`}
            style={{ borderColor: selected ? color : '#fafafa' }}
        >
            <div className="position-relative">
                <img src={img} alt={text_color} className="w-full" />
                <div
                    className="position-absolute px-3 py-2 container-name text-white capitalize"
                    style={{ background: color }}
                >
                    {text_color}
                </div>
            </div>
            <div className="px-5 py-4">
                <Button
                    color="secondary"
                    variant="contained"
                    disableElevation
                    className="w-full text-white"
                    onClick={() => handleSelect(code)}
                    disabled={selected}
                >
                    Aktifkan
                </Button>
            </div>
        </Card>
    );
};

export default CardTema;
