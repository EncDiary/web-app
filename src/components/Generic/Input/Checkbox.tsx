import { FC } from "react";
import "./Checkbox.scss";

interface CheckboxProps {
  checked?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  name?: string;
  disabled?: boolean;
}

const Checkbox: FC<CheckboxProps> = ({
  children,
  checked,
  onChange,
  name,
  disabled,
}) => {
  return (
    <div className="checkbox-field">
      <input
        type="checkbox"
        className="checkbox-field__input"
        checked={checked}
        onChange={onChange}
        name={name}
        disabled={disabled}
      />
      <label className="checkbox-field__label">{children}</label>
    </div>
  );
};

export default Checkbox;
