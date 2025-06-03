// src/pages/userDashboard/userDashboard.tsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Message from '../../components/Message';
import Favurite from './componentsForUserdashBoard/favorite/favorite';
import Review from './componentsForUserdashBoard/review/review';

interface User {
  user_id: number;
  username: string;
  user_email: string;
  user_image: string | null;
  created_at: string;
}

const UserDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [currentUserProfile, setCurrentUserProfile] = useState<User | null>(null);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState<'success' | 'error' | ''>('');
  const [loading, setLoading] = useState(true);

  const displayMessage = (msg: string, type: 'success' | 'error') => {
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
      setTimeout(() => navigate('/MissAnime/login'), 2000);
      setLoading(false);
      return;
    }

    let user: User | null = null;
    try {
      user = JSON.parse(storedUser);
      if (!user || !user.user_id) {
        throw new Error('ข้อมูลผู้ใช้ไม่สมบูรณ์ใน LocalStorage.');
      }
    } catch (e) {
      console.error('Error parsing user data from localStorage:', e);
      displayMessage('ข้อมูลผู้ใช้ใน LocalStorage เสียหาย. กรุณาเข้าสู่ระบบใหม่.', 'error');
      localStorage.removeItem('jwtToken');
      localStorage.removeItem('currentUser');
      setTimeout(() => navigate('/MissAnime/login'), 2000);
      setLoading(false);
      return;
    }

    // เรียก API ที่ backend ของคุณ
    const apiUrl = `https://miss-anime-api.onrender.com/api/v1/users/${user.user_id}`;
    fetch(apiUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(async (res: Response) => {
        if (!res.ok) {
          throw new Error('ไม่พบข้อมูลผู้ใช้หรือ Token หมดอายุ');
        }
        return res.json();
      })
      .then((data: any) => {
        
        setCurrentUserProfile(data.data.user); 
        displayMessage('โหลดข้อมูลโปรไฟล์สำเร็จ!', 'success');
      })
      .catch((error: Error) => {
        console.error('ไม่สามารถโหลดข้อมูลโปรไฟล์ผู้ใช้:', error);
        displayMessage(error.message || 'ไม่สามารถโหลดข้อมูลโปรไฟล์ได้.', 'error');
        localStorage.removeItem('jwtToken');
        localStorage.removeItem('currentUser');
        setTimeout(() => navigate('/MissAnime/login'), 2000);
      })
      .finally(() => setLoading(false));
  }, [navigate]);

  if (loading) {
    return <div className="flex justify-center items-center h-screen text-xl font-bold text-gray-700">กำลังโหลดข้อมูลผู้ใช้...</div>;
  }

  if (!currentUserProfile) {
    return <div className="flex justify-center items-center h-screen text-xl text-red-600">ไม่สามารถแสดงข้อมูลผู้ใช้ได้.</div>;
  }

  return (
    <div className="container mx-auto p-4 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">Your User Dashboard</h1>
      <Message message={message} type={messageType} />

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4 text-gray-700">Your Profile</h2>
        <div className="flex items-center space-x-4 mb-4">
          {currentUserProfile.user_image ? (
            <img
              src={currentUserProfile.user_image}
              alt="Profile"
              className="w-24 h-24 rounded-full object-cover border-4 border-blue-500 shadow-md"
            />
          ) : (
            <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 text-4xl font-bold border-4 border-gray-300">
              {currentUserProfile.username ? currentUserProfile.username[0].toUpperCase() : 'U'}
            </div>
          )}
          <div>
            <p className="text-2xl font-bold text-gray-900">{currentUserProfile.username}</p>
            <p className="text-gray-600 text-lg">{currentUserProfile.user_email}</p>
            <p className="text-sm text-gray-500 mt-1">
              เป็นสมาชิกตั้งแต่: {new Date(currentUserProfile.created_at).toLocaleDateString()}
            </p>
          </div>
        </div>
        <div className="mt-6 text-center">
          <button
            className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-6 rounded-full shadow-lg transition duration-300 ease-in-out"
            onClick={() => alert('ฟังก์ชันแก้ไขโปรไฟล์ยังไม่พร้อมใช้งาน')}
          >
            แก้ไขโปรไฟล์
          </button>
          <button
            className="ml-4 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-6 rounded-full shadow-lg transition duration-300 ease-in-out"
            onClick={() => {
              localStorage.removeItem('jwtToken');
              localStorage.removeItem('currentUser');
              navigate('/');
            }}
          >
            ออกจากระบบ
          </button>
        </div>
        <div>
          <h3 className="text-xl font-semibold mt-8 mb-4 text-gray-700">Favorite</h3>
          <div><Favurite key={currentUserProfile.user_id} /></div>
        </div>
        <div>
          <h3 className="text-xl font-semibold mt-8 mb-4 text-gray-700">My Review</h3>
          <div><Review key={currentUserProfile.user_id}/></div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;