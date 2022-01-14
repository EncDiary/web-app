import { FC } from "react";
import "./UnauthorizedContainer.scss";

const UnauthorizedWrapper: FC = ({ children }) => {
  return <div className="unauthorized-container">{children}</div>;
};

export default UnauthorizedWrapper;
