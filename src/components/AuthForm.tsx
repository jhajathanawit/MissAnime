// src/components/AuthForm.tsx
import React, { useState } from 'react';
import Message from './Message'; // นำเข้า Message component

interface AuthFormProps {
  type: 'login' | 'register';
  onSubmit: (data: any) => Promise<void>; // ฟังก์ชันที่จะถูกเรียกเมื่อ submit
}

const AuthForm: React.FC<AuthFormProps> = ({ type, onSubmit }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userImage, setUserImage] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState<'success' | 'error' | ''>('');
  const [isLoading, setIsLoading] = useState(false);
  const [passwordError, setPasswordError] = useState('');

  const validatePassword = (pass: string) => {
    const minLength = pass.length >= 8;
    const hasUppercase = /[A-Z]/.test(pass);
    const hasLowercase = /[a-z]/.test(pass);
    const hasNumber = /[0-9]/.test(pass);
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(pass);

    if (!minLength) return 'รหัสผ่านต้องมีความยาวอย่างน้อย 8 ตัวอักษร';
    if (!hasUppercase) return 'ต้องมีตัวพิมพ์ใหญ่อย่างน้อย 1 ตัว';
    if (!hasLowercase) return 'ต้องมีตัวพิมพ์เล็กอย่างน้อย 1 ตัว';
    if (!hasNumber) return 'ต้องมีตัวเลขอย่างน้อย 1 ตัว';
    if (!hasSpecial) return 'ต้องมีอักขระพิเศษอย่างน้อย 1 ตัว';
    return '';
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    setPasswordError(validatePassword(newPassword));
  };

  const handleSubmit = async (e: React.FormEvent) => {
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
      } else { // register
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
    } catch (err: any) {
      setMessage(err.message || `An error occurred during ${type}.`);
      setMessageType('error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center mb-0 w-full min-h-[70vh] pt-6 pb-1">
      <form 
        onSubmit={handleSubmit} 
        className="w-full max-w-xl mx-auto mb-0 bg-white rounded-lg shadow-md overflow-y-auto"
        style={{ maxHeight: 'calc(100vh - 3rem)' }}
      >
        {/* ส่วนหัว */}
        <div className="sticky top-0 bg-white px-8 pt-8 pb-4 border-b">
          <h2 className="text-2xl sm:text-3xl font-bold text-pink-500 text-center">
            MissAnime
          </h2>
          <h3 className="text-lg sm:text-xl font-semibold mt-2 text-gray-800 text-center">
            {type === 'login' ? 'เข้าสู่ระบบ' : 'ลงทะเบียน'}
          </h3>
        </div>

        {/* ส่วนฟอร์ม */}
        <div className="px-8 py-6 space-y-6">
          {type === 'register' && (
            <div>
              <label htmlFor={`${type}-username`} className="block text-gray-700 text-sm font-bold mb-2">
                ชื่อผู้ใช้:
              </label>
              <input
                type="text"
                id={`${type}-username`}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="shadow appearance-none border rounded w-full py-2.5 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
          )}

          <div>
            <label htmlFor={`${type}-email`} className="block text-gray-700 text-sm font-bold mb-2">
              อีเมล:
            </label>
            <input
              type="email"
              id={`${type}-email`}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="shadow appearance-none border rounded w-full py-2.5 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          <div className="mb-6">
            <label htmlFor={`${type}-password`} className="block text-gray-700 text-sm font-bold mb-2">
              Password:
            </label>
            <input
              type="password"
              id={`${type}-password`}
              value={password}
              onChange={handlePasswordChange}
              required
              className={`shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 mb-1 leading-tight focus:outline-none focus:shadow-outline ${
                passwordError ? 'border-red-500' : ''
              }`}
            />
            {passwordError && (
              <p className="text-red-500 text-xs italic mt-1">
                {passwordError}
              </p>
            )}
            {type === 'register' && (
              <ul className="text-xs text-gray-500 mt-2 list-disc list-inside">
                <li>ต้องยาวอย่างน้อย 8 ตัวอักษร</li>
                <li>ต้องมีตัวพิมพ์ใหญ่อย่างน้อย 1 ตัว</li>
                <li>ต้องมีตัวพิมพ์เล็กอย่างน้อย 1 ตัว</li>
                <li>ต้องมีตัวเลขอย่างน้อย 1 ตัว</li>
                <li>ต้องมีอักขระพิเศษอย่างน้อย 1 ตัว</li>
              </ul>
            )}
          </div>

          {type === 'register' && (
            <div>
              <label htmlFor={`${type}-image`} className="block text-gray-700 text-sm font-bold mb-2">
                URL รูปโปรไฟล์ (ไม่จำเป็น):
              </label>
              <input
                type="url"
                id={`${type}-image`}
                value={userImage}
                onChange={(e) => setUserImage(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2.5 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="เช่น https://example.com/profile.jpg"
              />
            </div>
          )}
        </div>

        {/* ส่วนปุ่มและข้อความแจ้งเตือน */}
        <div className="sticky bottom-0 bg-white px-8 py-6 border-t">
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-700 text-white text-lg font-bold py-2.5 px-6 rounded-lg focus:outline-none focus:shadow-outline transition duration-200"
            disabled={isLoading}
          >
            {isLoading ? 'กำลังดำเนินการ...' : (type === 'login' ? 'เข้าสู่ระบบ' : 'ลงทะเบียน')}
          </button>
          <Message message={message} type={messageType} />
        </div>
      </form>
    </div>
  );
};

export default AuthForm;