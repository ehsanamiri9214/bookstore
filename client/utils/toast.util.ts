import { TOAST_TYPE_ENUM } from "./../enums/toast-type.enum";
import { ToastType } from "~~/types";
import { POSITION, useToast } from "vue-toastification";

const showToast = (
  message: string,
  type: TOAST_TYPE_ENUM = TOAST_TYPE_ENUM.ERROR
) => {
  const toast = useToast();
  if (type === TOAST_TYPE_ENUM.ERROR) {
    toast.error(message, {
      position: POSITION.BOTTOM_LEFT,
      rtl: true,
    });
  } else if (type === TOAST_TYPE_ENUM.SUCCESS) {
    toast.success(message, {
      position: POSITION.BOTTOM_LEFT,
      rtl: true,
    });
  }
};

export { showToast };
