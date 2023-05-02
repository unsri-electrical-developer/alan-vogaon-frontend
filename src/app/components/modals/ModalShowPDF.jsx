import { Dialog } from "@material-ui/core";
import React from "react";

const ModalShowPDF = ({ handleClose, open, pdf }) => {
  let token = localStorage.getItem("jwt_token");

  return (
    <Dialog onClose={handleClose} open={open} maxWidth="md" fullWidth>
      <div className="px-3 pt-3 pb-2">
        <iframe
          title="show-pdf"
          src={`${pdf}?token=${token}`}
          className="w-full"
          height="450px"
        ></iframe>
      </div>
    </Dialog>
  );
};

export default ModalShowPDF;
