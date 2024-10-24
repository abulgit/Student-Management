// output on right side of teacher's dashboard

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from '../component/Footer';

const UpdateStudent = () => {
  const { register, handleSubmit, setValue, reset } = useForm();
  const [loading, setLoading] = useState(false);
  const [studentData, setStudentData] = useState(null);

  // Fetch student data by roll number
  const fetchStudent = async (roll) => {
    try {
      const response = await axios.get(`http://localhost:8080/update/${roll}`);
      const data = response.data;

      // Pre-fill the form with fetched student data
      setStudentData(data);
      Object.keys(data).forEach((key) => {
        setValue(key, data[key]);
      });

      toast.success('Student data fetched successfully!');
    } catch (error) {
      toast.error('Error fetching student data');
    }
  };

  // Update student data handler
  const onSubmit = async (updatedData) => {
    setLoading(true);
    try {
      await axios.put(`http://localhost:8080/update-student/${studentData.roll}`, updatedData);
      toast.success('Student data updated successfully!');
    } catch (error) {
      toast.error('Error updating student data');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-8">
      <ToastContainer />
      <div className="max-w-2xl w-full bg-white p-8 rounded-lg shadow-lg">
        <h3 className="text-xl font-semibold mb-6 text-center">Update Student Info</h3>

        {/* Fetch Student by Roll Number */}
        <div className="mb-6">
          <label className="block text-sm font-medium">Enter Roll Number*</label>
          <input
            type="text"
            className="w-full px-4 py-2 border rounded-md"
            onBlur={(e) => fetchStudent(e.target.value)}
            placeholder="Enter roll number"
          />
        </div>

        {/* Update Student Form */}
        {studentData && (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Student Name */}
            <div>
              <label className="block text-sm font-medium">Student Name*</label>
              <input
                type="text"
                className="w-full px-4 py-2 border rounded-md"
                {...register('studentName', { required: true })}
              />
            </div>

            {/* Roll Number (Read Only) */}
            <div>
              <label className="block text-sm font-medium">Roll Number (Read-only)</label>
              <input
                type="text"
                className="w-full px-4 py-2 border rounded-md bg-gray-200 cursor-not-allowed"
                readOnly
                {...register('roll')}
              />
            </div>

            {/* Registration Number */}
            <div>
              <label className="block text-sm font-medium">Registration Number*</label>
              <input
                type="text"
                className="w-full px-4 py-2 border rounded-md"
                {...register('registration', { required: true })}
              />
            </div>

            {/* Phone Number */}
            <div>
              <label className="block text-sm font-medium">Phone Number*</label>
              <input
                type="tel"
                className="w-full px-4 py-2 border rounded-md"
                {...register('phone', { required: true })}
              />
            </div>

            {/* Department */}
            <div>
              <label className="block text-sm font-medium">Department*</label>
              <input
                type="text"
                className="w-full px-4 py-2 border rounded-md"
                {...register('dept', { required: true })}
              />
            </div>

            {/* Year */}
            <div>
              <label className="block text-sm font-medium">Year*</label>
              <select
                className="w-full px-4 py-2 border rounded-md"
                {...register('year', { required: true })}
              >
                <option value="1st">1st</option>
                <option value="2nd">2nd</option>
                <option value="3rd">3rd</option>
                <option value="4th">4th</option>
              </select>
            </div>

            {/* Gender */}
            <div>
              <label className="block text-sm font-medium">Gender*</label>
              <select
                className="w-full px-4 py-2 border rounded-md"
                {...register('gender', { required: true })}
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
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
                  'Update Student'
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
    <Footer />
    </>
  );
};

export default UpdateStudent;
