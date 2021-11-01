import { FC } from "react";
import "./SettingSection.scss";

const SettingSection: FC = ({ children }) => {
  return <section className="setting__section">{children}</section>;
};

export default SettingSection;
