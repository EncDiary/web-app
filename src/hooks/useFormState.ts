import { useState } from "react";

export const useFormState = (fields: {
  [key: string]: string;
}): [
  { [key: string]: string },
  (event: React.ChangeEvent<HTMLInputElement>) => void
] => {
  const [formValues, setFormValues] = useState(fields);

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues({
      ...formValues,
      [event.target.name]: event.target.value,
    });
  };

  return [formValues, changeHandler];
};
