import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/homepage.scss";
import Logo from "../components/Shared Components/Logo";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import Notes from "../components/Notes/Notes";
const HomePage = () => {
  const loginDetails = JSON.parse(
    localStorage.getItem("currentUser") as string
  );
  const navigate = useNavigate();

  const { setIsLoggedIn } = useContext(AuthContext);

  const logOut = async () => {
    await axios.post("http://localhost:5000/logout");
    localStorage.removeItem("currentUser");
    setIsLoggedIn(false);
    navigate("/login");
  };

  return (
    <div className="home">
      <nav>
        <Logo />
        <p className="home_user">Hello, {loginDetails.name}</p>
        <span onClick={logOut}>Logout</span>
      </nav>

      <div className="notes_wrapper">
        <Notes />
      </div>
    </div>
  );
};

export default HomePage;
