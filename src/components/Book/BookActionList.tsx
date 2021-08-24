import React, { useState } from "react";
import {
  AddIcon,
  ImportIcon,
  LockIcon,
  MoreIcon,
  SearchIcon,
} from "../../assets/SvgIcons";
import BookActionItem from "./BookActionItem";
import { currentOpeningTabTypes } from "../../types/app";
import { useActions } from "../../hooks/useActions";

const BookActionList: React.FC = () => {
  const [showAdditionalIcons, setShowAdditionalIcons] = useState(false);

  const { setCurrentOpeningTabRedux } = useActions();

  function clickToChangeCurrentTab(showPanel: currentOpeningTabTypes) {
    setCurrentOpeningTabRedux(showPanel);
  }

  return (
    <div className="open__icons">
      <div className="open__icons-main">
        <BookActionItem
          icon={LockIcon}
          onClick={() => clickToChangeCurrentTab(currentOpeningTabTypes.Open)}
          name="Открыть"
        />
        <BookActionItem
          icon={AddIcon}
          onClick={() => clickToChangeCurrentTab(currentOpeningTabTypes.Create)}
          name="Создать"
        />
        <BookActionItem
          icon={MoreIcon}
          onClick={() => setShowAdditionalIcons(!showAdditionalIcons)}
          name="Больше"
        />
      </div>

      {showAdditionalIcons && (
        <div className="open__icons-additional">
          <BookActionItem
            icon={SearchIcon}
            onClick={() => clickToChangeCurrentTab(currentOpeningTabTypes.Find)}
            name="Найти"
          />
          <BookActionItem
            icon={ImportIcon}
            onClick={() =>
              clickToChangeCurrentTab(currentOpeningTabTypes.Import)
            }
            name="Импорт"
          />
        </div>
      )}
    </div>
  );
};

export default BookActionList;
