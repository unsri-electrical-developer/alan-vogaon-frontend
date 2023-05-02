import { IconButton, MenuItem, Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core';
import { MoreHoriz } from '@material-ui/icons';
import React from 'react';
import ScrollBar from 'react-perfect-scrollbar';

import { MatxMenu } from '../../../matx';

function TableDetails({data, setShowDetails, setDetails, handleDelDetails}) {
  return (
    <ScrollBar className="flex-grow flex-column relative h-full">
        <Table className='whitespace-pre min-w-750'>
            <TableHead>
                <TableRow>
                    <TableCell className='border-b w-90' align='center'>NO</TableCell>
                    <TableCell className='border-b px-2'>Judul[ID]</TableCell>
                    <TableCell className='border-b px-2'>Judul[EN]</TableCell>
                    <TableCell className='border-b px-2'>Detail[ID]</TableCell>
                    <TableCell className='border-b px-2'>Detail[EN]</TableCell>
                    <TableCell className='border-b w-90' align="center">
                        Aksi
                    </TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {
                    data?.length <= 0 ?
                        <TableRow hover>
                            <TableCell colSpan={6} className="text-center">Data Kosong</TableCell>
                        </TableRow>
                    : data?.map((item, i) => (
                        <TableRow
                            hover
                            key={item.idx}
                        >
                            <TableCell align='center' className="w-90">
                                {i + 1}
                            </TableCell>
                            <TableCell className="px-2">
                                <span className="d-block text-elipse" title={item.title_id}>
                                {item.title_id}
                                </span>
                            </TableCell>
                            <TableCell className="px-2">
                                <span className="d-block text-elipse" title={item.title_en}>
                                {item.title_en}
                                </span>
                            </TableCell>
                            <TableCell className="px-2">
                                <span className="text-elipse w-full d-block" title={item.desc_id}>{item.desc_id}</span>
                            </TableCell>
                            <TableCell className="px-2">
                                <span className="text-elipse w-full d-block" title={item.desc_id}>{item.desc_id}</span>
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
                                            setShowDetails(true);
                                            setDetails(item)
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
                                    <MenuItem onClick={()=> handleDelDetails(item.idx)} className="popup-menu-item">
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
                }
            </TableBody>
        </Table>
    </ScrollBar>
  )
}

export default TableDetails