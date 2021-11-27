import { FC } from "react";
import "./FileInput.scss";

interface FileInputProps {
  description: string;
  setFileText: (text: string) => void;
  fileName: string;
  setFileName: (name: string) => void;
  id: string;
}

const FileInput: FC<FileInputProps> = ({
  description,
  fileName,
  setFileName,
  setFileText,
  id,
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
    <div className="uploader">
      <input
        type="file"
        className="uploader__input"
        onChange={(event) => readFile(event)}
        id={id}
      />
      <label className="uploader__label" htmlFor={id}>
        <div className="uploader__label-description">{description}</div>
        <div className="uploader__label-filename">{fileName}</div>
      </label>
    </div>
  );
};

export default FileInput;
