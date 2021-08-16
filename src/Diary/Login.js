import React from "react";
import OpenList from "./OpenList";
import OpenBook from "./OpenBook";
import AddBook from "../Books/AddBook";
import FindBook from "../Books/FindBook";
import { useSelector } from "react-redux";
import ImportBook from "../Books/ImportBook";

function Login() {
  const currentTab = useSelector((state) => state.app.currentOpeningTab);

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
}

export default Login;
