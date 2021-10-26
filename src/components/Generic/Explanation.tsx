import { FC } from "react";
import "./Explanation.scss";

const Explanation: FC = ({ children }) => {
  return <div className="explanation">{children}</div>;
};

export default Explanation;
