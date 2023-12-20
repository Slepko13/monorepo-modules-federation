import { createRoot } from 'react-dom/client';
import { RouterProvider,} from "react-router-dom";

import { router } from "./router";

import './index.css';


const root = createRoot(document.getElementById('root'));
root.render(<RouterProvider router={router} />);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
