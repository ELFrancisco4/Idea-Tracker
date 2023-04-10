import "./notes.scss";
import axios from "axios";
import { useState, useEffect } from "react";
import Note from "./atoms/Note";

const Notes = () => {
  const [notes, setNotes] = useState<object[]>([]);
  const credentials = JSON.parse(localStorage.getItem("currentUser") as string);
  const config = {
    name: credentials.name,
    method: "get",
    url: "http://localhost:5000/notes",
  };
  useEffect(() => {
    const getNotes = async () => {
      const res = await axios(config);
      setNotes([...res.data]);
      console.log(res.data);
    };

    getNotes();
  }, []);
  return (
    <div className="notes">
      {notes.map((note: any) => {
        return (
          <Note title={note.title} category={note.category} body={note.body} />
        );
      })}
    </div>
  );
};

export default Notes;
