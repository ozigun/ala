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

    this.state = { todo: [], password: "", mail: "", value: "" };
  }

  handleChangePassword(password) {
    this.setState({ password: password });
  }
  handleChangeMail(mail) {
    this.setState({ mail: mail });
  }
  handleChangeCheck(change) {
    this.setState({ value: change });
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
    if (this.state.value === "this") {
      this.insertTodo(this.state.mail, this.state.password);
      this.fetchTodos();
      console.log(this.state.todo);
    }
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
            Kayıt!
          </Header>
          <Form size="large" onSubmit={(e) => this.addTodo()}>
            <Segment stacked>
              <Form.Input
                fluid
                icon="user"
                iconPosition="left"
                placeholder="E-mail adresi"
                value={this.state.mail}
                onChange={(e) => this.handleChangeMail(e.target.value)}
              />
              <Form.Input
                fluid
                icon="lock"
                iconPosition="left"
                placeholder="Parola"
                type="password"
                value={this.state.password}
                onChange={(e) => this.handleChangePassword(e.target.value)}
              />
              <Form.Input
                fluid
                icon="lock"
                iconPosition="left"
                placeholder="Parola Doğrula"
                type="password"
              />
              <Checkbox
                label="Kullanım Koşulları"
                name="checkboxRadioGroup"
                value="this"
                checked={this.state.value === "this"}
                onChange={(e) => this.handleChangeCheck(e.target.value)}
              />
              <Button color="teal" fluid size="large">
                Kaydet!
              </Button>
            </Segment>
          </Form>
          <Message>
            Zaten Bir Hesabım Var? <a href="/">Giriş Yap.</a>
          </Message>
        </Grid.Column>
      </Grid>
    );
  }
}

export default SignUp;
