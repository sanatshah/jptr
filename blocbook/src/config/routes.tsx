import React from 'react';
import { createBrowserRouter, } from "react-router-dom";

import Home from '../views/home/Home';
import { Post } from '../views/post/Post';
import { SubmitPost } from '../views/post/SubmitPost';

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/publish",
    element: <SubmitPost />,
  },
  {
    path: "/post",
    element: <Post />,
  },
]);
