import { Dialog, DialogContent, Grow } from '@material-ui/core';
import React from 'react';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Grow ref={ref} {...props} />;
  });

function ModalPreviewSec({open, handleClose, img}) {
  return (
    <Dialog
        open={open}
        TransitionComponent={Transition}
        onClose={handleClose}
        maxWidth="md"
      >
        <DialogContent className='p-0'>
          <img src={img} alt="preview section" className='w-full h-auto' />
        </DialogContent>
      </Dialog>
  )
}

export default ModalPreviewSec