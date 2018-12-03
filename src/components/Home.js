import React, { Component } from "react";

class Home extends React.Component {
  render() {
    return (
      <div text-align="center">
        <h1>Welcome to Home Page.</h1>
        <img
          src={require("../img/Push-Up.jpg")}
          alt="Push-Up"
          width="100%"
          height="auto"
        />
      </div>
    );
  }
}

export default Home;