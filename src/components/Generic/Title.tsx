import { FC } from "react";
import "./Title.scss";

interface TitleProps {
  text: string;
  size?: "large" | "largest";
}

export const Title: FC<TitleProps> = ({ text, size = "large" }) => {
  return <h1 className={`title_${size}`}>{text}</h1>;
};

export default Title;
