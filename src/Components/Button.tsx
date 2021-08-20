import React from "react";

interface ButtonProps {
  text: string;
  className?: string;
  isPrimary?: boolean;
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({
  text,
  className = "",
  isPrimary = true,
  onClick = function () {},
}) => {
  const importance = isPrimary ? "button-primary" : "button-secondary";

  return (
    <button
      onClick={onClick}
      type="submit"
      className={importance + " button " + className}
    >
      {text}
    </button>
  );
};

export default Button;
