import axios from 'axios';
// ตรวจสอบว่า VITE_API_BASE_URL ถูกตั้งค่าแล้ว
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
if (!API_BASE_URL) {
    console.error('VITE_API_BASE_URL is not defined in .env');
    // อาจจะ throw error หรือใช้ fallback URL ใน Production ได้
    // ใน Development ควรแก้ไข .env ให้ถูกต้อง
}
export const registerUser = async (username, email, password, userImage) => {
    const response = await axios.post(`${API_BASE_URL}/auth/register`, {
        Username: username,
        User_Email: email,
        User_Pass: password,
        User_Image: userImage,
    });
    if (response.status === 201) { // 201 Created
        return response.data;
    }
    throw new Error(response.data.message || 'Registration failed');
};
export const loginUser = async (email, password) => {
    const response = await axios.post(`${API_BASE_URL}/auth/login`, {
        User_Email: email,
        User_Pass: password,
    });
    if (response.status === 200) { // 200 OK
        return response.data;
    }
    throw new Error(response.data.message || 'Login failed');
};
