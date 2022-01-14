import { FC } from "react";
import "./Checkbox.scss";

interface CheckboxProps {
  checked?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  name?: string;
}

const Checkbox: FC<CheckboxProps> = ({ children, checked, onChange, name }) => {
  return (
    <div className="checkbox-field">
      <input
        type="checkbox"
        className="checkbox-field__input"
        checked={checked}
        onChange={onChange}
        name={name}
      />
      <label className="checkbox-field__label">{children}</label>
    </div>
  );
};

export default Checkbox;
