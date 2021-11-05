import { FC } from "react";
import { Link } from "react-router-dom";
import "./Button.scss";

interface ButtonProps {
  text: string | JSX.Element;
  onClick?: () => void;
  type?: "button" | "submit" | "reset" | undefined;
  colorTheme?: "primary" | "secondary";
  size?: "medium" | "large";
  className?: string;
  disabled?: boolean;
}

interface ButtonLinkProps {
  link: string;
  text: string;
  colorTheme?: "primary" | "secondary";
  size?: "medium" | "large";
  className: string;
}

const Button: FC<ButtonProps> = ({
  text,
  onClick,
  colorTheme = "primary",
  size = "medium",
  className = "",
  disabled = false,
}) => {
  return (
    <button
      className={`button_${colorTheme} button_${size} ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {text}
    </button>
  );
};

export const ButtonLink: FC<ButtonLinkProps> = ({
  link,
  text,
  colorTheme = "primary",
  size = "medium",
  className = "",
}) => {
  return (
    <Link
      to={link}
      className={`button_${colorTheme} button_${size} ${className}`}
    >
      {text}
    </Link>
  );
};

export default Button;
