import "./App.css";
import React from "react";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import Decision from "./pages/Decision";

function App() {
  return (
    <BrowserRouter basename={window.location.pathname || ""}>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/calculate" component={Decision} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
