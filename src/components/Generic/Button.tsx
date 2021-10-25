import { FC } from "react";
import "./Button.scss";

interface ButtonProps {
  text: string;
}

const Button: FC<ButtonProps> = ({ text }) => {
  return <button className="button__primary">{text}</button>;
};

export default Button;
