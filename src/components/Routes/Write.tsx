import { observer } from "mobx-react-lite";
import { Redirect } from "react-router";
import store from "../../store";
import Header from "../Generic/Header";
import MainContent from "../Generic/MainContent";
import CreateNote from "../Note/CreateNote";
import NoteToday from "../Note/NoteToday";

const Write = observer(() => {
  const account = store.appStore.account;
  if (!account) {
    return <Redirect to="/login" />;
  }

  return (
    <>
      <Header account={account} />
      <MainContent type="write">
        <CreateNote account={account} />
        <NoteToday account={account} />
      </MainContent>
    </>
  );
});

export default Write;
