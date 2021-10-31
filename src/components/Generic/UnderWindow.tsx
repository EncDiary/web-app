import { FC } from "react";
import "./UnderWindow.scss";

const UnderWindow: FC = ({ children }) => {
  return (
    <div className="under-window">
      <div className="under-window-wrapper">{children}</div>
    </div>
  );
};

export default UnderWindow;
