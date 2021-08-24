import React from "react";
import { CrossIcon } from "../../assets/SvgIcons";
import { useActions } from "../../hooks/useActions";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { Book } from "../../types/books";

interface BookItemProps {
  book: Book;
}

const BookItem: React.FC<BookItemProps> = ({ book }) => {
  const { hideBookRedux, setCurrentBookRedux } = useActions();

  const isActiveRedux = useTypedSelector((state) => state.books.currentBook);

  let classItem = "open__last-item";
  if (isActiveRedux.id === book.id) {
    classItem += " open__last-item-active";
  }

  function clickToClose() {
    hideBookRedux(book.id);
  }

  function clickToSetCurrentBook() {
    setCurrentBookRedux(book);
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
};

export default BookItem;
