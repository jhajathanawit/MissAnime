import { jsx as _jsx } from "react/jsx-runtime";
import { createHashRouter, RouterProvider } from "react-router-dom";
import Root from "./pages/Root";
import HomePage from "./pages/home/HomePage";
import DetailsPage from "./pages/details/DetailsPage";
import SearchPage from "./pages/search/SearchPage";
import { searchLoader } from "./pages/search/searchLoader";
import { detailsLoader } from "./pages/details/detailLoader";
import { homeLoader } from "./pages/home/homeLoader";
import Login from "./pages/login/login";
import UserDashboard from "./pages/userDashboard/userDashboard";
import Contact from "./pages/contact/contact";
import { UserProvider } from "./contexts/UserContext";
const router = createHashRouter([
    {
        path: "/",
        element: _jsx(Root, {}),
        children: [
            { index: true, element: _jsx(HomePage, {}), loader: homeLoader },
            { path: "search", element: _jsx(SearchPage, {}), loader: searchLoader },
            { path: "packages/:name", element: _jsx(DetailsPage, {}), loader: detailsLoader },
            { path: "login", element: _jsx(Login, {}) },
            { path: "users/:id", element: _jsx(UserDashboard, {}) },
            { path: "contact", element: _jsx(Contact, {}) }
        ]
    }
]);
function App() {
    return (_jsx(UserProvider, { children: _jsx(RouterProvider, { router: router }) }));
}
export default App;
