import { jsx as _jsx } from "react/jsx-runtime";
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import Root from "./pages/Root";
import HomePage from "./pages/home/HomePage";
import DetailsPage from "./pages/details/DetailsPage";
import SearchPage from "./pages/search/SearchPage";
import { searchLoader } from "./pages/search/searchLoader";
import { detailsLoader } from "./pages/details/detailLoader";
import { homeLoader } from "./pages/home/homeLoader";
import ErrorPage from "./pages/ErrorPage";
import Login  from "./pages/login/login";
import UserDashboard from "./pages/user/UserDashboard";
import Contact from "./pages/contact/contact";
import { UserProvider } from "./contexts/UserContext"; // ตรวจสอบ path ให้ถูกต้อง

function App() {
    return (
        <UserProvider>
            <div className="bg-[#0a0f18] min-h-screen p-4">
                <Router>
                    <Routes>
                        <Route path="/MissAnime/" element={<Root />} errorElement={<ErrorPage />}>
                            <Route index element={<HomePage />} loader={homeLoader} />
                            <Route path="search" element={<SearchPage />} loader={searchLoader} />
                            <Route path="packages/:name" element={<DetailsPage />} loader={detailsLoader} />
                            <Route path="login" element={<Login />} />
                            <Route path="users/:id" element={<UserDashboard />} />
                            <Route path="contact" element={<Contact />} />
                        </Route>
                    </Routes>
                </Router>
            </div>
        </UserProvider>
    );
}

export default App;