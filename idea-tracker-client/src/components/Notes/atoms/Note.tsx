type NoteProps = {
  title: string;
  category: string;
  body: string;
};

const Note = ({ title, category, body }: NoteProps) => {
  return (
    <div>
      <h3>{title}</h3>
      <span>{category}</span>
      <div>{body}</div>
    </div>
  );
};

export default Note;
