import React from "react";

const CloseToaster = ({ closeToast }) => (
  <i className="Toastify__toast-close-icon" onClick={closeToast}>
    ×
  </i>
);

export default CloseToaster;
