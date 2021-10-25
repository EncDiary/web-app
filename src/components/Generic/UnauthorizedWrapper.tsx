import { FC } from "react";
import "./UnauthorizedWrapper.scss";

const UnauthorizedWrapper: FC = ({ children }) => {
  return <div className="unauthorized-wrapper">{children}</div>;
};

export default UnauthorizedWrapper;
