import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";
import MasterLayout from "../layouts/MasterLayout";
import Dashboard from "../pages/Dashboard";
import AuthLayout from "../layouts/AuthLayout";
import Login from "../pages/auth/Login";
import Auth from "../pages/auth/Auth";
import Unauthorised from "../pages/auth/Unauthorised";
import AddCategory from "../pages/Category/AddCategory";
import AddLanguage from "../pages/Language/AddLanguage";
import ShowCategory from "../pages/Category/ShowCategory";
import ShowLanguage from "../pages/Language/ShowLanguage";

const router = createBrowserRouter(
    createRoutesFromElements(
        <>

            <Route path="/dashboard" element={<Auth><MasterLayout /></Auth>}>
                <Route index element={<Dashboard />} />
                <Route path="addcategory" element={<AddCategory />} />
                <Route path="addlanguage" element={<AddLanguage />} />
                <Route path="showallcategory" element={<ShowCategory />} />
                <Route path="showalllanguage" element={<ShowLanguage />} />
            </Route>
            <Route path="/unauthorised" element={<Unauthorised />} />

            <Route path="/" element={<AuthLayout />}>
                <Route index element={<Login />} />
            </Route>

        </>
    )
)
const Router = () => {
    return (
        <RouterProvider router={router} />
    )
}
export default Router;