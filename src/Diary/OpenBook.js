import React from "react";
import EnterPassword from "./EnterPassword";
import BooksList from "../Books/BooksList";

function OpenBook() {
  return (
    <div className="open__pass-area">
      <EnterPassword />
      <BooksList />
    </div>
  );
}

export default OpenBook;
