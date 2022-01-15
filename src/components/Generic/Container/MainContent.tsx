import { FC, useEffect } from "react";
import "./MainContent.scss";

interface MainContentProps {
  withSidebar?: boolean;
}

const MainContent: FC<MainContentProps> = ({
  children,
  withSidebar = false,
}) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className={withSidebar ? "main_with-sidebar" : ""}>{children}</main>
  );
};

export default MainContent;
