import { jsx as _jsx } from "react/jsx-runtime";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./pages/Root";
import HomePage from "./pages/home/HomePage";
import DetailsPage from "./pages/details/DetailsPage";
import SearchPage from "./pages/search/SearchPage";
import { searchLoader } from "./pages/search/searchLoader";
import { detailsLoader } from "./pages/details/detailLoader";
import { homeLoader } from "./pages/home/homeLoader";
const router = createBrowserRouter([
    {
        path: "/",
        element: _jsx(Root, {}),
        children: [
            { index: true, element: _jsx(HomePage, {}), loader: homeLoader },
            { path: "/search", element: _jsx(SearchPage, {}), loader: searchLoader },
            { path: "/packages/:name", element: _jsx(DetailsPage, {}), loader: detailsLoader }
        ]
    }
]);
function App() {
    return (_jsx("div", { className: "bg-[#0a0f18] min-h-screen", children: _jsx(RouterProvider, { router: router }) }));
}
export default App;
