import { Card } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { CheckCircleOutline } from '@material-ui/icons';
import clsx from 'clsx';
import React from 'react';
import { Link, useHistory } from 'react-router-dom';

import { formatRupiah } from '../../../utlis/formatRupiah';

const useStyles = makeStyles(({ palette, ...theme }) =>
    createStyles({
        listTerapkan: {
            listStyle: 'none',
            padding: 0
        },
        borderCardPaket: {
            height: 1,
            width: '100%',
            background: '#E5E5E5',
            margin: '15px 0'
        },
        cardPaket: {
            transition: '.3s',
            borderWidth: 2
        },
        cardPaketSelected: {
            borderColor: palette.secondary.main
        }
    })
);
const CardPaket = ({
    selected,
    id,
    nama,
    desc,
    price,
    fitur,
    tipe,
    discount,
    disabled,
    path
}) => {
    const classes = useStyles();
    const history = useHistory();
    return (
        <Card
            elevation={0}
            variant="outlined"
            onClick={() => {
                if (!disabled) history.push(`${path}/${id}`);
            }}
            className={clsx(
                `p-5 cursor-pointer h-full flex flex-column justify-between`,
                classes.cardPaket,
                selected ? classes.cardPaketSelected : null
            )}
        >
            <div>
                <h5 className="fw-bold">{nama}</h5>
                {discount ? (
                    <>
                        <h4 className="fw-bold mt-4 mb-1">
                            {formatRupiah(price - discount, 'Rp')}
                            <span className="fw-normal text-capitalize">
                                /{tipe}
                            </span>
                        </h4>
                        <h6 className="mb-4 text-decoration-line-through text-danger">
                            {formatRupiah(price, 'Rp')}
                            <span className="fw-normal text-capitalize">
                                /{tipe}
                            </span>
                        </h6>
                    </>
                ) : (
                    <h4 className="fw-bold my-4">
                        {formatRupiah(price, 'Rp')}
                        <span className="fw-normal text-capitalize">
                            /{tipe}
                        </span>
                    </h4>
                )}
                <p className="m-0">{desc}</p>
                <div className={classes.borderCardPaket} />
                <ul className={classes.listTerapkan}>
                    {fitur?.map((item) => (
                        <li
                            className="flex mb-3 items-center"
                            key={item.fitur_code}
                        >
                            <CheckCircleOutline
                                fontSize="medium"
                                className="text-secondary"
                            />
                            <p className="m-0 ml-2">{item.fitur_name}</p>
                        </li>
                    ))}
                </ul>
            </div>
            {disabled ? (
                <button
                    className={'btn btn-light w-full mt-4'}
                    disabled={disabled}
                >
                    Paket Anda
                </button>
            ) : (
                <Link
                    to={`${path}/${id}`}
                    className="w-full text-white mt-4 btn btn-secondary"
                >
                    Pilih Paket
                </Link>
            )}
        </Card>
    );
};

export default CardPaket;
