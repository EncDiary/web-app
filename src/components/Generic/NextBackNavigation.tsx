import { FC } from "react";
import "./NextBackNavigation.scss";

export const NextBackNavigation: FC = ({ children }) => {
  return <div className="navigation__next-back">{children}</div>;
};

export const NextNavigation: FC = ({ children }) => {
  return <div className="navigation__next">{children}</div>;
};
