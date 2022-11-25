import React from 'react';
import { createBrowserRouter, } from "react-router-dom";

import Home from '../views/home/Home';
import Article from '../views/post/Article';

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/transaction",
    element: <Article />,
  },
  {
    path: "/address",
    element: <Article />,
  },
]);
