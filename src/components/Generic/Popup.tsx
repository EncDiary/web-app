import Swal from "sweetalert2";

export const confirmationPopup = (title: string, text: string) => {
  return Swal.fire({
    icon: "warning",
    title,
    text,
    showCancelButton: true,
    reverseButtons: true,
    customClass: {
      confirmButton: "button_primary button_medium",
      cancelButton: "button_secondary button_medium",
    },
    buttonsStyling: false,
    confirmButtonText: "Удалить",
    cancelButtonText: "Отмена",
    focusCancel: true,
  });
};

export const errorPopup = (title: string, text?: string) => {
  return Swal.fire({
    icon: "error",
    title,
    text,
    customClass: {
      confirmButton: "button_primary button_medium",
    },
    buttonsStyling: false,
  });
};
