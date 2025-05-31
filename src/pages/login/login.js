import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
// src/pages/AuthPage.tsx
import { useState } from 'react';
// Make sure the path is correct and the file exists.
// If your AuthForm component is actually in 'src/pages/components', update the import like this:
import AuthForm from '../../components/AuthForm';
import { loginUser, registerUser } from '../../api/auth'; // นำเข้าฟังก์ชัน API
const Login = () => {
    const [isLoginMode, setIsLoginMode] = useState(true);
    // ฟังก์ชันสำหรับจัดการ Login
    const handleLogin = async (data) => {
        const { User_Email, User_Pass } = data;
        try {
            const response = await loginUser(User_Email, User_Pass);
            localStorage.setItem('jwtToken', response.token);
            localStorage.setItem('currentUser', JSON.stringify(response.data.user));
            console.log('Login successful!', response);
            alert('Login successful! Check console for token and user data.');
            // สามารถ redirect ไปหน้า Dashboard ได้ที่นี่
            // window.location.href = '/dashboard';
        }
        catch (error) {
            console.error('Login failed:', error.message);
            throw error; // ส่ง error กลับไปให้ AuthForm จัดการ
        }
    };
    // ฟังก์ชันสำหรับจัดการ Register
    const handleRegister = async (data) => {
        const { Username, User_Email, User_Pass, User_Image } = data;
        try {
            const response = await registerUser(Username, User_Email, User_Pass, User_Image);
            localStorage.setItem('jwtToken', response.token);
            localStorage.setItem('currentUser', JSON.stringify(response.data.user));
            console.log('Registration successful!', response);
            alert('Registration successful! You are now logged in.');
            setIsLoginMode(true); // สลับกลับไปหน้า Login หลังจากลงทะเบียนสำเร็จ
        }
        catch (error) {
            console.error('Registration failed:', error.message);
            throw error; // ส่ง error กลับไปให้ AuthForm จัดการ
        }
    };
    return (_jsx("div", { className: "flex items-center justify-center min-h-screen bg-gray-100", children: _jsxs("div", { className: "bg-white p-8 rounded-lg shadow-xl w-full max-w-md", children: [_jsx("h1", { className: "text-3xl font-extrabold text-gray-900 text-center mb-8", children: "MissAnime" }), isLoginMode ? (_jsxs(_Fragment, { children: [_jsx(AuthForm, { type: "login", onSubmit: handleLogin }), _jsxs("p", { className: "mt-4 text-center text-gray-600", children: ["Don't have an account?", ' ', _jsx("button", { onClick: () => setIsLoginMode(false), className: "text-blue-600 hover:underline font-medium", children: "Register here" })] })] })) : (_jsxs(_Fragment, { children: [_jsx(AuthForm, { type: "register", onSubmit: handleRegister }), _jsxs("p", { className: "mt-4 text-center text-gray-600", children: ["Already have an account?", ' ', _jsx("button", { onClick: () => setIsLoginMode(true), className: "text-blue-600 hover:underline font-medium", children: "Login here" })] })] }))] }) }));
};
export default Login;
