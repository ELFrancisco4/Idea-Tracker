type NoteProps = {
  title: string;
  category: string;
  body: string;
  key: string;
  deleteNote?: () => void;
};

import { FaRegEdit } from "react-icons/fa";
import { GrFormView } from "react-icons/gr";
import { AiFillDelete } from "react-icons/ai";
import React from "react";

const NoteElement = ({ title, category, body, key, deleteNote }: NoteProps) => {
  return (
    <React.Fragment key={key}>
      <div className="note">
        <h3>{title}</h3>
        <span>{category}</span>
        <div>{body}</div>
        <span>
          {" "}
          <FaRegEdit /> <GrFormView /> <AiFillDelete onClick={deleteNote} />
        </span>
      </div>
    </React.Fragment>
  );
};

export default NoteElement;
