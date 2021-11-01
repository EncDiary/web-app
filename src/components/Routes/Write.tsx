import Header from "../Generic/Header";
import MainContent from "../Generic/MainContent";
import CreateNote from "../Note/CreateNote";
import NoteToday from "../Note/NoteToday";

const Write = () => {
  return (
    <>
      <Header />
      <MainContent type="write">
        <CreateNote />
        <NoteToday />
      </MainContent>
    </>
  );
};

export default Write;
