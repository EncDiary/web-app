import React from "react";
import BookActionList from "./Book/BookActionList";
import AddBook from "./Book/AddBook";
import FindBook from "./Book/FindBook";
import ImportBook from "./Book/ImportBook";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { currentOpeningTabTypes } from "../types/app";
import BooksList from "./Book/BookList";
import OpenBook from "./Book/OpenBook";

const Login: React.FC = () => {
  const currentTab = useTypedSelector((state) => state.app.currentOpeningTab);

  function showCurrentTab() {
    switch (currentTab) {
      case currentOpeningTabTypes.Open:
        return (
          <div className="open__pass-area">
            <OpenBook />
            <BooksList />
          </div>
        );
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
      <BookActionList />

      {showCurrentTab()}
    </section>
  );
};

export default Login;
