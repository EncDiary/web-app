import { FC } from "react";
import "./Explanation.scss";

interface ExplanationProps {
  text: string;
}

const Explanation: FC<ExplanationProps> = ({ text }) => {
  return <div className="explanation">{text}</div>;
};

export default Explanation;
