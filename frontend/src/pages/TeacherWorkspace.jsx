//that form in left of teacher's dashboard

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import TeacherNavbar from '../component/TeacherNavbar';
import Footer from '../component/Footer';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
//import { Cloudinary } from '@cloudinary/url-gen';

const TeacherWorkspace = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [imageUrl, setImageUrl] = useState(null);
  const [loading, setLoading] = useState(false);

  // Welcome animation (Example with CSS animation)
  const teacherName = "John Doe"; // Dynamically fetched

  // Cloudinary setup
/*   const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'your_preset'); // Use your Cloudinary preset

    try {
      const response = await axios.post('https://api.cloudinary.com/v1_1/your_cloud_name/image/upload', formData);
      setImageUrl(response.data.secure_url); // Cloudinary image URL
      return response.data.secure_url;
    } catch (error) {
      alert('Image upload failed');
    }
  }; */

  // Form submission handler
  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const uploadedImageUrl = await uploadImage(data.image[0]);
      const studentData = { ...data, profileImageUrl: uploadedImageUrl };

      await axios.post('http://localhost:8080/add-student', studentData);
      toast.success("Student added successfully.");
      alert('Student added successfully');
    } catch (error) {
      alert('Error adding student');
      toast.error("Technical Error. Can't add new student.")
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
    <TeacherNavbar />
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-8">
      <ToastContainer />
      {/* Welcome Message */}
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-semibold animate-bounce">Welcome,</h1>
        <h2 className="text-4xl font-bold text-indigo-600 animate-fade-in mt-2">{teacherName}</h2>
      </div>

      {/* Add Student Form */}
      <div className="max-w-2xl w-full bg-white p-8 rounded-lg shadow-lg">
        <h3 className="text-xl font-semibold mb-6 text-center">Add New Student</h3>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Student Name */}
          <div>
            <label className="block text-sm font-medium">Student Name*</label>
            <input
              type="text"
              className="w-full px-4 py-2 border rounded-md"
              {...register('studentName', { required: 'Student name is required' })}
            />
            {errors.studentName && <p className="text-red-500 text-sm">{errors.studentName.message}</p>}
          </div>

          {/* Roll Number */}
          <div>
            <label className="block text-sm font-medium">Roll Number*</label>
            <input
              type="text"
              className="w-full px-4 py-2 border rounded-md"
              {...register('roll', { required: 'Roll number is required' })}
            />
            {errors.roll && <p className="text-red-500 text-sm">{errors.roll.message}</p>}
          </div>

          {/* Registration Number */}
          <div>
            <label className="block text-sm font-medium">Registration Number*</label>
            <input
              type="text"
              className="w-full px-4 py-2 border rounded-md"
              {...register('registration', { required: 'Registration number is required' })}
            />
            {errors.registration && <p className="text-red-500 text-sm">{errors.registration.message}</p>}
          </div>

          {/* Phone Number */}
          <div>
            <label className="block text-sm font-medium">Phone Number*</label>
            <input
              type="tel"
              className="w-full px-4 py-2 border rounded-md"
              {...register('phone', { required: 'Phone number is required' })}
            />
            {errors.phone && <p className="text-red-500 text-sm">{errors.phone.message}</p>}
          </div>

          {/* Department */}
          <div>
            <label className="block text-sm font-medium">Department*</label>
            <input
              type="text"
              className="w-full px-4 py-2 border rounded-md"
              {...register('dept', { required: 'Department is required' })}
            />
            {errors.dept && <p className="text-red-500 text-sm">{errors.dept.message}</p>}
          </div>

          {/* Year */}
          <div>
            <label className="block text-sm font-medium">Year*</label>
            <select
              className="w-full px-4 py-2 border rounded-md"
              {...register('year', { required: 'Year is required' })}
            >
              <option value="1st">1st</option>
              <option value="2nd">2nd</option>
              <option value="3rd">3rd</option>
              <option value="4th">4th</option>
            </select>
            {errors.year && <p className="text-red-500 text-sm">{errors.year.message}</p>}
          </div>

          {/* Gender */}
          <div>
            <label className="block text-sm font-medium">Gender*</label>
            <select
              className="w-full px-4 py-2 border rounded-md"
              {...register('gender', { required: 'Gender is required' })}
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
            {errors.gender && <p className="text-red-500 text-sm">{errors.gender.message}</p>}
          </div>

          {/* Profile Image */}
          <div>
            <label className="block text-sm font-medium">Profile Image*</label>
            <input
              type="file"
              className="w-full px-4 py-2 border rounded-md"
              {...register('image', { required: 'Profile image is required' })}
            />
            {errors.image && <p className="text-red-500 text-sm">{errors.image.message}</p>}
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className={`w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 ${loading ? 'bg-opacity-75' : 'hover:bg-indigo-700'}`}
              disabled={loading}
            >
              {loading ? (
                <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                </svg>
              ) : (
                'Add Student'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
      <Footer />
    </>
  );
};

export default TeacherWorkspace;
