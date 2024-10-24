import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { EyeIcon, EyeOffIcon } from '@heroicons/react/outline';
import Footer from '../component/Footer';

const Login = () => {
  const [isTeacherLogin, setIsTeacherLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rollNumber, setRollNumber] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleTeacherLogin = () => {
    if (email && password) {
      toast.success('Teacher login successful!');
      // Implement your backend authentication logic here
    } else {
      toast.error('Please fill out all fields for teacher login.');
    }
  };

  const handleStudentLogin = () => {
    if (rollNumber) {
      toast.success('Student login successful!');
      // Implement your backend authentication logic here
    } else {
      toast.error('Please enter roll number for student login.');
    }
  };

  return (
    <>
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-sm">
        <div className="flex justify-between mb-4">
          <button
            className={`text-lg font-semibold px-4 py-2 rounded ${isTeacherLogin ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
            onClick={() => setIsTeacherLogin(true)}
          >
            Teacher Login
          </button>
          <button
            className={`text-lg font-semibold px-4 py-2 rounded ${!isTeacherLogin ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
            onClick={() => setIsTeacherLogin(false)}
          >
            Student Login
          </button>
        </div>

        {isTeacherLogin ? (
          <div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-6 relative">
              <label className="block text-gray-700 text-sm font-bold mb-2">Password</label>
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 px-3 py-2 focus:outline-none"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOffIcon className="h-5 w-5 text-gray-500" /> : <EyeIcon className="h-5 w-5 text-gray-500" />}
              </button>
            </div>
            <button
              onClick={handleTeacherLogin}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
            >
              Login as Teacher
            </button>
          </div>
        ) : (
          <div>
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2">Roll Number</label>
              <input
                type="text"
                value={rollNumber}
                onChange={(e) => setRollNumber(e.target.value)}
                placeholder="Enter your roll number"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <button
              onClick={handleStudentLogin}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
            >
              Login as Student
            </button>
          </div>
        )}
      </div>
      <ToastContainer />
    </div>
    <Footer />
    </>
  );
};

export default Login;
