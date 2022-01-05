import { FC } from "react";
import { useOutletContext } from "react-router-dom";
import { IAccount } from "../../types/account";
import MainContent from "../Generic/MainContent";
import CreateNote from "../Note/CreateNote";
import NoteToday from "../Note/NoteToday";

const Write: FC = () => {
  const account: IAccount = useOutletContext();

  return (
    <MainContent>
      <CreateNote account={account} />
      <NoteToday account={account} />
    </MainContent>
  );
};

export default Write;
