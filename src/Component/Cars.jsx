import React, { Component } from "react";
import { Button, Form, Input } from "semantic-ui-react";
import * as alasql from "alasql";

class Cars extends Component {
  constructor(props) {
    super(props);

    this.state = {
      todo: [],
      photo: "",
      serial: "",
      model: "",
      price: "",
      year: "",
      km: "",
      about: "",
      delte: "",
      mail: "",
    };
  }

  handleChangePhoto(photo) {
    this.setState({ photo: photo });
  }
  handleChangeSerial(serial) {
    this.setState({ serial: serial });
  }
  handleChangeModel(model) {
    this.setState({ model: model });
  }
  handleChangePrice(price) {
    this.setState({ price: price });
  }
  handleChangeYear(year) {
    this.setState({ year: year });
  }
  handleChangeKm(km) {
    this.setState({ km: km });
  }
  handleChangeAbout(about) {
    this.setState({ about: about });
  }
  handleChangeMail(mail) {
    this.setState({ mail: mail });
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
  }

  componentDidMount() {
    this.fetchTodos();
  }

  fetchTodos() {
    const result = alasql("SELECT * FROM cars");
    this.setState({ todo: result });
    console.log(this.state.todo);
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
    console.log(this.state.todo);
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
    window.location = "/homepage";
  }

  removeTodo(id) {
    this.deleteTodo(id);
    this.fetchTodos();
  }

  handleChange = (e, { value }) => this.setState({ value });

  render() {
    return (
      <div>
        <Form onSubmit={(e) => this.addTodo()}>
          <h1>Araç Bilgilerini Giriniz</h1>
          <Form.Group widths="equal">
            <Form.Field
              control={Input}
              label="Fotoğraf Linki"
              placeholder="Fotoğraf Linki"
              onChange={(e) => this.handleChangePhoto(e.target.value)}
            />
            <Form.Field
              control={Input}
              label="Seri"
              placeholder="Seri"
              onChange={(e) => this.handleChangeSerial(e.target.value)}
            />
            <Form.Field
              control={Input}
              label="Model"
              placeholder="Model"
              onChange={(e) => this.handleChangeModel(e.target.value)}
            />
            <Form.Field
              control={Input}
              label="Mail"
              placeholder="Mail"
              onChange={(e) => this.handleChangeMail(e.target.value)}
            />
          </Form.Group>
          <Form.Group widths="equal">
            <Form.Field
              control={Input}
              label="Fiyat"
              placeholder="Fiyat"
              onChange={(e) => this.handleChangePrice(e.target.value)}
            />
            <Form.Field
              control={Input}
              label="Yıl"
              placeholder="Yıl"
              onChange={(e) => this.handleChangeYear(e.target.value)}
            />
            <Form.Field
              control={Input}
              label="KM"
              placeholder="KM"
              onChange={(e) => this.handleChangeKm(e.target.value)}
            />

            <Form.Field
              control={Input}
              label="Hakkında"
              placeholder="Aracınız Hakkında Açıklama..."
              onChange={(e) => this.handleChangeAbout(e.target.value)}
            />
          </Form.Group>
          <Form.Field control={Button}>Kaydet</Form.Field>
        </Form>
      </div>
    );
  }
}

export default Cars;
