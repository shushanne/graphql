import { ApolloClient, ApolloProvider, from, HttpLink, InMemoryCache } from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { teal } from '@material-ui/core/colors';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import React from "react";
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from "react-router-dom";
import App from './App';
import './index.css';
import reportWebVitals from './reportWebVitals';

const errorLink = onError(({ graphqlErrors }) => {
  if (graphqlErrors) {
    graphqlErrors.map(({ message, location, path }) => {
      return console.log(message)
    })
  }
})

const link = from([
  errorLink,
  new HttpLink({ uri: "http://localhost:3005/graphql" })
])

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: link
})

const theme = createTheme({
  palette: {
    secondary: {
      main: teal[300],
    },
  },
});

ReactDOM.render(
  <ApolloProvider client={client} >
    <Router>
      {/* <React.StrictMode> */}
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
      {/* </React.StrictMode> */}
    </Router>
  </ApolloProvider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
