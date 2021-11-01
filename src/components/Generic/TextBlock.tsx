import { FC } from "react";
import "./TextBlock.scss";

interface TextBlockProps {
  size?: "small" | "medium" | "large" | "largest";
}

const TextBlock: FC<TextBlockProps> = ({ children, size = "medium" }) => {
  return <div className={`text-block_${size}`}>{children}</div>;
};

export default TextBlock;
