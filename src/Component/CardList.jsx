import React, { Component } from "react";
import Card from "./Cardi";
import { Table, Input } from "semantic-ui-react";
import * as alasql from "alasql";

class CardList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      todo: [],
      value: "",
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
    this.fetchTodos();
  }

  componentDidMount() {
    this.fetchTodos();
  }

  fetchTodos() {
    const result = alasql("SELECT * FROM cars");
    this.setState({ todo: result });
    console.log(this.state.todo);
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
    console.log(this.state.todo);
  }

  removeTodo(id) {
    this.deleteTodo(id);
    this.fetchTodos();
  }
  onValueChange(value) {
    this.setState({ value: value });
    console.log(this.state.value);
  }

  handleChange = (e, { value }) => this.setState({ value });

  render() {
    return (
      <div>
        <Table basic="very" celled collapsing>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Photo</Table.HeaderCell>
              <Table.HeaderCell>Serial</Table.HeaderCell>
              <Table.HeaderCell>Model</Table.HeaderCell>
              <Table.HeaderCell>Price</Table.HeaderCell>
              <Table.HeaderCell>Year</Table.HeaderCell>
              <Table.HeaderCell>KM</Table.HeaderCell>
              <Table.HeaderCell>Title</Table.HeaderCell>
              <Table.HeaderCell>Buy</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body className="mt-5 mr-6 ml-6">
            {this.props.products.map((todo, i) => {
              return (
                <Card
                  key={i}
                  photo={todo.photo}
                  serial={todo.serial}
                  model={todo.model}
                  price={todo.price}
                  year={todo.year}
                  km={todo.km}
                  about={todo.about}
                  id={todo.id}
                />
              );
            })}
          </Table.Body>
        </Table>
      </div>
    );
  }
}

export default CardList;
