import "./notes.scss";
import axios from "axios";
import { useState, useEffect } from "react";
import Note from "./atoms/Note";
import { IoMdAddCircleOutline } from "react-icons/io";
import InputField from "../Shared Components/InputField";
import { AiFillDelete } from "react-icons/ai";
import Modal from "react-modal";
import * as yup from "yup";
import { useFormik, FormikValues } from "formik";
import Form from "../Shared Components/Form";

const Notes = () => {
  const [notes, setNotes] = useState<object[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const getNotes = async () => {
      const res = await axios.get(`${import.meta.env.VITE_SERVER_URL}/notes`, {
        withCredentials: true,
      });
      setNotes([...res.data]);
    };
    getNotes();
    Modal.setAppElement("body");
  }, []);

  const validationSchema = yup.object({
    title: yup.string().required(),
    category: yup.string().required(),
    body: yup.string().max(500, "Not more than 500 characters").required(),
  });

  const addNewNote = async (values: FormikValues) => {
    const res = await axios.post(`${import.meta.env.VITE_SERVER_URL}/notes`, values, {
      withCredentials: true,
    });
    if (res) {
      notes.push(values);
      console.log(values);
    } else {
      alert("Something went wrong, try again later");
    }
    setIsOpen(false);
  };

  const deleteNote = async () => {
    const name = localStorage.getItem("name");
    const promptValue: any = prompt("Enter id of note to be deleted", "10");
    const idx = parseInt(promptValue);
    console.log(idx);
    const res = await axios.delete(`${import.meta.env.VITE_SERVER_URL}/remove-note`, {
      data: { name, idx },
      headers: { Authorization: "*" },
    });

    if (res) {
      notes.splice(idx, 1);
      console.log("Note deleted successfully");
    } else {
      console.log("Error, something went wrong.");
    }
  };
  const updateNote = () => {};

  const formik = useFormik({
    initialValues: { title: "", category: "", body: "" },
    validateOnBlur: true,
    onSubmit: addNewNote,
    validationSchema: validationSchema,
  });

  return (
    <div className="notes_container">
      <InputField
        type="search"
        id="search"
        classname="search_notes"
        placeholder="Search notes..."
      />
      <div className="notes">
        <div className="notes_title">
          <h1>User Notes</h1>
          <span className="add_note" onClick={() => setIsOpen(true)}>
            Add New Note
            <IoMdAddCircleOutline />
          </span>
        </div>

        {notes.length > 0 ? (
          notes.map((note: any) => {
            return (
              <Note
                deleteNote={deleteNote}
                key={note.title}
                title={note.title}
                category={note.category}
                body={note.body}
              />
            );
          })
        ) : (
          <h1>Nothing to see here...yet.</h1>
        )}
      </div>
      <span className="delete_notes">
        Delete All Notes
        <AiFillDelete />
      </span>

      <Modal
        isOpen={isOpen}
        onRequestClose={() => setIsOpen(false)}
        className="create_note_modal"
      >
        <Form onSubmit={formik.handleSubmit}>
          <h1>Document your ideas</h1>

          <div>
            <h3>Title</h3>
            {formik.touched.title && formik.errors.title ? (
              <span className="errors">{formik.errors.title}</span>
            ) : (
              ""
            )}
            <InputField
              classname="title"
              id="title"
              type="text"
              placeholder="Note Title"
              onChange={formik.handleChange}
              value={formik.values.title}
            />
          </div>

          <div>
            <h3>Category</h3>
            <InputField
              classname="category"
              id="category"
              type="text"
              placeholder="Note Category"
              onChange={formik.handleChange}
              value={formik.values.category}
            />
            {formik.touched.category && formik.errors.category ? (
              <span className="errors">{formik.errors.category}</span>
            ) : (
              ""
            )}
          </div>

          <div>
            <h3>Body</h3>
            {formik.touched.body && formik.errors.body ? (
              <span className="errors">{formik.errors.body}</span>
            ) : (
              ""
            )}
            <textarea
              title="body"
              id="body"
              cols={35}
              rows={15}
              onChange={formik.handleChange}
              value={formik.values.body}
              placeholder="Note content"
            ></textarea>
          </div>

          <button type="submit">Create Note</button>
        </Form>
      </Modal>
    </div>
  );
};

export default Notes;
