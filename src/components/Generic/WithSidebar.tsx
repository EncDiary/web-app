import { FC } from "react";
import "./WithSidebar.scss";

const WithSidebar: FC = ({ children }) => {
  return <div className="with-sidebar">{children}</div>;
};

export default WithSidebar;
