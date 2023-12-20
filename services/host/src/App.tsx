import { Link, Outlet } from "react-router-dom";
import { adminRoutes, shopRoutes, hostRoutes } from '@packages/shared';
export const App = () => {
    return (
        <>
            <h3>Hello module federation</h3>
            <Link to={hostRoutes.baseurl}>Host page</Link>
            <br/>
            <Link to={adminRoutes.about}>About</Link>
            <br/>
            <Link to={shopRoutes.main}>Shop</Link>
            <Outlet/>
        </>

    )
}

export default App;

