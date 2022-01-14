import { FC } from "react";
import "./Container.scss";

const Container: FC = ({ children }) => {
  return <div className="container">{children}</div>;
};

export default Container;
