import LoginForm from "./Component/LoginForm.jsx";
import SignUp from "./Component/SignUp.jsx";
import HomePage from "./Component/HomePage.jsx";
import React, { Component } from "react";
import * as alasql from "alasql";

import "./App.css";
import { BrowserRouter as Switch, Route } from "react-router-dom";

class App extends Component {
  constructor() {
    super();
    this.state = {
      searchfield: "",
      cars: [],
      max: "",
    };
  }
  componentWillMount() {
    alasql(`
      CREATE LOCALSTORAGE DATABASE IF NOT EXISTS cars_db;
      ATTACH LOCALSTORAGE DATABASE cars_db;
      USE cars_db;
    `);
    alasql(
      "CREATE TABLE IF NOT EXISTS cars (id INT AUTOINCREMENT PRIMARY KEY, photo STRING, serial STRING,model STRING,price STRING,year STRING,km STRING,about STRING)"
    );

    console.log("appjs=" + this.state.cars);
  }

  componentDidMount() {
    this.fetchTodos();
    console.log(this.state.cars);
  }

  fetchTodos() {
    const result = alasql("SELECT * FROM cars");
    this.setState({ cars: result });
  }

  insertTodo(photo, serial, model, price, year, km, about) {
    alasql("INSERT INTO cars VALUES ?", [
      {
        id: alasql.autoval("cars", "id", true),
        photo,
        serial,
        model,
        price,
        year,
        km,
        about,
      },
    ]);
  }

  deleteTodo(id) {
    alasql("DELETE FROM cars WHERE id = ?", id);
  }

  addTodo() {
    //const { inputTodo } = this.refs;

    if (!this.state.photo) return;

    this.insertTodo(
      this.state.photo,
      this.state.serial,
      this.state.model,
      this.state.price,
      this.state.year,
      this.state.km,
      this.state.about
    );
    this.fetchTodos();
    console.log(this.state.cars);
  }

  removeTodo(id) {
    this.deleteTodo(id);
    this.fetchTodos();
  }

  onSearchChange = (event) => {
    this.setState({ searchfield: event.target.value });
  };

  render() {
    const { cars, searchfield, max } = this.state;
    const filteredRobots = cars.filter((car) => {
<<<<<<< HEAD
      return car.about.toLowerCase().includes(searchfield.toLowerCase());
    });
    return !cars.length ? (
      <div className="App">
        <Switch>
          <Route exact path="/">
            <LoginForm />
          </Route>
          <Route path="/signup">
            <SignUp />
          </Route>
          <Route path="/homepage">
            <HomePage
              searchChange={this.onSearchChange}
              products={filteredRobots}
            />
          </Route>
        </Switch>
      </div>
=======
      return (
        car.about.toLowerCase().includes(searchfield.toLowerCase()),
        car.price.toLowerCase() >= searchfield.toLowerCase()
      );
    });
    return !cars.length ? (
      <h1>Loading</h1>
>>>>>>> 516b8d445a84f8cec9b84e5dea8643d1393db37c
    ) : (
      <div className="App">
        <Switch>
          <Route exact path="/">
            <LoginForm />
          </Route>
          <Route path="/signup">
            <SignUp />
          </Route>
          <Route path="/homepage">
            <HomePage
              searchChange={this.onSearchChange}
              products={filteredRobots}
            />
          </Route>
        </Switch>
      </div>
    );
  }
}

export default App;
