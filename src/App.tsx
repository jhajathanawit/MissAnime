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

const router = createHashRouter(
  [
    {
      path: "/",
      element: <Root />,
      children: [
        { index: true, element: <HomePage />, loader: homeLoader },
        { path: "search", element: <SearchPage />, loader: searchLoader },
        { path: "packages/:name", element: <DetailsPage />, loader: detailsLoader },
        { path: "login", element: <Login /> },
        { path: "users/:id", element: <UserDashboard /> },
        { path: "contact", element: <Contact /> }
      ]
    }
  ],
 
);

function App() {
  return (
    <UserProvider>
      <RouterProvider router={router} />
    </UserProvider>
  );
}

export default App;