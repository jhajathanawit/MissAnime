import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
// src/pages/AuthPage.tsx
import { useState } from 'react';
import AuthForm from '../../components/AuthForm';
import { loginUser, registerUser } from '../../api/auth';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../.././contexts/UserContext'; // Adjust the path if needed
const Login = () => {
    const [isLoginMode, setIsLoginMode] = useState(true);
    const navigate = useNavigate();
    const { setUser } = useUser();
    const handleLogin = async (data) => {
        const { User_Email, User_Pass } = data;
        try {
            const response = await loginUser(User_Email, User_Pass);
            localStorage.setItem('jwtToken', response.token);
            localStorage.setItem('currentUser', JSON.stringify(response.data.user));
            setUser(response.data.user.user_id); // set user context
            alert('Login successful!');
            navigate(`/users/${response.data.user.user_id}`); // redirect to user dashboard
        }
        catch (error) {
            throw error;
        }
    };
    const handleRegister = async (data) => {
        const { Username, User_Email, User_Pass, User_Image } = data;
        try {
            const response = await registerUser(Username, User_Email, User_Pass, User_Image);
            localStorage.setItem('jwtToken', response.token);
            localStorage.setItem('currentUser', JSON.stringify(response.data.user));
            setUser(response.data.user.user_id); // set user context
            alert('Registration successful!');
            setIsLoginMode(true);
            navigate(`/users/${response.data.user.user_id}`); // redirect after register
        }
        catch (error) {
            throw error;
        }
    };
    return (_jsx("div", { className: "flex items-center justify-center min-h-screen bg-gradient-to-br  px-2", children: _jsxs("div", { className: "bg-white p-4 sm:p-8 rounded-lg shadow-xl w-full max-w-[95vw] sm:max-w-md md:max-w-2xl lg:max-w-3xl", children: [_jsx("h1", { className: "text-3xl sm:text-4xl md:text-5xl font-extrabold text-pink-500 text-center mb-8", children: "MissAnime" }), isLoginMode ? (_jsxs(_Fragment, { children: [_jsx(AuthForm, { type: "login", onSubmit: handleLogin }), _jsxs("p", { className: "mt-4 text-center text-gray-600 text-sm sm:text-base", children: ["Don't have an account?", ' ', _jsx("button", { onClick: () => setIsLoginMode(false), className: "text-blue-600 hover:underline font-medium", children: "Register here" })] })] })) : (_jsxs(_Fragment, { children: [_jsx(AuthForm, { type: "register", onSubmit: handleRegister }), _jsxs("p", { className: "mt-4 text-center text-gray-600 text-sm sm:text-base", children: ["Already have an account?", ' ', _jsx("button", { onClick: () => setIsLoginMode(true), className: "text-blue-600 hover:underline font-medium", children: "Login here" })] })] }))] }) }));
};
export default Login;
