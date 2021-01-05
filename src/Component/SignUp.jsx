import React from "react";
import * as alasql from "alasql";
import {
  Button,
  Form,
  Grid,
  Header,
  Message,
  Segment,
} from "semantic-ui-react";

class SignUp extends React.Component {
  constructor(props) {
    super(props);

    this.state = { todo: [], password: "", mail: "" };
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

  render() {
    return (
      <Grid
        textAlign="center"
        style={{ height: "100vh" }}
        verticalAlign="middle"
      >
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as="h2" color="teal" textAlign="center">
            Sign Me Up!
          </Header>
          <Form size="large" onSubmit={(e) => this.addTodo()}>
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
              <Form.Input
                fluid
                icon="lock"
                iconPosition="left"
                placeholder="Confirm Password"
                type="password"
              />

              <Button color="teal" fluid size="large">
                Sign Me Up!
              </Button>
            </Segment>
          </Form>
          <Message>
            Already have a sign? <a href="/">Sign In</a>
          </Message>
        </Grid.Column>
      </Grid>
    );
  }
}

export default SignUp;
