import LoginForm from "./Component/LoginForm.jsx";
import SignUp from "./Component/SignUp.jsx";
import HomePage from "./Component/HomePage.jsx";

import React, { Component } from "react";
import * as alasql from "alasql";

import "./App.css";
import { BrowserRouter as Switch, Route } from "react-router-dom";
import Admin from "./Component/Admin.jsx";

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
      "CREATE TABLE IF NOT EXISTS cars (id INT AUTOINCREMENT PRIMARY KEY, photo STRING, serial STRING,model STRING,price NUMBER,year NUMBER,km NUMBER,about STRING,mail STRING)"
    );

    // alasql('SELECT * INTO XLS("cars", {headers:true}) FROM cars');

    // alasql("SELECT * INTO CSV('cars.csv') FROM cars");
  }

  componentDidMount() {
    this.fetchTodos();
    console.log(this.state.cars);
  }

  fetchTodos() {
    const result = alasql("SELECT * FROM cars");
    this.setState({ cars: result });
  }

  insertTodo(photo, serial, model, price, year, km, about, mail) {
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
        mail,
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
      this.state.about,
      this.state.mail
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
    const { cars, searchfield } = this.state;
    const filteredRobots = cars.filter((car) => {
      return car.about.toLowerCase().includes(searchfield.toLowerCase());
    });
    const priceFilter = () => {
      const a = cars.sort((a, b) => {
        if (a.price < b.price) return -1;
        return a.price > b.price ? 1 : 0;
      });
      this.setState({ cars: a });
    };
    const priceFilterYear = () => {
      const a = cars.sort((a, b) => {
        if (a.year < b.year) return -1;
        return a.year > b.year ? 1 : 0;
      });
      this.setState({ cars: a });
    };
    const priceFilterKm = () => {
      const a = cars.sort((a, b) => {
        if (a.km < b.km) return -1;
        return a.km > b.km ? 1 : 0;
      });
      this.setState({ cars: a });
    };
    const priceFilter2 = () => {
      const a = cars.sort((a, b) => {
        if (a.price > b.price) return -1;
        return a.price < b.price ? 1 : 0;
      });
      this.setState({ cars: a });
    };
    const priceFilterYear2 = () => {
      const a = cars.sort((a, b) => {
        if (a.year > b.year) return -1;
        return a.year < b.year ? 1 : 0;
      });
      this.setState({ cars: a });
    };
    const priceFilterKm2 = () => {
      const a = cars.sort((a, b) => {
        if (a.km > b.km) return -1;
        return a.km < b.km ? 1 : 0;
      });
      this.setState({ cars: a });
    };

    return !cars.length ? (
      <b>Loading</b>
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
              price={priceFilter}
              price2={priceFilter2}
              year={priceFilterYear}
              year2={priceFilterYear2}
              km={priceFilterKm}
              km2={priceFilterKm2}
            />
          </Route>
          <Route path="/admin">
            <Admin />
          </Route>
        </Switch>
      </div>
    );
  }
}

export default App;
