import { FC } from "react";
import "./Title.scss";

interface TitleProps {
  text: string;
  size?: "medium" | "large" | "largest";
  align?: "center" | "left" | "right";
}

export const Title: FC<TitleProps> = ({
  text,
  size = "large",
  align = "center",
}) => {
  return <h1 className={`title_${size} title_${align}`}>{text}</h1>;
};

export default Title;
