import { FC } from "react";
import "./Title.scss";

interface TitleProps {
  text: string;
  size?: "medium" | "large" | "largest" | "small";
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
  ) : size === "medium" ? (
    <H2 className={className}>{text}</H2>
  ) : (
    <H3 className={className}>{text}</H3>
  );
};

const H1: FC<HProps> = ({ className, children }) => {
  return <h1 className={className}>{children}</h1>;
};

const H2: FC<HProps> = ({ className, children }) => {
  return <h2 className={className}>{children}</h2>;
};

const H3: FC<HProps> = ({ className, children }) => {
  return <h3 className={className}>{children}</h3>;
};

export default Title;
