import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// src/pages/userDashboard/userDashboard.tsx
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Message from '../../components/Message';
const UserDashboard = () => {
    const navigate = useNavigate();
    const [currentUserProfile, setCurrentUserProfile] = useState(null);
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState('');
    const [loading, setLoading] = useState(true);
    const displayMessage = (msg, type) => {
        setMessage(msg);
        setMessageType(type);
        setTimeout(() => {
            setMessage('');
            setMessageType('');
        }, 5000);
    };
    useEffect(() => {
        const token = localStorage.getItem('jwtToken');
        const storedUser = localStorage.getItem('currentUser');
        if (!token || !storedUser) {
            displayMessage('คุณยังไม่ได้เข้าสู่ระบบ. กรุณาเข้าสู่ระบบ.', 'error');
            setTimeout(() => navigate('MissAnime/login'), 2000);
            setLoading(false);
            return;
        }
        let user = null;
        try {
            user = JSON.parse(storedUser);
            if (!user || !user.user_id) {
                throw new Error('ข้อมูลผู้ใช้ไม่สมบูรณ์ใน LocalStorage.');
            }
        }
        catch (e) {
            console.error('Error parsing user data from localStorage:', e);
            displayMessage('ข้อมูลผู้ใช้ใน LocalStorage เสียหาย. กรุณาเข้าสู่ระบบใหม่.', 'error');
            localStorage.removeItem('jwtToken');
            localStorage.removeItem('currentUser');
            setTimeout(() => navigate('MissAnime/login'), 2000);
            setLoading(false);
            return;
        }
        // ดึงข้อมูล user จาก API โดยตรง
        const apiUrl = `${import.meta.env.VITE_API_BASE_URL}/user/${user.user_id}`;
        fetch(apiUrl, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then((res) => res.json())
            .then((data) => {
            setCurrentUserProfile(data.user);
            displayMessage('โหลดข้อมูลโปรไฟล์สำเร็จ!', 'success');
        })
            .catch((error) => {
            console.error('ไม่สามารถโหลดข้อมูลโปรไฟล์ผู้ใช้:', error);
            displayMessage(error.message || 'ไม่สามารถโหลดข้อมูลโปรไฟล์ได้.', 'error');
            localStorage.removeItem('jwtToken');
            localStorage.removeItem('currentUser');
            setTimeout(() => navigate('MissAnime/login'), 2000);
        })
            .finally(() => setLoading(false));
    }, [navigate]);
    if (loading) {
        return _jsx("div", { className: "flex justify-center items-center h-screen text-xl font-bold text-gray-700", children: "\u0E01\u0E33\u0E25\u0E31\u0E07\u0E42\u0E2B\u0E25\u0E14\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25\u0E1C\u0E39\u0E49\u0E43\u0E0A\u0E49..." });
    }
    if (!currentUserProfile) {
        return _jsx("div", { className: "flex justify-center items-center h-screen text-xl text-red-600", children: "\u0E44\u0E21\u0E48\u0E2A\u0E32\u0E21\u0E32\u0E23\u0E16\u0E41\u0E2A\u0E14\u0E07\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25\u0E1C\u0E39\u0E49\u0E43\u0E0A\u0E49\u0E44\u0E14\u0E49." });
    }
    return (_jsxs("div", { className: "container mx-auto p-4 bg-gray-50 min-h-screen", children: [_jsx("h1", { className: "text-3xl font-bold text-center mb-6 text-gray-800", children: "Your User Dashboard" }), _jsx(Message, { message: message, type: messageType }), _jsxs("div", { className: "bg-white p-6 rounded-lg shadow-md", children: [_jsx("h2", { className: "text-2xl font-semibold mb-4 text-gray-700", children: "Your Profile" }), _jsxs("div", { className: "flex items-center space-x-4 mb-4", children: [currentUserProfile.user_image ? (_jsx("img", { src: currentUserProfile.user_image, alt: "Profile", className: "w-24 h-24 rounded-full object-cover border-4 border-blue-500 shadow-md" })) : (_jsx("div", { className: "w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 text-4xl font-bold border-4 border-gray-300", children: currentUserProfile.username ? currentUserProfile.username[0].toUpperCase() : 'U' })), _jsxs("div", { children: [_jsx("p", { className: "text-2xl font-bold text-gray-900", children: currentUserProfile.username }), _jsx("p", { className: "text-gray-600 text-lg", children: currentUserProfile.user_email }), _jsxs("p", { className: "text-sm text-gray-500 mt-1", children: ["\u0E40\u0E1B\u0E47\u0E19\u0E2A\u0E21\u0E32\u0E0A\u0E34\u0E01\u0E15\u0E31\u0E49\u0E07\u0E41\u0E15\u0E48: ", new Date(currentUserProfile.created_at).toLocaleDateString()] })] })] }), _jsxs("div", { className: "mt-6 text-center", children: [_jsx("button", { className: "bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-6 rounded-full shadow-lg transition duration-300 ease-in-out", onClick: () => alert('ฟังก์ชันแก้ไขโปรไฟล์ยังไม่พร้อมใช้งาน'), children: "\u0E41\u0E01\u0E49\u0E44\u0E02\u0E42\u0E1B\u0E23\u0E44\u0E1F\u0E25\u0E4C" }), _jsx("button", { className: "ml-4 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-6 rounded-full shadow-lg transition duration-300 ease-in-out", onClick: () => {
                                    localStorage.removeItem('jwtToken');
                                    localStorage.removeItem('currentUser');
                                    navigate('MissAnime/login');
                                }, children: "\u0E2D\u0E2D\u0E01\u0E08\u0E32\u0E01\u0E23\u0E30\u0E1A\u0E1A" })] })] })] }));
};
export default UserDashboard;
