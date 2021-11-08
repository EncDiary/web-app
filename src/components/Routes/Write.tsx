import { useEffect } from "react";
import { useHistory } from "react-router";
import store from "../../store";
import Header from "../Generic/Header";
import MainContent from "../Generic/MainContent";
import CreateNote from "../Note/CreateNote";
import NoteToday from "../Note/NoteToday";

const Write = () => {
  const history = useHistory();

  useEffect(() => {
    const account = store.appStore.account;

    if (!account) {
      history.push("/login");
      return;
    }
  }, [history]);

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
