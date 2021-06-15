import React from "react";
import "./App.css";

import { Switch, Route } from "react-router-dom";

import HomePage from "./pages/homepage/homepage.component";
import ShopPage from "./pages/shop/shop.component"

const HatsPage = () => <h1>HATS PAGE</h1>;

const JacketPage = () => <h1>JACKETS PAGE</h1>;

const SneakersPage = () => <h1>SNEAKERS PAGE</h1>;

const WomensPage = () => <h1>WOMENS PAGE</h1>;

const MensPage = () => <h1>MENS PAGE</h1>;

function App() {
  return (
    <div>
      <Switch>
        <Route path="/shop/hats" component={HatsPage} />
        <Route path="/shop/jackets" component={JacketPage} />
        <Route path="/shop/sneakers" component={SneakersPage} />
        <Route path="/shop/womens" component={WomensPage} />
        <Route path="/shop/mens" component={MensPage} />
        <Route path="/shop" component={ShopPage} />
        <Route path="/" component={HomePage} />
      </Switch>
    </div>
  );
}

export default App;
