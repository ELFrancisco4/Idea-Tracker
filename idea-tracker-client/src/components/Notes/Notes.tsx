import "./notes.scss";
import axios from "axios";
import { useState, useEffect } from "react";
import NoteElement from "./atoms/NoteElement";
import InputField from "../Shared Components/InputField";
import Modal from "react-modal";
import { AiOutlineSearch } from "react-icons/ai";


const Notes = () => {
  const [notes, setNotes] = useState<any[]>([]);
  const [searchedValue, setSearchedValue] = useState<any>([]);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    const getNotes = async () => {
      const res = await axios.get(`${import.meta.env.VITE_SERVER_URL}/notes`, {
        withCredentials: true,
      });
      setNotes([...res.data]);
    };
    getNotes();
    console.log(notes);
    Modal.setAppElement("body");
  }, [inputValue]);

  useEffect(() => {
    const filteredNotes = notes.filter((item) =>
      item.title.toLowerCase().includes(inputValue.toLowerCase())
    );
    setSearchedValue(filteredNotes);
    console.log(filteredNotes);
  }, [inputValue]);

  return (
    <div className="notes_container">
      <div className="search">
        <AiOutlineSearch />
        <InputField
          type="search"
          id="search"
          classname="search_notes"
          placeholder="Search"
          value={inputValue}
          onChange={(e: any) => setInputValue(e.target.value)}
        />
      </div>

      <div className="notes">
        <div className="notes_title">
          <h1> Notes </h1>
        </div>

        <div className="user_notes">
          {searchedValue.length > 0
            ? searchedValue.map((note: any) => {
                return (
                  <NoteElement
                    id={note._id}
                    key={note._id}
                    title={note.title}
                    category={note.category}
                    body={note.body}
                  />
                );
              })
            : notes.map((note: any) => {
                return (
                  <NoteElement
                    id={note._id}
                    key={note._id}
                    title={note.title}
                    category={note.category}
                    body={note.body}
                  />
                );
              })}
        </div>
      </div>

  
      {/* <span onClick={deleteAllNotes} className="delete_notes">
        Delete All Notes
        <AiFillDelete />
      </span> */}
    </div>
  );
};

export default Notes;
