import Swal from "sweetalert2";

export const serverErrorAlert = () => {
  Swal.fire({
    title: "Сервер не доступен",
    text: "Проверьте свое интернет соединение и попробуйте еще раз",
    icon: "error",
  });
};

export const successAlert = (title: string) => {
  Swal.fire({
    title,
    icon: "success",
    timer: 2000,
  });
};

export const errorAlert = (title: string) => {
  Swal.fire({
    title,
    icon: "error",
    confirmButtonText: "Понятно",
  });
};

export const confirmationAlert = (title: string, text: string) => {
  return Swal.fire({
    title,
    text,
    icon: "error",

    confirmButtonText: "Да",
    confirmButtonColor: "#51ac00",

    cancelButtonText: "Нет, не надо",
    cancelButtonColor: "#d33",
    showCancelButton: true,
    focusCancel: true,
  });
};
