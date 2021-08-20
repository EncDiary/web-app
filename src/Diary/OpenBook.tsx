import React from "react";
import EnterPassword from "./EnterPassword";
import BooksList from "../Books/BooksList";

const OpenBook: React.FC = () => {
  return (
    <div className="open__pass-area">
      <EnterPassword />
      <BooksList />
    </div>
  );
};

export default OpenBook;
