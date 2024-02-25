import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [form, setForm] = useState({});
  const Navigate = useNavigate();

  const handleClick = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:8080/register", {
      method: "POST",
      body: JSON.stringify(form),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    // console.log("created:", data);

    if (data.status === "ok") {
      Navigate("/login");
    }
  };

  return (
    <div className="wrapper">
      <h2>Register</h2>
      <form action="" onSubmit={handleSubmit} className="container">
        <span>Username: </span>
        <input type="text" name="username" onChange={handleClick} />
        <span>Email: </span>
        <input type="email" name="email" onChange={handleClick} />
        <span>Password: </span>
        <input type="password" name="password" onChange={handleClick} />
        <button>Submit</button>
      </form>
    </div>
  );
};

export default Register;
