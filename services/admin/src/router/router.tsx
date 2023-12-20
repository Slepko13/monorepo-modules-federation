import { createBrowserRouter } from "react-router-dom";

import App from "../App";
import About from "../pages/about/about"
import {  adminRoutes } from '@packages/shared';

export const routes = [
    {
        path: adminRoutes.baseUrl,
        element: <App/>,
        children: [
            {
                path: adminRoutes.about,
                element: <About/>,
            },
        ]
    }
]
export const router = createBrowserRouter(routes);

export default routes;
