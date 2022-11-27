import React from 'react';
import { createBrowserRouter, } from "react-router-dom";

import Home from '../views/home/Home';
import { Post } from '../views/post/Post';

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/post",
    element: <Post />,
  },
]);
