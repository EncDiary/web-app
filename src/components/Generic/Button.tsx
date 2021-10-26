import { FC } from "react";
import "./Button.scss";

interface ButtonProps {
  text: string;
  clickHandler?: () => void;
}

export const PrimaryButton: FC<ButtonProps> = ({ text, clickHandler }) => {
  return (
    <button className="button__primary" onClick={clickHandler}>
      {text}
    </button>
  );
};

export const SecondaryButton: FC<ButtonProps> = ({ text, clickHandler }) => {
  return (
    <button className="button__secondary" onClick={clickHandler}>
      {text}
    </button>
  );
};
