import React, { useState, useContext } from "react";
import Input from "./Input";
import Button from "./Button";
import { Link } from "react-router-dom";
import "./App.css";
import "./Login.css";
import { UserContext } from "./context/user.context";
import {
  signInWithGooglePopup,
  createUserDocFromAuth,
  signinAuthUserWithEmailAndPassword,
} from "./utils/firebase";
const Login = (props) => {
  const logGoogleUser = async () => {
    const { user } = await signInWithGooglePopup();
    const userDocRef = await createUserDocFromAuth(user);
  };

  const { setCurrentUser } = useContext(UserContext);
  const [contact, setContact] = useState({
    email: "",
    password: "",
  });

  const { email, password } = contact;

  const handleChange = (event) => {
    const { name, value } = event.target;
    setContact((preValue) => {
      return {
        ...preValue,
        [name]: value,
      };
    });
  };
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const { user } = await signinAuthUserWithEmailAndPassword(
        email,
        password
      );
      setCurrentUser(user);
    } catch (error) {
      console.log("error in login", error.message);
    }
  };

  return (
    <div className="header-div">
      <Input
        name="email"
        type="text"
        placeholder="email"
        onChange={handleChange}
        value={contact.email}
      />

      <br></br>

      <Input
        name="password"
        type="password"
        placeholder="password"
        onChange={handleChange}
        value={contact.password}
      />

      <br></br>

      <button onClick={handleSubmit}>Sign in</button>
      <br></br>
      <button onClick={logGoogleUser}>Log in with Google</button>
      <br></br>
      <br></br>

      <Link to="/signup">Sign up instead</Link>
    </div>
  );
};
export default Login;
