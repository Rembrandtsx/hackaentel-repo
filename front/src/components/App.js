import React from "react";

import "./App.scss";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useLocation,
} from "react-router-dom";
import Header from "./Header";
import MainEmpresas from "./MainEmpresas";
import MainPymes from "./MainPymes";
import MainPersonas from "./MainPersonas";
import MainDefault from "./MainDefault";
function App() {
  return (
    <>
      <Header></Header>
      <Router>
        <Components></Components>
      </Router>
    </>
  );
}
function Components() {
  let query = useQuery();
  return (
    <>
      <Switch>
        <MainEmpresas
          amount={query.get("amount")}
          path="/empresas"
        ></MainEmpresas>
        <MainPymes amount={query.get("amount")} path="/pymes"></MainPymes>
        <MainPersonas
          amount={query.get("amount")}
          path="/personas"
        ></MainPersonas>
        <MainDefault amount={query.get("amount")} path="/"></MainDefault>
      </Switch>
    </>
  );
}
function useQuery() {
  return new URLSearchParams(useLocation().search);
}
export default App;
