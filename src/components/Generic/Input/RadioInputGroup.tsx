import { FC } from "react";
import "./RadioInputGroup.scss";

interface RadioInputGroupProps {
  name: string;
  items: { id: string; title: string; checked?: boolean }[];
  currentSelection?: string;
  setCurrentSelection: (selection: any) => void;
}

interface RadioInputGroupItemProps {
  id: string;
  title: string;
  name: string;
  checked?: boolean;
  setCurrentSelection: () => void;
}

const RadioInputGroup: FC<RadioInputGroupProps> = ({
  name,
  items,
  currentSelection,
  setCurrentSelection,
}) => {
  return (
    <div className="radio-input-group">
      {items.map((item) => {
        return (
          <RadioInputGroupItem
            id={item.id}
            title={item.title}
            name={name}
            checked={item.id === currentSelection}
            key={item.id}
            setCurrentSelection={() => setCurrentSelection(item.id)}
          />
        );
      })}
    </div>
  );
};

const RadioInputGroupItem: FC<RadioInputGroupItemProps> = ({
  id,
  title,
  name,
  checked,
  setCurrentSelection,
}) => {
  return (
    <div className="radio-input-group__item">
      <input
        type="radio"
        className="radio-input-group__item-field"
        name={name}
        id={id}
        defaultChecked={checked}
        onClick={setCurrentSelection}
      />
      <label className="radio-input-group__item-label" htmlFor={id}>
        {title}
      </label>
    </div>
  );
};

export default RadioInputGroup;
