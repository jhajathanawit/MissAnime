// src/pages/AuthPage.tsx
import React, { useState } from 'react';
import AuthForm from '../../components/AuthForm';
import { loginUser, registerUser } from '../../api/auth';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../.././contexts/UserContext'; // Adjust the path if needed


const Login: React.FC = () => {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const navigate = useNavigate();
  const { setUser } = useUser();

  const handleLogin = async (data: any) => {
    const { User_Email, User_Pass } = data;
    try {
      const response = await loginUser(User_Email, User_Pass);
      localStorage.setItem('jwtToken', response.token);
      localStorage.setItem('currentUser', JSON.stringify(response.data.user));
      setUser(response.data.user.user_id); // set user context
      alert('Login successful!');
      navigate(`/users/${response.data.user.user_id}`); // redirect to user dashboard
    } catch (error: any) {
      throw error;
    }
  };

  const handleRegister = async (data: any) => {
    const { Username, User_Email, User_Pass, User_Image } = data;
    try {
      const response = await registerUser(Username, User_Email, User_Pass, User_Image);
      localStorage.setItem('jwtToken', response.token);
      localStorage.setItem('currentUser', JSON.stringify(response.data.user));
      setUser(response.data.user.user_id); // set user context
      alert('Registration successful!');
      setIsLoginMode(true);
      navigate(`/users/${response.data.user.user_id}`); // redirect after register
    } catch (error: any) {
      throw error;
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br">
      <div className="bg-[#1d0a3dc2] rounded-lg shadow-xl w-full max-w-[95vw] sm:max-w-md md:max-w-2xl lg:max-w-3xl">
        {isLoginMode ? (
          <>
            <AuthForm type="login" onSubmit={handleLogin} />
            <p className="pb-20 pt-[-8rem] text-center text-gray-300 text-sm">
              ยังไม่มีบัญชีผู้ใช้?{' '}
              <button
                onClick={() => setIsLoginMode(false)}
                className="text-blue-400 hover:underline font-medium"
              >
                ลงทะเบียนที่นี่
              </button>
            </p>
          </>
        ) : (
          <>
            <AuthForm type="register" onSubmit={handleRegister} />
            <p className="pb-20 pt-[-8rem]  text-center text-gray-300 text-sm">
              มีบัญชีผู้ใช้แล้ว?{' '}
              <button
                onClick={() => setIsLoginMode(true)}
                className="text-blue-400 hover:underline font-medium"
              >
                เข้าสู่ระบบที่นี่
              </button>
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default Login;