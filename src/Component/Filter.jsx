import React, { Component } from "react";
import { Input, Form, Menu, Divider } from "semantic-ui-react";

class Filter extends Component {
  state = {};
  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  render() {
    const { activeItem } = this.state;
    return (
      <div>
        <Divider hidden />
        <Menu vertical>
          <Menu.Item>
            <Menu.Header>Fiyata Göre</Menu.Header>

            <Menu.Menu>
              <Menu.Item
                name="En Düşük"
                active={activeItem === "enterprise"}
                onClick={this.props.price}
              />
              <Menu.Item
                name="En Yüksek"
                active={activeItem === "consumer"}
                onClick={this.props.price2}
              />
            </Menu.Menu>
          </Menu.Item>

          <Menu.Item>
            <Menu.Header>Yıla Göre</Menu.Header>

            <Menu.Menu>
              <Menu.Item
                name="En Düşük"
                active={activeItem === "enterprise"}
                onClick={this.props.year}
              />
              <Menu.Item
                name="En Yüksek"
                active={activeItem === "consumer"}
                onClick={this.props.year2}
              />
            </Menu.Menu>
          </Menu.Item>
          <Menu.Item>
            <Menu.Header>KM'ye Göre</Menu.Header>

            <Menu.Menu>
              <Menu.Item
                name="En Düşük"
                active={activeItem === "enterprise"}
                onClick={this.props.km}
              />
              <Menu.Item
                name="En Yüksek"
                active={activeItem === "consumer"}
                onClick={this.props.km2}
              />
              <Divider hidden />

              <Menu.Item>
                <Input
                  icon="search"
                  placeholder="Araç Ara!"
                  onChange={this.props.onChange}
                />
              </Menu.Item>
            </Menu.Menu>
          </Menu.Item>
        </Menu>
      </div>
    );
  }
}
export default Filter;
