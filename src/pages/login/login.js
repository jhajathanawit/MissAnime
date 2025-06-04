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
    return (_jsx("div", { className: "flex items-center justify-center min-h-screen bg-gradient-to-br", children: _jsx("div", { className: "bg-[#1d0a3dc2] rounded-lg shadow-xl w-full max-w-[95vw] sm:max-w-md md:max-w-2xl lg:max-w-3xl", children: isLoginMode ? (_jsxs(_Fragment, { children: [_jsx(AuthForm, { type: "login", onSubmit: handleLogin }), _jsxs("p", { className: "pb-20 pt-[-8rem] text-center text-gray-300 text-sm", children: ["\u0E22\u0E31\u0E07\u0E44\u0E21\u0E48\u0E21\u0E35\u0E1A\u0E31\u0E0D\u0E0A\u0E35\u0E1C\u0E39\u0E49\u0E43\u0E0A\u0E49?", ' ', _jsx("button", { onClick: () => setIsLoginMode(false), className: "text-blue-400 hover:underline font-medium", children: "\u0E25\u0E07\u0E17\u0E30\u0E40\u0E1A\u0E35\u0E22\u0E19\u0E17\u0E35\u0E48\u0E19\u0E35\u0E48" })] })] })) : (_jsxs(_Fragment, { children: [_jsx(AuthForm, { type: "register", onSubmit: handleRegister }), _jsxs("p", { className: "pb-20 pt-[-8rem]  text-center text-gray-300 text-sm", children: ["\u0E21\u0E35\u0E1A\u0E31\u0E0D\u0E0A\u0E35\u0E1C\u0E39\u0E49\u0E43\u0E0A\u0E49\u0E41\u0E25\u0E49\u0E27?", ' ', _jsx("button", { onClick: () => setIsLoginMode(true), className: "text-blue-400 hover:underline font-medium", children: "\u0E40\u0E02\u0E49\u0E32\u0E2A\u0E39\u0E48\u0E23\u0E30\u0E1A\u0E1A\u0E17\u0E35\u0E48\u0E19\u0E35\u0E48" })] })] })) }) }));
};
export default Login;
