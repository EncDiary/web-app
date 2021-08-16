import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { CrossIcon } from "../assets/SvgIcons";
import {
  hideBookRedux,
  setCurrentBookRedux,
} from "../redux/actions/booksActions";

function BookItem({ book }) {
  const dispatch = useDispatch();

  const isActiveRedux = useSelector((state) => state.books.currentBook);

  var classItem = "open__last-item";
  if (isActiveRedux.id === book.id) {
    classItem += " open__last-item-active";
  }

  function clickToClose() {
    dispatch(hideBookRedux(book.id));
  }

  function clickToSetCurrentBook() {
    dispatch(setCurrentBookRedux(book));
  }

  return (
    <div className={classItem}>
      <div className="open__last-item-text" onClick={clickToSetCurrentBook}>
        {book.title}
      </div>
      <div className="open__last-item-remove" onClick={clickToClose}>
        {CrossIcon}
      </div>
    </div>
  );
}

export default BookItem;
