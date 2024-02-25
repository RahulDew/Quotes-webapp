import React, { useState, useEffect } from "react";
import { useAuthContext } from "../context/authContext";

const Home = () => {
  const [users, setUsers] = useState([]);

  const { user } = useAuthContext();

  const getData = async () => {
    const response = await fetch("http://localhost:8080/quotes", {
      method: "GET",
    });
    const data = await response.json();
    setUsers(data);
    // console.log(data);
  };
  // console.log(user)

  useEffect(() => {
    // if (user) {
      getData();
    // }
  }, []);

  return (
    <div className="wrapper2">
      <div className="row d-flex justify-content-center">
        {user ? (
          <>
            {users.map((user) => (
              <div key={user._id} className="col-xl-4 col-lg-5 mb-4 rounded-5">
                <div
                  className="card"
                  style={{
                    backgroundColor: "rgba(240, 248, 255, 0.87)",
                    borderRadius: "1rem",
                  }}
                >
                  <div className="card-body">
                    <div className="d-flex align-items-center">
                      <div className="ms-3">
                        <p
                          style={{ fontSize: "1.1rem" }}
                          className="fw-bold mb-1"
                        >
                          {user?.username}
                        </p>
                        <p
                          style={{ fontSize: "0.9rem" }}
                          className="text-muted mb-0"
                        >
                          {user?.email}
                        </p>
                        <p
                          style={{ fontSize: "1.5rem" }}
                          className="text-primary mb-0"
                        >
                          {user?.quote}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </>
        ) : (
          <div className="text-center my-5">
            <h1>
              Hey, Welcome to <span className="text-primary">Quotes</span>{" "}
            </h1>
            <p style={{ fontSize: "1.3rem" }} className="text-center ">
              Over here you can write and share your daily quotes and share with
              community
            </p>
            <p style={{ fontSize: "1.3rem" }}>
              your Quotes can help anyone to improve themselves
            </p>
            <h2 style={{ fontSize: "3rem" }}>😁🤔😊</h2>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
