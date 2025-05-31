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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
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
    <form onSubmit={handleSubmit} className="p-6 bg-white rounded-lg shadow-md w-full">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">
        {type === 'login' ? 'Login' : 'Register'}
      </h2>

      {type === 'register' && (
        <div className="mb-4">
          <label htmlFor={`${type}-username`} className="block text-gray-700 text-sm font-bold mb-2">
            Username:
          </label>
          <input
            type="text"
            id={`${type}-username`}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
      )}

      <div className="mb-4">
        <label htmlFor={`${type}-email`} className="block text-gray-700 text-sm font-bold mb-2">
          Email:
        </label>
        <input
          type="email"
          id={`${type}-email`}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
          onChange={(e) => setPassword(e.target.value)}
          required
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>

      {type === 'register' && (
        <div className="mb-6">
          <label htmlFor={`${type}-image`} className="block text-gray-700 text-sm font-bold mb-2">
            Profile Image URL (Optional):
          </label>
          <input
            type="url"
            id={`${type}-image`}
            value={userImage}
            onChange={(e) => setUserImage(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="e.g., https://example.com/profile.jpg"
          />
        </div>
      )}

      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
        disabled={isLoading}
      >
        {isLoading ? 'Loading...' : (type === 'login' ? 'Login' : 'Register')}
      </button>

      <Message message={message} type={messageType} />
    </form>
  );
};

export default AuthForm;