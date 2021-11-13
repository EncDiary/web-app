import store from "../store";

export const enableIsLoading = () => {
  store.appStore.setIsLoading(true);
  document.body.style.overflow = "hidden";
};

export const disableIsLoading = () => {
  store.appStore.setIsLoading(false);
  document.body.style.overflow = "auto";
};
