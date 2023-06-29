import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import "../notes.scss";
import { AiFillDelete } from "react-icons/ai";
import { FaRegEdit } from "react-icons/fa";
import Nav from "../../Nav/Nav";

const Note = () => {
  const params = useParams();
  const [note, setNote] = useState<any>({});
  const [isReadOnly, setIsReadOnly] = useState(true);
  const currentUser = JSON.parse(localStorage.getItem("currentUser") as string);

  useEffect(() => {
    const fetchNote = async () => {
      const res = await axios.get(`${import.meta.env.VITE_SERVER_URL}/notes`, {
        withCredentials: true,
      });
      const selectedNote = res.data.find((note: any) => note._id === params.id);
      setNote(selectedNote);
    };

    fetchNote();
  }, []);

  const handleNoteUpdate = async () => {
    try {
      const res = await axios.put(
        `${import.meta.env.VITE_SERVER_URL}/edit`,
        {
          name: currentUser.name,
          title: note.title,
          body: note.body,
        },
        { withCredentials: true }
      );
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNote({ ...note, body: event.target.value });
  };

  return (
    <div className="selected_note_container">
      <Nav />
      <div className="selected_note">
        <span>
          <h1>{note.title}</h1>
          <p>{note.category}</p>
        </span>
        <textarea
          value={note.body}
          readOnly={isReadOnly}
          className="selectedNote_body"
          onChange={handleChange}
          cols={72}
          rows={12}
        ></textarea>
        <span>
          <FaRegEdit onClick={() => setIsReadOnly(false)} />
          <AiFillDelete />
        </span>
        {isReadOnly == false ? (
          <button onClick={handleNoteUpdate}>Save Changes</button>
        ) : null}
      </div>
    </div>
  );
};

export default Note;
