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
import { useNavigate } from "react-router-dom";

import React from "react";

const NoteElement = ({
  id,
  title,
  category,
  body,
  key,
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
        </span>
      </div>
    </React.Fragment>
  );
};

export default NoteElement;
