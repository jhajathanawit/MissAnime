import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// src/components/AuthForm.tsx
import { useState } from 'react';
import Message from './Message'; // นำเข้า Message component
const AuthForm = ({ type, onSubmit }) => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userImage, setUserImage] = useState('');
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setMessageType('');
        setIsLoading(true);
        try {
            if (type === 'login') {
                await onSubmit({ User_Email: email, User_Pass: password });
            }
            else { // register
                await onSubmit({
                    Username: username,
                    User_Email: email,
                    User_Pass: password,
                    User_Image: userImage || null,
                });
            }
            setMessage(`${type === 'login' ? 'Login' : 'Registration'} successful!`);
            setMessageType('success');
            // Clear form on success for register
            if (type === 'register') {
                setUsername('');
                setEmail('');
                setPassword('');
                setUserImage('');
            }
        }
        catch (err) {
            setMessage(err.message || `An error occurred during ${type}.`);
            setMessageType('error');
        }
        finally {
            setIsLoading(false);
        }
    };
    return (_jsxs("form", { onSubmit: handleSubmit, className: "p-6 bg-white rounded-lg shadow-md w-full", children: [_jsx("h2", { className: "text-2xl font-bold mb-6 text-gray-800 text-center", children: type === 'login' ? 'Login' : 'Register' }), type === 'register' && (_jsxs("div", { className: "mb-4", children: [_jsx("label", { htmlFor: `${type}-username`, className: "block text-gray-700 text-sm font-bold mb-2", children: "Username:" }), _jsx("input", { type: "text", id: `${type}-username`, value: username, onChange: (e) => setUsername(e.target.value), required: true, className: "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" })] })), _jsxs("div", { className: "mb-4", children: [_jsx("label", { htmlFor: `${type}-email`, className: "block text-gray-700 text-sm font-bold mb-2", children: "Email:" }), _jsx("input", { type: "email", id: `${type}-email`, value: email, onChange: (e) => setEmail(e.target.value), required: true, className: "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" })] }), _jsxs("div", { className: "mb-6", children: [_jsx("label", { htmlFor: `${type}-password`, className: "block text-gray-700 text-sm font-bold mb-2", children: "Password:" }), _jsx("input", { type: "password", id: `${type}-password`, value: password, onChange: (e) => setPassword(e.target.value), required: true, className: "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" })] }), type === 'register' && (_jsxs("div", { className: "mb-6", children: [_jsx("label", { htmlFor: `${type}-image`, className: "block text-gray-700 text-sm font-bold mb-2", children: "Profile Image URL (Optional):" }), _jsx("input", { type: "url", id: `${type}-image`, value: userImage, onChange: (e) => setUserImage(e.target.value), className: "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline", placeholder: "e.g., https://example.com/profile.jpg" })] })), _jsx("button", { type: "submit", className: "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full", disabled: isLoading, children: isLoading ? 'Loading...' : (type === 'login' ? 'Login' : 'Register') }), _jsx(Message, { message: message, type: messageType })] }));
};
export default AuthForm;
