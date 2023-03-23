import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Layout from './components/Layout';
import HomePage from "./pages/HomePage";
import Profile from "./pages/Profile";
import SignInPage from "./pages/SignInPage";

const routes = createBrowserRouter([
    {
        path:"/", 
        element: <Layout />,
        children: [
            {
                path: "/",
                element: <HomePage />
            },
            {
                path: "/user/login",
                element: <SignInPage />
            },
            {
                path: "/user/profile",
                element: <Profile />
            }
        ]
    }
])
export default routes;
