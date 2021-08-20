import React from "react";
import OpenList from "./OpenList";
import OpenBook from "./OpenBook";
import AddBook from "../Books/AddBook";
import FindBook from "../Books/FindBook";
import ImportBook from "../Books/ImportBook";
import { useTypedSelector } from "../redux/hooks/useTypedSelector";

const Login: React.FC = () => {
  const currentTab = useTypedSelector((state) => state.app.currentOpeningTab);

  function showCurrentTab() {
    switch (currentTab) {
      case "open":
        return <OpenBook />;
      case "add":
        return <AddBook />;
      case "find":
        return <FindBook />;
      case "import":
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
