import { FC } from "react";
import "./RadioInput.scss";

interface RadioInputProps {
  id: string;
  value?: string;
  checked?: boolean;
  name?: string;
  onChange?: () => void;
}

const RadioInput: FC<RadioInputProps> = ({
  children,
  id,
  value,
  checked,
  name,
  onChange,
}) => {
  return (
    <div className="radio-field">
      <input
        id={id}
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
      />
      <label htmlFor={id}>{children}</label>
    </div>
  );
};

export default RadioInput;
