import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext({
  author: {},
  token: "",
  isLogedIn: false,
  login: (author, token) => {},
  logout: () => {},
  updateProfile: () => {},
});

const AuthContextProvider = ({ children }) => {
  const initialAuthor = JSON.parse(localStorage.getItem("author"));
  const [author, setAuthor] = useState(initialAuthor);
  const [token, seToken] = useState(localStorage.getItem("token"));
  const isLogedIn = !!token;

  const navigate = useNavigate();

  const login = (author, token) => {
    setAuthor(author);
    seToken(token);
    localStorage.setItem("author", JSON.stringify(author));
    localStorage.setItem("token", token);
    navigate("/");
  };

  const logout = () => {
    setAuthor({});
    seToken("");
    localStorage.removeItem("author");
    localStorage.removeItem("token");
    navigate("/");
  };

  const updateProfile = (newImageUrl) => {
    setAuthor((author) => {
      return { ...author, photo: newImageUrl };
    });
  };

  const values = {
    author,
    token,
    isLogedIn,
    login,
    logout,
    updateProfile,
  };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;
