import { createBrowserRouter, RouterProvider, Routes, Router } from "react-router-dom";

import Activity from "./Activity.jsx";
import Archive from "./Archive.jsx";
import Navbar from '../Navbar.jsx';

const routerPaths = createBrowserRouter([
    {
        path: '/',
        element: <><Activity /><Navbar /></>
    },
    {
        path: '/activity',
        element: <><Activity /><Navbar /></>
    },
    {
        path: '/archive',
        element: <><Archive /><Navbar /></>
    },
]);

const RouterSetup = () => {
    return <RouterProvider router={routerPaths} />
}

export default RouterSetup;