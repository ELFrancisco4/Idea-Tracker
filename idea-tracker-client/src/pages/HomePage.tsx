import "../styles/homepage.scss";
import Notes from "../components/Notes/Notes";
import Nav from "../components/Nav/Nav";

const HomePage = () => {
  return (
    <div className="home">
      <Nav />
      <div className="notes_wrapper">
        <Notes />
      </div>
    </div>
  );
};

export default HomePage;
