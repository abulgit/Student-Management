import TeacherDashboard from "./pages/TeacherDashboard"
import TeacherNavbar from "./component/TeacherNavbar"
import {Routes, Route} from 'react-router-dom'
import SignupPage from "./pages/SignUp"
import TeacherWorkspace from "./pages/TeacherWorkspace"
import UpdateStudent from "./pages/StudentUpdatePage"
import StudentDashboard from "./pages/StudentDashboard"

import Login from "./pages/Login"
import { DarkModeProvider } from "./context/DarkModeContext"

const  App = ()=> {

  return (
    <>
    <DarkModeProvider>
    <div className="">
      <h1 className='bg-blue-600 text-4xl'>Hello College!</h1>

      
      <Routes>
        <Route path="/" element = {<TeacherDashboard />}/>
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<Login />}/>
        <Route path="/:name/workspace" element={<TeacherWorkspace />}/>
        <Route path="/update-student" element = {<UpdateStudent />}/>
        <Route path="/student-dashboard" element={<StudentDashboard />}/>
      </Routes>
      </div>
      </DarkModeProvider>
    </>
  )
}

export default App
