import React, { Component } from "react";
import { Table, Image, Button } from "semantic-ui-react";
import "../App.css";
import * as alasql from "alasql";
class Admin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      todo: [],
      people: [],
    };
  }

  componentWillMount() {
    alasql(`
      CREATE LOCALSTORAGE DATABASE IF NOT EXISTS cars_db;
      ATTACH LOCALSTORAGE DATABASE cars_db;
      USE cars_db;
    `);
    alasql(
      "CREATE TABLE IF NOT EXISTS cars (id INT AUTOINCREMENT PRIMARY KEY, photo STRING, serial STRING,model STRING,price NUMBER,year NEUMBER,km NUMBER,about STRING)"
    );
    alasql(`
    CREATE LOCALSTORAGE DATABASE IF NOT EXISTS todos_db;
    ATTACH LOCALSTORAGE DATABASE todos_db;
    USE todos_db;
  `);
    alasql(
      "CREATE TABLE IF NOT EXISTS todos (id INT AUTOINCREMENT PRIMARY KEY, mail STRING, password STRING)"
    );
  }

  componentDidMount() {
    this.fetchTodos();
  }

  fetchTodos() {
    const result = alasql("SELECT * FROM cars");
    const people = alasql("SELECT * FROM todos");
    this.setState({ todo: result, people: people });
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
    window.location = "/homepage";
  }

  handleChange = (e, { value }) => this.setState({ value });
  render() {
    return (
      <div>
        <h1>Ürünler</h1>
        <Table.Row>
          <Table.Cell>
            <Image src={this.state.todo.photo} size="tiny" />
          </Table.Cell>
          <Table.Cell>{this.state.todo.serial}</Table.Cell>
          <Table.Cell>{this.state.todo.model}</Table.Cell>
          <Table.Cell>{this.state.todo.price} </Table.Cell>
          <Table.Cell>{this.state.todo.year}</Table.Cell>
          <Table.Cell>{this.state.todo.km} </Table.Cell>
          <Table.Cell>{this.state.todo.about} </Table.Cell>
          <Table.Cell>
            <Button
              color="red"
              onClick={(e) => this.removeTodo(this.state.todo.id)}
            >
              Buy!
            </Button>
          </Table.Cell>
          <Table.Cell>
            <Button href={`mailto:${this.state.todo.mail}`} color="green">
              Chat
            </Button>
          </Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>{this.state.people.mail}</Table.Cell>
          <Table.Cell>{this.state.people.password}</Table.Cell>
        </Table.Row>
      </div>
    );
  }
}

export default Admin;
