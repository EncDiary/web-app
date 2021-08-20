import React from "react";
import { AddIcon, ImportIcon, LockIcon, SearchIcon } from "../assets/SvgIcons";
import OpenItem from "./OpenItem";

const OpenList: React.FC = () => {
  return (
    <div className="open__icons">
      <OpenItem icon={LockIcon} showPanel="open" name="Открыть" />
      <OpenItem icon={AddIcon} showPanel="add" name="Создать" />
      <OpenItem icon={SearchIcon} showPanel="find" name="Найти" />
      <OpenItem icon={ImportIcon} showPanel="import" name="Импорт" />
    </div>
  );
};

export default OpenList;
