import React, { Component } from "react";
import { Input, Form, Button, Divider } from "semantic-ui-react";

const Filter = (props) => {
  return (
    <div>
      <Form size="mini">
        <Form.Group widths="equal" label="Fiyat Aralığı">
          <p>Anahtar Kelime</p>
          <Input placeholder="Anahtar Kelime" onChange={props.onChange} />
        </Form.Group>
      </Form>
      <Divider hidden />
      <Form size="mini">
        <Form.Group widths="equal" label="Fiyat Aralığı">
          <p>Max Fiyatı Girin</p>
          <Input control="input" placeholder="Max" />
        </Form.Group>

        <Divider hidden />
      </Form>
    </div>
  );
};
export default Filter;
