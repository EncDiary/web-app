import React from "react";
import {
  AddIcon,
  ImportIcon,
  LockIcon,
  SearchIcon,
} from "../../assets/SvgIcons";
import BookActionItem from "./BookActionItem";
import { currentOpeningTabTypes } from "../../types/app";

const BookActionList: React.FC = () => {
  return (
    <div className="open__icons">
      <BookActionItem
        icon={LockIcon}
        showPanel={currentOpeningTabTypes.Open}
        name="Открыть"
      />
      <BookActionItem
        icon={AddIcon}
        showPanel={currentOpeningTabTypes.Create}
        name="Создать"
      />
      <BookActionItem
        icon={SearchIcon}
        showPanel={currentOpeningTabTypes.Find}
        name="Найти"
      />
      <BookActionItem
        icon={ImportIcon}
        showPanel={currentOpeningTabTypes.Import}
        name="Импорт"
      />
    </div>
  );
};

export default BookActionList;
