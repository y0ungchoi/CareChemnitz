import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import Mainpage from "./pages/Mainpage";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import Impressum from "./pages/Impressum";
import Directions from "./pages/Directions";
import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Mainpage />,
      },
      {
        path: "/impressum",
        element: <Impressum />,
      },
      {
        path: "/directions",
        element: <Directions />,
      },
    ],
  },
  {
    path: "/signin",
    element: <App />,
    children: [
      {
        path: "/signin",
        element: <Signin />,
      },
    ],
  },
  {
    path: "/signup",
    element: <App />,
    children: [
      {
        path: "/signup",
        element: <Signup />,
      },
    ],
  },
  {
    path: "/profile",
    element: <App />,
    children: [
      {
        path: "/profile",
        element: <Profile />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
