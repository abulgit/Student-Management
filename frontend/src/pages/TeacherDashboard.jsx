import React, { useState } from 'react';
import TeacherNavbar from '../component/TeacherNavbar';
import Footer from '../component/Footer';
import axios from 'axios';
import { useContext } from 'react';
import { DarkModeContext } from '../context/DarkModeContext';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
const TeacherDashboard = () => {

  const { isDarkMode } = useContext(DarkModeContext);
  const [roll, setRoll] = useState("");
  const [student, setStudent] = useState(null);
  const [studentCount, setStudentCount] = useState(0);
  const [deleteRoll, setDeleteRoll] = useState("");

  // Fetch student by roll number
  const getStudentByRoll = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/get/${roll}`);
      console.log(response)
      setStudent(response.data);
      toast.success(`Student Roll: ${roll} is fetchd successfully.`)
    } catch (error) {
      console.error("Error fetching student:", error.message);
      setStudent(null);
      toast.error("Student doesn't exist.");
    }
  };

  // Delete student by roll number
  const deleteStudentByRoll = async () => {
    try {
      await axios.delete(`/api/students/${deleteRoll}`);
      alert(`Student with roll ${deleteRoll} deleted`);
      setDeleteRoll("");
      toast.success("Deleted Student.")
      fetchStudentCount(); // Update count after deletion
    } catch (error) {
      console.error("Error deleting student:", error);
      toast.error("Server error can't delete.")
    }
  };

  // Fetch student count
  const fetchStudentCount = async () => {
    try {
      const response = await axios.get(`/api/students/count`);
      setStudentCount(response.data.count);
    } catch (error) {
      console.error("Error fetching student count:", error);
    }
  };


  return (
    <>
    <TeacherNavbar />
    <div className="min-h-screen bg-blue-300 p-6">
      <ToastContainer />
    <main className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
        {/* Get Student by Roll */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Get Student by Roll</h2>
          <input
            type="text"
            placeholder="Enter Roll Number"
            className="border p-2 w-full mb-4 rounded"
            value={roll}
            onChange={(e) => setRoll(e.target.value)}
          />
          <button
            onClick={getStudentByRoll}
            className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
          >
            Search
          </button>
          {student && (
            <div className="mt-4">
              <p><strong>Name:</strong> {student.name}</p>
              <p><strong>Roll:</strong> {student.roll}</p>
              <p><strong>Department:</strong> {student.department}</p>
            </div>
          )}
        </div>

        {/* Delete Student by Roll */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Delete Student by Roll</h2>
          <input
            type="text"
            placeholder="Enter Roll Number"
            className="border p-2 w-full mb-4 rounded"
            value={deleteRoll}
            onChange={(e) => setDeleteRoll(e.target.value)}
          />
          <button
            onClick={deleteStudentByRoll}
            className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
          >
            Delete
          </button>
        </div>

        {/* Student Count */}
        <div className="bg-white p-6 rounded-lg shadow flex items-center justify-center">
          <div>
            <h2 className="text-xl font-semibold mb-2">Total Students</h2>
            <p className="text-4xl font-bold">{studentCount}</p>
          </div>
        </div>
      </main>
    </div>
    <Footer />
    </>
  );
};

export default TeacherDashboard;
