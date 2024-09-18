import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from './components/App/index.js';
import Error from './components/Error/index.js'
import Login from './components/App/Login/index.js';
import Register from './components/App/Register/index.js';
import Lessons from './components/Lessons/index.js';
import Detail from './components/Lessons/Detail/index.js';
import Account from "./components/Account/index.js";
import Admin from './components/Admin/index.js';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        errorElement: <Error />
    },{
        path: "/cours",
        element: <Lessons />,
    },{
        path: 'cours/:lesson_id',
        element: <Detail />,
    },{
        path: "/connexion",
        element: <Login />
    },{
        path: "/inscription",
        element: <Register />
    },{
        path: "/compte",
        element: <Account />
    },{
        path: "/administration",
        element: <Admin />
    }
]);

ReactDOM.createRoot(document.getElementById("app")).render(
    <RouterProvider router={router} />
);