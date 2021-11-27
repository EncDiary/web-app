import { FC } from "react";
import "./TextInput.scss";

interface TextInputProps {
  placeholder?: string;
  type?: "text" | "password";
  value?: string;
  name?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  size?: "medium" | "large";
}

const TextInput: FC<TextInputProps> = ({
  placeholder = "",
  type = "text",
  name = "",
  value = "",
  onChange = () => {},
  size = "medium",
}) => {
  return (
    <div className={`form__group form__group_${size}`}>
      <input
        className="form__group-field"
        type={type}
        autoComplete="off"
        placeholder={placeholder}
        name={name}
        id={`${name}_input`}
        value={value}
        onChange={onChange}
      />
      <label htmlFor={`${name}_input`} className="form__group-label">
        {placeholder}
      </label>
    </div>
  );
};

export default TextInput;
