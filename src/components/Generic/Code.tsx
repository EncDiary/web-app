import { FC } from "react";
import "./Code.scss";

const Code: FC = ({ children }) => {
  return <code className="code">{children}</code>;
};

export default Code;
