import React, { component, useState } from "react";
import "./App.css";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./Home";
import Register from "./Register";
import Login from "./Login";
import Stocks from "./Stocks";
import SymbolDetail from "./Symbol";
import PriceHistory from "./PriceHistory";

// Handel routing for whole pages of the app.
function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/" component={Home}></Route>
          <Route path="/user/register" component={Register}></Route>
          <Route path="/user/login" component={Login}></Route>
          <Route path="/stocks/symbols" component={Stocks}></Route>
          <Route path="/stocks/authed/:id" component={PriceHistory}></Route>
          <Route path="/stocks/:symbol" component={SymbolDetail}></Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
