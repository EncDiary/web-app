import { FC } from "react";
import ReactDOM from "react-dom";
import { disableIsLoading, enableIsLoading } from "../../modules/loading";
import "./Spinner.scss";

export const spinnerCreator = async (action: () => void) => {
  enableIsLoading();
  await action();
  disableIsLoading();
};

export const Spinner: FC = () => {
  return <div className="spinner"></div>;
};

export const Loading: FC = () => {
  return ReactDOM.createPortal(
    <div className="loading">
      <Spinner />
    </div>,
    document.body
  );
};
