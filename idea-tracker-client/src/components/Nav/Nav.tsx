import Logo from '../Shared Components/Logo'
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import './nav.scss'
const Nav = () => {
  const loginDetails = JSON.parse(
    localStorage.getItem("currentUser") as string
  );
  const navigate = useNavigate();

  const { setIsLoggedIn } = useContext(AuthContext);

  const logOut = async () => {
    await axios.post(`${import.meta.env.VITE_SERVER_URL}/logout`);
    localStorage.removeItem("currentUser");
    setIsLoggedIn(false);
    navigate("/login");
  };

  return (
    <nav>
        <Logo />
        <p className="home_user">Hello, {loginDetails.name}</p>
        <span onClick={logOut}>Logout</span>
      </nav>
  )
}

export default Nav