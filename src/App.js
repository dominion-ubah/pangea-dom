import React, { Component } from "react";
import { ApolloClient } from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import { Switch, Route } from "react-router-dom";
import { HttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import Dashboard from "./components/Dashboard";
import { vars } from "./constants";
import "./App.css";

// Create an http link:
const link = new HttpLink({
  uri: vars.GRAPHQL_ENDPOINT,
});

// Instantiate client
const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
});

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <div className="App container-fluid">
          <Switch>
            <Route path="/" exact={true} component={Dashboard} />
          </Switch>
        </div>
      </ApolloProvider>
    );
  }
}

export default App;
