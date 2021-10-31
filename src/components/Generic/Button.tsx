import { FC } from "react";
import "./Button.scss";

interface ButtonProps {
  text: string | JSX.Element;
  onClick?: () => void;
  type?: "button" | "submit" | "reset" | undefined;
  colorTheme?: "primary" | "secondary";
  size?: "medium" | "large";
  className?: string;
}

const Button: FC<ButtonProps> = ({
  text,
  onClick,
  colorTheme = "primary",
  size = "medium",
  className = "",
}) => {
  return (
    <button
      className={`button_${colorTheme} button_${size} ${className}`}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default Button;
