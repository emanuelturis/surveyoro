import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import {
  ApolloClient,
  ApolloProvider,
  ApolloLink,
  HttpLink,
} from "@apollo/client";
import { InMemoryCache } from "@apollo/client/cache";
import { setContext } from "@apollo/client/link/context";

const httpLink = new HttpLink({
  uri: process.env.REACT_APP_SERVER_URL || "http://localhost:9000/graphql",
});

const authLink = setContext((_: any, { headers }) => {
  const token = localStorage.getItem("token");

  return {
    headers: {
      ...headers,
      authorization: `Bearer ${token}`,
    },
  };
});

const client = new ApolloClient({
  link: ApolloLink.from([authLink, httpLink]),
  cache: new InMemoryCache(),
});

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
