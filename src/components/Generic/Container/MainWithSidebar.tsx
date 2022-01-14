import { FC } from "react";
import "./MainWithSidebar.scss";

const MainWithSidebar: FC = ({ children }) => {
  return <div className="main-with-sidebar">{children}</div>;
};

export default MainWithSidebar;
