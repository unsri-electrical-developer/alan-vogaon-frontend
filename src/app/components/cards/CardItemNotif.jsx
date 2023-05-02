import { Icon } from '@material-ui/core';
import React from 'react';
import { Link } from 'react-router-dom';

const CardItemNotif = ({ link, icon, text, time, onClick }) => {
    const bold = (text) => {
        var bold = /\*\*(.*?)\*\*/gm;
        var html = text.replace(bold, '<strong>$1</strong>');
        return html;
    };
    return (
        <Link to={link} onClick={onClick}>
            <div className="flex item-notif">
                <div className="container-icon bg-secondary rounded-circle flex items-center justify-center">
                    <Icon className="text-white" fontSize="small">
                        {icon}
                    </Icon>
                </div>
                <div className="ml-3 container-content">
                    <p
                        className="mb-1 text-13"
                        dangerouslySetInnerHTML={{ __html: bold(text) }}
                    />
                    <p className="text-11 text-muted m-0 w-full">{time}</p>
                </div>
            </div>
        </Link>
    );
};

export default CardItemNotif;
