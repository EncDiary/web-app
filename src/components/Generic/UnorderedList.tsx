import { FC, ReactElement } from "react";
import "./UnorderedList.scss";

interface UnorderedListProps {
  items: string[] | ReactElement[];
  itemClassName?: string;
}

const UnorderedList: FC<UnorderedListProps> = ({
  items,
  itemClassName = "",
}) => {
  return (
    <ul className="ul">
      {items.map((item, i) => (
        <li className={`ul__item ${itemClassName}`} key={i}>
          {item}
        </li>
      ))}
    </ul>
  );
};

export default UnorderedList;
