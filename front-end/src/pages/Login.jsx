import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/authContext";
import jwtDecode from "jwt-decode";

const Login = () => {
  const [form, setForm] = useState({});
  const Navigate = useNavigate();
  const { setUser } = useAuthContext();

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:8080/login", {
      method: "POST",
      body: JSON.stringify(form),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    if (data.user) {
      localStorage.setItem("token", data.user);
      const userInfo = jwtDecode(data.user);
      // console.log(userInfo);
      setUser(userInfo);
      // alert("Login Succesfull!😃😃😃");
      Navigate("/home", { replace: true });
    } else {
      alert("Plese enter write email and password🤔🤔🤔!");
    }
  };

  return (
    <div className="wrapper">
      <h2>Login</h2>
      <form action="" onSubmit={handleSubmit} className="container">
        <span>Email: </span>
        <input type="email" name="email" onChange={handleChange} />
        <span>Password: </span>
        <input type="password" name="password" onChange={handleChange} />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};
export default Login;
