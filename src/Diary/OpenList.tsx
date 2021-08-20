import React from "react";
import { AddIcon, ImportIcon, LockIcon, SearchIcon } from "../assets/SvgIcons";
import OpenItem from "./OpenItem";
import { currentOpeningTabTypes } from "../redux/types/app";

const OpenList: React.FC = () => {
  return (
    <div className="open__icons">
      <OpenItem
        icon={LockIcon}
        showPanel={currentOpeningTabTypes.Open}
        name="Открыть"
      />
      <OpenItem
        icon={AddIcon}
        showPanel={currentOpeningTabTypes.Create}
        name="Создать"
      />
      <OpenItem
        icon={SearchIcon}
        showPanel={currentOpeningTabTypes.Find}
        name="Найти"
      />
      <OpenItem
        icon={ImportIcon}
        showPanel={currentOpeningTabTypes.Import}
        name="Импорт"
      />
    </div>
  );
};

export default OpenList;
