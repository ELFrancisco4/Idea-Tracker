type NoteProps = {
  title: string;
  category: string;
  body: string;
  key: string;
  id: string;
  deleteNote?: () => void;
};
import { FaRegEdit } from "react-icons/fa";
import { GrView } from "react-icons/gr";
import { AiFillDelete } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

import React from "react";

const NoteElement = ({
  id,
  title,
  category,
  body,
  key,
  deleteNote,
}: NoteProps) => {
  const navigate = useNavigate();
  const handleRedirect = () => {
    navigate(`/home/note/${id}`);
    console.log(id);
  };
  return (
    <React.Fragment key={key}>
      <div className="note">
        <h3>{title}</h3>
        <span>{category}</span>
        <div>{body}</div>
        <span>
          {" "}
          <FaRegEdit /> <GrView onClick={handleRedirect} />{" "}
          <AiFillDelete onClick={deleteNote} />
        </span>
      </div>
    </React.Fragment>
  );
};

export default NoteElement;
