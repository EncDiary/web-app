import { FC } from "react";
import "./MainContent.scss";

interface MainContentProps {
  withSidebar?: boolean;
}

const MainContent: FC<MainContentProps> = ({
  children,
  withSidebar = false,
}) => {
  return (
    <main className={withSidebar ? "main_with-sidebar" : ""}>{children}</main>
  );
};

export default MainContent;
