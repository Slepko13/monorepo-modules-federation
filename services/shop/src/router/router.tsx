import { createBrowserRouter } from "react-router-dom";
import { lazy, Suspense } from 'react';
import {  shopRoutes } from '@packages/shared';


import App from "../App";
const Shop = lazy(() => import("../pages/shop/shop")) ;

export const routes = [
    {
        path: shopRoutes.baseUrl,
        element: <App/>,
        children: [
            {
                path: shopRoutes.main,
                element: <Suspense fallback={'Loading'}><Shop/></Suspense>,
            },
            {
                path: shopRoutes.second,
                element: <Suspense fallback={'Loading'}><div style={{ color: 'red' }}>Second shop page</div></Suspense>,
            },
        ]
    }
]
export const router = createBrowserRouter(routes);
export default routes;

