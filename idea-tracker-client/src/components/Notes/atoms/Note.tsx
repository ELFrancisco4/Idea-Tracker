type NoteProps = {
  title: string;
  category: string;
  body: string;
  key: string;
  deleteNote: () => void
};

import { FaRegEdit } from "react-icons/fa";
import { GrFormView } from "react-icons/gr";
import {AiFillDelete} from "react-icons/ai"

const Note = ({ title, category, body, key, deleteNote }: NoteProps) => {
  return (
    <div className="note" key={key}>
      <h3>{title}</h3>
      <span>{category}</span>
      <div>{body}</div>
      <span>
        {" "}
        <FaRegEdit /> <GrFormView /> <AiFillDelete onClick={deleteNote}/>
      </span>
    </div>
  );
};

export default Note;
