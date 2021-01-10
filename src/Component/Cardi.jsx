import React, { Component } from "react";
import { Table, Image, Button } from "semantic-ui-react";
import "../App.css";
import * as alasql from "alasql";
class Cardi extends Component {
  constructor(props) {
    super(props);

    this.state = {
      todo: [],
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
  }

  componentDidMount() {
    this.fetchTodos();
  }

  fetchTodos() {
    const result = alasql("SELECT * FROM cars");
    this.setState({ todo: result });
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
      <Table.Row>
        <Table.Cell>
          <Image src={this.props.photo} size="tiny" />
        </Table.Cell>
        <Table.Cell>{this.props.serial}</Table.Cell>
        <Table.Cell>{this.props.model}</Table.Cell>
        <Table.Cell>{this.props.price} </Table.Cell>
        <Table.Cell>{this.props.year}</Table.Cell>
        <Table.Cell>{this.props.km} </Table.Cell>
        <Table.Cell>{this.props.about} </Table.Cell>
        <Table.Cell>
          <Button color="red" onClick={(e) => this.removeTodo(this.props.id)}>
            Buy!
          </Button>
        </Table.Cell>
        <Table.Cell>
          <Button href={`mailto:${this.props.mail}`} color="green">
            Chat
          </Button>
        </Table.Cell>
      </Table.Row>
    );
  }
}

export default Cardi;
