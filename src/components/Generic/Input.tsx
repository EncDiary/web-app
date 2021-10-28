import { FC } from "react";
import "./Input.scss";

interface TextInputProps {
  placeholder?: string;
  type?: "text" | "password";
  value?: string;
  name?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

interface FileInputProps {
  description: string;
}

export const TextInput: FC<TextInputProps> = ({
  placeholder = "",
  type = "text",
  name = "",
  value = "",
  onChange = () => {},
}) => {
  return (
    <input
      type={type}
      className="text-input"
      autoComplete="off"
      placeholder={placeholder}
      name={name}
      value={value}
      onChange={onChange}
    />
  );
};

export const FileInput: FC<FileInputProps> = ({ description }) => {
  return (
    <label className="file-input">
      <input type="file" className="file-input__field" />
      <div className="file-input__description">{description}</div>
      <div className="file-input__file-name">file_name.txt</div>
    </label>
  );
};
