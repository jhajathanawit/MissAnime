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
    const [passwordError, setPasswordError] = useState('');
    const validatePassword = (pass) => {
        const minLength = pass.length >= 8;
        const hasUppercase = /[A-Z]/.test(pass);
        const hasLowercase = /[a-z]/.test(pass);
        const hasNumber = /[0-9]/.test(pass);
        const hasSpecial = /[!@#$%^&*(),.?":{}|<>-_]/.test(pass);
        if (!minLength)
            return 'รหัสผ่านต้องมีความยาวอย่างน้อย 8 ตัวอักษร';
        if (!hasUppercase)
            return 'ต้องมีตัวพิมพ์ใหญ่อย่างน้อย 1 ตัว';
        if (!hasLowercase)
            return 'ต้องมีตัวพิมพ์เล็กอย่างน้อย 1 ตัว';
        if (!hasNumber)
            return 'ต้องมีตัวเลขอย่างน้อย 1 ตัว';
        if (!hasSpecial)
            return 'ต้องมีอักขระพิเศษอย่างน้อย 1 ตัว';
        return '';
    };
    const handlePasswordChange = (e) => {
        const newPassword = e.target.value;
        setPassword(newPassword);
        setPasswordError(validatePassword(newPassword));
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        const passwordValidation = validatePassword(password);
        if (passwordValidation) {
            setMessage(passwordValidation);
            setMessageType('error');
            return;
        }
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
    return (_jsx("div", { className: "flex items-center justify-center mb-0 w-full min-h-[70vh] pt-6 pb-1", children: _jsxs("form", { onSubmit: handleSubmit, className: "w-full max-w-xl mx-auto mb-0 bg-white rounded-lg shadow-md overflow-y-auto", style: { maxHeight: 'calc(100vh - 3rem)' }, children: [_jsxs("div", { className: "sticky top-0 bg-white px-8 pt-8 pb-4 border-b", children: [_jsx("h2", { className: "text-2xl sm:text-3xl font-bold text-pink-500 text-center", children: "MissAnime" }), _jsx("h3", { className: "text-lg sm:text-xl font-semibold mt-2 text-gray-800 text-center", children: type === 'login' ? 'เข้าสู่ระบบ' : 'ลงทะเบียน' })] }), _jsxs("div", { className: "px-8 py-6 space-y-6", children: [type === 'register' && (_jsxs("div", { children: [_jsx("label", { htmlFor: `${type}-username`, className: "block text-gray-700 text-sm font-bold mb-2", children: "\u0E0A\u0E37\u0E48\u0E2D\u0E1C\u0E39\u0E49\u0E43\u0E0A\u0E49:" }), _jsx("input", { type: "text", id: `${type}-username`, value: username, onChange: (e) => setUsername(e.target.value), required: true, className: "shadow appearance-none border rounded w-full py-2.5 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" })] })), _jsxs("div", { children: [_jsx("label", { htmlFor: `${type}-email`, className: "block text-gray-700 text-sm font-bold mb-2", children: "\u0E2D\u0E35\u0E40\u0E21\u0E25:" }), _jsx("input", { type: "email", id: `${type}-email`, value: email, onChange: (e) => setEmail(e.target.value), required: true, className: "shadow appearance-none border rounded w-full py-2.5 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" })] }), _jsxs("div", { className: "mb-6", children: [_jsx("label", { htmlFor: `${type}-password`, className: "block text-gray-700 text-sm font-bold mb-2", children: "Password:" }), _jsx("input", { type: "password", id: `${type}-password`, value: password, onChange: handlePasswordChange, required: true, className: `shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 mb-1 leading-tight focus:outline-none focus:shadow-outline ${passwordError ? 'border-red-500' : ''}` }), passwordError && (_jsx("p", { className: "text-red-500 text-xs italic mt-1", children: passwordError })), type === 'register' && (_jsxs("ul", { className: "text-xs text-gray-500 mt-2 list-disc list-inside", children: [_jsx("li", { children: "\u0E15\u0E49\u0E2D\u0E07\u0E22\u0E32\u0E27\u0E2D\u0E22\u0E48\u0E32\u0E07\u0E19\u0E49\u0E2D\u0E22 8 \u0E15\u0E31\u0E27\u0E2D\u0E31\u0E01\u0E29\u0E23" }), _jsx("li", { children: "\u0E15\u0E49\u0E2D\u0E07\u0E21\u0E35\u0E15\u0E31\u0E27\u0E1E\u0E34\u0E21\u0E1E\u0E4C\u0E43\u0E2B\u0E0D\u0E48\u0E2D\u0E22\u0E48\u0E32\u0E07\u0E19\u0E49\u0E2D\u0E22 1 \u0E15\u0E31\u0E27" }), _jsx("li", { children: "\u0E15\u0E49\u0E2D\u0E07\u0E21\u0E35\u0E15\u0E31\u0E27\u0E1E\u0E34\u0E21\u0E1E\u0E4C\u0E40\u0E25\u0E47\u0E01\u0E2D\u0E22\u0E48\u0E32\u0E07\u0E19\u0E49\u0E2D\u0E22 1 \u0E15\u0E31\u0E27" }), _jsx("li", { children: "\u0E15\u0E49\u0E2D\u0E07\u0E21\u0E35\u0E15\u0E31\u0E27\u0E40\u0E25\u0E02\u0E2D\u0E22\u0E48\u0E32\u0E07\u0E19\u0E49\u0E2D\u0E22 1 \u0E15\u0E31\u0E27" }), _jsx("li", { children: "\u0E15\u0E49\u0E2D\u0E07\u0E21\u0E35\u0E2D\u0E31\u0E01\u0E02\u0E23\u0E30\u0E1E\u0E34\u0E40\u0E28\u0E29\u0E2D\u0E22\u0E48\u0E32\u0E07\u0E19\u0E49\u0E2D\u0E22 1 \u0E15\u0E31\u0E27" })] }))] }), type === 'register' && (_jsxs("div", { children: [_jsx("label", { htmlFor: `${type}-image`, className: "block text-gray-700 text-sm font-bold mb-2", children: "URL \u0E23\u0E39\u0E1B\u0E42\u0E1B\u0E23\u0E44\u0E1F\u0E25\u0E4C (\u0E44\u0E21\u0E48\u0E08\u0E33\u0E40\u0E1B\u0E47\u0E19):" }), _jsx("input", { type: "url", id: `${type}-image`, value: userImage, onChange: (e) => setUserImage(e.target.value), className: "shadow appearance-none border rounded w-full py-2.5 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline", placeholder: "\u0E40\u0E0A\u0E48\u0E19 https://example.com/profile.jpg" })] }))] }), _jsxs("div", { className: "sticky bottom-0 bg-white px-8 py-6 border-t", children: [_jsx("button", { type: "submit", className: "w-full bg-blue-500 hover:bg-blue-700 text-white text-lg font-bold py-2.5 px-6 rounded-lg focus:outline-none focus:shadow-outline transition duration-200", disabled: isLoading, children: isLoading ? 'กำลังดำเนินการ...' : (type === 'login' ? 'เข้าสู่ระบบ' : 'ลงทะเบียน') }), _jsx(Message, { message: message, type: messageType })] })] }) }));
};
export default AuthForm;
