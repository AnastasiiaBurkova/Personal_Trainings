import React, { Component } from "react";
import "./App.css";
import Customers from "./components/Customers";
import Trainings from "./components/Trainings";
import Calendar from "./components/Calendar";
import Home from "./components/Home";
import { BrowserRouter, Router, Route, Link, Switch } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <div>
            <div className="navbar">
              <div className="container">
                <Link to="home" className="redirects">
                  Home
                </Link>{" "}
                <Link to="customers" className="redirects">
                  Customers
                </Link>{" "}
                <Link to="trainings" className="redirects">
                  Trainings
                </Link>{" "}
                <Link to="calendar" className="redirects">
                  Calendar
                </Link>{" "}
              </div>
            </div>
            <Switch>
              <Route path="/customers" component={Customers} />
              <Route path="/trainings" component={Trainings} />
              <Route path="/calendar" component={Calendar} />
              <Route path="/home" component={Home} />

              <Route render={() => <h1>Page not found</h1>} />
            </Switch>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
