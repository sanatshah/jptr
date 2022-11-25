import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { extendTheme, ChakraProvider } from '@chakra-ui/react'
import Article from './Article';

import Core, { _ } from "@homenode/jscore"
import { config } from "./config/App.config"

new Core(config)


const colors = {
  brand: {
    900: '#5e1a91',
    800: '#5e1a91',
    700: '#5e1a91',
    600: '#5e1a91',
    500: '#5e1a91',
    400: '#5e1a91',
    300: '#5e1a91',
    200: '#5e1a91',
    100: '#5e1a91',
  },
}

const theme = extendTheme({ colors })

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/txn",
    element: <Article />,
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <RouterProvider router={router} />
    </ChakraProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
