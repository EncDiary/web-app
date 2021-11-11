import { useState } from "react";

export const useFileInputState = (
  defaultText: string = "",
  placeholder: string = "Выберите файл"
): [string, string, (text: string) => void, (name: string) => void] => {
  const [fileText, setFileText] = useState(defaultText);
  const [fileName, setFileName] = useState(placeholder);

  return [
    fileText,
    fileName,
    (text: string) => setFileText(text),
    (name: string) => setFileName(name),
  ];
};
