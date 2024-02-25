import React from "react";

const Welcome = () => {
  return (
    <div className="wrapper2">
      <div className="row d-flex justify-content-center">
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
      </div>
    </div>
  );
};

export default Welcome;
