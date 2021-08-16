import React from "react";
import { useSelector } from "react-redux";
import BookItem from "./BookItem";

const BooksList = () => {
  const myBooks = useSelector((state) => state.books.books);

  return (
    <div className="open__last">
      {myBooks.map((book, index) => {
        return <BookItem book={book} key={book.id} index={index} />;
      })}
    </div>
  );
};

export default BooksList;
