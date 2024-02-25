import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";
import { useAuthContext } from "../context/authContext";

const Dashboard = () => {
  const [username, setUsername] = useState("");
  const [quote, setQuote] = useState("");
  const [tempQuote, setTempQuote] = useState("");
  const Navigate = useNavigate();

  const { user } = useAuthContext();

  const populateQuote = async () => {
    const response = await fetch("http://localhost:8080/quote", {
      headers: {
        "x-access-token": localStorage.getItem("token"),
      },
    });
    const data = await response.json();
    if (data.status === "ok") {
      setQuote(data.quote);
      setUsername(data.username);
    } else {
      alert(data.error);
    }
    // console.log(data.status);
  };

  useEffect(() => {
    // const token = localStorage.getItem("token");
    // if (token) {
    //   const user = jwtDecode(token);
    //   if (user) {
    //     populateQuote();
    //   } else if (!user) {
    //     localStorage.removeItem("token");
    //     Navigate("/welcome", { replace: true });
    //   }
    // } else {
    //   localStorage.removeItem("token");
    //   Navigate("/welcome", { replace: true });
    // }
    if (user) {
      populateQuote();
    } else {
      localStorage.removeItem("token");
      Navigate("/", { replace: true });
    }
  }, []);

  const updateQuote = async (e) => {
    e.preventDefault();

    const request = await fetch("http://localhost:8080/quote", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({
        quote: tempQuote,
      }),
    });

    const data = await request.json();

    if (data.status === "ok") {
      setQuote(tempQuote);
      setTempQuote("");
    } else {
      alert(data.error);
    }
  };

  return (
    <div className="wrapper3">
      <h3 className="blue">-{username} - 😃</h3>
      <div className="heading">
        <h3>Your quote:</h3>
        <p>{`“${quote || "No quote found🥺"}”`}</p>
      </div>
      <form onSubmit={updateQuote} className="container">
        <input
          type="text"
          name="quote"
          placeholder="Plese Enter and Change Your Quote..."
          onChange={(e) => setTempQuote(e.target.value)}
          value={tempQuote}
        />
      </form>
    </div>
  );
};

export default Dashboard;
