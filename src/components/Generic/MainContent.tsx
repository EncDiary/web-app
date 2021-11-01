import { FC } from "react";
import "./MainContent.scss";

interface MainContentProps {
  type: string;
}

const MainContent: FC<MainContentProps> = ({ children, type }) => {
  return <main className={`main_${type}`}>{children}</main>;
};

export default MainContent;
