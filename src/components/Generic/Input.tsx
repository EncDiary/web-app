import { FC } from "react";
import "./Input.scss";

interface TextInputProps {
  placeholder: string;
  type: string;
}

interface FileInputProps {
  description: string;
}

export const TextInput: FC<TextInputProps> = ({ placeholder, type }) => {
  return (
    <input
      type={type}
      className="text-input"
      autoComplete="off"
      placeholder={placeholder}
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
