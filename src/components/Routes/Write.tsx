import Header from "../Generic/Header";
import MainContent from "../Generic/MainContent";
import CreateNote from "../Note/CreateNote";

const Write = () => {
  return (
    <>
      <Header />
      <MainContent>
        <CreateNote />
      </MainContent>
    </>
  );
};

export default Write;
