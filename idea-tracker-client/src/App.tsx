import "./App.scss";
import LoginPage from "./pages/LoginPage";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SignUp from "./components/SignUp/SignUp";
import { useState } from "react";
import { AuthContext } from "./context/AuthContext";
import PrivateRoute from "./auth/PrivateRoute";
import Note from "./components/Notes/atoms/Note";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      <div className="App">
        <Routes>
          <Route path="/" element={<SignUp />} />
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/home"
            element={
              <PrivateRoute>
                <HomePage />
              </PrivateRoute>
            }
          />
          <Route path="/home/note/:id" element={<Note />} />
        </Routes>
      </div>
    </AuthContext.Provider>
  );
};

export default App;
