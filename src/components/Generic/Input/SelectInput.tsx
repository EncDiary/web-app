import { FC } from "react";
import "./SelectInput.scss";

interface SelectInputProps {
  options: { value: string | number; content: string | number }[];
  selectedValue: number;
  onChange: React.ChangeEventHandler<HTMLSelectElement> | undefined;
}

const SelectInput: FC<SelectInputProps> = ({
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

export default SelectInput;
