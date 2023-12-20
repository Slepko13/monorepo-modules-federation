import { Link, Outlet } from "react-router-dom";
import { shopRoutes } from "@packages/shared";

export const App = () => {
    return (
        <>
            <h3>SHOP MODULE</h3>
            <Link to={shopRoutes.second} > Go to second page</Link>
            <Outlet/>
        </>

    )
}

export default App;

