import { toast } from "react-toastify";

export const toastMessage = (resType, data) => {
  toast(data, {
    type: resType,
    position: "bottom-right",
    autoClose: 1000,
  });
};
