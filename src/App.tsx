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
    path: "/MissAnime/",
    element: <Root />,
    children: [
      { index: true, element: <HomePage />, loader: homeLoader },
      { path: "search", element: <SearchPage />, loader: searchLoader },
      { path: "packages/:name", element: <DetailsPage />, loader: detailsLoader }
    ]
  }
]);

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;