import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios, { AxiosRequestConfig } from "axios";
import NoteElement from "./NoteElement";
type NoteProps = {
  title?: string;
};
const Note = ({ title }: NoteProps) => {
  const id = useParams();
  const [note, setNote] = useState<any>([]);

  useEffect(() => {
    const findSearchedNote = async () => {
      const requestConfig: AxiosRequestConfig = {};
      requestConfig.data = { title };
      const res = await axios.get(
        `http://localhost:5000/notes/${id}`,
        requestConfig
      );

      if (res) {
        setNote([...res.data]);
        console.log(res.data);
      }
    };
  }, []);
  return (
    <div>
      {note
        ? note.map((val: any) => {
            return (
              <NoteElement
                body={val.body}
                category={val.category}
                title={val.title}
                key={val._id}
              />
            );
          })
        : null}
    </div>
  );
};

export default Note;
