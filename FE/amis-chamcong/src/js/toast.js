
export const OPTION_TOAST_MESS = {
  toastClassName: "custom-toast-class",
  position: "bottom-right",
  timeout: 2000,
  closeOnClick: false,
  pauseOnFocusLoss: false,
  pauseOnHover: false,
  draggable: true,
  draggablePercent: 0.6,
  showCloseButtonOnHover: true,
  hideProgressBar: true,
  closeButton: false,
  icon: true,
  rtl: false,
};
export const OPTION_TOAST_MESS_SUCCESS = {
  ...OPTION_TOAST_MESS,
  toastClassName: "custom-success-toast-class",
  bodyClassName: "custom-body",
  iconClass: "success-icons",
};

export const OPTION_TOAST_MESS_ERROR = {
    ...OPTION_TOAST_MESS,
    toastClassName: "custom-error-toast-class",
    bodyClassName: "custom-error-body",
    iconClass: 'success-error-icons',  
  };