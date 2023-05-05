import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/privateroute.scss";

type PrivateRouteProps = {
  children: JSX.Element;
};

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const { isLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();
  if (!isLoggedIn) {
    return (
      <div>
        <h1> You are not logged in!</h1>
        <button onClick={() => navigate("/login")}>Back To Login</button>
      </div>
    );
  }
  return <div>{isLoggedIn && <div className="component">{children}</div>}</div>;
};

export default PrivateRoute;
