import React, { Component } from "react";
import { Grid } from "semantic-ui-react";
import CardList from "./CardList.jsx";
import Filter from "./Filter.jsx";

const Home = (props) => {
  return (
    <div>
      <Grid celled>
        <Grid.Row>
          <Grid.Column width={3}>
            <Filter onChange={props.onChange} onChange2={props.onChange2} />
          </Grid.Column>
          <Grid.Column width={13}>
            <CardList products={props.products} />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  );
};
export default Home;
