import React, { Component, useEffect } from "react";
import Navigation from "./Navigation.jsx";
import { BrowserRouter as Switch, Route } from "react-router-dom";
import Cars from "./Cars.jsx";
import Home from "./Home.jsx";
import TermAndCon from "./TermAndCon.jsx";
import WhoWeAre from "./WhoWeAre.jsx";

const HomePage = (props) => {
  useEffect(() => console.log("props:" + props.products));
  return (
    <div>
      <Switch>
        <Navigation />
        <Route exact path="/homepage">
          <Home
            onChange={props.searchChange}
            products={props.products}
            price={props.price}
            price2={props.price2}
            year={props.year}
            year2={props.year2}
            km={props.km}
            km2={props.km2}
          />
        </Route>
        <Route path="/sellacar">
          <Cars />
        </Route>
        <Route path="/termandconditions">
          <TermAndCon />
        </Route>
        <Route path="/whoweare">
          <WhoWeAre />
        </Route>
      </Switch>
    </div>
  );
};
export default HomePage;
