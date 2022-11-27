import ReactDOM from 'react-dom/client';
import React from 'react';
import reportWebVitals from './reportWebVitals';

import { RouterProvider } from "react-router-dom";
import { ChakraProvider } from '@chakra-ui/react'

import { theme } from './config/theme'
import { router } from './config/routes';

import Core, { _ } from "@homenode/jscore/dist/Core"
import { config } from "./config/App.config"
import { WalletConnect } from './components/WalletConnect';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

(async () => {

  new Core(config)
  await _.m().start()

  if (_.m().started) {
    root.render(
      (() => {
        return (
          <React.StrictMode>
            <WalletConnect>
              <ChakraProvider theme={theme}>
                <RouterProvider router={router} />
              </ChakraProvider>
            </WalletConnect>
          </React.StrictMode>
        )
      })()
    );
  } else {
    root.render(
      <React.StrictMode>
        <h4>LOADING</h4>
      </React.StrictMode>
    );
  }
})()



// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();
