import { FC } from "react";
import "./Input.scss";

interface TextInputProps {
  placeholder?: string;
  type?: "text" | "password";
  value?: string;
  name?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  size?: "medium" | "large";
}

interface FileInputProps {
  description: string;
  setFileText: (text: string) => void;
  fileName: string;
  setFileName: (name: string) => void;
}

interface SelectInputProps {
  options: { value: string | number; content: string | number }[];
  selectedValue: number;
  onChange: React.ChangeEventHandler<HTMLSelectElement> | undefined;
}

export const TextInput: FC<TextInputProps> = ({
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

export const FileInput: FC<FileInputProps> = ({
  description,
  fileName,
  setFileName,
  setFileText,
}) => {
  const readFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.persist();
    const fileReader = new FileReader();
    fileReader.onload = () => {
      const fileText = fileReader.result;
      if (typeof fileText === "string") {
        setFileText(fileText);
      }
    };
    const files = event.currentTarget.files;
    if (files) {
      fileReader.readAsText(files[0]);
      setFileName(files[0].name);
    }
  };

  return (
    <label className="file-input">
      <input
        type="file"
        className="file-input__field"
        onChange={(event) => readFile(event)}
      />
      <div className="file-input__description">{description}</div>
      <div className="file-input__file-name">{fileName}</div>
    </label>
  );
};

export const SelectInput: FC<SelectInputProps> = ({
  options,
  selectedValue,
  onChange,
}) => {
  return (
    <select
      className="select"
      required
      defaultValue={selectedValue}
      onChange={onChange}
    >
      {options.map((option) => {
        return (
          <option value={option.value} key={option.value}>
            {option.content}
          </option>
        );
      })}
    </select>
  );
};
