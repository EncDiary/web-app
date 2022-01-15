import { FC } from "react";
import "./Title.scss";

interface TitleProps {
  text: string;
  size?: "medium" | "large" | "largest";
  align?: "center" | "left" | "right";
}

interface HProps {
  className: string;
}

export const Title: FC<TitleProps> = ({
  text,
  size = "large",
  align = "center",
}) => {
  const className = `title_${size} title_${align}`;
  return size === "largest" || size === "large" ? (
    <H1 className={className}>{text}</H1>
  ) : (
    <H2 className={className}>{text}</H2>
  );
};

const H1: FC<HProps> = ({ className, children }) => {
  return <h1 className={className}>{children}</h1>;
};

const H2: FC<HProps> = ({ className, children }) => {
  return <h2 className={className}>{children}</h2>;
};

export default Title;
