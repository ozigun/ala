import React, { useState } from "react";
import * as alasql from "alasql";
import {
  Button,
  Form,
  Grid,
  Header,
  Message,
  Segment,
} from "semantic-ui-react";

class LoginForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = { todo: [], password: "", mail: "" };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChangePassword(password) {
    this.setState({ password: password });
  }
  handleChangeMail(mail) {
    this.setState({ mail: mail });
  }

  componentWillMount() {
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
    const result = alasql("SELECT * FROM todos");
    this.setState({ todo: result });
  }

  insertTodo(mail, password) {
    alasql("INSERT INTO todos VALUES ?", [
      { id: alasql.autoval("todos", "id", true), mail, password },
    ]);
  }

  deleteTodo(id) {
    alasql("DELETE FROM todos WHERE id = ?", id);
  }

  addTodo() {
    //const { inputTodo } = this.refs;

    if (!this.state.mail) return;

    this.insertTodo(this.state.mail, this.state.password);
    this.fetchTodos();
    console.log(this.state.todo);
  }

  removeTodo(id) {
    this.deleteTodo(id);
    this.fetchTodos();
  }
  validateForm() {
    return this.state.mail.length > 0 && this.state.password.length > 0;
  }

  handleSubmit(event) {
    const mailCheck = alasql(
      "SELECT mail FROM todos WHERE mail= ?",
      this.state.mail
    );
    const passwordCheck = alasql(
      "SELECT password FROM todos WHERE password = ?",
      this.state.password
    );
    if ("a@gmail.com" === this.state.mail && "aaaa" === this.state.password) {
      window.location = "/homepage";
    } else {
      alert("noway");
    }
    event.preventDefault();
  }

  render() {
    return (
      <Grid
        textAlign="center"
        style={{ height: "100vh" }}
        verticalAlign="middle"
      >
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as="h2" color="teal" textAlign="center">
            Log In!
          </Header>
          <Form size="large" onSubmit={this.handleSubmit}>
            <Segment stacked>
              <Form.Input
                fluid
                icon="user"
                iconPosition="left"
                placeholder="E-mail address"
                value={this.state.mail}
                onChange={(e) => this.handleChangeMail(e.target.value)}
              />
              <Form.Input
                fluid
                icon="lock"
                iconPosition="left"
                placeholder="Password"
                type="password"
                value={this.state.password}
                onChange={(e) => this.handleChangePassword(e.target.value)}
              />

              <Button
                color="teal"
                fluid
                size="large"
                disabled={!this.validateForm()}
              >
                Login
              </Button>
            </Segment>
          </Form>
          <Message>
            New to us? <a href="/signup">Sign Up</a>
          </Message>
        </Grid.Column>
      </Grid>
    );
  }
}

export default LoginForm;
