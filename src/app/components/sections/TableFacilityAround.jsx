import { Avatar, IconButton, MenuItem, Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core';
import { MoreHoriz } from '@material-ui/icons';
import React from 'react';
import ScrollBar from 'react-perfect-scrollbar';

import { MatxMenu } from '../../../matx';

function TableFacilityAround({data, setShowFasilitas, setFasilitas, handleDelFasilitas}) {
  return (
    <ScrollBar className="flex-grow flex-column relative h-full">
        <Table className='whitespace-pre min-w-750'>
            <TableHead>
                <TableRow>
                    <TableCell
                        align="center"
                        className="w-90 border-b"
                    >
                        No
                    </TableCell>
                    <TableCell className='border-b'>Judul</TableCell>
                    <TableCell className='border-b'>Jarak</TableCell>
                    <TableCell className='border-b w-90' align="center">
                        Aksi
                    </TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {data?.length <= 0 ? (
                    <TableRow hover>
                        <TableCell
                            className="px-0"
                            align="center"
                            colSpan={4}
                        >
                            Data kosong.
                        </TableCell>
                    </TableRow>
                ) : (
                    data?.map((item, i) => (
                        <TableRow
                            hover
                            key={item.idx}
                        >
                            <TableCell
                                className="px-0"
                                align="center"
                            >
                                {i + 1}
                            </TableCell>
                            <TableCell className="px-0">
                                <div className="flex items-center gap-2">
                                    <Avatar
                                        src={item.icon}
                                        alt={item.title_id}
                                    />
                                    <span className="d-block text-elipse">
                                        {item.title_id}
                                    </span>
                                </div>
                            </TableCell>
                            <TableCell
                                className="px-0"
                            >{item.range}
                            </TableCell>
                            <TableCell
                                className="px-0"
                                align="center"
                            >
                                <MatxMenu
                                    menuButton={
                                        <div className="flex items-center">
                                            <IconButton size="small">
                                                <MoreHoriz />
                                            </IconButton>
                                        </div>
                                    }
                                    horizontalPosition="right"
                                >
                                    <MenuItem 
                                        onClick={() => {
                                            setShowFasilitas(true);
                                            setFasilitas(item)
                                        }}
                                        className="popup-menu-item">
                                        <img
                                            src="/assets/images/icons/ic_action_edit.svg"
                                            alt="icon edit"
                                        />
                                        <span className="pl-4">
                                            {' '}
                                            Edit{' '}
                                        </span>
                                    </MenuItem>
                                    <MenuItem onClick={()=> handleDelFasilitas(item.idx)} className="popup-menu-item">
                                        <img
                                            src="/assets/images/icons/ic_action_delete.svg"
                                            alt="icon hapus"
                                        />
                                        <span className="pl-4">
                                            {' '}
                                            Hapus{' '}
                                        </span>
                                    </MenuItem>
                                </MatxMenu>
                            </TableCell>
                        </TableRow>
                    ))
                )}
            </TableBody>
        </Table>
    </ScrollBar>
  )
}

export default TableFacilityAround