import { FC } from "react";
import ReactDOM from "react-dom";
import "./Spinner.scss";

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
