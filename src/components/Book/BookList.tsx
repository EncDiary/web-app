import { useTypedSelector } from "../../hooks/useTypedSelector";
import BookItem from "./BookItem";

const BooksList = () => {
  const myBooks = useTypedSelector((state) => state.books.books);

  return (
    <div className="open__last">
      {myBooks.map((book) => {
        return <BookItem book={book} key={book.id} />;
      })}
    </div>
  );
};

export default BooksList;
