import Swal from "sweetalert2";

export const confirmationAlert = (title: string, text: string) => {
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

export const errorAlert = (title: string, text?: string) => {
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

export const successAlert = (title: string, text?: string) => {
  return Swal.fire({
    icon: "success",
    title,
    text,
    customClass: {
      confirmButton: "button_primary button_medium",
    },
    buttonsStyling: false,
  });
};
