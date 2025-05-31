// src/pages/AuthPage.tsx
import React, { useState } from 'react';
// Make sure the path is correct and the file exists.
// If your AuthForm component is actually in 'src/pages/components', update the import like this:
import AuthForm from '../../components/AuthForm';
import { loginUser, registerUser } from '../../api/auth'; // นำเข้าฟังก์ชัน API

const Login: React.FC = () => {
  const [isLoginMode, setIsLoginMode] = useState(true);

  // ฟังก์ชันสำหรับจัดการ Login
  const handleLogin = async (data: any) => {
    const { User_Email, User_Pass } = data;
    try {
      const response = await loginUser(User_Email, User_Pass);
      localStorage.setItem('jwtToken', response.token);
      localStorage.setItem('currentUser', JSON.stringify(response.data.user));
      console.log('Login successful!', response);
      alert('Login successful! Check console for token and user data.');
      // สามารถ redirect ไปหน้า Dashboard ได้ที่นี่
      // window.location.href = '/dashboard';
    } catch (error: any) {
      console.error('Login failed:', error.message);
      throw error; // ส่ง error กลับไปให้ AuthForm จัดการ
    }
  };

  // ฟังก์ชันสำหรับจัดการ Register
  const handleRegister = async (data: any) => {
    const { Username, User_Email, User_Pass, User_Image } = data;
    try {
      const response = await registerUser(Username, User_Email, User_Pass, User_Image);
      localStorage.setItem('jwtToken', response.token);
      localStorage.setItem('currentUser', JSON.stringify(response.data.user));
      console.log('Registration successful!', response);
      alert('Registration successful! You are now logged in.');
      setIsLoginMode(true); // สลับกลับไปหน้า Login หลังจากลงทะเบียนสำเร็จ
    } catch (error: any) {
      console.error('Registration failed:', error.message);
      throw error; // ส่ง error กลับไปให้ AuthForm จัดการ
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
        <h1 className="text-3xl font-extrabold text-gray-900 text-center mb-8">
          MissAnime
        </h1>

        {isLoginMode ? (
          <>
            <AuthForm type="login" onSubmit={handleLogin} />
            <p className="mt-4 text-center text-gray-600">
              Don't have an account?{' '}
              <button
                onClick={() => setIsLoginMode(false)}
                className="text-blue-600 hover:underline font-medium"
              >
                Register here
              </button>
            </p>
          </>
        ) : (
          <>
            <AuthForm type="register" onSubmit={handleRegister} />
            <p className="mt-4 text-center text-gray-600">
              Already have an account?{' '}
              <button
                onClick={() => setIsLoginMode(true)}
                className="text-blue-600 hover:underline font-medium"
              >
                Login here
              </button>
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default Login;