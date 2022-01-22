import { FC, ReactElement } from "react";
import "./UnorderedList.scss";

interface UnorderedListProps {
  items: string[] | ReactElement[];
}

const UnorderedList: FC<UnorderedListProps> = ({ items }) => {
  return (
    <ul className="ul">
      {items.map((item, i) => (
        <li className="ul__item" key={i}>
          {item}
        </li>
      ))}
    </ul>
  );
};

export default UnorderedList;
