import React from "react";

interface TitleProps {
  text: string;
  className?: string;
}

const Title: React.FC<TitleProps> = ({ text, className = "" }) => {
  return <h2 className={"title " + className}>{text}</h2>;
};

export default Title;
