import React, { Component } from "react";
import { Menu } from "semantic-ui-react";
import { Link } from "react-router-dom";

class Navigation extends Component {
  state = { activeItem: " " };

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  render() {
    const { activeItem } = this.state;

    return (
      <div>
        <Menu color={"green"} pointing secondary>
          <Menu.Item
            name="home"
            active={activeItem === "home"}
            onClick={this.handleItemClick}
            as={Link}
            to="/homepage"
          />

          <Menu.Item
            name="sell a car"
            active={activeItem === "sell a car"}
            onClick={this.handleItemClick}
            as={Link}
            to="/sellacar"
          />
          <Menu.Item
            name="TermAndConditions"
            active={activeItem === "TermAndConditions"}
            onClick={this.handleItemClick}
            as={Link}
            to="/termandconditions"
          />
          <Menu.Item
            name="BizKimiz"
            active={activeItem === "BizKimiz"}
            onClick={this.handleItemClick}
            as={Link}
            to="/whoweare"
          />

          <Menu.Menu position="right">
            <Menu.Item
              name="Logout"
              active={activeItem === "logout"}
              onClick={this.handleItemClick}
              href="/"
            />
          </Menu.Menu>
        </Menu>
      </div>
    );
  }
}
export default Navigation;
