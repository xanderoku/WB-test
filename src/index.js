import React from "react";
import { Provider } from "react-redux";
import { createBrowserHistory } from "history";
import ReactDOM from "react-dom";
import { Route, Switch, Router } from "react-router-dom";

import store from "./store";
import { App } from "./components";

ReactDOM.render(
  <Router history={createBrowserHistory()}>
    <Provider store={store}>
      <Switch>
        <Route path="/" component={App} />
      </Switch>
    </Provider>
  </Router>,
  document.getElementById("root")
);
