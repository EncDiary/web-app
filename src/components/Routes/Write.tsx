import axios, { AxiosError } from "axios";
import { useEffect } from "react";
import { useHistory } from "react-router";
import store from "../../store";
import { INote } from "../../types/note";
import Header from "../Generic/Header";
import MainContent from "../Generic/MainContent";
import { errorPopup } from "../Generic/Popup";
import CreateNote from "../Note/CreateNote";
import NoteToday from "../Note/NoteToday";

const Write = () => {
  const history = useHistory();
  if (!store.app.account) {
    history.push("/login");
  }

  useEffect(() => {
    store.note.setNotes([]);
    const serverUrl = process.env.REACT_APP_SERVER_URL;

    const fetchNotes = async () => {
      const notesData = await axios({
        method: "get",
        url: serverUrl + "notes/today",
        headers: { Authorization: `Bearer ${store.app.account?.token}` },
      })
        .then((response) => {
          return response.data.notes;
        })
        .catch((error: AxiosError) => {
          const errorText =
            error.response?.data.message ?? "Неизвестная ошибка";
          errorPopup(errorText);
        });
      if (notesData === undefined) return;

      const today = new Date();

      const todayMidnightTime = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate()
      ).getTime();

      const notes: INote[] = [];
      notesData.forEach(
        (note: { id: string; text: string; datetime: string }) => {
          const datetime = +note.datetime * 1000;
          if (datetime >= todayMidnightTime) {
            notes.push({ ...note, datetime });
          }
        }
      );
      store.note.setNotes(notes);
    };

    fetchNotes();
  }, []);

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
