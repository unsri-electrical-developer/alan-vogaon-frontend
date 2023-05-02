import { DeleteOutline, EditOutlined } from '@material-ui/icons';
import React from 'react';

function CardGallery({img, handleDel, handleEdit}) {
  return (
    <div className="relative">
        <img src={img} alt="galeri" className='aspect-square w-full object-fit-cover' />
        <div className="absolute top-0 left-0 overlay-gallery w-full h-full flex items-center justify-center">
            <div className="flex gap-3">
            <button type='button' onClick={handleEdit} className='btn-gallery-action border-radius-circle border-0'>
                <EditOutlined color='primary' />
            </button>
            <button type='button' onClick={handleDel} className='btn-gallery-action border-radius-circle border-0'>
                <DeleteOutline color='error' />
            </button>
            </div>
        </div>
    </div>
  )
}

export default CardGallery