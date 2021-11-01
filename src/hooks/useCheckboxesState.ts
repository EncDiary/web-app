import { useState } from "react";

export const useCheckboxesState = (fields: {
  [key: string]: boolean;
}): [
  { [key: string]: boolean },
  (event: React.ChangeEvent<HTMLInputElement>) => void
] => {
  const [formValues, setFormValues] = useState(fields);

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues({
      ...formValues,
      [event.target.name]: event.target.checked,
    });
  };

  return [formValues, changeHandler];
};
