import React from "react";
import OpenList from "./OpenList";
import OpenBook from "./OpenBook";
import AddBook from "../Books/AddBook";
import FindBook from "../Books/FindBook";
import ImportBook from "../Books/ImportBook";
import { useTypedSelector } from "../redux/hooks/useTypedSelector";
import { currentOpeningTabTypes } from "../redux/types/app";

const Login: React.FC = () => {
  const currentTab = useTypedSelector((state) => state.app.currentOpeningTab);

  function showCurrentTab() {
    switch (currentTab) {
      case currentOpeningTabTypes.Open:
        return <OpenBook />;
      case currentOpeningTabTypes.Create:
        return <AddBook />;
      case currentOpeningTabTypes.Find:
        return <FindBook />;
      case currentOpeningTabTypes.Import:
        return <ImportBook />;
      default:
        return "";
    }
  }

  return (
    <section className="open">
      <OpenList />

      {showCurrentTab()}
    </section>
  );
};

export default Login;
