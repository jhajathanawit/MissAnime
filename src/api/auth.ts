import axios from 'axios';

// ตรวจสอบว่า VITE_API_BASE_URL ถูกตั้งค่าแล้ว
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

if (!API_BASE_URL) {
  console.error('VITE_API_BASE_URL is not defined in .env');
  // อาจจะ throw error หรือใช้ fallback URL ใน Production ได้
  // ใน Development ควรแก้ไข .env ให้ถูกต้อง
}

interface UserAuthResponse {
  status: string;
  token: string;
  data: {
    user: {
      user_id: number;
      username: string;
      user_email: string;
      created_at: string;
      user_image: string | null;
    };
  };
}

interface AuthErrorResponse {
  status: string;
  message: string;
  error?: string;
}

export const registerUser = async (
  username: string,
  email: string,
  password: string,
  userImage: string | null
): Promise<UserAuthResponse> => {
  const response = await axios.post<UserAuthResponse | AuthErrorResponse>(
    `${API_BASE_URL}/auth/register`,
    {
      Username: username,
      User_Email: email,
      User_Pass: password,
      User_Image: userImage,
    }
  );
  if (response.status === 201) { // 201 Created
    return response.data as UserAuthResponse;
  }
  throw new Error((response.data as AuthErrorResponse).message || 'Registration failed');
};

export const loginUser = async (
  email: string,
  password: string
): Promise<UserAuthResponse> => {
  const response = await axios.post<UserAuthResponse | AuthErrorResponse>(
    `${API_BASE_URL}/auth/login`,
    {
      User_Email: email,
      User_Pass: password,
    }
  );
  if (response.status === 200) { // 200 OK
    return response.data as UserAuthResponse;
  }
  throw new Error((response.data as AuthErrorResponse).message || 'Login failed');
};